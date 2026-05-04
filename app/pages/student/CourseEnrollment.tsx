import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Home,
  BookOpen,
  Video,
  MessageSquare,
  FileText,
  BarChart3,
  Award,
  TrendingUp,
  GraduationCap,
  CheckCircle,
  Clock,
  Users,
  Star,
  IndianRupee,
  Tag,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <Home size={20} /> },
  { label: "Courses", path: "/student/courses", icon: <BookOpen size={20} /> },
  { label: "Modules", path: "/student/modules", icon: <GraduationCap size={20} /> },
  { label: "Lectures", path: "/student/lectures", icon: <Video size={20} /> },
  { label: "AI Tutor", path: "/student/ai-tutor", icon: <MessageSquare size={20} /> },
  { label: "Exams", path: "/student/exams", icon: <FileText size={20} /> },
  { label: "Performance", path: "/student/performance", icon: <BarChart3 size={20} /> },
  { label: "Certificate", path: "/student/certificate", icon: <Award size={20} /> },
  { label: "Simulator", path: "/student/simulator", icon: <TrendingUp size={20} /> },
  { label: "Placement", path: "/student/placement", icon: <Award size={20} /> },
];

const courses = [
  {
    id: 1,
    title: "Basic Trading Fundamentals",
    level: "Beginner",
    duration: "8 weeks",
    modules: 5,
    students: 1240,
    rating: 4.8,
    price: 25000,
    description: "Master the fundamentals of stock market trading, technical analysis, and risk management.",
    features: [
      "Introduction to Stock Markets",
      "Chart Reading Basics",
      "Technical Indicators",
      "Risk Management",
      "Trading Psychology",
    ],
  },
  {
    id: 2,
    title: "Intermediate Trading Strategies",
    level: "Intermediate",
    duration: "10 weeks",
    modules: 7,
    students: 856,
    rating: 4.9,
    price: 25000,
    description: "Advanced chart patterns, trading strategies, and portfolio management techniques.",
    features: [
      "Advanced Chart Patterns",
      "Multi-Timeframe Analysis",
      "Options Trading Basics",
      "Portfolio Management",
      "Strategy Backtesting",
    ],
  },
  {
    id: 3,
    title: "Advanced Technical Analysis",
    level: "Advanced",
    duration: "12 weeks",
    modules: 9,
    students: 624,
    rating: 4.9,
    price: 25000,
    description: "Deep dive into advanced technical analysis, algorithmic trading, and quantitative methods.",
    features: [
      "Algorithmic Trading",
      "Quantitative Analysis",
      "Advanced Options Strategies",
      "Market Microstructure",
      "Professional Risk Management",
    ],
  },
  {
    id: 4,
    title: "Master Trader Program",
    level: "Expert",
    duration: "16 weeks",
    modules: 12,
    students: 342,
    rating: 5.0,
    price: 25000,
    description: "Complete professional trader program with live trading mentorship and placement support.",
    features: [
      "Live Trading Sessions",
      "One-on-One Mentorship",
      "Proprietary Trading Techniques",
      "Institutional Trading Strategies",
      "Guaranteed Placement Support",
    ],
  },
];

