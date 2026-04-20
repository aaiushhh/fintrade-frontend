import { Link } from 'react-router';
import { TrendingUp, Clock, Camera, Monitor, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export function EntranceExamPayment() {
  return (
    <div className="min-h-screen bg-[var(--ft-bg)]">
      {/* Header */}
      <nav className="border-b border-[var(--ft-border)] bg-[var(--ft-surface)]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[var(--ft-red)]" />
            <span className="text-xl font-medium text-[var(--ft-charcoal)]">FinTrade</span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-[var(--ft-charcoal)] mb-2">Entrance Exam</h1>
          <p className="text-[var(--ft-muted)]">Complete the entrance exam to enroll in FinTrade courses</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Exam Details */}
          <div className="col-span-2 space-y-6">
            <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Exam Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[var(--ft-red)] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[var(--ft-charcoal)]">Duration</div>
                    <div className="text-sm text-[var(--ft-muted)]">30 minutes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--ft-red)] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[var(--ft-charcoal)]">Questions</div>
                    <div className="text-sm text-[var(--ft-muted)]">30 multiple choice questions</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Camera className="h-5 w-5 text-[var(--ft-red)] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[var(--ft-charcoal)]">Proctored Exam</div>
                    <div className="text-sm text-[var(--ft-muted)]">Camera monitoring required throughout the exam</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-[var(--ft-red)] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[var(--ft-charcoal)]">Single Device</div>
                    <div className="text-sm text-[var(--ft-muted)]">Exam must be taken on one device only</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-4">Important Instructions</h2>
              
              <ul className="space-y-2 text-sm text-[var(--ft-muted)]">
                <li className="flex gap-2">
                  <span className="text-[var(--ft-red)]">•</span>
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ft-red)]">•</span>
                  <span>Keep your camera and microphone enabled</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ft-red)]">•</span>
                  <span>Do not switch tabs or windows during the exam</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ft-red)]">•</span>
                  <span>Have a valid ID ready for verification</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ft-red)]">•</span>
                  <span>The exam cannot be paused once started</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Card */}
          <div className="col-span-1">
            <div className="bg-[var(--ft-surface)] border border-[var(--ft-border)] rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-[var(--ft-charcoal)] mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--ft-muted)]">Entrance Exam Fee</span>
                  <span className="text-[var(--ft-charcoal)] font-mono">₹500</span>
                </div>
                
                <div className="border-t border-[var(--ft-border)] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[var(--ft-charcoal)]">Total Amount</span>
                    <span className="text-xl font-medium text-[var(--ft-red)] font-mono">₹500</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[var(--ft-red)] text-white hover:bg-[var(--ft-red)]/90 h-11">
                  Pay & Continue
                </Button>
                
                <Link to="/exam">
                  <Button className="w-full bg-[var(--ft-red)] text-[var(--ft-charcoal)] hover:bg-[var(--ft-red)]/90 h-11">
                    Start Exam
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-[var(--ft-muted)] mt-4 text-center">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
