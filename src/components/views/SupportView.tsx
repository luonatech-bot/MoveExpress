import React, { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Sparkles,
  MapPin
} from 'lucide-react';
import { FAQS } from '../../data/mockData';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface SupportViewProps {
  onOpenEstimator: () => void;
  onNavigateToContact: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({
  onOpenEstimator,
  onNavigateToContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const supportCategories = [
    {
      title: 'Move Booking & Quotes',
      description: 'How to calculate Naira quotes, schedule moving dates, and select truck sizes.',
      icon: '📦',
    },
    {
      title: 'Gated Estate Pass Clearance',
      description: 'Letters of authorization, vehicle number plates, and mover IDs for estate managers.',
      icon: '🛡️',
    },
    {
      title: 'Packing & Fragile Items',
      description: 'Heavy blanket wrapping, plasma TV boxes, wardrobes, and kitchen glassware handling.',
      icon: '🛋️',
    },
    {
      title: 'Payment, Insurance & Invoices',
      description: 'Bank transfers, Paystack receipting, corporate invoicing, and goods-in-transit claims.',
      icon: '💳',
    },
  ];

  const supportFaqs = [
    {
      q: 'How early should I book my move in Lagos or Abuja?',
      a: 'We recommend booking 3 to 7 days in advance, especially for weekend moves (Fridays and Saturdays) and end-of-month dates which are high demand in Nigeria. However, same-day and emergency moves are often available upon direct request.'
    },
    {
      q: 'Do your movers dismantle and reassemble beds and wardrobes?',
      a: 'Yes, 100%. Our moving crews come equipped with professional power toolsets to dismantle bed frames, modular wardrobes, TV mounts, and heavy conference tables, and reassemble them in your new rooms.'
    },
    {
      q: 'How does ExpressMove coordinate with estate security at Lekki, Ikoyi, or Maitama?',
      a: 'Upon booking confirmation, we dispatch driver particulars, vehicle registration numbers, and mover names to your estate management portal or provide printed manifestos for the security gate.'
    },
    {
      q: 'What happens if there is heavy Nigerian city traffic or rain during the move?',
      a: 'All ExpressMove trucks are 100% weather-proof covered box trucks with sealed roofs to ensure zero rain damage. We schedule dispatches early in the morning (6:30am - 8:00am) to beat peak traffic on routes like Lekki-Epe Expressway, Third Mainland Bridge, and Airport Road Abuja.'
    },
    {
      q: 'How do I submit an insurance claim if an item gets scratched or damaged?',
      a: 'Your Move Captain carries a digital handover sheet. Simply point out any issue during the room walkthrough. You can also file a ticket through this support portal or WhatsApp with photo evidence within 48 hours for immediate claim processing.'
    },
    {
      q: 'Can I pay via Bank Transfer or Corporate Invoice?',
      a: 'Yes. We accept instant Nigerian bank transfers to our corporate ExpressMove bank accounts, online card payments via Paystack, and offer formal 30-day invoice terms for registered Nigerian companies.'
    }
  ];

  const filteredFaqs = supportFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F7F9FC] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Support Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#008751] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ExpressMove Nigeria Help Center & Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            How Can We Assist Your Move Today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Find answers to common questions about moving in Nigeria, track existing dispatch orders, or speak directly to a relocation coordinator.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics (e.g., estate gate passes, TV packing, bank transfer)..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium shadow-xs focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3 Rapid Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* WhatsApp Direct */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">WhatsApp Live Chat</h3>
              <p className="text-xs text-slate-600">
                Fastest response for video surveys, photo estimates, and urgent move changes.
              </p>
            </div>
            <a
              href="https://wa.me/2349059876543?text=Hello%20ExpressMove%20Support,%20I%20need%20assistance%20with%20my%20relocation"
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Open WhatsApp (+234 905 987 6543)</span>
            </a>
          </div>

          {/* Phone Dispatch Line */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#008751]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct Phone Helplines</h3>
              <p className="text-xs text-slate-600">
                Speak directly with our move dispatch desk across Nigeria.
              </p>
            </div>
            <div className="space-y-1.5 pt-2">
              <a
                href="tel:+2349059876543"
                className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold text-center block transition-all font-mono"
              >
                Hotline: +234 905 987 6543
              </a>
              <a
                href="tel:+2349059876543"
                className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold text-center block transition-all font-mono"
              >
                Direct: 0905 987 6543
              </a>
            </div>
          </div>

          {/* Email & Ticket Support */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#008751]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email & Invoicing Desk</h3>
              <p className="text-xs text-slate-600">
                Send corporate RFQs, receipt inquiries, and claims to our support desk.
              </p>
            </div>
            <button
              onClick={onNavigateToContact}
              className="mt-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center block transition-all"
            >
              Send Support Message
            </button>
          </div>

        </div>

        {/* 4 Topic Pillar Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
            Browse Help Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 hover:border-emerald-300 transition-all cursor-pointer"
                onClick={() => setSearchQuery(cat.title.split(' ')[0])}
              >
                <div className="text-2xl">{cat.icon}</div>
                <h3 className="text-xs font-bold text-slate-900">{cat.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive FAQs Accordion */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Frequently Asked Questions
            </h2>
            <span className="text-xs text-slate-500">{filteredFaqs.length} answers available</span>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#008751] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
