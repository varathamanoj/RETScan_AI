# RETScan AI - Diabetic Retinopathy Detection System

A modern, professional AI-powered healthcare web application for diabetic retinopathy detection. Built with React, Tailwind CSS, and designed for Doctors, Patients, and Admins.

## 🎯 Overview

RETScan AI is a hospital-grade AI diagnostic platform that enables:
- **Doctors**: Upload and analyze patient retinal images, view predictions, and manage patient history
- **Patients**: Upload their own retinal images, view diagnosis results, and track health progress
- **Admins**: Manage users, view system analytics, and monitor platform activity

## 🚀 Features

### Authentication
- ✅ Role-based login (Doctor/Patient/Admin)
- ✅ User registration with role selection
- ✅ Protected routes and authentication flow
- ✅ Persistent sessions with localStorage

### Role-Based Dashboards

#### Doctor Dashboard
- Patient management overview
- Upload and analyze retinal images
- View prediction results with confidence scores
- Access patient history
- Track high-risk cases
- Generate reports

#### Patient Dashboard
- Personal health tracking
- Upload retinal scans
- View diagnosis results
- Access scan history
- Download health reports
- Health tips and recommendations

#### Admin Dashboard
- System analytics and metrics
- User management (Doctors & Patients)
- Platform activity monitoring
- Diagnosis distribution charts
- Monthly activity trends
- System performance stats

### Core Features
- 🖼️ **Image Upload**: Drag-and-drop retinal image upload (PNG/JPG)
- 🧠 **AI Analysis**: Simulated AI predictions with confidence scores
- 📊 **Results Display**: 
  - Prediction (No DR, Mild, Moderate, Severe)
  - Risk level indicators (Low/Medium/High)
  - Probability distribution with visual bars
  - Medical recommendations
- 📁 **History Tracking**: Complete scan history with filtering
- 📄 **Reports**: Download PDF reports, view analytics charts
- 👥 **User Management**: Admin panel for managing platform users
- ⚙️ **Settings**: Profile management, notifications, dark mode toggle
- 🌙 **Dark Mode**: Full dark theme support

## 🏗️ Architecture

```
User (Doctor / Patient / Admin)
        ↓
    Frontend (React UI)
        ↓
    Authentication Layer
        ↓
    Dashboard (Role-Based)
        ↓
    Image Upload
        ↓
    Backend API (Already Built)
        ↓
    AI Models (RETFound + XGBoost)
        ↓
    Response → Frontend Display
```

## 📁 Project Structure

```
/src
  /app
    /components
      /dashboards
        - AdminDashboard.jsx
        - DoctorDashboard.jsx
        - PatientDashboard.jsx
      /ui (Reusable UI components)
      - DashboardLayout.jsx
      - DashboardSidebar.jsx
      - ResultCard.jsx
    /context
      - AuthContext.jsx
    /pages
      - Login.jsx
      - Register.jsx
      - Dashboard.jsx
      - Upload.jsx
      - History.jsx
      - Reports.jsx
      - Users.jsx (Admin only)
      - Settings.jsx
    - App.tsx
    - routes.js
  /styles
    - theme.css
    - index.css
    - tailwind.css
```

## 🎨 Design System

### Colors
- **Primary**: `#2C7BE5` (Blue)
- **Background**: `#F4F7FB` (Light Grey)
- **Success**: Green (`#10b981`)
- **Warning**: Yellow/Orange (`#f59e0b`)
- **Danger**: Red (`#ef4444`)

### Typography
- Font: System fonts (Inter/Roboto style)
- Clean, readable hierarchy
- Consistent spacing

### Components
- Card-based layouts
- Rounded corners (large radius)
- Soft shadows
- Clean spacing and alignment
- Responsive design

## 🔐 Authentication

The app uses a simulated authentication system with localStorage:

1. User logs in with email, password, and role
2. User data is stored in localStorage
3. JWT token is simulated
4. Protected routes check for authentication
5. Role-based dashboard rendering

### Demo Login
You can use any email/password combination with the role selector to access the system.

## 📱 Responsive Design

- **Desktop-first**: Optimized for clinical workstations
- **Tablet-friendly**: Sidebar collapses with mobile menu
- **Mobile responsive**: Stack layout on smaller screens

## 🔮 Future Features Support

The UI is designed to support:
- AI explanations and interpretability
- Heatmaps on retinal images
- Predictive analytics dashboards
- Chatbot medical assistant
- Multi-language support
- Telemedicine integration

## 🛠️ Tech Stack

- **React** (Vite)
- **React Router** (Data mode)
- **Tailwind CSS v4**
- **Lucide React** (Icons)
- **Recharts** (Charts & Analytics)
- **Radix UI** (Accessible components)
- **Sonner** (Toast notifications)

## 📊 Mock Data & API Integration

Currently, the app uses mock data for demonstrations:

- User authentication (simulated)
- AI predictions (randomized realistic results)
- Patient data (sample records)
- Analytics (mock statistics)

**To connect to your backend:**

1. Update API endpoints in relevant pages
2. Replace mock predictions in `Upload.jsx` with real API calls
3. Connect authentication to your backend in `AuthContext.jsx`
4. Update user management in `Users.jsx`

Example API integration in Upload.jsx:
```javascript
const formData = new FormData();
formData.append('file', selectedFile);

const response = await fetch('YOUR_BACKEND_URL/predict', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: formData
});

const result = await response.json();
setResult(result);
```

## 🎯 Key Pages

### 1. Login (`/login`)
- Email, password, and role selection
- Forgot password option
- Register link

### 2. Register (`/register`)
- Full name, email, password
- Role selection with admin warning

### 3. Dashboard (`/dashboard`)
- Role-based dashboard display
- Quick stats and metrics
- Recent activity
- Quick actions

### 4. Upload (`/upload`)
- Drag-and-drop image upload
- Image preview
- AI analysis with loading state
- Results display with probabilities

### 5. History (`/history`)
- Scan history table
- Date, diagnosis, risk level
- View details and download reports

### 6. Reports (`/reports`)
- Analytics charts
- Monthly trends
- Downloadable PDF reports

### 7. Users (`/users`) - Admin Only
- User management table
- Search and filter
- Add/Edit/Delete users
- Role and status management

### 8. Settings (`/settings`)
- Profile information
- Notification preferences
- Dark mode toggle
- Password change

## 🚦 Getting Started

The application is ready to run. Simply:

1. Start the development server
2. Navigate to the login page
3. Choose a role and log in
4. Explore the role-based features

## 📝 Notes

- **Frontend Only**: This is a UI implementation. Backend API calls are simulated.
- **Mock Data**: All predictions and data are randomly generated for demonstration.
- **Authentication**: Uses localStorage for session management (not production-ready).
- **Backend Integration**: Ready to connect to your existing Flask backend and AI models.

## 🎓 Use Cases

This application is suitable for:
- Healthcare AI demonstrations
- Medical imaging platforms
- Clinical decision support systems
- Telemedicine applications
- Research and academic projects
- Portfolio and interview presentations

## 📄 License

This is a demonstration project created for educational purposes.

---

**Built with modern web technologies for a professional healthcare AI platform experience.**
