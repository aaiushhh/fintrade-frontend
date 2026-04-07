import React from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { EntranceExamPayment } from "./pages/EntranceExamPayment";
import { ExamInterface } from "./pages/ExamInterface";
import { CourseEnrollment } from "./pages/CourseEnrollment";
import { StudentDashboard } from "./pages/StudentDashboard";
import { CourseModules } from "./pages/CourseModules";
import { LecturePage } from "./pages/LecturePage";
import { AITutor } from "./pages/AITutor";
import { MonthlyExams } from "./pages/MonthlyExams";
import { PerformanceAnalytics } from "./pages/PerformanceAnalytics";
import { Certificate } from "./pages/Certificate";
import { TradingSimulator } from "./pages/TradingSimulator";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { TeacherStudents } from "./pages/TeacherStudents";
import { TeacherLectures } from "./pages/TeacherLectures";
import { TeacherDoubtSessions } from "./pages/TeacherDoubtSessions";
import { TeacherExams } from "./pages/TeacherExams";
import { TeacherReports } from "./pages/TeacherReports";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminStudents } from "./pages/AdminStudents";
import { AdminCourseManagement } from "./pages/AdminCourseManagement";
import { AdminExams } from "./pages/AdminExams";
import { AdminOffers } from "./pages/AdminOffers";
import { AdminDistributors } from "./pages/AdminDistributors";
import { DistributorDashboard } from "./pages/DistributorDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StudentLayout } from "./components/StudentLayout";
import { TeacherLayout } from "./components/TeacherLayout";
import { AdminLayout } from "./components/AdminLayout";
import { DistributorLayout } from "./components/DistributorLayout";

export const router = createBrowserRouter([
  {
    // Root layout provides AuthProvider inside the router tree.
    element: React.createElement(RootLayout),
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignupPage,
      },
      {
        // Protected routes for all authenticated users
        element: React.createElement(ProtectedRoute),
        children: [
          { path: "/entrance-exam-payment", Component: EntranceExamPayment },
          { path: "/exam", Component: ExamInterface },
          { path: "/courses", Component: CourseEnrollment },
          {
            // Student pages with shared sidebar layout
            element: React.createElement(StudentLayout),
            children: [
              { path: "/student/dashboard", Component: StudentDashboard },
              { path: "/student/modules", Component: CourseModules },
              { path: "/student/lecture", Component: LecturePage },
              { path: "/student/ai-tutor", Component: AITutor },
              { path: "/student/exams", Component: MonthlyExams },
              { path: "/student/exam/:examId", Component: ExamInterface },
              { path: "/student/performance", Component: PerformanceAnalytics },
              { path: "/student/certificate", Component: Certificate },
              { path: "/student/simulator", Component: TradingSimulator },
            ],
          },
        ],
      },
      {
        // Faculty / admin routes with shared teacher sidebar layout
        element: React.createElement(ProtectedRoute, { allowedRoles: ['faculty', 'admin'] }),
        children: [
          {
            element: React.createElement(TeacherLayout),
            children: [
              { path: "/teacher/dashboard", Component: TeacherDashboard },
              { path: "/teacher/students", Component: TeacherStudents },
              { path: "/teacher/lectures", Component: TeacherLectures },
              { path: "/teacher/doubt-sessions", Component: TeacherDoubtSessions },
              { path: "/teacher/exams", Component: TeacherExams },
              { path: "/teacher/reports", Component: TeacherReports },
            ],
          },
        ],
      },
      {
        element: React.createElement(ProtectedRoute, { allowedRoles: ['admin'] }),
        children: [
          {
            element: React.createElement(AdminLayout),
            children: [
              { path: "/admin/dashboard", Component: AdminDashboard },
              { path: "/admin/students", Component: AdminStudents },
              { path: "/admin/courses", Component: AdminCourseManagement },
              { path: "/admin/exams", Component: AdminExams },
              { path: "/admin/offers", Component: AdminOffers },
              { path: "/admin/distributors", Component: AdminDistributors },
            ],
          },
        ],
      },
      {
        element: React.createElement(ProtectedRoute, { allowedRoles: ['distributor'] }),
        children: [
          {
            element: React.createElement(DistributorLayout),
            children: [
              { path: "/distributor/dashboard", Component: DistributorDashboard },
            ],
          },
        ],
      },
    ],
  },
]);