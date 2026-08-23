import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Home, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Mail, 
  User, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PropertyType, ServiceType } from '../../types';
import { useMove } from '../../context/MoveContext';

interface QuoteRequestViewProps {
  onQuoteCreated: (moveId: string) => void;
  onNavigateToTrack: () => void;
}

export const QuoteRequestView: React.FC<QuoteRequestViewProps> = ({
  onQuoteCreated,
  onNavigateToTrack,
}) => {
  const { createQuote } = useMove();

  const [fullName, setFullName] = useState('David Adeleke');
  const [phoneNumber, setPhoneNumber] = useState('+234 810 555 1234');
  const [email, setEmail] = useState('david.adeleke@example.com');
  
  const [pickupAddress, setPickupAddress] = useState('12 Victoria Island, Lagos');
  const [destAddress, setDestAddress] = useState('5 Maitama District, Abuja');
  const [moveDate, setMoveDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  
  const [propertyType, setPropertyType] = useState<PropertyType>('2bed');
  const [needPacking, setNeedPacking] = useState<boolean>(true);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const services: ServiceType[] = ['loading', 'transportation', 'unloading'];
    if (needPacking) services.push('packing', 'furniture_assembly');

    const newMove = createQuote({
      customerName: fullName,
      customerPhone: phoneNumber,
      customerEmail: email,
      pickupAddress: pickupAddress,
      pickupCity: pickupAddress.split(',')[1]?.trim() || 'Lagos',
      destinationAddress: destAddress,
      destinationCity: destAddress.split(',')[1]?.trim() || 'Abuja',
      moveDate: moveDate,
      propertyType: propertyType,
      services: services,
      specialItems: specialNotes ? [specialNotes] : [],
    });

    try {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } catch (_) {}

    setSubmittedRef(newMove.id);
    onQuoteCreated(newMove.id);
  };

  if (submittedRef) {
    return (
      <div className="bg-slate-50/70 py-16 min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-md text-center space-y-6 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Move Requested Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Thank you, <span className="font-semibold text-slate-800">{fullName}</span>. A dedicated moving coordinator will confirm the details shortly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Booking Reference:</span>
              <span className="font-mono font-bold text-blue-600">{submittedRef}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Scheduled Date:</span>
              <span className="font-semibold text-slate-800">{moveDate}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Pickup:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[180px]">{pickupAddress}</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={onNavigateToTrack}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Track This Move</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSubmittedRef(null)}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Book Another Move
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/70 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Simple Booking
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
            Request a Free Moving Quote
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Fill in your move details below. We guarantee 100% transparent pricing without hidden surprises.
          </p>
        </div>

        {/* Clean Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Section 1: Locations & Schedule */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>1. Move Addresses & Schedule</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pickup Address</label>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="e.g. 12 Victoria Island, Lagos"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destination Address</label>
                <input
                  type="text"
                  required
                  value={destAddress}
                  onChange={(e) => setDestAddress(e.target.value)}
                  placeholder="e.g. 5 Maitama District, Abuja"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property Size</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="studio">Studio / Room</option>
                    <option value="1bed">1 Bedroom Flat</option>
                    <option value="2bed">2 Bedroom Flat</option>
                    <option value="3bed">3 Bedroom Home</option>
                    <option value="4bed">4+ Bed Duplex / Mansion</option>
                    <option value="office">Corporate Office</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Move Date</label>
                  <input
                    type="date"
                    required
                    value={moveDate}
                    onChange={(e) => setMoveDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>2. Your Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+234..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Packing & Notes */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100 cursor-pointer">
              <input
                type="checkbox"
                checked={needPacking}
                onChange={(e) => setNeedPacking(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Include Full Packing & Box Materials</span>
                <span className="text-[11px] text-slate-500">Our crew will provide bubble wrap, boxes, and pack everything securely.</span>
              </div>
            </label>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Requests or Fragile Items (Optional)
              </label>
              <textarea
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. 75-inch TV, glass dining table, piano, or specific gate access instructions."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Submit & Get Instant Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              🔒 Free cancellation anytime. Your data is strictly protected.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
