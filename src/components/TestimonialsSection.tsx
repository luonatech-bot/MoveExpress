import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, MapPin, Truck } from 'lucide-react';

import avatarAmina from '../assets/images/avatar_amina_bello_1787441709015.jpg';
import avatarBoma from '../assets/images/avatar_boma_briggs_1787441717981.jpg';
import avatarIfeanyi from '../assets/images/avatar_ifeanyi_okeke_1787441729525.jpg';
import avatarChinedu from '../assets/images/avatar_chinedu_okafor_1787441741003.jpg';
import avatarOlawale from '../assets/images/avatar_olawale_adeyemi_1787441754255.jpg';
import avatarZainab from '../assets/images/avatar_zainab_mohammed_1787441763724.jpg';
import avatarNgozi from '../assets/images/avatar_ngozi_nwosu_1787441772941.jpg';
import avatarBabajide from '../assets/images/avatar_babajide_oladipo_1787441782410.jpg';

interface Testimonial {
  id: string;
  name: string;
  ethnicity: 'Hausa' | 'Igbo' | 'Yoruba' | 'Interstate';
  location: string;
  route: string;
  moveType: string;
  avatar: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
  avatarType?: 'hijab' | 'traditional' | 'smart';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Amina Bello Al-Hassan',
    ethnicity: 'Hausa',
    location: 'Maitama, Abuja',
    route: 'Gwarinpa ➔ Maitama, Abuja',
    moveType: '4-Bedroom Duplex Relocation',
    avatar: avatarAmina,
    avatarType: 'hijab',
    rating: 5,
    date: '3 days ago',
    verified: true,
    review: 'I was genuinely stressed about moving our 4-bedroom duplex in Abuja because of delicate chandeliers and glass cabinets. The ExpressMove team arrived right at 7:30 AM in neat green uniforms. They wrapped every single piece with heavy padded blankets and bubble wrap. Not a single scratch! Their movers were so polite and respectful. Masha Allah, 10/10 service.',
  },
  {
    id: 't-ph',
    name: 'Engr. Boma Tamuno Briggs',
    ethnicity: 'Interstate',
    location: 'Old GRA, Port Harcourt',
    route: 'Peter Odili Rd ➔ Old GRA, Port Harcourt',
    moveType: 'Executive Residence & Oilfield Home Office',
    avatar: avatarBoma,
    avatarType: 'traditional',
    rating: 5,
    date: '4 days ago',
    verified: true,
    review: 'Relocating in Port Harcourt can be stressful with estate checkpoints and fragile equipment. ExpressMove was top-tier. Their covered 5-tonne truck was spotless and rainproof. They dismantled our conference table, wrapped heavy marble tops securely, and handled the offloading seamlessly. Genuine corporate moving service in Rivers State.',
  },
  {
    id: 't-enugu',
    name: 'Dr. Ifeanyi & Chioma Okeke',
    ethnicity: 'Igbo',
    location: 'Independence Layout, Enugu',
    route: 'New Haven ➔ Independence Layout, Enugu',
    moveType: 'Medical Doctor Family Relocation',
    avatar: avatarIfeanyi,
    avatarType: 'smart',
    rating: 5,
    date: '5 days ago',
    verified: true,
    review: 'We moved our entire household within Enugu and ExpressMove made it completely effortless. The movers arrived with proper toolsets, shrink-wrapped our leather sofas, and labeled every carton room-by-room. No haggling or sudden price increments on moving day. Daalu rinne!',
  },
  {
    id: 't-2',
    name: 'Chinedu Okafor',
    ethnicity: 'Igbo',
    location: 'Lekki Phase 1, Lagos',
    route: 'Orchid Rd, Lekki ➔ Lekki Phase 1',
    moveType: '3-Bedroom Apartment Move',
    avatar: avatarChinedu,
    avatarType: 'traditional',
    rating: 5,
    date: 'Last week',
    verified: true,
    review: 'Anybody that knows Lagos traffic and estate security drama knows moving can give you headache. ExpressMove handled the Lekki estate gate pass clearances in advance and navigated the expressway early before traffic built up. They even dismantled my heavy king-size mahogany bed and assembled it back in my new master bedroom. Proper value for money!',
  },
  {
    id: 't-3',
    name: 'Dr. Olawale Adeyemi',
    ethnicity: 'Yoruba',
    location: 'Ikeja GRA, Lagos',
    route: 'Victoria Island ➔ Ikeja GRA',
    moveType: 'Medical Clinic & Executive Residence',
    avatar: avatarOlawale,
    avatarType: 'traditional',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    review: 'Their professionalism is rare in Nigeria. What impressed me most was the inventory manifest. Every carton was labeled by room and numbered. They moved my 85-inch OLED TV in a specialized protective wooden flight-case. Pricing was 100% upfront—no sudden stories about fuel or mover tips. I have already recommended them to my colleagues in LASUTH.',
  },
  {
    id: 't-4',
    name: 'Hajiya Zainab Mohammed',
    ethnicity: 'Hausa',
    location: 'Kano to Abuja',
    route: 'Nassarawa GRA, Kano ➔ Wuse 2, Abuja',
    moveType: 'Interstate Household Move',
    avatar: avatarZainab,
    avatarType: 'hijab',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    review: 'Relocating our family belongings interstate from Kano to Abuja felt like a huge mountain to climb. The ExpressMove covered truck was completely sealed and weather-proof. The driver Ibrahim kept us updated via WhatsApp live location throughout the highway trip. Everything arrived safe and dry despite the heavy rain. Nagode sosai!',
  },
  {
    id: 't-5',
    name: 'Ngozi & Emeka Nwosu',
    ethnicity: 'Igbo',
    location: 'Banana Island, Ikoyi',
    route: 'Oniru, VI ➔ Banana Island Estate, Ikoyi',
    moveType: 'Luxury Penthouse Move',
    avatar: avatarNgozi,
    avatarType: 'smart',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    review: 'Banana Island facility management has very strict rules regarding mover truck weights, floor protection, and elevator padding. ExpressMove complied with all estate guidelines smoothly. Their move captain, Emeka, supervised the entire offloading with military precision. Outstanding white-glove Nigerian moving service!',
  },
  {
    id: 't-6',
    name: 'Engr. Babajide Oladipo',
    ethnicity: 'Yoruba',
    location: 'Bodija, Ibadan',
    route: 'Bodija, Ibadan ➔ Magodo Phase 2, Lagos',
    moveType: 'Family Relocation',
    avatar: avatarBabajide,
    avatarType: 'traditional',
    rating: 5,
    date: '1 month ago',
    verified: true,
    review: 'I was skeptical because I had a bad experience with random roadside truck operators last year. ExpressMove is a completely different league. They provided formal GIT insurance paperwork from Leadway, used shrink-wrap on all our leather couches, and were on time. Kudos to the entire team!',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section id="testimonials-section" className="bg-white py-14 sm:py-20 border-t border-b border-slate-200/80 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with pill matching < OUR SERVICES > */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs mb-1">
            <span>&lt; WHAT PEOPLE SAY ABOUT US &gt;</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2E18] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            What People Say About Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Read authentic reviews from verified clients across Lagos, Abuja, Port Harcourt, Enugu, Ibadan, and nationwide.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAFCFB] rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative group"
              >
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{item.date}</span>
                </div>

                {/* Body: Review Text */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{item.review}"
                </p>

                {/* Move route tag */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[#008751] text-[11px] font-medium">
                    <Truck className="w-3 h-3 shrink-0" />
                    <span className="truncate max-w-[240px]">{item.route}</span>
                  </div>
                </div>

                {/* Bottom Author Section with Circle Avatar */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                      onError={(e) => {
                        // Fallback placeholder if image network blocks
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="w-4 h-4 rounded-full bg-[#008751] text-white flex items-center justify-center absolute -bottom-0.5 -right-0.5 ring-2 ring-white">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate font-['Plus_Jakarta_Sans',sans-serif]">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#008751] shrink-0" />
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Navigation Controls: Clean Round Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center shadow-xs transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-[#008751]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonials"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center shadow-xs transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
