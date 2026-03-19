import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle, ArrowLeft, Mail } from "lucide-react";

const GOLD = "#C9A84C";

export default function CheckoutSuccess() {
  useEffect(() => {
    document.title = "Payment Successful | Sinbar Consultants";
  }, []);

  const searchString = window.location.search;
  const params = new URLSearchParams(searchString);
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-black text-white font-['Source_Sans_3',sans-serif] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: `rgba(201,168,76,0.15)` }}>
            <CheckCircle className="w-10 h-10" style={{ color: GOLD }} />
          </div>
          <h1 className="text-3xl font-extrabold font-['Sora'] mb-3">Payment Successful!</h1>
          <p className="text-gray-400 text-lg mb-2">
            Thank you for choosing Sinbar Consultants.
          </p>
          <p className="text-gray-500 text-sm">
            A confirmation email will be sent to your email address shortly. Our team will reach out within 24 hours to begin your onboarding.
          </p>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(201,168,76,0.15)` }}>
          <h3 className="text-lg font-bold font-['Sora'] mb-4" style={{ color: GOLD }}>What Happens Next?</h3>
          <div className="space-y-4 text-left">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ backgroundColor: `rgba(201,168,76,0.15)`, color: GOLD }}>1</div>
              <div>
                <p className="text-sm font-semibold text-white">Confirmation Email</p>
                <p className="text-xs text-gray-500">You'll receive a receipt and order details via email.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ backgroundColor: `rgba(201,168,76,0.15)`, color: GOLD }}>2</div>
              <div>
                <p className="text-sm font-semibold text-white">Team Assignment</p>
                <p className="text-xs text-gray-500">A dedicated Sinbar engineer will be assigned to your account.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ backgroundColor: `rgba(201,168,76,0.15)`, color: GOLD }}>3</div>
              <div>
                <p className="text-sm font-semibold text-white">Onboarding Call</p>
                <p className="text-xs text-gray-500">We'll schedule a kickoff call to discuss your setup and timeline.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: "#000" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <a href="mailto:info@sinbarconsultants.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all border hover:bg-white/5" style={{ borderColor: `rgba(201,168,76,0.3)`, color: GOLD }}>
            <Mail className="w-4 h-4" /> Contact Support
          </a>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-600 mt-8">
            Reference: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}
