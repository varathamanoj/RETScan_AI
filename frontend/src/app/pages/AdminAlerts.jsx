import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle } from "lucide-react";

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/alerts")
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Card className="border-red-400">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle /> Severe Cases Alert
        </CardTitle>
      </CardHeader>

      <CardContent>
        {alerts.length === 0 ? (
          <p>No critical cases 🎉</p>
        ) : (
          <div className="space-y-3">

            {alerts.map((a, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl bg-red-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-sm text-gray-600">{a.contact}</p>
                  <p className="text-sm">
                    Confidence: {a.confidence.toFixed(2)}%
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-red-600 font-bold">
                    {a.prediction}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(a.time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}
      </CardContent>
    </Card>
  );
}