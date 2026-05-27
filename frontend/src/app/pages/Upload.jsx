import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Upload as UploadIcon, Loader2 } from 'lucide-react';
import ResultCard from '../components/ResultCard';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert("Only PNG/JPG allowed");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setResult(null);
  };
const handleAnalyze = async () => {
  if (!selectedFile) return;

  setIsAnalyzing(true);

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("userId", user.id);

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    const formattedResult = {
      prediction: data.prediction,
      confidence: Math.max(...Object.values(data.probabilities)) * 100,
      probabilities: data.probabilities,
    };

    setResult(formattedResult);

  } catch (error) {
    console.error(error);
    alert("Backend error");
  }

  setIsAnalyzing(false);
};

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Upload Retinal Image</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          {!preview ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                handleFileSelect(file);
              }}
              onClick={() => document.getElementById("fileInput").click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 transition"
            >
              <UploadIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />

              <p className="font-medium text-gray-700">
                Drag & drop image here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse
              </p>

              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>
          ) : (
            <>
              <img src={preview} className="rounded-lg max-h-96 mx-auto" />

              <div className="flex gap-2 justify-center">
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>

                <Button onClick={() => setPreview(null)} variant="outline">
                  Clear
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {isAnalyzing && (
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto" />
          <p>Analyzing image...</p>
        </div>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
}