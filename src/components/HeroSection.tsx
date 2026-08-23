import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Star, 
  Truck, 
  Home 
} from 'lucide-react';
import { PropertyType } from '../types';
import { useMove } from '../context/MoveContext';
import { formatCurrency } from '../utils/pricing';

import heroVanBg from '../assets/images/expressmove_hero_van_1787508949682.jpg';
import avatarAmina from '../assets/images/avatar_amina_bello_1787441709015.jpg';
import avatarBoma from '../assets/images/avatar_boma_briggs_1787441717981.jpg';
import avatarChinedu from '../assets/images/avatar_chinedu_okafor_1787441741003.jpg';
import avatarNgozi from '../assets/images/avatar_ngozi_nwosu_1787441772941.jpg';

interface HeroSectionProps {
  onStartEstimatorWithParams?: (params: {
    pickup: string;
    destination: string;
    propertyType: PropertyType;
    moveDate: string;
  }) => void;
  onOpenEstimator?: (params?: any) => void;
  onOpenCallModal?: () => void;
  onOpenVideoModal?: () => void;
  onOpenVideoSurvey?: () => void;
  onNavigateToView?: (view: string) => void;
  onNavigateToQuote?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartEstimatorWithParams,
  onOpenEstimator,
  onNavigateToQuote,
}) => {
  const { currency } = useMove();

  const [fromLocation, setFromLocation] = useState('Lekki Phase 1, Lagos');
  const [toLocation, setToLocation] = useState('Maitama, Abuja');
  const [propertySize, setPropertySize] = useState<PropertyType>('2bed');
  const [moveDate, setMoveDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });

  const basePrices: Record<PropertyType, number> = {
    studio: 115000,
    '1bed': 145000,
    '2bed': 185000,
    '3bed': 225000,
    '4bed': 265000,
    '5plus': 290000,
    office: 275000,
    custom: 165000,
  };

  const previewEstimate = Math.min(300000, Math.max(100000, basePrices[propertySize] || 185000));

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      pickup: fromLocation,
      destination: toLocation,
      propertyType: propertySize,
      moveDate: moveDate,
    };
    if (onStartEstimatorWithParams) {
      onStartEstimatorWithParams(params);
    } else if (onOpenEstimator) {
      onOpenEstimator(params);
    } else if (onNavigateToQuote) {
      onNavigateToQuote();
    }
  };

  return (
    <section className="relative flex items-center py-3.5 sm:py-5 lg:py-7 overflow-hidden bg-slate-900">
      
      {/* Clean Dark Green Van Background with Slight Very Light Green Tint Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroVanBg}
          alt="Clean Green Moving Van"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle, soft light green and gentle tint overlay (not overly dark) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031d10]/75 via-[#062c19]/55 to-[#0b3820]/40" />
        <div className="absolute inset-0 bg-[#74D600]/10 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
          
          {/* Left Column: Clean & Simple (Main text + Sub text + Avatar Head Rating) */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-center lg:text-left">
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-black text-white tracking-tight leading-[1.14] font-['Plus_Jakarta_Sans',sans-serif] drop-shadow-sm">
              Moving made simple & stress-free across <span className="text-[#74D600]">Nigeria</span>.
            </h1>

            <p className="text-xs sm:text-base text-emerald-50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-xs">
              Professional home & office relocations across Lagos, Abuja, Port Harcourt, and nationwide. Experienced movers, estate gate pass clearance, and safe covered trucks.
            </p>

            {/* Little Head Rating at Left Bottom */}
            <div className="pt-1 sm:pt-2 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-[#74D600] object-cover shadow-sm"
                  src={avatarAmina}
                  alt="Amina Bello"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-[#74D600] object-cover shadow-sm"
                  src={avatarChinedu}
                  alt="Chinedu Okafor"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-[#74D600] object-cover shadow-sm"
                  src={avatarNgozi}
                  alt="Ngozi Nwosu"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-[#74D600] object-cover shadow-sm"
                  src={avatarBoma}
                  alt="Engr. Boma"
                />
              </div>
              <div className="text-left leading-tight">
                <div className="flex items-center gap-1 text-amber-300 font-bold text-xs sm:text-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
                <span className="text-[11px] sm:text-xs text-emerald-100/90 font-medium">15,200+ successful moves in Nigeria</span>
              </div>
            </div>

          </div>

          {/* Right Column: Instant Move Estimator Card (Hidden on Mobile, Displayed on Desktop/Large screens) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-black/50 border border-slate-100 space-y-2.5 w-full max-w-[320px]">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                    Instant Move Estimate
                  </h3>
                  <p className="text-[10px] text-slate-500">Quick Nigerian relocation quote</p>
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#16A34A]">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              <form onSubmit={handleHeroSubmit} className="space-y-2 text-xs">
                
                {/* From Location */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-0.5 flex items-center gap-1 text-[10px]">
                    <MapPin className="w-3 h-3 text-[#16A34A]" />
                    <span>Pickup Location</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="e.g. Lekki Phase 1, Lagos"
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 text-xs font-medium focus:bg-white focus:ring-1.5 focus:ring-[#16A34A] outline-none transition-all"
                  />
                </div>

                {/* To Location */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-0.5 flex items-center gap-1 text-[10px]">
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    <span>Destination</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder="e.g. Maitama, Abuja"
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 text-xs font-medium focus:bg-white focus:ring-1.5 focus:ring-[#16A34A] outline-none transition-all"
                  />
                </div>

                {/* Home Size & Date */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5 flex items-center gap-1 text-[10px]">
                      <Home className="w-3 h-3 text-slate-500" />
                      <span>Property</span>
                    </label>
                    <select
                      value={propertySize}
                      onChange={(e) => setPropertySize(e.target.value as PropertyType)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 text-[10px] font-medium focus:bg-white focus:ring-1.5 focus:ring-[#16A34A] outline-none transition-all"
                    >
                      <option value="studio">Self-Con / Room</option>
                      <option value="1bed">1 Bed Flat</option>
                      <option value="2bed">2 Bed Flat</option>
                      <option value="3bed">3 Bed Flat/Duplex</option>
                      <option value="4bed">4+ Bed Duplex</option>
                      <option value="office">Office Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5 flex items-center gap-1 text-[10px]">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={moveDate}
                      onChange={(e) => setMoveDate(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 text-[10px] font-medium focus:bg-white focus:ring-1.5 focus:ring-[#16A34A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Instant Pricing Strip */}
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-medium text-emerald-800 block leading-tight">Starting Estimate</span>
                    <span className="text-sm font-extrabold text-[#0B2E18] font-mono">
                      {formatCurrency(previewEstimate, currency)}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#052314] font-bold bg-[#74D600] px-1.5 py-0.5 rounded-full">
                    Movers & Fuel
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#74D600] hover:bg-[#65bd00] text-[#052314] text-xs font-black shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book / View Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[9px] text-slate-400 text-center">
                  Zero hidden fees • Bank transfer, Cards & Paystack
                </p>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
