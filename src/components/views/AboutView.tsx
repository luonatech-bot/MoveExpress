import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  HeartHandshake,
  Building
} from 'lucide-react';

interface AboutViewProps {
  onOpenEstimator: () => void;
  onNavigateToContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenEstimator,
  onNavigateToContact,
}) => {
  return (
    <div className="bg-[#F7F9FC] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#008751] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>🇳🇬 Nigeria's Premier Relocation Company</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Redefining Moving in Nigeria with Trust, Integrity & Care
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ExpressMove was founded in Lagos to transform how Nigerians relocate. We eliminate the unpredictability of road-side loaders and unsafe transit by providing professional, insured, GPS-tracked relocations across all 36 states and the FCT.
          </p>
        </div>

        {/* 2-Column Philosophy & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Why Nigerians Choose ExpressMove
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              From Victoria Island penthouses and Lekki family duplexes to corporate headquarters in Marina and Maitama, we understand the nuances of Nigerian relocation. We handle gated estate approvals, traffic schedules, and heavy furniture dismantling with surgical precision.
            </p>

            <div className="space-y-3.5">
              {[
                { title: 'Zero Roadside Casual Labor', desc: '100% full-time, background-verified Nigerian logistics professionals in uniform.' },
                { title: 'Gated Estate Permits & Clearance', desc: 'Complete coordination with estate facility managers across Lagos and Abuja.' },
                { title: 'GPS-Tracked Covered Trucks', desc: 'Secure transit with satellite position updates and tamper-evident container locks.' },
                { title: 'Full Transit Insurance Cover', desc: 'Institutional goods-in-transit policy protecting every plate, television, and sofa.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#008751] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenEstimator}
                className="px-6 py-3 rounded-xl bg-[#008751] hover:bg-[#007043] text-white font-bold text-xs shadow-md shadow-emerald-800/20 flex items-center gap-2 transition-all"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateToContact}
                className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs transition-colors"
              >
                <span>Contact Dispatch Hubs</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Nigerian Home Relocation"
                className="w-full h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Lagos • Abuja • Port Harcourt • Ibadan</span>
                  <h4 className="text-lg font-bold">Unpacking, furniture assembly, and zero-stress handover</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008751] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Goods in Transit Insurance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every relocation is fully insured with leading Nigerian underwriters for total peace of mind.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008751] flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Nationwide Coverage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated inter-state routes connecting Lagos, Abuja, Rivers, Oyo, Edo, Anambra, and all Nigerian states.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008751] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Punctual Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We navigate Nigerian city traffic strategically to ensure early arrival and efficient daylight loading.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008751] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Dedicated Move Captain</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              One lead coordinator manages your move from the initial quote to the final room placement.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
