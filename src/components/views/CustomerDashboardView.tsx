import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  User, 
  Phone, 
  Plus, 
  Trash2, 
  Edit3, 
  Send, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Lock,
  ChevronRight,
  Eye,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMove } from '../../context/MoveContext';
import { formatCurrency } from '../../utils/pricing';
import { ItemCategory, InventoryItem, PaymentStatus, MoveStatus } from '../../types';

export const CustomerDashboardView: React.FC = () => {
  const { 
    activeMove, 
    moves, 
    currentMoveId, 
    setCurrentMoveId, 
    currency, 
    updateMoveStatus, 
    makePayment, 
    addInventoryItem, 
    updateInventoryItem, 
    deleteInventoryItem, 
    sendMessage 
  } = useMove();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'my-move' | 'items' | 'documents' | 'payments' | 'messages' | 'support' | 'settings'
  >('overview');

  // New Item State
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ItemCategory>('Living Room');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemFragile, setNewItemFragile] = useState(false);

  // Chat message input
  const [chatInput, setChatInput] = useState('');

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Document Viewer
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  if (!activeMove) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-20 text-center">
        <p className="text-sm text-gray-500">No active move selected.</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage(activeMove.id, chatInput.trim(), 'customer');
    setChatInput('');
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addInventoryItem(activeMove.id, {
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQty,
      isFragile: newItemFragile,
      volumeCbmPerUnit: 0.8,
      weightKgPerUnit: 25,
    });

    setNewItemName('');
    setNewItemQty(1);
    setNewItemFragile(false);
    setShowAddItemModal(false);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      makePayment(activeMove.id, paymentAmount, paymentType);
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }, 1200);
  };

  const openDepositPayment = () => {
    const dep = activeMove.finalPrice ? Math.round(activeMove.finalPrice * 0.5) : Math.round(activeMove.estimatedCostMin * 0.5);
    setPaymentAmount(dep);
    setPaymentType('deposit');
    setShowPaymentModal(true);
  };

  const openFullPayment = () => {
    const full = activeMove.finalPrice || activeMove.estimatedCostMax;
    setPaymentAmount(full - activeMove.depositAmount);
    setPaymentType('full');
    setShowPaymentModal(true);
  };

  const getStatusDisplay = (st: MoveStatus) => {
    switch (st) {
      case 'quote_requested': return { text: 'Quote Requested', color: 'bg-amber-100 text-amber-800' };
      case 'quote_confirmed': return { text: 'Quote Confirmed', color: 'bg-blue-100 text-blue-800' };
      case 'packing_scheduled': return { text: 'Packing Scheduled', color: 'bg-indigo-100 text-indigo-800' };
      case 'packing_complete': return { text: 'Packing Complete', color: 'bg-purple-100 text-purple-800' };
      case 'pickup_complete': return { text: 'Loaded & Sealed', color: 'bg-sky-100 text-sky-800' };
      case 'in_transit': return { text: 'In Transit On Route', color: 'bg-blue-600 text-white' };
      case 'arriving_soon': return { text: 'Arriving Soon', color: 'bg-emerald-100 text-emerald-800' };
      case 'delivered':
      case 'completed': return { text: 'Delivered & Complete', color: 'bg-green-100 text-green-800' };
      default: return { text: st, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusInfo = getStatusDisplay(activeMove.status);

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Switcher Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#E4E7EC] shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B1220] text-white flex items-center justify-center font-bold font-mono">
              {activeMove.id.split('-')[1]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Client Portal: {activeMove.customerName}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusInfo.color}`}>
                  {statusInfo.text}
                </span>
              </div>
              <p className="text-xs text-[#667085]">
                Reference: <strong className="font-mono text-[#155EEF]">#{activeMove.id}</strong> • {activeMove.pickupCity} → {activeMove.destinationCity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#667085] hidden md:inline">Switch Active Move:</span>
            <select
              value={currentMoveId}
              onChange={(e) => setCurrentMoveId(e.target.value)}
              className="px-3 py-1.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-xs font-semibold text-[#111827]"
            >
              {moves.map((m) => (
                <option key={m.id} value={m.id}>
                  #{m.id} - {m.customerName.split(' ')[0]} ({m.pickupCity.split(',')[0]} → {m.destinationCity.split(',')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dashboard Shell (Sidebar + Main View) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-[#E4E7EC] shadow-sm space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'my-move', label: 'My Move & Route', icon: <Truck className="w-4 h-4" /> },
              { id: 'items', label: 'Items & Inventory', count: activeMove.inventory.length, icon: <Package className="w-4 h-4" /> },
              { id: 'documents', label: 'Documents & COI', count: activeMove.documents.length, icon: <FileText className="w-4 h-4" /> },
              { id: 'payments', label: 'Payments & Invoices', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'messages', label: 'Messages & Support', count: activeMove.messages.length, icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'support', label: 'Help & Concierge', icon: <HelpCircle className="w-4 h-4" /> },
              { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`cust-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#155EEF] text-white shadow-sm font-bold'
                      : 'text-[#475467] hover:bg-[#F2F4F7] hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EAECF0] text-[#344054]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Coordinator Quick Card in Sidebar */}
            <div className="pt-4 mt-4 border-t border-[#F2F4F7] p-3 rounded-2xl bg-[#F8FAFC]">
              <span className="text-[10px] uppercase font-bold text-[#667085] block mb-2">
                Dedicated Coordinator
              </span>
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Move Coordinator"
                  className="w-9 h-9 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 truncate">
                  <h4 className="text-xs font-bold text-[#111827]">Ngozi Eze</h4>
                  <span className="text-[10px] text-[#12B76A] block">● Active Online</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('messages')}
                className="w-full mt-2.5 py-1.5 rounded-lg bg-white border border-[#D0D5DD] text-[11px] font-bold text-[#155EEF] hover:bg-[#155EEF] hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Message Ngozi</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 6 Key Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#667085] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#155EEF]" /> Move Status
                    </span>
                    <h3 className="text-sm font-bold text-[#111827] truncate">{statusInfo.text}</h3>
                    <span className="text-[11px] text-[#667085] block">Route active</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#667085] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" /> Moving Date
                    </span>
                    <h3 className="text-sm font-bold text-[#111827]">{activeMove.moveDate}</h3>
                    <span className="text-[11px] text-[#667085] block capitalize">{activeMove.moveTimeSlot} Slot</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#667085] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#155EEF]" /> Pickup Location
                    </span>
                    <h3 className="text-sm font-bold text-[#111827] truncate">{activeMove.pickupCity}</h3>
                    <span className="text-[11px] text-[#667085] block truncate">{activeMove.pickupAddress}</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#667085] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#12B76A]" /> Destination
                    </span>
                    <h3 className="text-sm font-bold text-[#111827] truncate">{activeMove.destinationCity}</h3>
                    <span className="text-[11px] text-[#667085] block truncate">{activeMove.destinationAddress}</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#667085] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#D4A72C]" /> Estimated Cost
                    </span>
                    <h3 className="text-sm font-bold text-[#155EEF]">
                      {activeMove.finalPrice ? formatCurrency(activeMove.finalPrice, currency) : `${formatCurrency(activeMove.estimatedCostMin, currency)} - ${formatCurrency(activeMove.estimatedCostMax, currency)}`}
                    </h3>
                    <span className="text-[11px] text-[#667085] block">Deposit: {formatCurrency(activeMove.depositAmount, currency)}</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#667085] flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-[#12B76A]" /> Payment Status
                    </span>
                    <h3 className="text-sm font-bold text-[#111827] capitalize">
                      {activeMove.paymentStatus.replace('_', ' ')}
                    </h3>
                    {activeMove.paymentStatus !== 'paid_in_full' ? (
                      <button
                        onClick={openDepositPayment}
                        className="text-[11px] font-bold text-[#155EEF] hover:underline"
                      >
                        Make Payment →
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#12B76A] font-bold">✓ Complete</span>
                    )}
                  </div>
                </div>

                {/* Visual Journey Card */}
                <div className="bg-gradient-to-r from-[#0B1220] to-[#1E293B] text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D4A72C] tracking-wider">
                        ACTIVE RELOCATION JOURNEY
                      </span>
                      <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                        {activeMove.pickupCity} → {activeMove.destinationCity}
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('my-move')}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors self-start sm:self-auto"
                    >
                      View Live Route Map
                    </button>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="relative pt-2">
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#155EEF] via-[#2F80ED] to-[#12B76A] w-2/3 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#94A3B8] mt-2 font-mono">
                      <span>Loaded & Sealed (PHC)</span>
                      <span className="text-[#12B76A] font-bold">En Route ({activeMove.distanceKm} km total)</span>
                      <span>Delivery in Ikoyi</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-[#94A3B8] block">Assigned Driver:</span>
                      <strong className="text-white">{activeMove.leadDriverName || 'Captain Emeka Okafor'}</strong>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block">Vehicle:</span>
                      <strong className="text-white">{activeMove.assignedVehicleName || 'Isuzu Air-Ride Box Truck'}</strong>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] block">Insurance Seal:</span>
                      <strong className="text-[#D4A72C]">#88492-MXP (Active)</strong>
                    </div>
                  </div>
                </div>

                {/* Quick Action Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    onClick={() => setActiveTab('items')}
                    className="cursor-pointer p-5 rounded-2xl bg-white border border-[#E4E7EC] hover:border-[#155EEF] hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#155EEF]/10 text-[#155EEF] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Manage Inventory</h4>
                    <p className="text-xs text-[#667085]">
                      {activeMove.inventory.length} items logged. Add custom furniture or fragile pieces.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab('payments')}
                    className="cursor-pointer p-5 rounded-2xl bg-white border border-[#E4E7EC] hover:border-[#155EEF] hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#12B76A]/10 text-[#12B76A] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Invoices & Payments</h4>
                    <p className="text-xs text-[#667085]">
                      Pay deposit, download receipts, or approve final quote adjustments.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab('messages')}
                    className="cursor-pointer p-5 rounded-2xl bg-white border border-[#E4E7EC] hover:border-[#155EEF] hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#D4A72C]/10 text-[#D4A72C] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Live Coordinator Chat</h4>
                    <p className="text-xs text-[#667085]">
                      Direct message line with your moving concierge and lead driver.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* MY MOVE TAB */}
            {activeTab === 'my-move' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E7EC] shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F2F4F7]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                      Live Relocation Milestones & Route Telemetry
                    </h3>
                    <p className="text-xs text-[#667085]">
                      Real-time status updates from origin loading to destination unpacking.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#12B76A]/10 text-[#12B76A] text-xs font-bold">
                    GPS Active
                  </span>
                </div>

                {/* Timeline list */}
                <div className="space-y-6 pl-4 border-l-2 border-[#E4E7EC]">
                  {activeMove.timeline.map((evt, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div
                        className={`absolute -left-[25px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                          evt.completed
                            ? 'bg-[#155EEF] border-[#155EEF] text-white'
                            : evt.current
                            ? 'bg-[#D4A72C] border-white text-white ring-4 ring-[#D4A72C]/30'
                            : 'bg-white border-[#D0D5DD] text-[#98A2B3]'
                        }`}
                      >
                        {evt.completed ? '✓' : idx + 1}
                      </div>

                      <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#EAECF0]">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#111827]">{evt.label}</h4>
                          {evt.date && <span className="text-xs font-mono text-[#667085]">{evt.date} {evt.time}</span>}
                        </div>
                        <p className="text-xs text-[#475467] mt-1">{evt.description}</p>
                        {evt.location && (
                          <div className="mt-2 text-xs font-semibold text-[#155EEF] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Current telemetry location: {evt.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ITEMS & INVENTORY TAB (As explicitly requested in prompt) */}
            {activeTab === 'items' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E7EC] shadow-sm space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F2F4F7]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                      Item Inventory Management
                    </h3>
                    <p className="text-xs text-[#667085]">
                      Log, update, or edit your household furniture and boxes.
                    </p>
                  </div>

                  <button
                    id="dashboard-add-item-btn"
                    onClick={() => setShowAddItemModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1048b8] text-white font-bold text-xs shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Item</span>
                  </button>
                </div>

                {/* Inventory Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[#667085] uppercase font-bold text-[10px]">
                        <th className="py-3 px-4">Item Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4">Handling / Fragility</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {activeMove.inventory.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-[#111827]">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4 text-[#667085]">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => updateInventoryItem(activeMove.id, item.id, { quantity: Math.max(1, item.quantity - 1) })}
                                className="w-6 h-6 rounded bg-[#EAECF0] hover:bg-[#D0D5DD] text-black font-bold flex items-center justify-center text-xs"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold w-6 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateInventoryItem(activeMove.id, item.id, { quantity: item.quantity + 1 })}
                                className="w-6 h-6 rounded bg-[#155EEF] hover:bg-[#1048b8] text-white font-bold flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            {item.isFragile ? (
                              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                                ⚠️ Custom Fragile Padding
                              </span>
                            ) : (
                              <span className="text-[#98A2B3] text-[11px]">Standard Care</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => deleteInventoryItem(activeMove.id, item.id)}
                              className="p-1.5 rounded-lg text-[#98A2B3] hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E7EC] shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F2F4F7]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                      Documents, Contracts & Insurance Policy
                    </h3>
                    <p className="text-xs text-[#667085]">
                      Download certified bills of lading, inventory audits, and receipts.
                    </p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#12B76A]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeMove.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#EAECF0] hover:border-[#155EEF] transition-all flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#155EEF]/10 text-[#155EEF] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#111827] leading-tight">{doc.title}</h4>
                          <span className="text-[10px] text-[#667085] block mt-1">
                            {doc.date} • {doc.size}
                          </span>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#ECFDF3] text-[#027A48] text-[10px] font-bold uppercase">
                            {doc.status}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="p-2 rounded-lg bg-white border border-[#D0D5DD] hover:bg-[#155EEF] hover:text-white text-[#344054] transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E7EC] shadow-sm space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F2F4F7]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                      Billing, Invoices & Payment Schedule
                    </h3>
                    <p className="text-xs text-[#667085]">
                      Secure escrow deposits and transparent billing with zero surprise fees.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ECFDF3] text-[#027A48] text-xs font-bold">
                    Escrow Protected
                  </span>
                </div>

                {/* Cost Breakdown Card */}
                <div className="p-6 rounded-2xl bg-[#0B1220] text-white space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D4A72C]">Total Move Price</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                        {formatCurrency(activeMove.finalPrice || activeMove.estimatedCostMax, currency)}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Paid to Date</span>
                      <div className="text-xl font-bold text-[#12B76A] font-mono">
                        {formatCurrency(activeMove.depositAmount, currency)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-[#94A3B8]">
                      Payment Status: <strong className="text-white capitalize">{activeMove.paymentStatus.replace('_', ' ')}</strong>
                    </span>

                    {activeMove.paymentStatus !== 'paid_in_full' && (
                      <div className="flex items-center gap-2">
                        {activeMove.depositAmount === 0 && (
                          <button
                            onClick={openDepositPayment}
                            className="px-4 py-2 rounded-xl bg-[#D4A72C] text-[#0B1220] text-xs font-bold hover:bg-[#C29624] transition-colors"
                          >
                            Pay 50% Deposit
                          </button>
                        )}
                        <button
                          onClick={openFullPayment}
                          className="px-4 py-2 rounded-xl bg-[#155EEF] text-white text-xs font-bold hover:bg-[#1048b8] transition-colors"
                        >
                          Pay Remaining Balance
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MESSAGES TAB (Live chat with Coordinator and Driver) */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-3xl p-6 border border-[#E4E7EC] shadow-sm flex flex-col h-[520px] animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-[#F2F4F7] shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                        alt="Ngozi"
                        className="w-10 h-10 rounded-full object-cover border"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#12B76A] border-2 border-white"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">Move Concierge & Crew Dispatch</h4>
                      <p className="text-[11px] text-[#667085]">Direct line with Ngozi Eze and Captain Emeka</p>
                    </div>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
                  {activeMove.messages.map((msg) => {
                    const isMe = msg.sender === 'customer';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 max-w-[85%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
                      >
                        {!isMe && (
                          <img
                            src={msg.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'}
                            alt={msg.senderName}
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div
                          className={`p-3 rounded-2xl text-xs space-y-1 ${
                            isMe
                              ? 'bg-[#155EEF] text-white rounded-br-none'
                              : 'bg-[#F2F4F7] text-[#111827] rounded-bl-none'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-semibold">
                            <span>{msg.senderName}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p className="leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#F2F4F7] flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type instructions or questions for your move team..."
                    className="flex-1 px-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#155EEF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1048b8] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* SUPPORT & SETTINGS TAB */}
            {(activeTab === 'support' || activeTab === 'settings') && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E7EC] shadow-sm space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  XpressMovement 24/7 VIP Client Care
                </h3>
                <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] space-y-2 text-xs text-[#1E40AF]">
                  <strong className="block text-sm">Need urgent help during active transit?</strong>
                  <p>
                    Call our 24/7 dedicated dispatch hotline directly at <strong>+234 905 987 6543</strong> or WhatsApp our operations center for immediate assistance.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl border border-[#EAECF0]">
                    <span className="font-bold text-[#111827] block">Zero-Damage Protection Policy</span>
                    <span className="text-[#667085] mt-1 block">Full replacement indemnity on all crated valuables.</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#EAECF0]">
                    <span className="font-bold text-[#111827] block">Delivery Window Guarantee</span>
                    <span className="text-[#667085] mt-1 block">Strict on-time execution with continuous telemetry.</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#111827]">Add Item to Move Manifest</h3>
              <button onClick={() => setShowAddItemModal(false)} className="text-gray-400 hover:text-black">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Item Description</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Marble Center Table, Glass Mirror, Grand Piano"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as ItemCategory)}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Dining">Dining</option>
                    <option value="Office">Office</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newItemQty}
                    onChange={(e) => setNewItemQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-900">Fragile / High-Value Item?</span>
                <input
                  type="checkbox"
                  checked={newItemFragile}
                  onChange={(e) => setNewItemFragile(e.target.checked)}
                  className="w-4 h-4 accent-amber-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#155EEF] text-white text-xs font-bold shadow-md"
                >
                  Save to Manifest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#155EEF]" />
                <h3 className="text-base font-bold text-[#111827]">Secure Move Payment Checkout</h3>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-black">
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1220] text-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#D4A72C]">Payment Summary</span>
              <div className="text-2xl font-extrabold font-mono">
                {formatCurrency(paymentAmount, currency)}
              </div>
              <span className="text-xs text-slate-400 block capitalize">
                {paymentType === 'full' ? 'Full Settlement' : '50% Initial Escrow Deposit'} (Ref: #{activeMove.id})
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <label className="block font-semibold text-gray-700">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl border-2 border-[#155EEF] bg-blue-50 text-center font-bold text-[#155EEF] cursor-pointer">
                  Bank Transfer
                </div>
                <div className="p-2.5 rounded-xl border border-gray-200 text-center font-medium text-gray-700 hover:border-gray-400 cursor-pointer">
                  Debit Card
                </div>
                <div className="p-2.5 rounded-xl border border-gray-200 text-center font-medium text-gray-700 hover:border-gray-400 cursor-pointer">
                  USSD / QR
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border text-xs text-gray-600 space-y-1">
              <span className="font-bold text-gray-900 block">XpressMovement Escrow Trust Guarantee</span>
              <p className="text-[11px]">Funds are held securely and only finalized upon validated room delivery and sign-off.</p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2.5 rounded-xl border text-xs font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessingPayment}
                className="px-6 py-2.5 rounded-xl bg-[#12B76A] hover:bg-[#0fa05b] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                {isProcessingPayment ? (
                  <span>Processing Receipt...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorize {formatCurrency(paymentAmount, currency)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#111827] truncate pr-2">{selectedDoc.title}</h3>
              <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-black">
                ✕
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border text-center space-y-3">
              <FileText className="w-12 h-12 text-[#155EEF] mx-auto" />
              <h4 className="text-sm font-bold text-[#111827]">{selectedDoc.title}</h4>
              <p className="text-xs text-gray-500">
                Official document registered on {selectedDoc.date} • File size: {selectedDoc.size}
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                ✓ Cryptographically Certified & Signed
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2 rounded-xl bg-[#155EEF] text-white text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
