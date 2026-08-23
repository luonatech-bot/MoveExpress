import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MapPin, 
  Truck, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Home,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import { PropertyType, ServiceType } from '../../types';
import { calculateMoveCost, formatCurrency } from '../../utils/pricing';
import { useMove } from '../../context/MoveContext';

interface MovingCalculatorViewProps {
  onOpenEstimator: () => void;
  onNavigateToQuote: () => void;
}

export const MovingCalculatorView: React.FC<MovingCalculatorViewProps> = ({
  onOpenEstimator,
  onNavigateToQuote,
}) => {
  const { currency } = useMove();

  const [propertyType, setPropertyType] = useState<PropertyType>('2bed');
  const [distanceKm, setDistanceKm] = useState<number>(30);
  const [pickupCity, setPickupCity] = useState<string>('Lagos');
  const [destCity, setDestCity] = useState<string>('Lagos (Ikeja to Lekki)');
  const [includePacking, setIncludePacking] = useState<boolean>(true);
  const [includeAssembly, setIncludeAssembly] = useState<boolean>(true);
  const [includeStorage, setIncludeStorage] = useState<boolean>(false);
  const [bookedSuccess, setBookedSuccess] = useState<boolean>(false);

  const selectedServices = useMemo(() => {
    const s: ServiceType[] = ['loading', 'transportation', 'unloading'];
    if (includePacking) s.push('packing');
    if (includeAssembly) s.push('furniture_assembly');
    if (includeStorage) s.push('storage');
    return s;
  }, [includePacking, includeAssembly, includeStorage]);

  const estimate = useMemo(() => {
    return calculateMoveCost({
      propertyType,
      distanceKm,
      services: selectedServices,
      inventory: [],
      pickupFloor: 1,
      pickupHasElevator: true,
      destinationFloor: 1,
      destinationHasElevator: true,
      isSpecialHandling: false,
    });
  }, [propertyType, distanceKm, selectedServices]);

  const propertyOptions: { id: PropertyType; label: string; sub: string }[] = [
    { id: 'studio', label: 'Studio / Room', sub: '1-2 movers' },
    { id: '1bed', label: '1 Bedroom', sub: '2-3 movers' },
    { id: '2bed', label: '2 Bedrooms', sub: '3-4 movers' },
    { id: '3bed', label: '3 Bedrooms', sub: '4-5 movers' },
    { id: '4bed', label: '4+ Bed Home', sub: '5+ movers' },
    { id: 'office', label: 'Office Space', sub: 'Custom team' },
  ];

  return (
    <div className="bg-slate-50/70 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Instant Moving Calculator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
            Calculate Your Moving Cost
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Adjust your property size, travel distance, and extra options to see a transparent price breakdown in real time.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simple Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Property Size Selector */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <label className="block text-sm font-bold text-slate-900">
                1. Select Property Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPropertyType(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      propertyType === opt.id
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900">
                  2. Estimated Move Distance
                </label>
                <span className="text-sm font-bold text-blue-600 font-mono bg-blue-50 px-2.5 py-1 rounded-lg">
                  {distanceKm} km {distanceKm > 100 ? '(Interstate)' : '(Local)'}
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="800"
                step="5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>5 km (Local Move)</span>
                <span>100 km (Metro)</span>
                <span>400 km</span>
                <span>800 km (Long Distance)</span>
              </div>
            </div>

            {/* Extra Options */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <label className="block text-sm font-bold text-slate-900">
                3. Additional Services
              </label>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includePacking}
                      onChange={(e) => setIncludePacking(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Full Packing & Wrapping</span>
                      <span className="text-[11px] text-slate-500">Boxes, bubble wrap & tape included</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">+₦35,000</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeAssembly}
                      onChange={(e) => setIncludeAssembly(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Furniture Disassembly & Setup</span>
                      <span className="text-[11px] text-slate-500">Beds, wardrobes & dining tables reassembled</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">+₦20,000</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeStorage}
                      onChange={(e) => setIncludeStorage(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Temporary Vault Storage</span>
                      <span className="text-[11px] text-slate-500">Secure, 24/7 monitored facility</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">+₦25,000/wk</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Estimate Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Estimated Total
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  Guaranteed Rate
                </span>
              </div>

              {/* Price Range */}
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                  {formatCurrency(estimate.minPrice, currency)}
                </div>
                <p className="text-xs text-slate-500">
                  Approx. {formatCurrency(estimate.minPrice, currency)} – {formatCurrency(estimate.maxPrice, currency)} based on final inventory
                </p>
              </div>

              {/* Inclusions checklist */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Recommended Vehicle:</span>
                  <span className="font-semibold text-slate-900">{estimate.recommendedVehicleLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Crew Size:</span>
                  <span className="font-semibold text-slate-900">{estimate.estimatedCrewSize} Movers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Duration:</span>
                  <span className="font-semibold text-slate-900">{estimate.estimatedHours} Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GIT Insurance Protection:</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Included
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={onNavigateToQuote}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Move With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 text-center">
                Need customized corporate handling or piano crating? Call our concierge at <a href="tel:+2348167629156" className="font-semibold text-slate-700 hover:text-emerald-700 underline">+234 0816 762 9156</a>.
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
