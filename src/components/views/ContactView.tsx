import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Building,
  Navigation,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface OfficeLocation {
  id: string;
  name: string;
  badge: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapQuery: string;
}

const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'lagos',
    name: 'Lagos Liaison & Logistics Hub',
    badge: 'Main Commercial Branch',
    city: 'Lagos State',
    address: '2nd Floor, 315, 117A Shasha Road, Beside Mobil Filling Station, Jimoh-Shasha Bustop, Akowonjo, Lagos, Nigeria.',
    phone: '+234 816 762 9156',
    email: 'info@expressmove.com.ng',
    hours: 'Mon – Sat: 6:30 AM – 7:30 PM',
    mapQuery: 'https://www.google.com/maps/search/?api=1&query=315+117A+Shasha+Road+Beside+Mobil+Filling+Station+Akowonjo+Lagos+Nigeria',
  },
  {
    id: 'abuja',
    name: 'Abuja Federal Operations Hub',
    badge: 'FCT Regional Command',
    city: 'Abuja (FCT)',
    address: 'Plot 1084, Joseph Gomwalk Street, Maitama Business District / CBD, Abuja, Nigeria.',
    phone: '+234 816 762 9156',
    email: 'info@expressmove.com.ng',
    hours: 'Mon – Sat: 7:00 AM – 7:00 PM',
    mapQuery: 'https://www.google.com/maps/search/?api=1&query=Maitama+Central+Business+District+Abuja+Nigeria',
  },
  {
    id: 'ph',
    name: 'Port Harcourt Regional HQ',
    badge: 'South-South Operations HQ',
    city: 'Rivers State',
    address: 'Rumuogunuma, Eneka Road, Port Harcourt, Rivers State, Nigeria.',
    phone: '+234 816 762 9156',
    email: 'info@expressmove.com.ng',
    hours: 'Mon – Sat: 7:00 AM – 7:00 PM',
    mapQuery: 'https://www.google.com/maps/search/?api=1&query=Rumuogunuma+Eneka+Road+Port+Harcourt+Rivers+State+Nigeria',
  },
];

