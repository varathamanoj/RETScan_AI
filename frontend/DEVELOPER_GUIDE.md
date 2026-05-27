# RETScan AI - Developer Guide

## Quick Start

### Login Credentials
Use any email and password with one of the following roles:
- **Doctor**: Access doctor dashboard with patient management features
- **Patient**: Access patient dashboard with personal health tracking
- **Admin**: Access admin dashboard with user management and analytics

## Application Flow

```
Landing Page (/)
    ↓
Login (/login) or Register (/register)
    ↓
Role-Based Dashboard (/dashboard)
    ↓
[Upload, History, Reports, Settings, Users (admin)]
```

## Component Structure

### Pages
All pages are in `/src/app/pages/`:

- **Landing.jsx** - Marketing/landing page
- **Login.jsx** - User authentication
- **Register.jsx** - New user registration
- **Dashboard.jsx** - Role-based dashboard router
- **Upload.jsx** - Image upload and AI analysis
- **History.jsx** - Scan history and records
- **Reports.jsx** - Analytics and downloadable reports
- **Users.jsx** - User management (admin only)
- **Settings.jsx** - User preferences and account settings
- **NotFound.jsx** - 404 error page

### Dashboard Components
Located in `/src/app/components/dashboards/`:

- **DoctorDashboard.jsx** - Doctor-specific dashboard
- **PatientDashboard.jsx** - Patient-specific dashboard
- **AdminDashboard.jsx** - Admin-specific dashboard

### Shared Components
Located in `/src/app/components/`:

- **DashboardLayout.jsx** - Main layout wrapper
- **DashboardSidebar.jsx** - Collapsible navigation sidebar
- **ResultCard.jsx** - AI prediction results display
- **LoadingDashboard.jsx** - Loading skeleton

## Authentication System

### Context: `AuthContext.jsx`

```javascript
// Available methods
const { user, login, register, logout, loading } = useAuth();

// Login
login(email, password, role);

// Register
register(name, email, password, role);

// Logout
logout();

// Current user
console.log(user); // { email, role, name, id }
```

### Protected Routes

Routes use `ProtectedRoute` wrapper to ensure authentication:

```javascript
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Navigate to="/login" />;
  return children;
}
```

## Routing

Using React Router Data mode pattern:

```javascript
// routes.js
export const router = createBrowserRouter([...routes]);

// App.tsx
<RouterProvider router={router} />
```

### Navigation

```javascript
import { useNavigate } from 'react-router';

const navigate = useNavigate();
navigate('/dashboard');
navigate('/upload');
```

## API Integration (Future)

### Current State: Mock Data

The app currently uses simulated data. Here's how to integrate your backend:

#### 1. Upload & Prediction

**File**: `/src/app/pages/Upload.jsx`

Replace mock prediction (lines 44-109) with:

```javascript
const handleAnalyze = async () => {
  if (!selectedFile) return;
  setIsAnalyzing(true);
  
  try {
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    const response = await fetch('YOUR_BACKEND_URL/predict', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) throw new Error('Prediction failed');
    
    const result = await response.json();
    setResult(result);
  } catch (error) {
    console.error('Error:', error);
    alert('Analysis failed. Please try again.');
  } finally {
    setIsAnalyzing(false);
  }
};
```

#### 2. Authentication

**File**: `/src/app/context/AuthContext.jsx`

Update login function (lines 26-38):

```javascript
const login = async (email, password, role) => {
  try {
    const response = await fetch('YOUR_BACKEND_URL/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
```

#### 3. User Management

**File**: `/src/app/pages/Users.jsx`

Fetch users from backend:

```javascript
const [users, setUsers] = useState([]);

useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const response = await fetch('YOUR_BACKEND_URL/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
```

## Mock Data Structure

### Prediction Response
```javascript
{
  prediction: 'Mild',
  risk: 'Low',
  probabilities: {
    'No DR': 12.3,
    'Mild': 72.8,
    'Moderate': 12.4,
    'Severe': 2.5,
  },
  confidence: 72.8,
  suggestion: 'Monitor closely. Schedule follow-up in 6 months.'
}
```

### User Object
```javascript
{
  id: 'abc123',
  name: 'Dr. John Doe',
  email: 'john@example.com',
  role: 'doctor' // or 'patient', 'admin'
}
```

