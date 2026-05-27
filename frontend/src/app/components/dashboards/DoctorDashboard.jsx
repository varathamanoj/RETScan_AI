import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, Users, FileText, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  //  FETCH ASSIGNED PATIENT ALERTS
  const fetchAlerts = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch(`http://127.0.0.1:5000/doctor/alerts/${user.id}`)
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  //  MARK AS REVIEWED
  const handleReview = async (alert) => {
    try {
      await fetch("http://127.0.0.1:5000/doctor/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: alert.id
        })
      });

      fetchAlerts(); // refresh

    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    {
      title: 'Total Patients',
      value: alerts.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'High Risk Cases',
      value: alerts.length,
      icon: Activity,
      color: 'bg-red-500',
    },
    {
      title: 'Reports',
      value: alerts.length,
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      title: 'Scans Reviewed',
      value: alerts.filter(a => a.reviewStatus === "done").length,
      icon: Eye,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">
          Review assigned patients and manage high-risk cases
        </p>
      </div>

      {/*  ALERTS SECTION */}
      <Card className="border-red-400">
        <CardHeader>
          <CardTitle className="text-red-600">
            🔔 Assigned Patients
          </CardTitle>
        </CardHeader>

        <CardContent>
          {alerts.length === 0 ? (
            <p>No assigned patients 🎉</p>
          ) : (
            alerts.map((a, i) => (
              <div
                key={i}
                className="p-4 bg-red-50 rounded mb-3 flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold">{a.patientName}</p>
                  <p>{a.contact}</p>
                  <p className="text-sm">
                    Confidence: {a.confidence.toFixed(2)}%
                  </p>

                  {a.reviewStatus === "done" && (
                    <p className="text-green-600 text-sm">
                      ✔ Reviewed
                    </p>
                  )}
                </div>

                {/* RIGHT */}
                <div className="text-right space-y-2">
                  <p className="text-red-600 font-bold">
                    {a.prediction}
                  </p>

                  <p className="text-xs">
                    {new Date(a.time).toLocaleString()}
                  </p>

                  <div className="flex gap-2 justify-end">
                    {/* VIEW */}
                    <Button
                      size="sm"
                      onClick={() => navigate(`/patient/${a.id}`)}
                    >
                      View
                    </Button>

                    {/* REVIEW */}
                    {a.reviewStatus !== "done" && (
                      <Button
                        size="sm"
                        className="bg-green-500 text-white"
                        onClick={() => handleReview(a)}
                      >
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p>{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}