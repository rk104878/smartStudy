import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

// Layout
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// Components
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import TeacherPortal from './pages/TeacherPortal';
import StudentPortal from './pages/StudentPortal';
import Contact from './pages/Contact';

// Auth Pages
import Auth from './pages/Auth';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherMaterials from './pages/TeacherMaterials';
import StudentDashboard from './pages/StudentDashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;
  return children;
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Pages with Navbar/Footer */}
        <Route path="/" element={<Layout><PageWrapper><Home /></PageWrapper></Layout>} />
        <Route path="/about" element={<Layout><PageWrapper><About /></PageWrapper></Layout>} />
        <Route path="/courses" element={<Layout><PageWrapper><Courses /></PageWrapper></Layout>} />
        <Route path="/teacher-portal" element={<Layout><PageWrapper><TeacherPortal /></PageWrapper></Layout>} />
        <Route path="/student-portal" element={<Layout><PageWrapper><StudentPortal /></PageWrapper></Layout>} />
        <Route path="/contact" element={<Layout><PageWrapper><Contact /></PageWrapper></Layout>} />
        
        {/* Auth & Dashboards */}
        <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
        <Route path="/register/student/:teacherId" element={<PageWrapper><Auth /></PageWrapper>} />
        
        <Route path="/teacher-dashboard" element={<ProtectedRoute allowedRole="teacher"><PageWrapper><TeacherDashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/teacher-materials" element={<ProtectedRoute allowedRole="teacher"><PageWrapper><TeacherMaterials /></PageWrapper></ProtectedRoute>} />
        
        <Route path="/student-dashboard" element={<ProtectedRoute allowedRole="student"><PageWrapper><StudentDashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/student-materials" element={<ProtectedRoute allowedRole="student"><PageWrapper><StudentDashboard /></PageWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
