import React from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Phone, 
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface RefundPolicyViewProps {
  onNavigateToContact: () => void;
  onOpenEstimator: () => void;
}

export const RefundPolicyView: React.FC<RefundPolicyViewProps> = ({
  onNavigateToContact,
  onOpenEstimator,
}) => {
  return (
    <div className="bg-[#F7FAF7] py-12 sm:py-16 font-['Inter',sans-serif] text-slate-800 selection:bg-[#74D600] selection:text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-[#008751] text-xs font-black uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Protection & Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Clear, transparent, and fair policies designed to give you peace of mind throughout your relocation across Nigeria.
          </p>
        </div>

        {/* Highlight Guarantee Box */}
        <div className="bg-gradient-to-br from-[#052314] to-[#0A3D24] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(116,214,0,0.18),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-[#74D600] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>The ExpressMove 100% Peace of Mind Commitment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif]">
              We treat your hard-earned funds with absolute integrity.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
              Moving plans can shift unexpectedly due to work transfers, tenancy handover dates, or family schedules. We believe in complete transparency, quick refund processing, and zero hidden penalties when you need to adjust or cancel your booking.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-3 text-center">
                <div className="text-lg font-black text-[#74D600]">100%</div>
                <div className="text-[11px] text-slate-200 font-medium">Full Deposit Refund (&gt;48h notice)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-3 text-center">
                <div className="text-lg font-black text-[#74D600]">0 Fees</div>
                <div className="text-[11px] text-slate-200 font-medium">Free Date Rescheduling</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-3 text-center">
                <div className="text-lg font-black text-[#74D600]">24 – 48 hrs</div>
                <div className="text-[11px] text-slate-200 font-medium">Fast Nigerian Bank Payouts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Body Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700">

          {/* Section 1: Booking Deposit & Cancellation Schedule */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008751] flex items-center justify-center text-xs font-black">1</span>
              Cancellation Schedule & Deposit Refunds
            </h3>
            <p>
              To ensure vehicles, dispatch logistics, and professional crew members are reserved exclusively for you, a standard deposit (typically 30%) is paid upon booking confirmation. If you choose to cancel, our refund scale is structured as follows:
            </p>
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Cancellation Notice</th>
                    <th className="py-3 px-4">Refund Amount</th>
                    <th className="py-3 px-4">Alternate Credit Option</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="bg-emerald-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900">More than 48 hours before move</td>
                    <td className="py-3 px-4 text-[#008751] font-bold">100% Full Refund</td>
                    <td className="py-3 px-4">100% Transferable Move Credit</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">24 to 48 hours before move</td>
                    <td className="py-3 px-4 font-bold text-slate-800">70% Refund of deposit</td>
                    <td className="py-3 px-4">100% Future Move Credit (Valid 12 mos)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">Less than 24 hours before dispatch</td>
                    <td className="py-3 px-4 font-medium text-slate-700">50% Refund (Covers crew mobilization)</td>
                    <td className="py-3 px-4">80% Credit applied to rescheduled date</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">Truck arrived on-site / Doorstep</td>
                    <td className="py-3 px-4 font-medium text-slate-700">Deposit non-refundable (Dispatch costs)</td>
                    <td className="py-3 px-4">Immediate same-day or next-day rescheduling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Hassle-Free Rescheduling Policy */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008751] flex items-center justify-center text-xs font-black">2</span>
              Complimentary Date Rescheduling
            </h3>
            <p>
              We understand that keys may not be ready, painters might run behind schedule, or estate management permits might take extra time.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Free Rescheduling:</strong> You can reschedule your relocation date at zero additional cost provided you give us at least <strong>24 hours notice</strong> prior to scheduled loading.
              </li>
              <li>
                <strong>Priority Slot Reallocation:</strong> We will immediately offer you the next earliest available slot that fits your schedule across Lagos, Abuja, Port Harcourt, or any inter-state corridor.
              </li>
              <li>
                <strong>Held Balance:</strong> Your entire deposit remains 100% active and credited to your account with no expiration for up to 365 calendar days.
              </li>
            </ul>
          </div>

          {/* Section 3: Refund Payment Methods & Timeline */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008751] flex items-center justify-center text-xs font-black">3</span>
              Payout Processing & Timelines
            </h3>
            <p>
              Once a refund request is approved by our billing desk:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <CreditCard className="w-4 h-4 text-[#008751]" />
                  <span>Direct Nigerian Bank Transfer</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Processed directly into your originating Nigerian bank account within <strong>24 to 48 business hours</strong>. You will receive an official payment receipt via SMS and email.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <RefreshCw className="w-4 h-4 text-[#008751]" />
                  <span>Card / Paystack Reversals</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  For payments made via debit card or online gateway, reversals are initiated immediately and reflect according to standard inter-bank clearing guidelines (typically 1–3 business days).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Goods-in-Transit Protection & Damage Compensation */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008751] flex items-center justify-center text-xs font-black">4</span>
              Transit Protection & Damage Settlement
            </h3>
            <p>
              Our certified movers use heavy-duty padded blankets, bubble wrap, shrink film, and corner protectors to safeguard your items. However, in the rare event of transit damage or loss:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Post-Move Walkthrough Inspection:</strong> You and your assigned Move Captain will conduct a room-by-room walkthrough upon completion. Any observed defect is documented on your digital handover form.
              </li>
              <li>
                <strong>Rapid Claim Processing:</strong> Damage claims submitted with clear photographic evidence within <strong>48 hours</strong> of delivery are processed within 3 to 5 business days.
              </li>
              <li>
                <strong>Repair or Replacement Guarantee:</strong> ExpressMove will either commission a certified craftsman to restore the item to its original state or issue a cash compensation / refund based on the item valuation.
              </li>
            </ul>
          </div>

          {/* Section 5: Exceptional Circumstances & Force Majeure */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008751] flex items-center justify-center text-xs font-black">5</span>
              Extreme Weather, Road Closures & Fuel Disruptions
            </h3>
            <p className="text-slate-600">
              If an unavoidable event occurs—such as government curfews, severe highway flooding, or regional bridge closures—our operations team will immediately contact you to reschedule or dispatch an alternate certified route. If relocation cannot proceed due to company-side constraints, <strong>you will receive an immediate 100% full refund with zero deductions</strong>.
            </p>
          </div>

        </div>

        {/* How to Request a Refund or Claim Box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 font-black text-slate-900 text-sm sm:text-base">
            <HelpCircle className="w-5 h-5 text-[#008751]" />
            <span>How to initiate a cancellation or refund request:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Our customer care and finance team is available 24/7. Simply have your Move Reference Number (or phone number used during booking) ready:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href="https://wa.me/2349059876543?text=Hello%20ExpressMove%20Billing,%20I%20would%20like%20to%20request%20assistance%20regarding%20my%20booking%20or%20refund"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat with Billing Desk on WhatsApp</span>
            </a>
            <a
              href="tel:+2349059876543"
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Phone className="w-4 h-4 text-[#74D600]" />
              <span>Call Hotline: +234 905 987 6543</span>
            </a>
          </div>

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-500">
              Or email our disputes resolution desk directly at{' '}
              <a href="mailto:info@expressmove.com.ng" className="text-[#008751] font-bold underline">
                info@expressmove.com.ng
              </a>
            </span>
          </div>
        </div>

        {/* Back navigation buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
          <button
            onClick={onNavigateToContact}
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#008751] transition-colors cursor-pointer"
          >
            ← Need to speak to an agent? Contact Us
          </button>

          <button
            onClick={onOpenEstimator}
            className="px-6 py-2.5 rounded-xl bg-[#74D600] hover:bg-[#65bd00] text-[#052314] font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <span>Calculate Moving Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
