import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Users, 
  DollarSign, 
  Package, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Edit3, 
  Check, 
  Sliders, 
  AlertTriangle, 
  Plus, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useMove } from '../../context/MoveContext';
import { formatCurrency } from '../../utils/pricing';
import { MoveStatus } from '../../types';
import { XpressMovementIcon } from '../brand/XpressMovementLogo';

export const AdminDashboardView: React.FC = () => {
  const { 
    moves, 
    vehicles, 
    teams, 
    currency, 
    updateMoveStatus, 
    assignFleetToMove, 
    updateFinalPrice, 
    setCurrentMoveId 
  } = useMove();

  const [activeAdminTab, setActiveAdminTab] = useState<'moves' | 'fleet' | 'team' | 'dispatch'>('moves');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Edit Move Modal in Admin
  const [editingMoveId, setEditingMoveId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<MoveStatus>('in_transit');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newDriver, setNewDriver] = useState<string>('');
  const [newVehicle, setNewVehicle] = useState<string>('');

  // Metrics calculation
  const totalMoves = moves.length;
  const activeMoves = moves.filter((m) => ['in_transit', 'packing_scheduled', 'packing_complete', 'pickup_complete'].includes(m.status)).length;
  const pendingQuotes = moves.filter((m) => m.status === 'quote_requested').length;
  const totalRevenue = moves.reduce((sum, m) => sum + (m.finalPrice || m.depositAmount || m.estimatedCostMin), 0);
  const fleetUtilization = Math.round((vehicles.filter((v) => v.status === 'in_transit').length / vehicles.length) * 100);

  const filteredMoves = moves.filter((m) => {
    const matchesSearch = 
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.pickupCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (moveId: string) => {
    const target = moves.find((m) => m.id === moveId);
    if (!target) return;
    setEditingMoveId(target.id);
    setNewStatus(target.status);
    setNewPrice(target.finalPrice || target.estimatedCostMax);
    setNewDriver(target.leadDriverName || teams[0]?.name || '');
    setNewVehicle(target.assignedVehicleName || vehicles[0]?.name || '');
  };

  const handleSaveEdit = () => {
    if (!editingMoveId) return;
    updateMoveStatus(editingMoveId, newStatus);
    if (newPrice > 0) {
      updateFinalPrice(editingMoveId, newPrice);
    }
    const driverObj = teams.find((t) => t.name === newDriver);
    assignFleetToMove(
      editingMoveId, 
      newVehicle, 
      newDriver, 
      driverObj?.phone || '+234 0816 762 9156',
      driverObj?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    );
    setEditingMoveId(null);
  };

  return (
    <div className="bg-[#0B1220] min-h-screen text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <XpressMovementIcon className="w-9 h-9 ring-1 ring-emerald-500/40" />
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  XpressMovement Dispatch Operations Command
                </h1>
                <span className="text-xs bg-[#D4A72C]/20 border border-[#D4A72C]/40 text-[#D4A72C] font-bold px-2 py-0.5 rounded-full">
                  ADMIN VIP
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 pl-12">
              Real-time fleet telematics, booking approvals, and nationwide driver coordination.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 bg-[#162032] p-1.5 rounded-2xl border border-[#1E293B]">
            {[
              { id: 'moves', label: 'Moves Dispatch', icon: <Package className="w-3.5 h-3.5" /> },
              { id: 'fleet', label: 'Fleet Grid', icon: <Truck className="w-3.5 h-3.5" /> },
              { id: 'team', label: 'Crew Roster', icon: <Users className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeAdminTab === tab.id
                    ? 'bg-[#155EEF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5 High-Impact Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-[#111C30] p-4 rounded-2xl border border-[#1E293B] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-[#155EEF]" /> Total Orders
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">{totalMoves}</div>
            <span className="text-[11px] text-[#12B76A] font-semibold">100% On-Time Log</span>
          </div>

          <div className="bg-[#111C30] p-4 rounded-2xl border border-[#1E293B] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#12B76A]" /> Active On Route
            </span>
            <div className="text-2xl font-extrabold text-[#12B76A] font-mono">{activeMoves}</div>
            <span className="text-[11px] text-slate-400">GPS Live Ping Active</span>
          </div>

          <div className="bg-[#111C30] p-4 rounded-2xl border border-[#1E293B] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4A72C]" /> Pending Quotes
            </span>
            <div className="text-2xl font-extrabold text-[#D4A72C] font-mono">{pendingQuotes}</div>
            <span className="text-[11px] text-amber-400">Awaiting Assessment</span>
          </div>

          <div className="bg-[#111C30] p-4 rounded-2xl border border-[#1E293B] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#60A5FA]" /> Fleet Utilization
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">{fleetUtilization}%</div>
            <span className="text-[11px] text-slate-400">{vehicles.length} Trucks Deployed</span>
          </div>

          <div className="bg-[#111C30] p-4 rounded-2xl border border-[#1E293B] shadow-sm space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#D4A72C]" /> Cumulative Volume
            </span>
            <div className="text-lg font-extrabold text-[#D4A72C] font-mono truncate">
              {formatCurrency(totalRevenue, currency)}
            </div>
            <span className="text-[11px] text-slate-400">Escrow Protected</span>
          </div>
        </div>

        {/* TAB 1: MOVES DISPATCH TABLE */}
        {activeAdminTab === 'moves' && (
          <div className="bg-[#111C30] rounded-3xl p-6 border border-[#1E293B] shadow-lg space-y-5 animate-fade-in">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Move ID, client, or city..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0B1220] border border-[#1E293B] rounded-xl text-xs text-white focus:outline-none focus:border-[#155EEF]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0B1220] border border-[#1E293B] rounded-xl text-xs text-slate-200"
                >
                  <option value="all">All Move Statuses</option>
                  <option value="quote_requested">Quote Requested</option>
                  <option value="quote_confirmed">Quote Confirmed</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered / Completed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E293B] text-slate-400 uppercase font-bold text-[10px] bg-[#0B1220]/50">
                    <th className="py-3 px-4">Move Ref</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Route & Date</th>
                    <th className="py-3 px-4">Property / Vol</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Assigned Crew</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {filteredMoves.map((m) => (
                    <tr key={m.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#60A5FA]">
                        #{m.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{m.customerName}</span>
                        <span className="text-[10px] text-slate-400">{m.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 block truncate">
                          {m.pickupCity.split(',')[0]} → {m.destinationCity.split(',')[0]}
                        </span>
                        <span className="text-[10px] text-slate-400">{m.moveDate}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 font-semibold uppercase">{m.propertyType}</span>
                        <span className="text-[10px] text-slate-400 block">{m.inventory.length} items</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#155EEF]/20 text-[#60A5FA] border border-[#155EEF]/30 uppercase">
                          {m.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 block truncate">{m.leadDriverName || 'Unassigned'}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{m.assignedVehicleName || 'Fleet pending'}</span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenEdit(m.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#1048b8] text-white font-bold text-[11px] transition-colors"
                        >
                          Dispatch / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: FLEET MANAGEMENT */}
        {activeAdminTab === 'fleet' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {vehicles.map((v) => (
              <div key={v.id} className="bg-[#111C30] rounded-3xl p-6 border border-[#1E293B] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1220] text-[#155EEF] flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{v.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{v.plateNumber}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      v.status === 'in_transit'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse'
                        : v.status === 'available'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {v.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0B1220] p-3 rounded-2xl border border-[#1E293B]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Capacity</span>
                    <strong className="text-white">{v.capacityCbm} m³ / {v.capacityTons} Tons</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Telemetry</span>
                    <strong className="text-[#12B76A]">Air-Ride & Tailgate</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Assigned Move:</span>
                    <strong className="text-white font-mono">{v.currentMoveId ? `#${v.currentMoveId}` : 'Standby Depot'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>GPS Telematics:</span>
                    <strong className="text-[#60A5FA]">Active Live Feed</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CREW ROSTER */}
        {activeAdminTab === 'team' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {teams.map((member) => (
              <div key={member.id} className="bg-[#111C30] rounded-3xl p-6 border border-[#1E293B] shadow-sm space-y-4 text-center">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-[#1E293B] shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <span className="text-xs text-[#D4A72C] font-semibold block">{member.role}</span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">{member.phone}</span>
                </div>

                <div className="pt-2 border-t border-[#1E293B] text-xs flex items-center justify-between text-slate-400">
                  <span>Rating: <strong className="text-white">★ {member.rating}</strong></span>
                  <span>Moves: <strong className="text-white">{member.completedMoves}+</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Edit Move / Dispatch Modal */}
      {editingMoveId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111C30] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#1E293B] space-y-5 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div>
                <h3 className="text-base font-bold text-white">Dispatch Operations Editor</h3>
                <span className="text-xs text-slate-400">Updating Move #{editingMoveId}</span>
              </div>
              <button onClick={() => setEditingMoveId(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status Milestone</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as MoveStatus)}
                  className="w-full px-3 py-2.5 bg-[#0B1220] border border-[#1E293B] rounded-xl text-white font-medium"
                >
                  <option value="quote_requested">Quote Requested (Pending)</option>
                  <option value="quote_confirmed">Quote Confirmed & Approved</option>
                  <option value="packing_scheduled">Packing Scheduled</option>
                  <option value="packing_complete">Packing Complete & Boxed</option>
                  <option value="pickup_complete">Pickup Complete & Tamper Sealed</option>
                  <option value="in_transit">In Transit On Highway</option>
                  <option value="arriving_soon">Arriving Soon (15 min ETA)</option>
                  <option value="delivered">Delivered & Assembled</option>
                  <option value="completed">Completed & Signed Off</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Approved Final Price (₦)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#0B1220] border border-[#1E293B] rounded-xl text-white font-mono font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Assigned Lead Captain</label>
                  <select
                    value={newDriver}
                    onChange={(e) => setNewDriver(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0B1220] border border-[#1E293B] rounded-xl text-white"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Assigned Fleet Vehicle</label>
                  <select
                    value={newVehicle}
                    onChange={(e) => setNewVehicle(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0B1220] border border-[#1E293B] rounded-xl text-white"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={() => setEditingMoveId(null)}
                className="px-4 py-2.5 rounded-xl border border-[#1E293B] text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1048b8] text-white text-xs font-bold shadow-md"
              >
                Save Dispatch Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
