<div align="center">

# 🔬 RETScan AI

**AI-powered Diabetic Retinopathy Detection using RETFound Vision Transformer & XGBoost**

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-Backend-lightgrey?logo=flask)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)](https://reactjs.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-ML-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-Educational%20%2F%20Research-yellow)](LICENSE)

</div>

---

## 📌 Overview

**RETScan AI** is a full-stack healthcare web application that automates the detection and severity classification of **Diabetic Retinopathy (DR)** from retinal fundus images.

Diabetic Retinopathy is one of the leading causes of preventable blindness worldwide. Early detection is critical — RETScan AI assists healthcare professionals by instantly analyzing retinal fundus images and classifying disease severity using state-of-the-art deep learning.

The system combines **[RETFound](https://github.com/rmaphoh/RETFound)** — a retinal foundation model pretrained on 1.6 million retinal images — with an **XGBoost** classifier for accurate, efficient screening.

---

## 🩺 Severity Classification

| Grade | Label | Description |
|:---:|---|---|
| 0 | **No DR** | No signs of diabetic retinopathy |
| 1 | **Mild DR** | Microaneurysms only |
| 2 | **Moderate DR** | More than microaneurysms but less than severe |
| 3 | **Severe DR** | Extensive retinal hemorrhages, venous beading |

---

## ✨ Features

- 📤 **Upload** retinal fundus images through a modern web UI
- ⚙️ **Automated preprocessing** — resize, normalize, standardize
- 🧠 **RETFound feature extraction** via Vision Transformer (ViT)
- 📊 **XGBoost classification** for four-stage DR severity
- 📋 **Patient diagnostic history** management
- 👨‍⚕️ **Doctor review workflow** with report management
- 🔒 **Secure report storage** with MongoDB
- 📱 **Responsive** web interface

---

## 🏗️ System Architecture

```
Patient Upload
      │
      ▼
Image Preprocessing
(RGB → Resize 224×224 → Normalize)
      │
      ▼
RETFound Feature Extraction
(Vision Transformer — pretrained on 1.6M retinal images)
      │
      ▼
XGBoost Classification
      │
      ▼
Severity Prediction (No DR / Mild / Moderate / Severe)
      │
      ▼
Report Generation → Patient / Doctor Dashboard
```

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Vite, TypeScript, HTML5, CSS3 |
| **Backend** | Flask, Python |
| **ML / AI** | RETFound, Vision Transformer (ViT), XGBoost, PyTorch, Scikit-learn |
| **Data** | NumPy, Pandas |
| **Database** | MongoDB |
| **Dev Tools** | Git, GitHub, Jupyter Notebook |

---

## 📂 Project Structure

```
RETScan_AI/
│
├── backend/
│   ├── app.py                  # Flask application entry point
│   └── services/
│       ├── predictor.py        # ML prediction pipeline
│       └── preprocessing.py   # Image preprocessing utilities
│
├── frontend/
│   ├── src/                    # React source files
│   ├── public/                 # Static assets
│   └── package.json
│
├── models_vit.py               # RETFound / ViT model definition
├── requirements.txt
├── README.md
└── util/                       # Helper utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11
- Node.js & npm
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/varathamanoj/RETScan_AI.git
cd RETScan_AI
```

### 2. Set Up Python Environment

```bash
conda create -n retfound python=3.11 -y
conda activate retfound
pip install -r requirements.txt
```

### 3. Download Pretrained Model

This project requires the pretrained **RETFound_mae_meh.pth** checkpoint.

**Step 1 — Download the checkpoint** from Hugging Face:

> 🤗 [YukunZhou/RETFound_mae_meh](https://huggingface.co/YukunZhou/RETFound_mae_meh)

**Step 2 — Create a local folder** to store the model. For example:

```text
D:/Models/RETFound/
```

**Step 3 — Move the checkpoint** into that folder:

```text
D:/Models/RETFound/RETFound_mae_meh.pth
```

**Step 4 — Update the checkpoint path** in the following files with your local path:

`backend/services/predictor.py`
```python
checkpoint_path = r"D:/Models/RETFound/RETFound_mae_meh.pth"
```

`backend/app.py`
```python
retfound_model = load_retfound(r"D:/Models/RETFound/RETFound_mae_meh.pth")
```

`test_predictor.py`
```python
retfound_model = load_retfound(r"D:/Models/RETFound/RETFound_mae_meh.pth")
```

> ⚠️ Update any other file that calls `load_retfound(...)` with your local checkpoint path.

### 4. Environment Setup & Running the App

**Activate the Conda environment:**

```bash
conda activate D:\RETFound\env
```

**Navigate to the project directory:**

```bash
cd D:\RETFound\RETFound
```

***(Optional)* Launch Jupyter Notebook** for model exploration or training:

```bash
jupyter notebook
```

**Start the backend server:**

```bash
python -m backend.app
```

Server runs at: `http://127.0.0.1:5000`

If successful, you should see:

```
* Running on http://127.0.0.1:5000
```

**Start the frontend:**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🤖 Model Pipeline

### Image Preprocessing
- RGB conversion
- Resizing to **224 × 224** pixels
- Pixel normalization & standardization

### Feature Extraction
RETFound uses a **Vision Transformer (ViT)** architecture (~300M parameters) pretrained with self-supervised learning on 1.6 million retinal images across large-scale ophthalmic datasets.

### Classification
Extracted feature vectors are passed to an **XGBoost** classifier trained on:

- **APTOS 2019** — Kaggle Diabetic Retinopathy Dataset (high-quality fundus images)
- **MESSIDOR-2** — Clinical retinal image dataset for DR evaluation

---

## 📊 Performance Highlights

- ✅ RETFound pretrained on **1.6M retinal images**
- ✅ **~300M parameter** Vision Transformer backbone
- ✅ Multi-class DR classification (4 grades)
- ✅ Automated end-to-end prediction pipeline
- ✅ Real-time web-based diagnosis workflow

---

## 🔮 Future Enhancements

- [ ] Doctor appointment scheduling
- [ ] PDF report generation
- [ ] Cloud deployment (AWS / GCP / Azure)
- [ ] Multi-disease retinal screening
- [ ] Explainable AI (Grad-CAM visualizations)
- [ ] Mobile application support

---

## 📚 Acknowledgements

This project is built upon **RETFound**, a retinal foundation model developed by Yukun Zhou et al.

- 📦 **Original Repository:** [github.com/rmaphoh/RETFound](https://github.com/rmaphoh/RETFound)
- 📄 **Research Paper:** Zhou et al., *A Foundation Model for Generalizable Disease Detection from Retinal Images*, **Nature 2023**  
  👉 [nature.com/articles/s41586-023-06555-x](https://www.nature.com/articles/s41586-023-06555-x)

### Citation

```bibtex
@article{zhou2023foundation,
  title={A foundation model for generalizable disease detection from retinal images},
  author={Zhou, Yukun and others},
  journal={Nature},
  volume={622},
  number={7981},
  pages={156--163},
  year={2023}
}
```

---

## 👨‍💻 Author

**VARATHAMANOJ V** — AI & ML Developer

[![GitHub](https://img.shields.io/badge/GitHub-varathamanoj-181717?logo=github)](https://github.com/varathamanoj)

---

## 📝 License

This project is intended for **educational and research purposes** only. Not for clinical deployment without proper validation and regulatory approval.

---

<div align="center">
  <sub>Built with ❤️ using RETFound · PyTorch · React · Flask</sub>
</div>