export default function CourseEnrollment() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const applyCoupon = () => {
    const validCoupons: Record<string, number> = {
      FIRST10: 10,
      SAVE20: 20,
      EARLY25: 25,
    };
    const discountPercent = validCoupons[couponCode.toUpperCase()];
    if (discountPercent) {
      setDiscount(discountPercent);
    } else {
      alert("Invalid coupon code");
    }
  };

  const handleEnroll = (courseId: number) => {
    setSelectedCourse(courseId);
    setShowPayment(true);
  };

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);
  const finalPrice = selectedCourseData
    ? selectedCourseData.price - (selectedCourseData.price * discount) / 100
    : 0;

  return (
    <DashboardLayout navItems={navItems} userRole="student" userName="Rahul Sharma">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Available Courses</h1>
        <p className="text-[#0B2A5B]/70">Choose your learning path and start your trading journey</p>
      </div>

      {!showPayment ? (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge
                    className={`mb-2 ${
                      course.level === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : course.level === "Intermediate"
                        ? "bg-blue-100 text-blue-700"
                        : course.level === "Advanced"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-[#C2A86A] text-[#0B2A5B]"
                    }`}
                  >
                    {course.level}
                  </Badge>
                  <h3 className="text-xl font-semibold text-[#0B2A5B] mb-2">{course.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span className="text-sm font-semibold text-[#0B2A5B]">{course.rating}</span>
                </div>
              </div>

              <p className="text-[#0B2A5B]/70 mb-4">{course.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-[#0B2A5B]/10">
                <div className="text-center">
                  <Clock className="text-[#C2A86A] mx-auto mb-1" size={20} />
                  <p className="text-xs text-[#0B2A5B]/60">Duration</p>
                  <p className="text-sm font-semibold text-[#0B2A5B]">{course.duration}</p>
                </div>
                <div className="text-center">
                  <BookOpen className="text-[#C2A86A] mx-auto mb-1" size={20} />
                  <p className="text-xs text-[#0B2A5B]/60">Modules</p>
                  <p className="text-sm font-semibold text-[#0B2A5B]">{course.modules}</p>
                </div>
                <div className="text-center">
                  <Users className="text-[#C2A86A] mx-auto mb-1" size={20} />
                  <p className="text-xs text-[#0B2A5B]/60">Students</p>
                  <p className="text-sm font-semibold text-[#0B2A5B]">{course.students}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-[#0B2A5B] mb-2">What You'll Learn:</p>
                <ul className="space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#0B2A5B]/80">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#0B2A5B]/10">
                <div>
                  <p className="text-sm text-[#0B2A5B]/60">Course Fee</p>
                  <p className="text-2xl font-bold text-[#0B2A5B] flex items-center gap-1">
                    <IndianRupee size={20} />
                    {course.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <Button
                  onClick={() => handleEnroll(course.id)}
                  className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a] shadow-lg shadow-[#0B2A5B]/20"
                >
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-2xl mx-auto p-8 bg-white shadow-xl">
          <h2 className="text-2xl font-bold text-[#0B2A5B] mb-6">Complete Your Enrollment</h2>

          <div className="bg-[#F4F1EA] rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-[#0B2A5B] mb-2">{selectedCourseData?.title}</h3>
            <p className="text-sm text-[#0B2A5B]/70 mb-4">{selectedCourseData?.description}</p>
            <div className="flex items-center gap-4 text-sm text-[#0B2A5B]/60">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {selectedCourseData?.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={14} />
                {selectedCourseData?.modules} Modules
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-[#0B2A5B] mb-2 block">
                Have a Coupon Code?
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
                <Button
                  onClick={applyCoupon}
                  variant="outline"
                  className="border-[#0B2A5B]/20 text-[#0B2A5B]"
                >
                  <Tag size={16} className="mr-2" />
                  Apply
                </Button>
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {discount}% discount applied successfully!
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#F4F1EA] rounded-lg p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between text-[#0B2A5B]">
                <span>Course Fee</span>
                <span className="font-semibold">₹{selectedCourseData?.price.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span className="font-semibold">
                    -₹{((selectedCourseData?.price || 0) * discount / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="border-t border-[#0B2A5B]/10 pt-3 flex justify-between text-[#0B2A5B]">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-[#C2A86A]">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#0B2A5B]">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 border-2 border-[#C2A86A] bg-[#C2A86A]/10 rounded-lg font-semibold text-[#0B2A5B] hover:bg-[#C2A86A]/20 transition-colors">
                UPI
              </button>
              <button className="p-4 border-2 border-[#0B2A5B]/20 rounded-lg font-semibold text-[#0B2A5B] hover:bg-[#F4F1EA] transition-colors">
                Card
              </button>
              <button className="p-4 border-2 border-[#0B2A5B]/20 rounded-lg font-semibold text-[#0B2A5B] hover:bg-[#F4F1EA] transition-colors">
                NetBanking
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              onClick={() => {
                alert("Payment successful! Welcome to the course.");
                window.location.href = "/student/modules";
              }}
              className="flex-1 bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a] shadow-lg shadow-[#0B2A5B]/20"
              size="lg"
            >
              Pay ₹{finalPrice.toLocaleString("en-IN")}
            </Button>
            <Button
              onClick={() => setShowPayment(false)}
              variant="outline"
              className="border-2 border-[#0B2A5B]/20 text-[#0B2A5B]"
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}
