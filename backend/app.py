from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from datetime import datetime
from PIL import Image
import bcrypt
import joblib
from bson import ObjectId

from backend.services.preprocessing import preprocess_image
from backend.services.predictor import load_retfound, predict

app = Flask(__name__)
CORS(app)

# ---------------- MongoDB ----------------
app.config["MONGO_URI"] = "mongodb://localhost:27017/retfound_db"
mongo = PyMongo(app)

# ---------------- Models ----------------
retfound_model = load_retfound(
    r"D:\dataset\RETFound_mae_meh\RETFound_mae_meh.pth"
)
xgb_model = joblib.load("backend/model/dr_4class_model.pkl")

CLASS_NAMES = {
    0: "No DR",
    1: "Mild",
    2: "Moderate",
    3: "Severe"
}

# ---------------- REGISTER ----------------
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json

        hashed_pw = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

        user = {
            "name": data["name"],
            "phone": data.get("phone"),
            "email": data.get("email"),
            "password": hashed_pw,
            "role": data["role"]
        }

        mongo.db.users.insert_one(user)

        return jsonify({"message": "Registered successfully"})
    except Exception as e:
        print("REGISTER ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json

        identifier = data["identifier"]
        role = data["role"]

        if role == "patient":
            user = mongo.db.users.find_one({
                "$or": [{"phone": identifier}, {"email": identifier}],
                "role": role
            })
        else:
            user = mongo.db.users.find_one({
                "email": identifier,
                "role": role
            })

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not bcrypt.checkpw(data["password"].encode(), user["password"]):
            return jsonify({"error": "Invalid password"}), 401

        return jsonify({
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "role": user["role"]
            }
        })

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ---------------- PREDICT ----------------
@app.route("/predict", methods=["POST"])
def predict_api():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]
        user_id = request.form.get("userId")

        if not user_id:
            return jsonify({"error": "User ID missing"}), 400

        image = Image.open(file).convert("RGB")
        processed = preprocess_image(image)

        prediction, probabilities = predict(
            processed,
            retfound_model,
            xgb_model
        )

        result = {
            "userId": str(user_id),
            "prediction": CLASS_NAMES[prediction],
            "probabilities": {
                CLASS_NAMES[i]: float(probabilities[i])
                for i in range(len(probabilities))
            },
            "timestamp": datetime.utcnow(),
            "alertStatus": "pending"
        }

        mongo.db.reports.insert_one(result)

        print("Saved:", result)

        return jsonify({
            "prediction": result["prediction"],
            "probabilities": result["probabilities"]
        })

    except Exception as e:
        print("PREDICT ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ---------------- USER HISTORY ----------------
@app.route("/reports/<user_id>", methods=["GET"])
def get_reports(user_id):
    try:
        reports = mongo.db.reports.find({"userId": str(user_id)})

        data = []
        for r in reports:
            data.append({
                "prediction": r["prediction"],
                "probabilities": r["probabilities"],
                "timestamp": r["timestamp"].isoformat()
            })

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- ADMIN USERS ----------------
@app.route("/admin/users", methods=["GET"])
def get_all_users():
    try:
        users = mongo.db.users.find()

        data = []
        for u in users:
            scan_count = mongo.db.reports.count_documents({
                "userId": str(u["_id"])
            })

            data.append({
                "id": str(u["_id"]),
                "name": u["name"],
                "email": u.get("email"),
                "phone": u.get("phone"),
                "role": u["role"],
                "scans": scan_count,
                "joined": u["_id"].generation_time.isoformat()
            })

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- DELETE USER ----------------
@app.route("/admin/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        mongo.db.users.delete_one({"_id": ObjectId(user_id)})
        mongo.db.reports.delete_many({"userId": str(user_id)})

        return jsonify({"message": "User deleted successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- ADMIN STATS ----------------
@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    try:
        total_users = mongo.db.users.count_documents({})
        total_scans = mongo.db.reports.count_documents({})

        total_doctors = mongo.db.users.count_documents({"role": "doctor"})
        total_patients = mongo.db.users.count_documents({"role": "patient"})

        diagnosis = list(mongo.db.reports.aggregate([
            {"$group": {"_id": "$prediction", "count": {"$sum": 1}}}
        ]))

        diagnosis_data = [
            {"name": d["_id"], "count": d["count"]}
            for d in diagnosis
        ]

        users = mongo.db.users.find().sort("_id", -1).limit(5)

        recent_users = []
        for u in users:
            recent_users.append({
                "name": u["name"],
                "email": u.get("email"),
                "phone": u.get("phone"),
                "role": u["role"],
                "date": u["_id"].generation_time.isoformat()
            })

        return jsonify({
            "totalUsers": total_users,
            "totalDoctors": total_doctors,
            "totalPatients": total_patients,
            "totalScans": total_scans,
            "diagnosisData": diagnosis_data,
            "recentUsers": recent_users
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- ALERTS ----------------
@app.route("/admin/alerts", methods=["GET"])
def get_alerts():
    try:
        reports = mongo.db.reports.find({
            "prediction": "Severe",
            "alertStatus": {"$in": ["pending", "assigned"]}
        }).sort("timestamp", -1)

        alerts = []

        for r in reports:
            user = mongo.db.users.find_one({
                "_id": ObjectId(r["userId"])
            })

            alerts.append({
                "id": str(r["_id"]),
                "name": user["name"] if user else "Unknown",
                "contact": (user.get("email") or user.get("phone")) if user else "N/A",
                "prediction": r["prediction"],
                "confidence": max(r["probabilities"].values()) * 100,
                "time": r["timestamp"].isoformat(),
                "assignedDoctor": r.get("assignedDoctor")
            })

        return jsonify(alerts)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- RESOLVE ALERT ----------------
@app.route("/admin/resolve-alert", methods=["POST"])
def resolve_alert():
    try:
        data = request.json

        mongo.db.reports.update_one(
            {"_id": ObjectId(data["id"])},
            {"$set": {"alertStatus": "resolved"}}
        )

        return jsonify({"message": "Resolved"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- ASSIGN DOCTOR ----------------
@app.route("/admin/assign-doctor", methods=["POST"])
def assign_doctor():
    try:
        data = request.json

        doctor = mongo.db.users.find_one({
            "name": data["doctor"],
            "role": "doctor"
        })

        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404

        mongo.db.reports.update_one(
            {"_id": ObjectId(data["id"])},
            {
                "$set": {
                    "assignedDoctor": data["doctor"],
                    "assignedDoctorId": str(doctor["_id"]),
                    "alertStatus": "assigned"
                }
            }
        )

        return jsonify({"message": "Doctor assigned"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- DOCTOR ALERTS ----------------
@app.route("/doctor/alerts/<doctor_id>", methods=["GET"])
def doctor_alerts(doctor_id):
    try:
        reports = mongo.db.reports.find({
            "assignedDoctorId": str(doctor_id),
            "alertStatus": "assigned"
        }).sort("timestamp", -1)

        alerts = []

        for r in reports:
            user = mongo.db.users.find_one({
                "_id": ObjectId(r["userId"])
            })

            alerts.append({
                "patientName": user["name"] if user else "Unknown",
                "contact": (user.get("email") or user.get("phone")) if user else "N/A",
                "prediction": r["prediction"],
                "confidence": max(r["probabilities"].values()) * 100,
                "time": r["timestamp"].isoformat()
            })

        return jsonify(alerts)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- DOCTOR REview ----------------

@app.route("/doctor/review", methods=["POST"])
def doctor_review():
    data = request.json

    mongo.db.reports.update_one(
        {"_id": ObjectId(data["id"])},
        {"$set": {"reviewStatus": "done"}}
    )

    return jsonify({"message": "Reviewed"})

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)