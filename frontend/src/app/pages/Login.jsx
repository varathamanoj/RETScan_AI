import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Activity } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState('patient');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier,
          password,
          role
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2C7BE5] to-[#1e5bbf] p-4">
      <Card className="w-full max-w-md shadow-2xl">

        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="bg-[#2C7BE5] p-3 rounded-2xl">
              <Activity className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl mt-2">RETScan AI</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ROLE */}
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* IDENTIFIER */}
            <div>
              <Label>
                {role === "patient" ? "Phone or Email" : "Email"}
              </Label>
              <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  role === "patient"
                    ? "Enter Phone Number or Email"
                    : "Enter Email"
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#2C7BE5]">
              Login
            </Button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Register
              </span>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}