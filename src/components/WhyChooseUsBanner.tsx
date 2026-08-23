import React from 'react';
import { 
  UserCheck, 
  Truck, 
  ShieldCheck, 
  Building, 
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  ThreeDShieldIcon, 
  ThreeDOfficeIcon, 
  ThreeDTruckIcon, 
  ThreeDHomeIcon 
} from './common/ThreeDIcons';
import { WhatsAppIcon } from './common/WhatsAppIcon';

interface WhyChooseUsBannerProps {
  onOpenCallModal?: () => void;
  onNavigateToQuote?: () => void;
}

export const WhyChooseUsBanner: React.FC<WhyChooseUsBannerProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  const handleCall = () => {
    if (onOpenCallModal) onOpenCallModal();
    else window.location.href = 'tel:+2349059876543';
  };

  const handleQuote = () => {
    if (onNavigateToQuote) onNavigateToQuote();
  };

  const pillars = [
    {
      id: 'insurance',
      icon: <ThreeDShieldIcon className="w-6 h-6" />,
      badge: 'Guaranteed',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white',
      title: '100% Insured in Transit',
      description: 'Every item is protected under comprehensive Goods-in-Transit insurance from your old home to your new address.',
    },
    {
      id: 'staff',
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      badge: 'Vetted',
      badgeColor: 'bg-blue-100 text-blue-800',
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      title: 'Trained Full-Time Staff',
      description: 'Vetted, uniformed Nigerian movers trained in heavy appliance handling, furniture wrapping, and polite service.',
    },
    {
      id: 'clearance',
      icon: <Building className="w-5 h-5 text-amber-600" />,
      badge: 'Fast-Track',
      badgeColor: 'bg-amber-100 text-amber-800',
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      title: 'Estate Gate Pass Clearance',
      description: 'We handle HOA mover notices and estate security clearances across Lekki Phase 1, Ikoyi, Magodo, and Abuja gated estates.',
    },
    {
      id: 'trucks',
      icon: <ThreeDTruckIcon className="w-6 h-6" />,
      badge: 'Live GPS',
      badgeColor: 'bg-emerald-100 text-[#052314]',
      iconBg: 'bg-gradient-to-br from-[#0B2E18] to-[#16A34A] text-white',
      title: 'Covered GPS Box Trucks',
      description: 'Rainproof, lockable covered box trucks with satellite GPS tracking built to handle Nigerian roads safely.',
    }
  ];

  return (
    <section className="bg-slate-50/80 border-b border-slate-200/80 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Pill matching < OUR SERVICES > */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs mb-1">
            <span>&lt; WHY CHOOSE US &gt;</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Why thousands of Nigerians trust ExpressMove
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            No casual road boys, no hidden fuel surcharges, and zero damage.
          </p>
        </div>

        {/* 4 Premium Pillars maintaining standard size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((pillar) => (
            <div 
              key={pillar.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 hover:border-[#74D600] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-[#74D600]/15 transition-all" />

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${pillar.iconBg} shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    {pillar.icon}
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B2E18] transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Subtle Trust Indicator */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>ExpressMove Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Nigerian Dispatch Bar */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#052314] via-[#0B2E18] to-[#052314] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-950/20 border border-emerald-800/40">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold">Need assistance with your relocation in Nigeria?</h4>
            <p className="text-xs text-emerald-200/90 mt-0.5">Talk directly to our Lagos, Abuja, or Port Harcourt dispatch desk.</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/2349059876543?text=Hello%20ExpressMove,%20I%20need%20moving%20assistance"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#74D600] text-[#052314] hover:bg-[#65bd00] text-xs font-black transition-all shadow-xs flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#052314]" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={handleCall}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#74D600]" />
              <span>+234 905 987 6543</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
