import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Truck, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  ArrowRight
} from 'lucide-react';
import { useMove } from '../../context/MoveContext';
import { formatCurrency } from '../../utils/pricing';
import { MoveStatus } from '../../types';

interface TrackMoveViewProps {
  onOpenCustomerDashboard?: () => void;
  onOpenCallModal: () => void;
}

export const TrackMoveView: React.FC<TrackMoveViewProps> = ({
  onOpenCustomerDashboard,
  onOpenCallModal,
}) => {
  const { moves, currentMoveId, setCurrentMoveId, activeMove, currency } = useMove();
  const [searchInput, setSearchInput] = useState(currentMoveId || (moves[0]?.id ?? 'LM-2048'));
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchInput.trim().toUpperCase();
    const found = moves.find((m) => m.id.toUpperCase() === cleanId);
    if (found) {
      setCurrentMoveId(found.id);
      setSearchError(null);
    } else {
      setSearchError(`Move reference #${cleanId} not found. Please try LM-2048 or LM-3091.`);
    }
  };

  const currentData = activeMove || moves[0];

  const getStatusBadge = (status: MoveStatus) => {
    switch (status) {
      case 'in_transit':
        return <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">In Transit On Route</span>;
      case 'delivered':
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">Delivered & Complete</span>;
      case 'packing_scheduled':
      case 'packing_complete':
        return <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">Packing Scheduled</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">Confirmed</span>;
    }
  };

  const steps = [
    { title: 'Booking Confirmed', done: true, time: 'Aug 18, 10:30 AM' },
    { title: 'Packing & Inventory Packed', done: true, time: 'Aug 19, 08:00 AM' },
    { title: 'Loaded & On Route', done: currentData?.status === 'in_transit' || currentData?.status === 'delivered', active: currentData?.status === 'in_transit', time: 'Aug 20, 06:15 AM' },
    { title: 'Delivered to Destination', done: currentData?.status === 'delivered', time: 'Estimated: Aug 21, 02:00 PM' },
  ];

  return (
    <div className="bg-slate-50/70 py-12 sm:py-16 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Search */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Move Status
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
            Track Your Move
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Enter your booking reference code to check real-time status and driver details.
          </p>

          {/* Clean Search Input */}
          <form onSubmit={handleSearch} className="pt-2">
            <div className="flex items-center bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Move ID (e.g. LM-2048)"
                className="w-full px-3 py-2 text-sm text-slate-900 font-semibold focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                Track
              </button>
            </div>
            {searchError && (
              <p className="text-xs text-rose-600 mt-2 font-medium">{searchError}</p>
            )}
          </form>
        </div>

        {/* Move Card */}
        {currentData && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
            
            {/* Top Bar: Move ID & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">REFERENCE:</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">#{currentData.id}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Booked for <span className="font-medium text-slate-800">{currentData.customerName}</span>
                </p>
              </div>

              <div>
                {getStatusBadge(currentData.status)}
              </div>
            </div>

            {/* Route Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Origin Address</span>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">{currentData.originAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Destination Address</span>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">{currentData.destAddress}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Move Progress</h3>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="mt-0.5">
                      {step.done ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                          ✓
                        </div>
                      ) : step.active ? (
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs animate-pulse">
                          •
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 pb-3 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${step.active ? 'text-blue-600' : 'text-slate-800'}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver & Support Contact */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {currentData.assignedDriver?.name ? currentData.assignedDriver.name.charAt(0) : 'D'}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Driver: {currentData.assignedDriver?.name || 'Emmanuel Adeyemi'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Vehicle: {currentData.assignedDriver?.truckPlate || 'LAG-849-XA (Mercedes Actros)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${currentData.assignedDriver?.phone || '+2348167629156'}`}
                  className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Driver</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
