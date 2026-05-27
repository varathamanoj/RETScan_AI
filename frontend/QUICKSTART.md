# RETScan AI - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Open the Application
The app should be running and ready to use!

### Step 2: Login or Register
Choose one of the following options:

#### Option A: Use the Landing Page
1. You'll see the beautiful landing page
2. Click **"Get Started"** or **"Create Account"**

#### Option B: Go Directly to Login
1. Navigate to `/login`
2. Use any email (e.g., `doctor@example.com`)
3. Use any password (e.g., `password123`)
4. Select your role:
   - **Doctor** - For healthcare professionals
   - **Patient** - For individual users
   - **Admin** - For system administrators
5. Click **Login**

### Step 3: Explore!
You'll be redirected to your role-based dashboard.

---

## 🎯 What to Try First

### As a Doctor 👨‍⚕️

1. **View Your Dashboard**
   - See patient statistics
   - Check high-risk cases
   - View recent scans

2. **Upload a Retinal Image**
   - Click "Upload New Scan" or go to Upload page
   - Drag & drop any retinal image (PNG/JPG)
   - Click "Analyze Image"
   - Wait 2-3 seconds for AI analysis
   - View comprehensive results

3. **Check Patient History**
   - Go to "History" in sidebar
   - View all patient scans
   - Click "View" for details
   - Download reports

4. **View Analytics**
   - Go to "Reports" page
   - See monthly trends
   - View diagnosis distribution
   - Download detailed reports

### As a Patient 👤

1. **View Your Health Dashboard**
   - See your total scans
   - Check your current risk level
   - View latest scan result

2. **Upload Your Scan**
   - Click "Upload New Scan"
   - Upload retinal image
   - Get instant AI analysis
   - View your diagnosis

3. **Track Your Progress**
   - Go to "History" page
   - View all your scans
   - Monitor changes over time

4. **Read Health Tips**
   - Check dashboard for health recommendations
   - Follow medical advice

### As an Admin 🛠️

1. **View System Overview**
   - See total users, doctors, patients
   - Check total predictions
   - View growth metrics

2. **Manage Users**
   - Click "User Management" in sidebar
   - Search for specific users
   - Filter by role
   - View user details

3. **Monitor Analytics**
   - Check monthly activity charts
   - View diagnosis distribution
   - Monitor system performance

4. **System Stats**
   - Average scans per day
   - System uptime
   - AI accuracy metrics

---

## 📱 Testing Different Roles

Want to see how the app looks for different users?

1. Click **Logout** in the sidebar
2. Go back to Login page
3. Select a different role
4. Login again
5. Explore the new dashboard!

**Try all three roles to see the complete system!**

---

## 🎨 Try Dark Mode

1. Go to **Settings** (in sidebar)
2. Scroll to **Appearance** section
3. Toggle **Dark Mode** switch
4. Watch the entire app transform!
5. Navigate to different pages to see dark theme everywhere

---

## 📤 Upload & Analyze Flow

**Complete walkthrough:**

1. **Go to Upload page** (sidebar or dashboard button)

2. **Upload an image** (two ways):
   - **Drag & Drop**: Drag any PNG/JPG image into the dashed box
   - **Browse**: Click "Browse Files" and select from your computer

3. **Preview your image**
   - Image appears with preview
   - Remove button available if you want to change

4. **Analyze**
   - Click "Analyze Image" button
   - See loading spinner and "Analyzing..." message
   - Wait ~2-3 seconds

5. **View Results**
   - See AI prediction (No DR / Mild / Moderate / Severe)
   - Check confidence score
   - View risk level (color-coded badge)
   - See probability distribution bars
   - Read medical recommendations

6. **Download Report**
   - Click "Download Report" button
   - PDF report would be generated (simulated)

---

## 🗺️ Navigation Guide

### Sidebar Menu (All Roles)
- **Dashboard** - Main overview page
- **Upload Image** - Upload and analyze scans
- **History** - View all scan records
- **Reports** - Analytics and downloadable reports
- **Settings** - Account preferences and dark mode

### Additional Menu (Admin Only)
- **User Management** - Manage platform users

### Bottom Menu
- **Logout** - Sign out of the application

---

## 💡 Pro Tips

### 1. Mobile Experience
- Open the app on your phone
- Click the hamburger menu (☰) in top-left
- Navigate through pages
- See the responsive design in action!

### 2. Charts & Analytics
- Go to Admin Dashboard (login as admin)
- Scroll down to see beautiful charts
- Check the Reports page for more analytics

