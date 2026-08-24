import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Plus, 
  Minus, 
  Phone, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Clock, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { 
  ThreeDBoxIcon, 
  ThreeDTruckIcon, 
  ThreeDHomeIcon, 
  ThreeDOfficeIcon, 
  ThreeDShieldIcon, 
  ThreeDMapPinIcon, 
  ThreeDHeadsetIcon, 
  ThreeDClipboardIcon 
} from '../common/ThreeDIcons';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { FAQSection } from '../FAQSection';
import { ServicesSection } from '../ServicesSection';

interface ServicesViewProps {
  onOpenEstimator: () => void;
  onNavigateToQuote: () => void;
  onOpenCallModal?: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onOpenEstimator,
  onNavigateToQuote,
  onOpenCallModal,
}) => {
  return (
    <div className="w-full bg-[#FAFCFA] text-[#111827] font-['Inter',sans-serif] selection:bg-[#4EBE00] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Richer light green backdrop, compact height, crisp styling)*/}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#CCE8C5] via-[#DCEFD7] to-[#C0E1B8] text-[#0B2E18] pt-4 sm:pt-7 lg:pt-9 pb-6 sm:pb-9 lg:pb-11 overflow-hidden border-b border-emerald-300/80 shadow-xs">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(116,214,0,0.18),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 text-left">
              
              {/* Badge: < OUR SERVICES > */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs">
                <span>&lt; OUR SERVICES &gt;</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.12] text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif]">
                Moving Made <br className="hidden sm:inline" />
                <span className="text-[#16A34A] inline-block border-b-3 border-[#74D600] pb-0.5">
                  Simple & Safe.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-xs sm:text-base text-slate-800 font-medium max-w-xl leading-relaxed">
                Professional logistics and moving solutions for homes, offices and businesses across Lagos, Abuja, Port Harcourt, and nationwide Nigeria.
              </p>

              {/* Call to actions in Hero */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <button
                  onClick={onOpenEstimator}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#74D600] hover:bg-[#65bd00] text-[#052314] font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transform active:scale-95"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/2348167629156?text=Hello%20ExpressMove,%20I%20would%20like%20to%20inquire%20about%20your%20moving%20services"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-[#0B2E18] font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right: Sleek ExpressMove Logistics Truck */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-emerald-300/60 group">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                  alt="ExpressMove Logistics Truck On Nigerian Highway"
                  className="w-full h-52 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052314]/80 via-[#052314]/20 to-transparent" />
                
                {/* Floating Brand Badge over truck */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#052314]/90 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-emerald-500/40 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#74D600] flex items-center justify-center text-[#052314] font-black shadow-xs">
                      <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                        ExpressMove LOGISTICS
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-300 font-medium">
                        We Move. You Move Forward.
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[10px] font-bold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#74D600] animate-ping" />
                    <span>Live GPS Active</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "LOGISTICS SOLUTIONS FOR EVERY NEED" (5 Card Layout exactly as image) */}
      {/* ========================================================================= */}
      <ServicesSection 
        onOpenEstimator={onOpenEstimator}
        onNavigateToQuote={onNavigateToQuote}
      />

      {/* ========================================================================= */}
      {/* 3. "HOW IT WORKS" CONTAINER (Pale Mint Background & 4 Process Circles)    */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF7EE] border border-emerald-200/80 rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 shadow-sm">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs mb-1">
              <span>&lt; HOW IT WORKS &gt;</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif]">
              Our Simple 4-Step Process
            </h2>
            <p className="text-xs sm:text-sm text-emerald-900/80 font-medium">
              A smooth and stress-free moving experience.
            </p>
          </div>

          {/* 4 Process Items Connected by Arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1: Request a Quote */}
            <div className="flex flex-col items-center text-center space-y-3.5 relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#16A34A] shadow-lg flex items-center justify-center text-white border-4 border-white transition-transform duration-300 group-hover:scale-110">
                <ThreeDHeadsetIcon className="w-10 h-10" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h4 className="text-sm sm:text-base font-black text-[#0B2E18]">
                  1. Request a Quote
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Contact us via call, WhatsApp or our website to tell us about your move.
                </p>
              </div>

              {/* Connecting Arrow for Desktop */}
              <div className="hidden lg:block absolute -right-6 top-10 text-[#16A34A] pointer-events-none">
                <ArrowRight className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            {/* Step 2: Get a Plan */}
            <div className="flex flex-col items-center text-center space-y-3.5 relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#16A34A] shadow-lg flex items-center justify-center text-white border-4 border-white transition-transform duration-300 group-hover:scale-110">
                <ThreeDClipboardIcon className="w-10 h-10" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h4 className="text-sm sm:text-base font-black text-[#0B2E18]">
                  2. Get a Plan
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  We provide a customized moving plan and affordable quote.
                </p>
              </div>

              {/* Connecting Arrow for Desktop */}
              <div className="hidden lg:block absolute -right-6 top-10 text-[#16A34A] pointer-events-none">
                <ArrowRight className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            {/* Step 3: We Pack & Move */}
            <div className="flex flex-col items-center text-center space-y-3.5 relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#16A34A] shadow-lg flex items-center justify-center text-white border-4 border-white transition-transform duration-300 group-hover:scale-110">
                <ThreeDBoxIcon className="w-10 h-10" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h4 className="text-sm sm:text-base font-black text-[#0B2E18]">
                  3. We Pack & Move
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Our professional team packs your items securely and moves them safely.
                </p>
              </div>

              {/* Connecting Arrow for Desktop */}
              <div className="hidden lg:block absolute -right-6 top-10 text-[#16A34A] pointer-events-none">
                <ArrowRight className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            {/* Step 4: Safe Delivery */}
            <div className="flex flex-col items-center text-center space-y-3.5 relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#16A34A] shadow-lg flex items-center justify-center text-white border-4 border-white transition-transform duration-300 group-hover:scale-110">
                <ThreeDTruckIcon className="w-10 h-10" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h4 className="text-sm sm:text-base font-black text-[#0B2E18]">
                  4. Safe Delivery
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Your items are delivered to your new location on time and in perfect condition.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (2-Column Accordion Grid as in Image)       */}
      {/* ========================================================================= */}
      <FAQSection />

      {/* ========================================================================= */}
      {/* 5. "READY TO MOVE?" DARK GREEN CALL TO ACTION BAR                         */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#052314] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: 3D Box & Text */}
          <div className="flex items-center gap-4 sm:gap-6 text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
              <ThreeDBoxIcon className="w-full h-full" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Ready to Move?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium max-w-md">
                Let ExpressMove Logistics handle your move with care and professionalism.
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start sm:justify-end">
            <button
              onClick={onOpenEstimator}
              className="px-6 py-3.5 rounded-xl bg-[#74D600] hover:bg-[#65bd00] text-[#052314] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/2348167629156?text=Hello%20ExpressMove,%20I%20am%20ready%20to%20schedule%20my%20move"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl bg-[#082E19] hover:bg-[#0B3B20] border border-white/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
