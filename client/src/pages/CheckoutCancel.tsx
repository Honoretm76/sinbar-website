import { useEffect } from "react";
import { Link } from "wouter";
import { XCircle, ArrowLeft, Phone } from "lucide-react";

const GOLD = "#C9A84C";

export default function CheckoutCancel() {
  useEffect(() => {
    document.title = "Checkout Cancelled | Sinbar Consultants";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-['Source_Sans_3',sans-serif] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 bg-white/5">
            <XCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-extrabold font-['Sora'] mb-3">Checkout Cancelled</h1>
          <p className="text-gray-400 text-lg mb-2">
            No worries — no charges were made.
          </p>
          <p className="text-gray-500 text-sm">
            If you have questions about our plans or need help choosing the right option, our team is here to help.
          </p>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(201,168,76,0.15)` }}>
          <p className="text-sm text-gray-400 mb-4">
            Not sure which plan is right for you? Schedule a free consultation with a Sinbar wireless engineer. We'll assess your needs and recommend the best solution — no pressure.
          </p>
          <a href="tel:+13474927699" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD }}>
            <Phone className="w-4 h-4" /> (347) 492-7699
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: "#000" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link href="/#pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all border hover:bg-white/5" style={{ borderColor: `rgba(201,168,76,0.3)`, color: GOLD }}>
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
