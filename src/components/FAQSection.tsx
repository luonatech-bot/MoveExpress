import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_COLUMN_LEFT: FaqItem[] = [
  {
    id: 'faq-l1',
    question: 'How much does your logistics service cost?',
    answer:
      'Our pricing depends on several factors including move distance, volume of items, vehicle size required (1-tonne van to 10-tonne truck), and whether packing/unpacking is needed. Use our instant Moving Cost Calculator for transparent, upfront pricing with zero hidden charges.',
  },
  {
    id: 'faq-l2',
    question: 'Do you move goods outside Lagos?',
    answer:
      'Yes! We operate nationwide across all 36 states and the FCT Abuja, including regular express inter-state routes connecting Lagos, Abuja, Port Harcourt, Ibadan, Enugu, Kano, and Benin City.',
  },
  {
    id: 'faq-l3',
    question: 'How long does delivery take?',
    answer:
      'Intra-city relocations (e.g., within Lagos, Abuja, or Port Harcourt) are typically completed same-day within 3 to 6 hours. Inter-state deliveries take between 24 to 48 hours depending on route distance and road conditions, backed by live GPS dispatch tracking.',
  },
  {
    id: 'faq-l4',
    question: 'Can you handle fragile or high-value items?',
    answer:
      'Absolutely. Our teams use high-grade protective materials including multi-layer bubble wrap, foam corner guards, heavy-duty corrugated cartons, and custom wooden crating for chandeliers, artwork, electronics, and delicate glassware.',
  },
  {
    id: 'faq-l5',
    question: 'Is my shipment insured?',
    answer:
      'Yes, every ExpressMove relocation includes Goods-in-Transit (GIT) insurance coverage against unforeseen damage, loss, or transit incidents. Premium customized insurance valuations are also available for luxury or high-value corporate items.',
  },
];

const FAQ_COLUMN_RIGHT: FaqItem[] = [
  {
    id: 'faq-r1',
    question: 'How do I book a move or delivery?',
    answer:
      'Booking is simple: calculate your estimate online or request a quick quote, choose your preferred moving date and time, and confirm your booking. You can also chat directly with our dispatch team on WhatsApp or call our hotline.',
  },
  {
    id: 'faq-r2',
    question: 'Do you offer inter-state delivery?',
    answer:
      'Yes, our inter-state freight and haulage service connects all major commercial hubs and cities across Nigeria with dedicated covered trucks, verified drivers, and real-time security escort options where required.',
  },
  {
    id: 'faq-r3',
    question: 'What items can you transport?',
    answer:
      'We transport complete household goods, corporate office workstations, furniture, appliances, electronics, commercial merchandise, and industrial machinery. We do not transport hazardous materials, illegal substances, or flammable chemicals.',
  },
  {
    id: 'faq-r4',
    question: 'Can I track my shipment?',
    answer:
      'Yes! Once your move begins, you receive real-time SMS updates and an active GPS tracking link to monitor your vehicle’s live coordinates and estimated time of arrival (ETA) at the destination.',
  },
  {
    id: 'faq-r5',
    question: 'Do you handle office and home relocation?',
    answer:
      'Yes, we specialize in both residential moves (apartments, duplexes, estates) and commercial/corporate office relocations with minimal business downtime, including IT equipment handling and modular workstation setup.',
  },
];

export const FAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-[#FAFDFB] border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching exact visual reference */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs mb-1">
            <span>&lt; FREQUENTLY ASKED QUESTIONS &gt;</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Find answers to common questions about our Nigerian logistics and moving services.
          </p>
        </div>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-6xl mx-auto">
          
          {/* Left Column */}
          <div className="space-y-3.5 sm:space-y-4">
            {FAQ_COLUMN_LEFT.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                    isOpen ? 'border-[#74D600] ring-1 ring-[#74D600]/30 shadow-md' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:text-[#0B2E18] transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#74D600] text-[#052314]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FBFDFB]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3.5 sm:space-y-4">
            {FAQ_COLUMN_RIGHT.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                    isOpen ? 'border-[#74D600] ring-1 ring-[#74D600]/30 shadow-md' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:text-[#0B2E18] transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#74D600] text-[#052314]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FBFDFB]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