### 3. Sample Test Data
The app includes realistic mock data:
- **Patients**: John Smith, Sarah Johnson, Michael Brown, Emily Davis
- **Scans**: Multiple scan records with various diagnoses
- **Dates**: Recent dates (within last 30 days)
- **Predictions**: All 4 severity levels represented

### 4. Keyboard Navigation
- Tab through forms
- Enter to submit
- Escape to close modals
- Fully keyboard accessible!

---

## 🎭 Demo Scenarios

### Scenario 1: Doctor's Morning Routine
```
1. Login as Doctor
2. Check dashboard for high-risk cases (7 cases shown)
3. View recent patient scans in table
4. Click "Upload New Scan" for a patient
5. Upload and analyze image
6. View result and download report
7. Go to History to review past cases
```

### Scenario 2: Patient Health Check
```
1. Login as Patient
2. View personal dashboard statistics
3. See latest scan result
4. Read health tips
5. Upload new retinal scan
6. View AI analysis results
7. Download personal report
```

### Scenario 3: Admin System Review
```
1. Login as Admin
2. Review system statistics (users, predictions)
3. Check monthly activity charts
4. View diagnosis distribution
5. Go to User Management
6. Search for specific user
7. Filter by role (doctors/patients)
8. Review system performance metrics
```

---

## 📊 Understanding Results

### Diagnosis Levels
- **No Diabetic Retinopathy** - Healthy retina ✅
- **Mild** - Early stage, monitor closely 👁️
- **Moderate** - Requires medical attention ⚠️
- **Severe** - Immediate consultation needed 🚨

### Risk Levels
- **Low Risk** 🟢 - Routine monitoring
- **Medium Risk** 🟡 - Consult specialist soon
- **High Risk** 🔴 - Urgent medical attention

### Probability Bars
- Each bar shows likelihood of each severity level
- Colors match severity (green = no DR, red = severe)
- Percentages add up to ~100%

---

## 🔧 Troubleshooting

### Q: I can't see the charts
**A:** Charts appear on Reports page and Admin Dashboard. Make sure you're logged in as Admin to see all charts.

### Q: Can I upload any image?
**A:** Only PNG and JPG formats are supported. The app validates file type on upload.

### Q: How do I test different predictions?
**A:** Each time you analyze an image, the app randomly selects one of 4 mock results (No DR, Mild, Moderate, Severe). Try uploading multiple times!

### Q: Where are my uploads stored?
**A:** Currently, this is a frontend-only demo. Uploads are not stored. When you connect the backend, they'll be saved to your server.

### Q: Why does it take 2-3 seconds to analyze?
**A:** This simulates the real AI processing time. In production, this would be the actual time for your AI model to process the image.

---

## 🎯 Next Steps

### For Developers
1. Read the **DEVELOPER_GUIDE.md** for technical details
2. Review the **README.md** for architecture overview
3. Check **FEATURES.md** for complete feature list
4. Start integrating your backend API

### For Users
1. Explore all pages and features
2. Try all three user roles
3. Test on different devices (mobile, tablet, desktop)
4. Toggle dark mode
5. Upload different images
6. View all analytics and charts

---

## 📞 Getting Help

### Documentation Files
- **README.md** - Project overview and architecture
- **DEVELOPER_GUIDE.md** - Technical implementation guide
- **FEATURES.md** - Complete feature list
- **QUICKSTART.md** - This file!

### Explore the Code
All components are well-organized in `/src/app/`:
- `/pages` - All main pages
- `/components` - Reusable UI components
- `/context` - Authentication context
- `/routes.js` - Navigation configuration

---

## ✅ Checklist: Things to Try

- [ ] Login as all three roles (Doctor, Patient, Admin)
- [ ] Upload at least one retinal image
- [ ] View analysis results with probabilities
- [ ] Check History page
- [ ] View Reports and analytics
- [ ] Try User Management (as Admin)
- [ ] Toggle Dark Mode
- [ ] Test on mobile device
- [ ] Download a report
- [ ] Update Settings
- [ ] Navigate all sidebar menu items
- [ ] View all dashboard statistics
- [ ] Check charts and graphs
- [ ] Test responsive sidebar (collapse/expand)

---

## 🎉 You're Ready!

**RETScan AI** is a complete, professional, hospital-grade AI diagnostic platform.

Start exploring, testing, and when you're ready - connect your backend API to make it fully functional!

**Enjoy! 🚀**
