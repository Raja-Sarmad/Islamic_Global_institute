# Quran Academy Dashboard

A modern, responsive React Vite dashboard for the Quran Academy Learning Management System.

## Features

✨ **Modern Dashboard UI**
- Clean and professional design with color scheme: #1C8E5A, #FFD050, Black, White
- Fully responsive for all devices (mobile, tablet, desktop)
- Smooth animations and transitions using Framer Motion

📊 **Advanced Analytics**
- Real-time attendance tracking
- Performance distribution charts
- Attendance trend analysis
- Progress visualization using Recharts

🔐 **Secure Authentication**
- JWT token-based authentication
- Automatic token expiration and logout
- Token refresh mechanism
- Protected routes with verification

📱 **Responsive Layout**
- 25% sidebar width, 75% main content area
- Toggle sidebar for mobile devices
- Mobile-optimized navigation
- Touch-friendly interface

📈 **Data Management**
- Redux Toolkit for state management
- Axios for API integration
- Real-time data fetching
- Efficient caching and update strategies

## Project Structure

```
dashboard/
├── src/
│   ├── components/       # React components
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── charts/
│   │       ├── AttendanceChart.jsx
│   │       └── ProgressChart.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Overview.jsx
│   │   ├── Analytics.jsx
│   │   ├── Progress.jsx
│   │   ├── Attendance.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── store/            # Redux store
│   │   └── store.js
│   ├── context/          # React context
│   │   └── AuthContext.jsx
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Steps

1. **Navigate to dashboard directory:**
```bash
cd dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
Create `.env` file (optional):
```
VITE_API_URL=http://localhost:8000/api/v1
```

4. **Start development server:**
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Available Routes

### Public Routes
- `/login` - Login page

### Protected Routes (Require Authentication)
- `/dashboard` - Overview/Home dashboard
- `/dashboard/analytics` - Analytics and charts
- `/dashboard/progress` - Learning progress tracking
- `/dashboard/attendance` - Attendance management
- `/dashboard/reports` - Reports and downloads
- `/dashboard/settings` - Account settings

## Authentication

### Login Flow
1. User enters email and password on login page
2. Backend validates credentials and returns tokens
3. Tokens stored in localStorage
4. User redirected to dashboard
5. Token validity checked automatically
6. Expired tokens automatically trigger logout

### Token Management
- **Access Token**: Short-lived JWT (1 day)
- **Refresh Token**: Long-lived JWT (10 days)
- Automatic refresh when token expires
- Automatic logout on refresh failure

## Dashboard Pages

### Overview
Main dashboard showing:
- Welcome message and profile info
- Key statistics (total classes, attendance %, trial status)
- Attendance and performance charts
- Recent activity timeline

### Analytics
Detailed analytics with:
- Attendance trend visualization
- Cumulative progress tracking
- Time range filtering
- Historical data analysis

### Progress
Learning progress tracking:
- Performance distribution
- Detailed progress records
- Performance metrics breakdown
- Individual class performance

### Attendance
Attendance management:
- Attendance statistics
- Status visualization
- Attendance history timeline
- Quick status overview

### Reports
Downloadable reports:
- Progress report generation
- Performance summary
- Attendance records export
- Detailed report tables

### Settings
Account management:
- Profile information
- Notification preferences
- Privacy and security settings
- Logout functionality

## Color Scheme

- **Primary**: #1C8E5A (Green)
- **Accent**: #FFD050 (Yellow/Gold)
- **Dark**: #000000 (Black)
- **Light**: #FFFFFF (White)
- **Gray shades**: Various gray tones for UI

## Libraries Used

- **React 18.3.1** - UI library
- **React Router DOM 6.27** - Client-side routing
- **Redux Toolkit 1.9.7** - State management
- **Axios 1.7.7** - HTTP client
- **Recharts 2.12.7** - Charts and graphs
- **Lucide React 0.408** - Icons
- **Framer Motion 11.0.3** - Animations
- **Tailwind CSS 3.4.1** - Styling
- **Vite 5.0.8** - Build tool

## API Integration

### Backend Requirements

The dashboard expects the following API endpoints:

#### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-otp` - OTP verification
- `POST /api/v1/auth/refresh-token` - Refresh access token

#### User
- `GET /api/v1/user/dashboard` - Get dashboard data

#### Admin (if applicable)
- `GET /api/v1/admin/analytics` - Get admin analytics
- `GET /api/v1/admin/users` - Get all users

## Responsive Design

- **Mobile** (< 768px): Single column, collapsible sidebar
- **Tablet** (768px - 1024px): Adaptive layout
- **Desktop** (> 1024px): Full layout with 25/75 sidebar split

## Performance Optimizations

- Code splitting with React Router
- Lazy component loading
- Efficient state management
- Image optimization
- CSS purging with Tailwind

## Security Features

- HTTPOnly cookies for token storage
- CSRF protection ready
- Secure API communication
- Password input masking
- Session management
- Automatic logout on token expiration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### API Connection Issues
1. Verify backend is running on `http://localhost:8000`
2. Check CORS configuration in backend
3. Verify API endpoints match backend routes

### Authentication Issues
1. Check localStorage for tokens
2. Verify token format and expiry
3. Check backend token generation

### Styling Issues
1. Clear browser cache
2. Rebuild Tailwind: `npm run build`
3. Restart dev server

## Future Enhancements

- Dark mode toggle
- Multi-language support
- Export to PDF functionality
- Advanced filtering options
- Real-time notifications
- Performance optimization improvements
- Mobile app version

## Support

For issues or questions, contact the development team or check the project documentation.

## License

ISC License - See LICENSE file for details
