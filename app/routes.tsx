import { createBrowserRouter } from "react-router";
import MarketingHome from "./pages/MarketingHome";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContractKYC from "./pages/student/ContractKYC";
import AdminContracts from "./pages/admin/AdminContracts";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import EntranceExam from "./pages/student/EntranceExam";
import CourseEnrollment from "./pages/student/CourseEnrollment";
import Modules from "./pages/student/Modules";
import Lectures from "./pages/student/Lectures";
import AITutor from "./pages/student/AITutor";
import MonthlyExams from "./pages/student/MonthlyExams";
import Performance from "./pages/student/Performance";
import Certificate from "./pages/student/Certificate";
import TradingSimulator from "./pages/student/TradingSimulator";
import Placement from "./pages/student/Placement";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherLectures from "./pages/teacher/TeacherLectures";
import DoubtSessions from "./pages/teacher/DoubtSessions";
import TeacherExams from "./pages/teacher/TeacherExams";
import TeacherReports from "./pages/teacher/TeacherReports";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminLectures from "./pages/admin/AdminLectures";
import AdminExams from "./pages/admin/AdminExams";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminAIChatbot from "./pages/admin/AdminAIChatbot";
import AdminSimulator from "./pages/admin/AdminSimulator";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNews from "./pages/admin/AdminNews";
import AdminRoles from "./pages/admin/AdminRoles";

// Distributor Pages
import DistributorDashboard from "./pages/distributor/DistributorDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingHome,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  // Student Routes
  {
    path: "/student/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/student/entrance-exam",
    Component: EntranceExam,
  },
  {
    path: "/student/courses",
    Component: CourseEnrollment,
  },
  {
    path: "/student/modules",
    Component: Modules,
  },
  {
    path: "/student/lectures",
    Component: Lectures,
  },
  {
    path: "/student/ai-tutor",
    Component: AITutor,
  },
  {
    path: "/student/exams",
    Component: MonthlyExams,
  },
  {
    path: "/student/performance",
    Component: Performance,
  },
  {
    path: "/student/certificate",
    Component: Certificate,
  },
  {
    path: "/student/simulator",
    Component: TradingSimulator,
  },
  {
    path: "/student/placement",
    Component: Placement,
  },
  {
    path: "/student/contract-kyc",
    Component: ContractKYC,
  },
  // Teacher Routes
  {
    path: "/teacher/dashboard",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/students",
    Component: TeacherStudents,
  },
  {
    path: "/teacher/lectures",
    Component: TeacherLectures,
  },
  {
    path: "/teacher/doubt-sessions",
    Component: DoubtSessions,
  },
  {
    path: "/teacher/exams",
    Component: TeacherExams,
  },
  {
    path: "/teacher/reports",
    Component: TeacherReports,
  },
  // Admin Routes
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/students",
    Component: AdminStudents,
  },
  {
    path: "/admin/courses",
    Component: AdminCourses,
  },
  {
    path: "/admin/lectures",
    Component: AdminLectures,
  },
  {
    path: "/admin/exams",
    Component: AdminExams,
  },
  {
    path: "/admin/payments",
    Component: AdminPayments,
  },
  {
    path: "/admin/news",
    Component: AdminNews,
  },
  {
    path: "/admin/roles",
    Component: AdminRoles,
  },
  {
    path: "/admin/ai-chatbot",
    Component: AdminAIChatbot,
  },
  {
    path: "/admin/simulator",
    Component: AdminSimulator,
  },
  {
    path: "/admin/reports",
    Component: AdminReports,
  },
  {
    path: "/admin/settings",
    Component: AdminSettings,
  },
  {
    path: "/admin/contracts",
    Component: AdminContracts,
  },
  // Distributor Routes
  {
    path: "/distributor/dashboard",
    Component: DistributorDashboard,
  },
]);