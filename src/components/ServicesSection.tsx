import React from 'react';
import { 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { 
  ThreeDBoxIcon, 
  ThreeDHomeIcon, 
  ThreeDOfficeIcon, 
  ThreeDShieldIcon, 
  ThreeDMapPinIcon 
} from './common/ThreeDIcons';

interface ServicesSectionProps {
  onOpenEstimator?: () => void;
  onNavigateToQuote?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenEstimator,
  onNavigateToQuote,
}) => {
  const handleAction = () => {
    if (onOpenEstimator) onOpenEstimator();
    else if (onNavigateToQuote) onNavigateToQuote();
  };

  return (
    <section id="services-section" className="py-12 sm:py-16 bg-white text-[#111827] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74D600] text-[#052314] font-black text-xs uppercase tracking-wider shadow-xs">
            <span>&lt; OUR SERVICES &gt;</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2E18] tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Logistics Solutions for Every Need
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            From home relocation to business moves, we handle it all with care, speed and professionalism.
          </p>
        </div>

        {/* TOP ROW: 3 Compact Cards (Home Relocation, Office Relocation, Packing Services) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-6">
          
          {/* Card 1: Home Relocation */}
          <div id="service-home-relocation" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group scroll-mt-24">
            <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80"
                alt="Home Relocation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute -bottom-3.5 left-5 w-11 h-11 rounded-full bg-[#16A34A] border-3 border-white shadow-md flex items-center justify-center text-white z-10">
                <ThreeDHomeIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="pt-5 p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Home Relocation
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Stress-free moving for homes and families.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Packing & Unpacking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Safe Handling Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>On-time Delivery</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleAction}
                  className="w-full py-2 px-3 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Office Relocation */}
          <div id="service-office-relocation" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group scroll-mt-24">
            <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80"
                alt="Office Relocation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute -bottom-3.5 left-5 w-11 h-11 rounded-full bg-[#16A34A] border-3 border-white shadow-md flex items-center justify-center text-white z-10">
                <ThreeDOfficeIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="pt-5 p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Office Relocation
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Keep your business moving with zero downtime.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Furniture & Equipment Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Workstation Moving</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Secure Transport</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleAction}
                  className="w-full py-2 px-3 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Packing Services */}
          <div id="service-packing-services" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group scroll-mt-24">
            <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80"
                alt="Packing Services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute -bottom-3.5 left-5 w-11 h-11 rounded-full bg-[#16A34A] border-3 border-white shadow-md flex items-center justify-center text-white z-10">
                <ThreeDBoxIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="pt-5 p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Packing Services
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Quality packing materials and expert handling.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Professional Packing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Fragile Item Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Space Optimization</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleAction}
                  className="w-full py-2 px-3 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: 2 Sleek Wider Cards (Inter-State Delivery & Cargo Insurance) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Card 4: Inter-State Delivery */}
          <div id="service-interstate-delivery" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group scroll-mt-24">
            <div className="relative sm:w-5/12 h-40 sm:h-auto overflow-hidden bg-slate-100 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=700&q=80"
                alt="Inter-State Delivery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#16A34A] shadow-xs flex items-center justify-center text-white shrink-0">
                    <ThreeDMapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                      Inter-State Delivery
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Fast and reliable delivery across all states in Nigeria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Nationwide Reach</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>On-time Guarantee</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleAction}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 5: Cargo Insurance */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group">
            <div className="relative sm:w-5/12 h-40 sm:h-auto overflow-hidden bg-slate-100 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=700&q=80"
                alt="Cargo Insurance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#16A34A] shadow-xs flex items-center justify-center text-white shrink-0">
                    <ThreeDShieldIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                      Cargo Insurance
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      We insure your goods for peace of mind from pickup to delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Comprehensive Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>Loss & Damage Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" />
                  <span>100% Peace of Mind</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleAction}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
