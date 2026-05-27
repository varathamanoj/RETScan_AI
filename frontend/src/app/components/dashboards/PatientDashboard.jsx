import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, Calendar, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [lastScan, setLastScan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.id) {
          console.error("No user found");
          return;
        }

        const res = await fetch(`http://127.0.0.1:5000/reports/${user.id}`);
        const data = await res.json();

        console.log("Fetched data:", data);

        if (data.length > 0) {
          // 🔥 SORT LATEST FIRST
          const sorted = data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );

          setHistory(sorted);
          setLastScan(sorted[0]);
        } else {
          setHistory([]);
          setLastScan(null);
        }

      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  // 🔥 RISK CALCULATION
  const getRisk = (prediction) => {
    if (prediction === "Severe") return "High";
    if (prediction === "Moderate") return "Medium";
    return "Low";
  };

  const stats = [
    {
      title: 'Total Scans',
      value: history.length,
      icon: Activity,
      color: 'bg-blue-500',
    },
    {
      title: 'Last Scan',
      value: lastScan
        ? new Date(lastScan.timestamp).toLocaleDateString()
        : 'N/A',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Current Risk',
      value: lastScan ? getRisk(lastScan.prediction) : 'N/A',
      icon: lastScan && getRisk(lastScan.prediction) === 'Low'
        ? CheckCircle
        : AlertCircle,
      color: lastScan && getRisk(lastScan.prediction) === 'Low'
        ? 'bg-green-500'
        : 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">My Health Dashboard</h1>
          <p className="text-muted-foreground">Track your retinal health</p>
        </div>

        <Button onClick={() => navigate('/upload')}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Scan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Result */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Scan Result</CardTitle>
        </CardHeader>

        <CardContent>
          {lastScan ? (
            <div className="space-y-2">
              <p><b>Diagnosis:</b> {lastScan.prediction}</p>
              <p><b>Risk Level:</b> {getRisk(lastScan.prediction)}</p>
              <p>
                <b>Confidence:</b>{" "}
                {(Math.max(...Object.values(lastScan.probabilities)) * 100).toFixed(2)}%
              </p>
            </div>
          ) : (
            <p>No scans available. Upload your first image.</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card onClick={() => navigate('/upload')} className="cursor-pointer hover:shadow-lg">
          <CardContent className="p-6 flex gap-4 items-center">
            <Upload className="text-blue-500" />
            <div>
              <p className="font-medium">Upload New Scan</p>
              <p className="text-sm text-muted-foreground">Analyze retinal image</p>
            </div>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/history')} className="cursor-pointer hover:shadow-lg">
          <CardContent className="p-6 flex gap-4 items-center">
            <Calendar className="text-green-500" />
            <div>
              <p className="font-medium">View History</p>
              <p className="text-sm text-muted-foreground">Check past results</p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}