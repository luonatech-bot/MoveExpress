import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin
} from 'lucide-react';
import { Currency } from '../types';
import { ExpressMoveLogo } from './brand/XpressMovementLogo';
import { WhatsAppIcon } from './common/WhatsAppIcon';

interface FooterProps {
  onNavigate: (view: any, sectionId?: string) => void;
  currency?: Currency;
  onCurrencyToggle?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
}) => {
  return (
    <footer className="bg-[#02180C] text-slate-300 pt-16 pb-12 border-t border-emerald-950/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Logo & Socials (4 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center cursor-pointer group"
            >
              <ExpressMoveLogo size="md" theme="dark" />
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-200/80 font-medium">
              We Move. You Move Forward.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-slate-300 hover:text-[#74D600] hover:border-[#74D600] transition-colors text-xs font-bold"
              >
                f
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-slate-300 hover:text-[#74D600] hover:border-[#74D600] transition-colors text-xs font-bold"
              >
                𝕏
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-slate-300 hover:text-[#74D600] hover:border-[#74D600] transition-colors text-xs font-bold"
              >
                ig
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-slate-300 hover:text-[#74D600] hover:border-[#74D600] transition-colors text-xs font-bold"
              >
                in
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-2 text-[11px] text-emerald-300/70 leading-relaxed">
              © {new Date().getFullYear()} ExpressMove Logistics. All Rights Reserved. Designed by{' '}
              <a 
                href="https://luonatech.com.ng" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#74D600] hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors"
              >
                LuonaTech
              </a>
            </div>
          </div>

          {/* Column 2: QUICK LINKS (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs font-['Plus_Jakarta_Sans',sans-serif]">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'how-it-works-section')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('coverage')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Coverage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('refund-policy')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: OUR SERVICES (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs font-['Plus_Jakarta_Sans',sans-serif]">
              OUR SERVICES
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('services', 'service-home-relocation')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Home Relocation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'service-office-relocation')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Office Relocation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'service-packing-services')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Packing Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'service-interstate-delivery')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left"
                >
                  Inter-State Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: COVERAGE (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs font-['Plus_Jakarta_Sans',sans-serif]">
              COVERAGE
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              We provide moving and delivery services across all 36 states in Nigeria.
            </p>
            <ul className="space-y-1.5 text-xs text-emerald-300/90 pt-1">
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74D600]"></span>
                  <span>Lagos & South-West</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74D600]"></span>
                  <span>Abuja & North-Central</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74D600]"></span>
                  <span>Port Harcourt & South-South</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'service-interstate-delivery')} 
                  className="hover:text-[#74D600] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74D600]"></span>
                  <span>36 States Interstate Haulage</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT US (3 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs font-['Plus_Jakarta_Sans',sans-serif]">
              CONTACT US
            </h4>
            
            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#74D600] shrink-0" />
                <a href="tel:+2348167629156" className="hover:text-[#74D600] transition-colors font-medium">
                  +234 816 762 9156
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/2348167629156?text=Hello%20ExpressMove,%20I%20need%20moving%20assistance" target="_blank" rel="noreferrer" className="hover:text-[#74D600] transition-colors font-medium">
                  +234 816 762 9156 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#74D600] shrink-0" />
                <a href="mailto:info@expressmove.com.ng" className="hover:text-[#74D600] transition-colors font-medium">
                  info@expressmove.com.ng
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#74D600] shrink-0 mt-0.5" />
                <button 
                  onClick={() => onNavigate('contact')}
                  className="font-medium text-left hover:text-[#74D600] transition-colors cursor-pointer"
                >
                  Port Harcourt, Rivers State, Nigeria.
                </button>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-emerald-300/80">
              <button onClick={() => onNavigate('privacy-policy')} className="hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <span>|</span>
              <button onClick={() => onNavigate('terms-of-service')} className="hover:text-white transition-colors cursor-pointer">
                Terms & Conditions
              </button>
              <span>|</span>
              <button onClick={() => onNavigate('refund-policy')} className="hover:text-white transition-colors cursor-pointer">
                Refund Policy
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
