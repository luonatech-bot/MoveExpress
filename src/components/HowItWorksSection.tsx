import React from 'react';
import { 
  ClipboardList, 
  Truck, 
  Home, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  ThreeDClipboardIcon, 
  ThreeDTruckIcon, 
  ThreeDHomeIcon, 
  ThreeDShieldIcon 
} from './common/ThreeDIcons';

interface HowItWorksSectionProps {
  onOpenEstimator?: () => void;
  onNavigateToQuote?: () => void;
  onOpenVideoSurvey?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenEstimator,
  onNavigateToQuote,
}) => {
  const steps = [
    {
      number: '1',
      title: 'Get Transparent Nigerian Quote',
      description: 'Choose your pickup, destination, and apartment or office size to receive upfront pricing in Naira with zero hidden charges.',
      icon: <ThreeDClipboardIcon className="w-6 h-6" />,
      tag: 'Instant Estimate',
    },
    {
      number: '2',
      title: 'Professional Packing & Loading',
      description: 'Our vetted, uniformed team arrives on schedule with heavy blankets and wrapping, arranges estate gate passes, and loads our covered truck safely.',
      icon: <ThreeDTruckIcon className="w-6 h-6" />,
      tag: 'Gate Pass Clearance',
    },
    {
      number: '3',
      title: 'Safe Delivery & Room Setup',
      description: 'We deliver directly to your new home, offload and position all heavy furniture in designated rooms, and ensure you settle in with peace of mind.',
      icon: <ThreeDHomeIcon className="w-6 h-6" />,
      tag: 'Room Arrangement',
    },
  ];

  const handleAction = () => {
    if (onOpenEstimator) onOpenEstimator();
    else if (onNavigateToQuote) onNavigateToQuote();
  };

  return (
    <section id="how-it-works-section" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with pill matching < OUR SERVICES > */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs mb-1">
            <span>&lt; HOW IT WORKS &gt;</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Straightforward 3-Step Moving Process
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Experience stress-free moving anywhere in Lagos, Abuja, Port Harcourt, or across Nigeria.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 space-y-4 relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 font-mono group-hover:text-emerald-300 transition-colors">
                    0{step.number}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#16A34A]">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.tag}</span>
                </div>
                <span className="text-slate-400 text-[11px]">Step {step.number}/3</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quick Action */}
        <div className="mt-10 text-center">
          <button
            onClick={handleAction}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Start Your Move Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
