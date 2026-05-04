import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import logo from "../../imports/fintrade_logo.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in production this would validate credentials
    navigate("/student/dashboard");
  };

  const handleDemoAccess = (role: "student" | "teacher" | "admin") => {
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #121212 0%, #2d2d2d 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E53935] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E53935] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:block text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-[#E53935] transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="mb-8">
            <img src={logo} alt="FinTrade" className="h-16 mb-6" />
            <p className="text-gray-300">Professional Trading Education Platform</p>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Access your personalized dashboard to continue your trading education journey. Track your
            progress, attend live lectures, and practice on our advanced simulator.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E53935' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Real-time market simulations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E53935' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Expert mentor support</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E53935' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>AI-powered learning assistance</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 bg-white shadow-2xl border-none">
          <div className="lg:hidden mb-6">
            <Link to="/" className="inline-flex items-center gap-2 hover:text-[#E53935] transition-colors" style={{ color: '#121212' }}>
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ color: '#121212' }}>Login to Your Account</h2>
          <p className="text-gray-600 mb-8">Enter your credentials to access your dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="rahul.sharma@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-gray-50 border-gray-300 focus:border-[#E53935] focus:ring-[#E53935]"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border-gray-300 focus:border-[#E53935] focus:ring-[#E53935] pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm hover:underline" style={{ color: '#E53935' }}>
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full text-white shadow-lg"
              style={{ background: '#E53935', boxShadow: '0 0 20px rgba(229, 57, 53, 0.3)' }}
              size="lg"
            >
              Login
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or try demo access</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleDemoAccess("student")}
              variant="outline"
              className="w-full border-2 border-gray-200 hover:border-[#E53935] hover:bg-red-50"
              style={{ color: '#121212' }}
            >
              View Student Dashboard
            </Button>
            <Button
              onClick={() => handleDemoAccess("teacher")}
              variant="outline"
              className="w-full border-2 border-gray-200 hover:border-[#E53935] hover:bg-red-50"
              style={{ color: '#121212' }}
            >
              View Teacher Dashboard
            </Button>
            <Button
              onClick={() => handleDemoAccess("admin")}
              variant="outline"
              className="w-full border-2 border-gray-200 hover:border-[#E53935] hover:bg-red-50"
              style={{ color: '#121212' }}
            >
              View Admin Dashboard
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/student/entrance-exam" className="hover:underline" style={{ color: '#E53935' }}>
                Take Entrance Exam
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}