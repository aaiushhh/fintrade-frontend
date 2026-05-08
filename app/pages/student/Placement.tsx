import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Award, CheckCircle, AlertCircle } from "lucide-react";
import api from "../../services/api";

export default function Placement() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = () => {
    api.get("/placement/status")
      .then((res) => setStatus(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEvaluate = async () => {
    setEvaluating(true);
    try {
      await api.post("/placement/evaluate");
      fetchStatus();
    } catch (err: any) {
      alert("Evaluation failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="text-center py-12 text-[#0B2A5B]/60">Loading placement data...</div>
      </DashboardLayout>
    );
  }

  const isEligible = status?.eligible || false;

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Placement Cell</h1>
        <p className="text-[#0B2A5B]/70">Your gateway to top trading firms</p>
      </div>

      {status?.evaluated ? (
        <>
          {/* Eligibility Status */}
          <Card className={`p-6 mb-6 shadow-xl ${isEligible ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-orange-500 to-orange-600"} text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Placement Eligibility</h3>
                <p className="text-white/90">
                  {isEligible
                    ? "Congratulations! You're eligible for all placement opportunities."
                    : "Complete all requirements and improve your score to unlock placement opportunities."}
                </p>
              </div>
              {isEligible && (
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={40} />
                </div>
              )}
            </div>
          </Card>

          {/* Performance Analytics */}
          <Card className="p-6 bg-white shadow-lg mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#0B2A5B]">Eligibility Criteria</h3>
              <Button onClick={handleEvaluate} disabled={evaluating} variant="outline" size="sm" className="border-[#0B2A5B]/20">
                {evaluating ? "Evaluating..." : "Re-evaluate"}
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0B2A5B] font-medium">Overall Placement Score</span>
                  <span className="font-bold text-[#0B2A5B]">{Math.round(status.score || 0)}/100</span>
                </div>
                <Progress value={status.score || 0} className="h-2" />
              </div>
              
              <div className="bg-[#F4F1EA] p-4 rounded-lg">
                <h4 className="font-semibold text-[#0B2A5B] mb-2">Criteria Breakdown</h4>
                <p className="text-sm text-[#0B2A5B]/70 font-mono whitespace-pre-wrap">
                  {status.criteria ? JSON.stringify(status.criteria, null, 2) : "No detailed criteria available."}
                </p>
              </div>
            </div>
          </Card>

          {/* Opportunities */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Available Opportunities</h3>
            <div className="text-center py-8">
              <Award className="mx-auto text-[#C2A86A] mb-4" size={48} />
              <p className="text-[#0B2A5B]/60 font-semibold text-lg">No open positions at the moment.</p>
              <p className="text-sm text-[#0B2A5B]/50 mt-2">Check back later for new opportunities from our partner firms.</p>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-12 bg-white shadow-lg text-center">
          <AlertCircle className="mx-auto text-[#C2A86A] mb-4" size={64} />
          <h2 className="text-2xl font-bold text-[#0B2A5B] mb-4">Not Evaluated Yet</h2>
          <p className="text-[#0B2A5B]/70 mb-8 max-w-md mx-auto">
            You need to be evaluated by our placement system to check your eligibility for job opportunities. The evaluation considers your exam scores, simulator performance, and module completion.
          </p>
          <Button onClick={handleEvaluate} disabled={evaluating} className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a] px-8 py-6 text-lg">
            {evaluating ? "Evaluating..." : "Evaluate My Profile"}
          </Button>
        </Card>
      )}
    </DashboardLayout>
  );
}
