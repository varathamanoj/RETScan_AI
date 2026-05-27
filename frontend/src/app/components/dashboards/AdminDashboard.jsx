import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users, UserCheck, Stethoscope, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // FETCH STATS
  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  // FETCH ALERTS
  const fetchAlerts = () => {
    fetch("http://127.0.0.1:5000/admin/alerts")
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // ASSIGN DOCTOR
  const handleAssignDoctor = async (alert) => {
    try {
      const doctorName = prompt("Enter Doctor Name:");

      if (!doctorName) return;

      await fetch("http://127.0.0.1:5000/admin/assign-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: alert.id,
          doctor: doctorName
        })
      });

      fetchAlerts();

    } catch (err) {
      console.error(err);
    }
  };

  // RESOLVE ALERT
  const handleResolve = async (alert) => {
    try {
      await fetch("http://127.0.0.1:5000/admin/resolve-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: alert.id })
      });

      fetchAlerts();

    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return <p className="p-6">Loading...</p>;

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
    { title: 'Doctors', value: stats.totalDoctors, icon: Stethoscope, color: 'bg-green-500' },
    { title: 'Patients', value: stats.totalPatients, icon: UserCheck, color: 'bg-purple-500' },
    { title: 'Total Scans', value: stats.totalScans, icon: Activity, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
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

      {/* ALERT SYSTEM */}
      <Card className="border-red-400">
        <CardHeader>
          <CardTitle className="text-red-600">
            🚨 Severe Cases Alert
          </CardTitle>
        </CardHeader>

        <CardContent>
          {alerts.length === 0 ? (
            <p>No critical cases 🎉</p>
          ) : (
            alerts.map((a) => (
              <div key={a.id} className="p-4 bg-red-50 rounded mb-3 flex justify-between">

                {/* LEFT */}
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p>{a.contact || "N/A"}</p>
                  <p>Confidence: {a.confidence.toFixed(2)}%</p>

                  {a.assignedDoctor && (
                    <p className="text-sm text-blue-600">
                      Assigned: {a.assignedDoctor}
                    </p>
                  )}
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="text-red-600 font-bold">{a.prediction}</p>

                  <div className="flex gap-2 justify-end mt-2">

                    {!a.assignedDoctor && (
                      <button
                        onClick={() => handleAssignDoctor(a)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Assign
                      </button>
                    )}

                    <button
                      onClick={() => handleResolve(a)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Resolve
                    </button>

                  </div>

                  <p className="text-xs mt-1">
                    {new Date(a.time).toLocaleString()}
                  </p>
                </div>

              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.diagnosisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="count">
                {stats.diagnosisData.map((entry, index) => {
                  let color = "#2C7BE5";
                  if (entry.name === "No DR") color = "#10b981";
                  else if (entry.name === "Mild") color = "#f59e0b";
                  else if (entry.name === "Moderate") color = "#f97316";
                  else if (entry.name === "Severe") color = "#ef4444";
                  return <Cell key={index} fill={color} />;
                })}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}