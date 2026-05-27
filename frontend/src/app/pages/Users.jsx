import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Trash2 } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

const deleteUser = async (id) => {
  if (!window.confirm("Delete this user?")) return;

  try {
    const res = await fetch(`http://127.0.0.1:5000/admin/users/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    console.log(data);

    fetchUsers();
  } catch (err) {
    console.error(err);
  }
};

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-semibold">Admin - User Management</h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">

        <Card>
          <CardContent className="p-4">
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p>Patients</p>
            <h2>{users.filter(u => u.role === "patient").length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p>Doctors</p>
            <h2>{users.filter(u => u.role === "doctor").length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p>Total Scans</p>
            <h2>{users.reduce((acc, u) => acc + (u.scans || 0), 0)}</h2>
          </CardContent>
        </Card>

      </div>

      {/* FILTER */}
      <div className="flex gap-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="patient">Patient</SelectItem>
            <SelectItem value="doctor">Doctor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Scans</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>

                  <td>{user.name}</td>
                  <td>{user.email || user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.scans}</td>
                  <td>{new Date(user.joined).toLocaleDateString()}</td>

                  <td>
                    <Button
                      variant="destructive"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </CardContent>
      </Card>

    </div>
  );
}