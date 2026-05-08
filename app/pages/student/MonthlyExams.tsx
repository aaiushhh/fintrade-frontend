import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  IndianRupee,
} from "lucide-react";



const exams = [
  {
    id: 1,
    title: "Month 1 Assessment",
    month: "Month 1",
    status: "passed",
    score: 78,
    passingScore: 60,
    attempts: 1,
    maxAttempts: 3,
    date: "Mar 15, 2026",
    duration: "60 minutes",
    questions: 30,
  },
  {
    id: 2,
    title: "Month 2 Assessment",
    month: "Month 2",
    status: "passed",
    score: 85,
    passingScore: 60,
    attempts: 1,
    maxAttempts: 3,
    date: "Apr 8, 2026",
    duration: "60 minutes",
    questions: 30,
  },
  {
    id: 3,
    title: "Month 3 Assessment",
    month: "Month 3",
    status: "available",
    score: null,
    passingScore: 60,
    attempts: 0,
    maxAttempts: 3,
    date: "Apr 25, 2026",
    duration: "60 minutes",
    questions: 30,
  },
];

export default function MonthlyExams() {
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [showRetakePayment, setShowRetakePayment] = useState(false);

  const handleStartExam = (examId: number) => {
    alert(`Starting exam ${examId}. In production, this would navigate to the exam interface.`);
  };

  const handleRetakeExam = (examId: number) => {
    setSelectedExam(examId);
    setShowRetakePayment(true);
  };

  const processRetakePayment = () => {
    alert("Payment successful! You can now retake the exam.");
    setShowRetakePayment(false);
    setSelectedExam(null);
  };

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Monthly Exams</h1>
        <p className="text-[#0B2A5B]/70">Track your progress with monthly assessments</p>
      </div>

      {!showRetakePayment ? (
        <>
          {/* Overall Progress */}
          <Card className="p-6 bg-gradient-to-r from-[#0B2A5B] to-[#1a3d7a] text-[#F4F1EA] mb-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1">Exam Progress</h3>
                <p className="text-[#F4F1EA]/80">2 out of 3 exams completed</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#F4F1EA]/80">Average Score</p>
                <p className="text-4xl font-bold text-[#C2A86A]">81.5%</p>
              </div>
            </div>
            <Progress value={67} className="h-3" />
          </Card>

          {/* Exams List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className={`p-6 shadow-lg ${
                  exam.status === "passed"
                    ? "bg-green-50 border-green-200"
                    : exam.status === "failed"
                    ? "bg-red-50 border-red-200"
                    : "bg-white"
                }`}
              >
                <div className="mb-4">
                  <Badge
                    className={`mb-3 ${
                      exam.status === "passed"
                        ? "bg-green-600 text-white"
                        : exam.status === "failed"
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {exam.status === "passed"
                      ? "Passed"
                      : exam.status === "failed"
                      ? "Failed"
                      : "Available"}
                  </Badge>
                  <h3 className="text-xl font-semibold text-[#0B2A5B] mb-2">{exam.title}</h3>
                </div>

                {exam.status === "passed" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B2A5B]/70">Your Score</span>
                      <span className="text-2xl font-bold text-green-600">{exam.score}%</span>
                    </div>
                    <Progress value={exam.score || 0} className="h-2 mb-2" />
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      <span>Passed on attempt {exam.attempts}</span>
                    </div>
                  </div>
                )}

                {exam.status === "failed" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B2A5B]/70">Your Score</span>
                      <span className="text-2xl font-bold text-red-600">{exam.score}%</span>
                    </div>
                    <Progress value={exam.score || 0} className="h-2 mb-2" />
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <XCircle size={16} />
                      <span>Required: {exam.passingScore}%</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2 mb-4 pb-4 border-b border-[#0B2A5B]/10">
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Calendar size={14} className="text-[#C2A86A]" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Clock size={14} className="text-[#C2A86A]" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <FileText size={14} className="text-[#C2A86A]" />
                    <span>{exam.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <AlertCircle size={14} className="text-[#C2A86A]" />
                    <span>
                      Attempts: {exam.attempts}/{exam.maxAttempts}
                    </span>
                  </div>
                </div>

                {exam.status === "available" && (
                  <Button
                    onClick={() => handleStartExam(exam.id)}
                    className="w-full bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]"
                  >
                    Start Exam
                  </Button>
                )}

                {(exam.status === "passed" || exam.status === "failed") &&
                  exam.attempts < exam.maxAttempts && (
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleRetakeExam(exam.id)}
                        variant="outline"
                        className="w-full border-[#C2A86A] text-[#C2A86A] hover:bg-[#C2A86A]/10"
                      >
                        Retake Exam (₹300)
                      </Button>
                      {exam.status === "passed" && (
                        <p className="text-xs text-center text-[#0B2A5B]/60">
                          Improve your score
                        </p>
                      )}
                    </div>
                  )}

                {exam.attempts >= exam.maxAttempts && exam.status === "failed" && (
                  <div className="bg-red-100 p-3 rounded-lg">
                    <p className="text-sm text-red-700 text-center">
                      Maximum attempts reached. Contact support for assistance.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="p-6 bg-yellow-50 border-yellow-200 mt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Exam Guidelines</h3>
                <ul className="space-y-1 text-sm text-yellow-800">
                  <li>• Each exam must be completed within the specified duration</li>
                  <li>• Passing score is 60% for all exams</li>
                  <li>• You get 3 attempts per exam</li>
                  <li>• Retake fee: ₹300 per attempt (after first attempt)</li>
                  <li>• All 3 exams must be passed to receive your certificate</li>
                  <li>• Tab switching during exam will result in auto-submission</li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card className="max-w-2xl mx-auto p-8 bg-white shadow-xl">
          <h2 className="text-2xl font-bold text-[#0B2A5B] mb-6">Retake Exam Payment</h2>

          <div className="bg-[#F4F1EA] rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-[#0B2A5B] mb-2">
              {exams.find((e) => e.id === selectedExam)?.title}
            </h3>
            <p className="text-sm text-[#0B2A5B]/70 mb-4">
              Purchase an additional attempt to improve your score
            </p>
          </div>

          <div className="bg-[#F4F1EA] rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[#0B2A5B]">Retake Fee</span>
              <span className="text-3xl font-bold text-[#C2A86A] flex items-center gap-1">
                <IndianRupee size={24} />
                300
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-[#0B2A5B]">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 border-2 border-[#C2A86A] bg-[#C2A86A]/10 rounded-lg font-semibold text-[#0B2A5B]">
                UPI
              </button>
              <button className="p-4 border-2 border-[#0B2A5B]/20 rounded-lg font-semibold text-[#0B2A5B]">
                Card
              </button>
              <button className="p-4 border-2 border-[#0B2A5B]/20 rounded-lg font-semibold text-[#0B2A5B]">
                NetBanking
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={processRetakePayment}
              className="flex-1 bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]"
              size="lg"
            >
              Pay ₹300
            </Button>
            <Button
              onClick={() => setShowRetakePayment(false)}
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