export const ContactView: React.FC = () => {
  const [activeLocationTab, setActiveLocationTab] = useState<string>('lagos');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sentMessage, setSentMessage] = useState(false);

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCity, setFormCity] = useState('Lagos');
  const [formService, setFormService] = useState('Residential Relocation');
  const [formMsg, setFormMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentMessage(true);
  };

  const selectedOffice = OFFICE_LOCATIONS.find(loc => loc.id === activeLocationTab) || OFFICE_LOCATIONS[0];

  return (
    <div className="bg-[#F8FAF9] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. IMAGE TWO HERO SECTION: Black Lady Support Specialist + Floating Brown Card + Get in Touch + WhatsApp */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-slate-200/80 shadow-sm relative overflow-hidden">
          {/* Subtle background ambient gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Photo of Customer Support Lady + Floating Dark Green Office Card */}
            <div className="lg:col-span-6 relative">
              {/* Photo Container */}
              <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden shadow-lg border border-slate-100 bg-slate-100 max-w-[480px] mx-auto lg:mx-0">
                <img
                  src="https://res.cloudinary.com/ddm7iixid/image/upload/v1787549333/customerCareRep_j0ilm2.webp"
                  alt="ExpressMove Client Support Specialist"
                  className="w-full h-[360px] sm:h-[430px] object-cover object-top filter brightness-[1.02]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Active support status badge with Dark Green Background */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#052314]/95 border border-emerald-600/60 backdrop-blur-md text-white text-xs font-semibold shadow-lg">
                  <div className="relative flex items-center justify-center w-2.5 h-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#74D600] animate-ping absolute inline-flex opacity-75" />
                    <span className="w-2 h-2 rounded-full bg-[#74D600] relative inline-flex" />
                  </div>
                  <span className="text-emerald-50 font-medium tracking-wide">24/7 Live Support Ready</span>
                </div>
              </div>

              {/* Floating Dark Green "Our Offices" Card */}
              <div className="mt-4 sm:-mt-28 sm:ml-auto lg:-mr-6 sm:max-w-[320px] bg-[#052314] text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-900/80 relative z-20 transition-transform duration-300 hover:translate-y-[-2px]">
                
                {/* Header with Navigation Pin and Green Title */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-950/90 border border-emerald-800/60 flex items-center justify-center text-[#74D600]">
                    <Navigation className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <h3 className="text-[#74D600] font-bold text-xs uppercase tracking-wider">
                    Our Offices
                  </h3>
                </div>

                {/* Lagos Liaison Hub */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-[#74D600] uppercase tracking-wider block">
                    LAGOS LIAISON HUB
                  </span>
                  <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                    2nd Floor, 315, 117A Shasha Road, Beside Mobil Filling Station, Jimoh-Shasha Bustop, Akowonjo, Lagos.
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-emerald-900/60 my-3" />

                {/* Port Harcourt HQ */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-[#74D600] uppercase tracking-wider block">
                    PORT HARCOURT HQ
                  </span>
                  <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                    Rumuogunuma, Eneka Road, Rivers State, Nigeria.
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-emerald-900/60 my-3" />

                {/* Abuja Operations Hub */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-[#74D600] uppercase tracking-wider block">
                    ABUJA OPERATIONS HUB
                  </span>
                  <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                    Plot 1084, Joseph Gomwalk Street, Maitama / CBD, FCT Abuja.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: "Get In Touch" Text + WhatsApp CTA Button (Image 2) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Header */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  Get In Touch
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Have questions about our home relocation, office moving, or nationwide logistics services? We're here to help.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Whether you need a custom corporate moving package, a home inventory survey, or guidance on gated estate clearance, our team is ready to support your move anywhere in Nigeria.
                </p>
              </div>

              {/* WhatsApp "LET'S CHAT" Button with Decorative Amber Indicator */}
              <div className="pt-2 flex items-center gap-6">
                <a
                  href="https://wa.me/2348167629156?text=Hello%20ExpressMove,%20I%20would%20like%20to%20get%20in%20touch%20for%20my%20relocation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  id="contact-lets-chat-whatsapp-btn"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>LET'S CHAT</span>
                </a>

                {/* Subtle Decorative Golden Sphere */}
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50" />
              </div>

              {/* Fast Direct Contacts Row */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Direct Telephone</span>
                    <a href="tel:+2348167629156" className="font-bold text-slate-900 hover:text-[#008751]">
                      +234 816 762 9156
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Official Email</span>
                    <a href="mailto:info@expressmove.com.ng" className="font-bold text-slate-900 hover:text-[#008751]">
                      info@expressmove.com.ng
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 2. IMAGE ONE GOOGLE MAPS CARDS SECTION: Lagos, Abuja & Port Harcourt */}
        {/* ========================================================================= */}
        <section className="space-y-8" id="google-maps-locations-section">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#008751] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Nationwide Locations & Mapping</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Visit Our Major Nigerian Hubs on Google Maps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Click any location below to open high-precision driving directions, GPS coordinates, and street navigation in Google Maps.
            </p>

            {/* City Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {OFFICE_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocationTab(loc.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeLocationTab === loc.id
                      ? 'bg-[#008751] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {loc.name.split(' ')[0]} Hub
                </button>
              ))}
            </div>
          </div>

          {/* 3 Major Locations: Exact Image 1 Design Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {OFFICE_LOCATIONS.map((location) => {
              const isSelected = activeLocationTab === location.id;

              return (
                <div
                  key={location.id}
                  className={`flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-xs hover:shadow-xl ${
                    isSelected 
                      ? 'border-[#008751] ring-2 ring-emerald-500/20' 
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {/* Location Info Header */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#008751] text-[10.5px] font-bold tracking-wide uppercase">
                        {location.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{location.hours.split('–')[0]}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                      {location.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {location.address}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Phone: <a href={`tel:${location.phone}`} className="text-[#008751] hover:underline font-mono">{location.phone}</a></span>
                    </div>
                  </div>

                  {/* EXACT IMAGE ONE INTERACTIVE CARD COMPONENT */}
                  <a
                    href={location.mapQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#0D1829]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center transition-all duration-200 group cursor-pointer block shadow-2xs hover:shadow-md"
                    title={`Open ${location.name} in Google Maps`}
                  >
                    {/* Dark Circular MapPin Badge (Image 1) */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0D1829] flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm group-hover:scale-110 transition-transform duration-200">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>

                    {/* Main Headline (Image 1) */}
                    <h4 className="text-sm sm:text-base font-bold text-[#0D1829] group-hover:text-[#008751] transition-colors leading-snug">
                      View our location on Google Maps
                    </h4>

                    {/* Subtitle (Image 1) */}
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 sm:mt-2 flex items-center justify-center gap-1">
                      <span>Opens in a new tab</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </p>
                  </a>

                </div>
              );
            })}
          </div>

        </section>


        {/* ========================================================================= */}
        {/* 3. DIRECT MESSAGE FORM + FAST WHATSAPP INQUIRY */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#008751] text-xs font-bold uppercase tracking-wider mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>Online Moving Inquiry</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                Send a Message to Our Move Dispatch Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Receive an itemized moving quote and consultation within 15 minutes during operating hours.
              </p>
            </div>

            {sentMessage ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#008751] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">Message Dispatched!</h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formName || 'Customer'}</strong>! An ExpressMove relocation coordinator in {formCity} has received your inquiry and will contact you via WhatsApp or phone shortly.
                </p>
                <button
                  onClick={() => setSentMessage(false)}
                  className="px-5 py-2 rounded-xl bg-[#008751] text-white text-xs font-bold hover:bg-[#007043] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Babajide Adeleke"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#008751] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nigerian Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="0816 762 9156"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#008751] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#008751] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Current City / Location</label>
                    <select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#008751] outline-none transition-all"
                    >
                      <option value="Lagos">Lagos (Island / Mainland)</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Port Harcourt">Port Harcourt (Rivers)</option>
                      <option value="Ibadan">Ibadan (Oyo)</option>
                      <option value="Enugu">Enugu State</option>
                      <option value="Kano">Kano / Kaduna</option>
                      <option value="Other">Other State in Nigeria</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Service Type Needed</label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#008751] outline-none transition-all"
                  >
                    <option value="Residential Relocation">Residential & Apartment Relocation</option>
                    <option value="Corporate Office Move">Corporate & Office Moving</option>
                    <option value="Interstate Relocation">Interstate Dedicated Truck Move</option>
                    <option value="Packing & Crating">Professional Packing & Fragile Crating</option>
                    <option value="Storage Solutions">Secure Climate-Controlled Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Relocation Details & Specifics</label>
                  <textarea
                    rows={3}
                    required
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Tell us about your pickup address, destination, inventory size (e.g., 3-bedroom flat), target move date, and any gated estate clearances..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#008751] outline-none transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#008751] hover:bg-[#007043] text-white font-bold text-sm shadow-md shadow-emerald-800/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Relocation Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Direct WhatsApp & Corporate Assurance Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp VIP Card */}
            <div className="bg-gradient-to-br from-[#008751] to-[#04613B] text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">Instant Video / Photo Survey</h3>
                  <p className="text-xs text-emerald-100">Send WhatsApp video walkthroughs</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-normal">
                Want a binding quote right away without waiting for an on-site visit? Walk through your home with your phone camera and send the clip to our move managers on WhatsApp.
              </p>

              <a
                href="https://wa.me/2348167629156?text=Hello%20ExpressMove,%20I%20am%20ready%20to%20send%20photos%20of%20my%20home%20for%20a%20quote"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#008751] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all block text-center"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#008751]" />
                <span>WhatsApp: +234 816 762 9156</span>
              </a>
            </div>

            {/* Corporate Registration & Trust Badges */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm font-['Plus_Jakarta_Sans',sans-serif]">
                Institutional Trust & Compliance
              </h4>
              
              <div className="space-y-3 text-slate-700">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Leadway Goods-In-Transit Insurance</span>
                    <span className="text-slate-500 text-[11px]">Every move is backed up to ₦50,000,000 against damage or loss.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">CAC Registered Entity (RC: 1849204)</span>
                    <span className="text-slate-500 text-[11px]">Fully accredited corporate logistics and relocation enterprise in Nigeria.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Gated Estate Clearances</span>
                    <span className="text-slate-500 text-[11px]">Pre-verified driver credentials for Banana Island, Ikoyi, Lekki, and Maitama estates.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Operating Days: Monday – Saturday (6:30 AM – 7:30 PM). Sunday dispatches available upon scheduled reservation.
              </div>
            </div>

          </div>

        </section>


        {/* ========================================================================= */}
        {/* 4. FREQUENTLY ASKED QUESTIONS ACCORDION */}
        {/* ========================================================================= */}
        <section className="max-w-3xl mx-auto space-y-4 pt-4">
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Common Questions About Nigerian Moves
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Everything you need to know about booking, estate gates, and safety</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How do you handle gated estate clearances in Lekki, Ikoyi, Banana Island or Abuja?',
                a: 'We provide all required vehicle registration numbers, mover identification cards, and letters of authorization directly to your estate facility management in advance to prevent any gate delays.'
              },
              {
                q: 'Are our household items insured during the move?',
                a: 'Yes, 100%. Every move is covered under our comprehensive Goods-in-Transit insurance policy underwritten by Leadway Assurance, protecting your belongings from point of origin to final placement.'
              },
              {
                q: 'What payment methods do you accept in Nigeria?',
                a: 'We accept direct Bank Transfers to our corporate bank accounts, Paystack online payments, Nigerian Debit Cards (Mastercard, Visa, Verve), and corporate 30-day invoice terms for registered companies.'
              },
              {
                q: 'Do you move outside Lagos and Abuja?',
                a: 'Yes. We run dedicated weather-proof covered trucks connecting Lagos, Abuja, Port Harcourt, Ibadan, Enugu, Asaba, Benin City, Kano, and all 36 Nigerian states.'
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:text-[#008751] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#008751] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
