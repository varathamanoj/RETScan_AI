import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Eye, Activity, Users, Shield } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Eye,
      title: 'Retinal Image Analysis',
      description: 'Upload retinal fundus images for diabetic retinopathy detection.',
    },
    {
      icon: Activity,
      title: 'AI-Based Prediction',
      description: 'RETFound and XGBoost provide automated disease severity prediction.',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Separate access for patients, doctors, and administrators.',
    },
    {
      icon: Shield,
      title: 'Secure Data Storage',
      description: 'Patient reports and records are securely stored for future access.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FB] via-white to-[#F4F7FB]">
      <div className="container mx-auto px-4 py-20">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-[#2C7BE5] p-4 rounded-3xl shadow-lg">
              <Activity className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-[#2C7BE5]">
            RETScan AI
          </h1>

          <p className="text-2xl text-muted-foreground mb-4">
            Diabetic Retinopathy Detection System
          </p>

          <p className="text-lg text-muted-foreground mb-8">
            An AI-powered platform for early detection of diabetic retinopathy
            using retinal fundus image analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-[#2C7BE5] hover:bg-[#1e5bbf]"
            >
              Login
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Core Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-[#2C7BE5]" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-muted-foreground">
          <p>&copy; 2026 RETScan AI</p>
        </div>

      </div>
    </div>
  );
}