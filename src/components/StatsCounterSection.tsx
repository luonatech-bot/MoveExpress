import React from 'react';
import { 
  Users, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Truck, 
  Clock 
} from 'lucide-react';
import { 
  ThreeDShieldIcon, 
  ThreeDTruckIcon, 
  ThreeDHomeIcon, 
  ThreeDOfficeIcon 
} from './common/ThreeDIcons';

interface StatsCounterSectionProps {
  onOpenEstimator?: () => void;
}

export const StatsCounterSection: React.FC<StatsCounterSectionProps> = ({
  onOpenEstimator,
}) => {
  const stats = [
    {
      id: 'moves',
      value: '15,200+',
      label: 'Relocations Completed',
      subtext: 'Homes, apartments & duplexes',
      icon: <ThreeDHomeIcon className="w-6 h-6" />,
      badge: '99.4% Safe',
      gradient: 'from-emerald-50 to-teal-50/50',
      textColor: 'text-[#0B2E18]',
    },
    {
      id: 'clients',
      value: '520+',
      label: 'Corporate & SME Clients',
      subtext: 'Banks, tech hubs & businesses',
      icon: <ThreeDOfficeIcon className="w-6 h-6" />,
      badge: 'Zero Downtime',
      gradient: 'from-emerald-50 to-emerald-100/40',
      textColor: 'text-[#0B2E18]',
    },
    {
      id: 'coverage',
      value: '36 States + FCT',
      label: 'Nationwide Network',
      subtext: 'Lagos, Abuja, PH & all regions',
      icon: <ThreeDTruckIcon className="w-6 h-6" />,
      badge: 'Live GPS',
      gradient: 'from-lime-50 to-emerald-50',
      textColor: 'text-[#0B2E18]',
    },
    {
      id: 'rating',
      value: '4.9 / 5.0',
      label: 'Customer Rating',
      subtext: '4,200+ verified client reviews',
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-400" />,
      badge: 'Top Rated',
      gradient: 'from-amber-50/70 to-emerald-50/40',
      textColor: 'text-[#0B2E18]',
    },
  ];

  return (
    <section className="bg-[#F6FCF0] border-b border-[#74D600]/25 py-8 sm:py-10 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#74D600]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Matching Style */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1.5">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#74D600] text-[#052314] font-black text-[11px] uppercase tracking-wider shadow-xs">
            <span>&lt; PROVEN TRACK RECORD &gt;</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Trusted by Thousands of Nigerian Families & Businesses
          </h2>
        </div>

        {/* 4 Compact Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/95 hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#74D600]/40 hover:border-[#74D600] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50/70 shadow-xs border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#74D600]/25 text-[#052314] border border-[#74D600]/40">
                  {stat.badge}
                </span>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B2E18] tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-emerald-900/80 font-medium">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
