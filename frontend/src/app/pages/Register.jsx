import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Activity } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState('patient');
  const [method, setMethod] = useState('phone'); // 🔥 NEW
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (role === "patient") {
      if (method === "phone" && !phone) {
        alert("Phone is required");
        return;
      }
      if (method === "email" && !email) {
        alert("Email is required");
        return;
      }
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone: method === "phone" ? phone : null,
          email: method === "email" ? email : email, // allow doctor/admin
          password,
          role
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully");
        navigate('/login');
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
          <CardTitle className="text-2xl mt-2">Create Account</CardTitle>
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

            {/* NAME */}
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            {/* 🔥 METHOD SELECTOR (ONLY PATIENT) */}
            {role === "patient" && (
              <div>
                <Label>Choose Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 🔥 DYNAMIC INPUT */}
            {role === "patient" && method === "phone" && (
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}

            {((role === "patient" && method === "email") || role !== "patient") && (
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

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
              Register
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}