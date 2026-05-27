import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F7FB] to-white p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#2C7BE5]">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#2C7BE5] hover:bg-[#1e5bbf] gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
