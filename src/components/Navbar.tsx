import React, { useState } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useMove } from '../context/MoveContext';
import { ExpressMoveLogo } from './brand/XpressMovementLogo';
import { WhatsAppIcon } from './common/WhatsAppIcon';

interface NavbarProps {
  currentView?: string;
  activeView?: string;
  onNavigate?: (view: any) => void;
  setActiveView?: (view: string) => void;
  onOpenEstimator: () => void;
  onOpenCallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  activeView,
  onNavigate,
  setActiveView,
  onOpenEstimator,
  onOpenCallModal,
}) => {
  const effectiveView = currentView || activeView || 'home';
  const handleViewChange = (v: string) => {
    if (onNavigate) onNavigate(v);
    else if (setActiveView) setActiveView(v);
  };

  const { currency, setCurrency } = useMove();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined navigation links requested: Home, Services, About Us, Contact Us
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    handleViewChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 shadow-xs">
      {/* Top Nigerian Dispatch Bar */}
      <div className="bg-[#052314] text-emerald-100 text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block text-xs">🇳🇬</span>
          <span className="font-semibold">Nigeria's Premier Relocation & Logistics Service • Lagos, Abuja, Port Harcourt & Nationwide</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-emerald-300">
          <span className="flex items-center gap-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#74D600] inline-block animate-pulse" />
            24/7 Fast Dispatch Active
          </span>
          <a href="tel:+2349059876543" className="inline-flex items-center gap-1 font-bold text-white hover:text-[#74D600] transition-colors">
            <Phone className="w-3 h-3 text-[#74D600]" />
            <span>+234 905 987 6543</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo with light theme for crisp rendering on white background */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer select-none group"
            id="brand-logo-btn"
          >
            <ExpressMoveLogo size="md" theme="light" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3">
            {navLinks.map((link) => {
              const isActive = effectiveView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'text-[#16A34A] font-bold border-b-2 border-[#16A34A] rounded-none' 
                      : 'text-slate-700 hover:text-[#16A34A] hover:bg-emerald-50/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone Number with Phone Icon */}
            <a
              href="tel:+2349059876543"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:text-[#16A34A] transition-colors px-2 py-1"
            >
              <Phone className="w-4 h-4 text-[#16A34A] fill-[#16A34A]" />
              <span>+234 905 987 6543</span>
            </a>

            {/* Primary CTA Button: Get A Quote -> */}
            <button
              id="navbar-get-free-quote-btn"
              onClick={onOpenEstimator}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#74D600] hover:bg-[#65bd00] text-[#052314] text-xs sm:text-sm font-black shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Get A Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-nav-quote-quick-btn"
              onClick={onOpenEstimator}
              className="px-3 py-1.5 rounded-lg bg-[#74D600] text-[#052314] text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <span>Get A Quote</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-slate-100">
            {navLinks.map((link) => {
              const isActive = effectiveView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold ${
                    isActive ? 'bg-[#74D600] text-[#052314]' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="tel:+2349059876543"
              className="py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#16A34A]" />
              <span>Call Dispatch: +234 905 987 6543</span>
            </a>
            <a
              href="https://wa.me/2349059876543?text=Hello%20ExpressMove,%20I%20need%20a%20moving%20quote"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#15803D] text-xs font-bold flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp (+234 905 987 6543)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