## Styling System

### Theme Colors

Defined in `/src/styles/theme.css`:

```css
--primary: #2C7BE5;
--background: #F4F7FB;
--card: #ffffff;
--destructive: #d4183d;
```

### Using Colors

```jsx
// Tailwind classes
<div className="bg-[#2C7BE5]">
<div className="text-primary">
<div className="bg-background">

// Risk level colors
Low: 'bg-green-100 text-green-800'
Medium: 'bg-yellow-100 text-yellow-800'
High: 'bg-red-100 text-red-800'
```

### Dark Mode

Toggle in Settings:

```javascript
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
```

## Charts & Analytics

Using Recharts library:

```javascript
import { BarChart, Bar, LineChart, Line, XAxis, YAxis } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="scans" fill="#2C7BE5" />
  </BarChart>
</ResponsiveContainer>
```

## UI Components

All UI components are in `/src/app/components/ui/`.

### Common Components

```jsx
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { Progress } from './components/ui/progress';
```

### Icons

Using Lucide React:

```jsx
import { Activity, Upload, Download, Eye, Users } from 'lucide-react';

<Activity className="h-5 w-5" />
```

## Responsive Design

### Breakpoints

```jsx
// Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Hiding on mobile
<div className="hidden lg:block">

// Mobile menu
<div className="lg:hidden">
```

### Sidebar

- Desktop: Always visible
- Mobile: Collapsible with hamburger menu
- Controlled by state in `DashboardSidebar.jsx`

## Common Tasks

### Add a New Page

1. Create page in `/src/app/pages/NewPage.jsx`
2. Import in `/src/app/routes.js`
3. Add route configuration
4. Add sidebar link in `DashboardSidebar.jsx`

### Add a New Dashboard Card

```jsx
<Card>
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Title</p>
        <p className="text-2xl font-semibold mt-1">Value</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-xl">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </CardContent>
</Card>
```

### Display Toast Notification

```jsx
import { toast } from 'sonner';

toast.success('Operation successful!');
toast.error('Something went wrong');
toast.info('Information message');
```

## Testing Guide

### Test Different Roles

1. Logout current user
2. Login with different role selection
3. Verify role-specific features:
   - **Doctor**: Patient list, upload for patients
   - **Patient**: Personal history only
   - **Admin**: User management tab visible

### Test Upload Flow

1. Go to Upload page
2. Drag & drop or browse image (PNG/JPG)
3. Click "Analyze Image"
4. Wait for results (2.5s simulation)
5. View prediction, risk, probabilities
6. Download report

### Test Dark Mode

1. Go to Settings
2. Toggle "Dark Mode" switch
3. Verify theme changes across pages
4. Toggle back to light mode

## Performance Tips

- Images are lazy loaded
- Dashboard data is cached in localStorage
- Charts use ResponsiveContainer for better performance
- Skeleton loaders improve perceived performance

## Security Notes

**Current Implementation (Demo):**
- Uses localStorage (not secure for production)
- No JWT validation
- No password hashing
- No HTTPS enforcement

**For Production:**
- Use httpOnly cookies for tokens
- Implement proper JWT validation
- Hash passwords on backend
- Use HTTPS only
- Add CSRF protection
- Implement rate limiting

## Troubleshooting

### Issue: Blank screen after login
**Solution**: Check browser console, clear localStorage, refresh

### Issue: Charts not displaying
**Solution**: Verify recharts is installed, check data format

### Issue: Dark mode not persisting
**Solution**: Add localStorage persistence in Settings

### Issue: Images not uploading
**Solution**: Check file type (PNG/JPG only), size limits

## File Upload Format

Supported formats:
- PNG (.png)
- JPEG (.jpg, .jpeg)

Size limit (recommended): < 10MB

## Next Steps

1. **Connect Backend**: Update API endpoints
2. **Add Validation**: Form validation with react-hook-form
3. **Add Tests**: Unit tests with Vitest
4. **Optimize**: Add loading states, error boundaries
5. **Deploy**: Build and deploy to production

## Resources

- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Radix UI: https://radix-ui.com
- Recharts: https://recharts.org
- Lucide Icons: https://lucide.dev

---

**Happy Coding! 🚀**
