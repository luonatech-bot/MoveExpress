import React from 'react';
import { 
  FileCheck, 
  AlertCircle, 
  Truck, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface TermsOfServiceViewProps {
  onNavigateToContact: () => void;
  onOpenEstimator: () => void;
}

export const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({
  onNavigateToContact,
  onOpenEstimator,
}) => {
  return (
    <div className="bg-[#F7F9FC] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#008751] text-xs font-bold uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5" />
            <span>ExpressMove Logistics Nigeria (RC: 1849204)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Terms of Service & Relocation Agreement
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Effective Date: August 2026 • Governing household and corporate relocations in Nigeria
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              By confirming a moving booking or making a deposit with ExpressMove Nigeria, you agree to the standard terms outlined below governing quote validity, property access, goods-in-transit insurance, and cancellation protocols.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">1</span>
              Quotation, Pricing & Payment Terms
            </h2>
            <p>
              ExpressMove provides transparent, itemized quotes in Nigerian Naira (₦).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Quote Validity:</strong> Standard quotations remain valid for 14 calendar days from issuance.</li>
              <li><strong>Deposit Requirement:</strong> A minimum 30% commitment deposit is required to reserve the moving crew and lock in the covered truck schedule.</li>
              <li><strong>Final Settlement:</strong> The remaining 70% balance is payable upon delivery and room positioning, prior to final sign-off.</li>
              <li><strong>Accepted Payment Methods:</strong> Direct Nigerian Bank Transfers to verified corporate accounts, Naira Debit Cards (Mastercard, Visa, Verve), and Paystack.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">2</span>
              Client Responsibilities & Estate Clearances
            </h2>
            <p>
              To ensure a seamless moving day without delays:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Gated Estate Passes:</strong> Clients residing in gated estates (e.g. Lekki Phase 1, Banana Island, Parkview, Maitama, Gwarinpa) must notify their Facility Management / Resident Association to obtain necessary moving passes. ExpressMove will supply mover IDs and vehicle particulars upon request.</li>
              <li><strong>Jewelry & High-Value Valuables:</strong> Clients are required to personally transport cash, gold jewelry, birth certificates, deeds, and high-value negotiable bonds.</li>
              <li><strong>Defrosting Appliances:</strong> Refrigerators and deep freezers should be defrosted and dried at least 12 hours before loading.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">3</span>
              Goods-in-Transit (GIT) Insurance & Claims
            </h2>
            <p>
              Every relocation handled by ExpressMove is protected under our institutional Goods-in-Transit insurance policy underwritten by accredited Nigerian insurers (Leadway Assurance).
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
              <p><strong>Claim Notification:</strong> Any transit-related damage must be inspected and noted on the physical or digital job sheet during handover with your Move Captain, and formally lodged in writing within 48 hours.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">4</span>
              Rescheduling & Cancellations
            </h2>
            <p>
              We understand plans shift in Nigeria due to tenancy keys or renovation delays.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Free Rescheduling:</strong> Free date changes when notified at least 48 hours before the scheduled dispatch time.</li>
              <li><strong>Cancellation Policy:</strong> Cancellations made 72+ hours prior receive a 100% full deposit refund. Cancellations under 24 hours incur a modest 10% administrative crew-retention fee.</li>
            </ul>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 text-xs">Ready to book your move with full confidence?</h4>
              <p className="text-xs text-slate-500">Get an instant quote with transparent pricing.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenEstimator}
                className="px-5 py-2.5 rounded-xl bg-[#008751] hover:bg-[#007043] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Calculate Move Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
