import {
  TrendingUp, Download, Award
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

export function Certificate() {
  const { user } = useAuth();
  const displayName = user?.full_name || user?.name || user?.email || 'Student';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Certificate</h1>
        <p className="text-sm text-[#9CA3AF]">Your FinTrade Trading Certification</p>
      </div>

      {/* Certificate Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#111827] border-2 border-[#00D1B2] rounded-lg p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#00D1B2]/5 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3B82F6]/5 rounded-full translate-x-16 translate-y-16"></div>

          {/* Content */}
          <div className="relative text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#00D1B2]/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-[#00D1B2]" />
              </div>
            </div>

            <div className="mb-2">
              <TrendingUp className="h-6 w-6 text-[#00D1B2] inline-block mr-2" />
              <span className="text-xl font-bold text-[#E5E7EB]">FinTrade</span>
            </div>

            <h2 className="text-3xl font-bold text-[#E5E7EB] mb-8">Certificate of Completion</h2>

            <div className="mb-8">
              <p className="text-sm text-[#9CA3AF] mb-4">This is to certify that</p>
              <h3 className="text-4xl font-bold text-[#00D1B2] mb-4">{displayName}</h3>
              <p className="text-sm text-[#9CA3AF] mb-4">has successfully completed the</p>
              <h4 className="text-2xl font-semibold text-[#E5E7EB] mb-8">Advanced Trading Program</h4>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-sm text-[#9CA3AF] mb-1">Course Duration</div>
                <div className="text-lg font-semibold text-[#E5E7EB]">3 Months</div>
              </div>

              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-sm text-[#9CA3AF] mb-1">Final Score</div>
                <div className="text-lg font-semibold text-[#00D1B2] font-mono">85%</div>
              </div>

              <div className="bg-[#1F2937] border border-[#334155] rounded-lg p-4">
                <div className="text-sm text-[#9CA3AF] mb-1">Issue Date</div>
                <div className="text-lg font-semibold text-[#E5E7EB]">14 Mar 2026</div>
              </div>
            </div>

            <div className="border-t border-[#334155] pt-8 mt-8">
              <div className="flex justify-between items-center max-w-xl mx-auto">
                <div className="text-left">
                  <div className="h-px w-32 bg-[#334155] mb-2"></div>
                  <p className="text-xs text-[#9CA3AF]">Vikram Desai</p>
                  <p className="text-xs text-[#9CA3AF]">Program Director</p>
                </div>

                <div className="text-center">
                  <div className="text-xs text-[#9CA3AF] mb-1">Certificate ID</div>
                  <div className="text-sm font-mono text-[#E5E7EB]">FT-2026-001247</div>
                </div>

                <div className="text-right">
                  <div className="h-px w-32 bg-[#334155] mb-2 ml-auto"></div>
                  <p className="text-xs text-[#9CA3AF]">Amit Desai</p>
                  <p className="text-xs text-[#9CA3AF]">Lead Instructor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 text-center">
          <Button className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-12 px-8">
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}
