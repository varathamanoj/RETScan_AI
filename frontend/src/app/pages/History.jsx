import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Eye } from 'lucide-react';

export default function History() {
  const [selectedScan, setSelectedScan] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 🔥 GET USER FROM LOCAL STORAGE
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
          console.error("User not found");
          return;
        }

        // 🔥 CORRECT API CALL
        const res = await fetch(
          `http://127.0.0.1:5000/reports/${user.id}`
        );

        const data = await res.json();

        setHistoryData(data);

      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getRiskColor = (prediction) => {
    if (prediction === 'Severe') return 'text-red-500';
    if (prediction === 'Moderate') return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Scan History</h1>

      <Card>
        <CardContent>

          {/* 🔥 LOADING */}
          {loading ? (
            <p>Loading...</p>
          ) : historyData.length === 0 ? (
            <p>No history available</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th>Prediction</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {historyData.map((scan, index) => (
                  <tr key={index}>
                    <td className={getRiskColor(scan.prediction)}>
                      {scan.prediction}
                    </td>

                    <td>
                      {new Date(scan.timestamp).toLocaleString()}
                    </td>

                    <td>
                      <Button onClick={() => setSelectedScan(scan)}>
                        <Eye size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </CardContent>
      </Card>

      {/* DETAILS */}
      {selectedScan && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><b>Prediction:</b> {selectedScan.prediction}</p>
            <p><b>Date:</b> {new Date(selectedScan.timestamp).toLocaleString()}</p>

            <h4 className="mt-3 font-semibold">Probabilities:</h4>
            {Object.entries(selectedScan.probabilities).map(([key, value]) => (
              <p key={key}>{key}: {(value * 100).toFixed(2)}%</p>
            ))}

            <div className="mt-4 flex gap-2">
              <Button variant="outline" onClick={() => setSelectedScan(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}