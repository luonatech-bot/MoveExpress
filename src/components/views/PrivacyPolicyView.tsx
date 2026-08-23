import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Building,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';

interface PrivacyPolicyViewProps {
  onNavigateToContact: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigateToContact }) => {
  return (
    <div className="bg-[#F7F9FC] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#008751] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ExpressMove Nigeria Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Last Updated: August 2026 • Compliant with Nigeria Data Protection Regulation (NDPR / NDPA 2023)
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#008751] shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900">
              At <strong>ExpressMove Logistics Nigeria (RC: 1849204)</strong>, your privacy and personal security are our highest priority. We safeguard the details of your home address, inventory items, estate gate clearances, and payment records.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">1</span>
              Information We Collect
            </h2>
            <p>
              To provide accurate relocation quotes, dispatch verified moving crews, and coordinate estate gate entries across Lagos, Abuja, Port Harcourt, and other states, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Contact Identification:</strong> Full name, verified Nigerian phone number (WhatsApp/Voice), and email address.</li>
              <li><strong>Relocation Coordinates:</strong> Origin address, destination address, apartment type, floor level, and gate clearance requirements.</li>
              <li><strong>Inventory & Surveys:</strong> Volumetric item lists, specialty furniture details (e.g. pianos, safe deposit boxes), and optional video surveys.</li>
              <li><strong>Billing & Invoicing:</strong> Bank payment references, Paystack transaction tokens, and tax identification for corporate clients.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">2</span>
              How We Use Your Information
            </h2>
            <p>
              Your information is utilized exclusively for legitimate logistics and moving fulfillment operations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-xs text-slate-900">Mover Dispatch & Route Planning</h3>
                <p className="text-[11px] text-slate-600">Assigning the right covered truck capacity and fuel budgeting for inter-city routes.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-xs text-slate-900">Estate Security Clearances</h3>
                <p className="text-[11px] text-slate-600">Generating driver manifestos and vehicle registration documents for facility managers.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-xs text-slate-900">Goods-in-Transit Insurance</h3>
                <p className="text-[11px] text-slate-600">Filing underwritten manifests with institutional insurance partners (Leadway Assurance).</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-xs text-slate-900">Real-Time SMS & WhatsApp Updates</h3>
                <p className="text-[11px] text-slate-600">Keeping you notified of truck arrival, loading completion, and transit tracking.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">3</span>
              Data Protection & Security
            </h2>
            <p>
              We enforce industry-standard security protocols. All communication is transmitted via 256-bit SSL encryption. We <strong>never sell, rent, or lease</strong> your contact or address details to third-party advertisers or telemarketers.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">4</span>
              Your Rights (NDPR Compliance)
            </h2>
            <p>
              Under Nigerian data protection legislation, you have the right to request access to, rectification of, or deletion of your personal relocation records once transit and accounting audits are concluded.
            </p>
          </div>

          {/* Contact Box */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Questions about our privacy practices?</h4>
              <p className="text-xs text-slate-500">Contact our Data Compliance Officer in Lagos or Abuja.</p>
            </div>
            <button
              onClick={onNavigateToContact}
              className="px-5 py-2.5 rounded-xl bg-[#008751] hover:bg-[#007043] text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <span>Contact Compliance Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
