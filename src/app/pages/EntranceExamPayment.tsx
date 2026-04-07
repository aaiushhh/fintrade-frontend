import { Link } from 'react-router';
import { TrendingUp, Clock, Camera, Monitor, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export function EntranceExamPayment() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <nav className="border-b border-[#334155] bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#00D1B2]" />
            <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Entrance Exam</h1>
          <p className="text-[#9CA3AF]">Complete the entrance exam to enroll in FinTrade courses</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Exam Details */}
          <div className="col-span-2 space-y-6">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Exam Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#00D1B2] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#E5E7EB]">Duration</div>
                    <div className="text-sm text-[#9CA3AF]">30 minutes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00D1B2] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#E5E7EB]">Questions</div>
                    <div className="text-sm text-[#9CA3AF]">30 multiple choice questions</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Camera className="h-5 w-5 text-[#00D1B2] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#E5E7EB]">Proctored Exam</div>
                    <div className="text-sm text-[#9CA3AF]">Camera monitoring required throughout the exam</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-[#00D1B2] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#E5E7EB]">Single Device</div>
                    <div className="text-sm text-[#9CA3AF]">Exam must be taken on one device only</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-4">Important Instructions</h2>
              
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li className="flex gap-2">
                  <span className="text-[#00D1B2]">•</span>
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00D1B2]">•</span>
                  <span>Keep your camera and microphone enabled</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00D1B2]">•</span>
                  <span>Do not switch tabs or windows during the exam</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00D1B2]">•</span>
                  <span>Have a valid ID ready for verification</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00D1B2]">•</span>
                  <span>The exam cannot be paused once started</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Card */}
          <div className="col-span-1">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-[#E5E7EB] mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#9CA3AF]">Entrance Exam Fee</span>
                  <span className="text-[#E5E7EB] font-mono">₹500</span>
                </div>
                
                <div className="border-t border-[#334155] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#E5E7EB]">Total Amount</span>
                    <span className="text-xl font-bold text-[#00D1B2] font-mono">₹500</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-11">
                  Pay & Continue
                </Button>
                
                <Link to="/exam">
                  <Button className="w-full bg-[#3B82F6] text-[#E5E7EB] hover:bg-[#3B82F6]/90 h-11">
                    Start Exam
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-[#9CA3AF] mt-4 text-center">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
