import React, { useState, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Home, 
  Package, 
  Calendar, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Info, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PropertyType, ServiceType, InventoryItem } from '../types';
import { POPULAR_INVENTORY_ITEMS } from '../data/mockData';
import { calculateMoveCost, formatCurrency } from '../utils/pricing';
import { useMove } from '../context/MoveContext';
import { XpressMovementIcon } from './brand/XpressMovementLogo';

interface MovingEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: {
    pickup?: string;
    destination?: string;
    propertyType?: PropertyType;
    moveDate?: string;
  };
  onMoveCreated?: (moveId: string) => void;
}

export const MovingEstimatorModal: React.FC<MovingEstimatorModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  onMoveCreated,
}) => {
  const { currency, createQuote } = useMove();

  // Wizard Step (1 to 7, plus step 8 for results)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [pickupCity, setPickupCity] = useState(initialParams?.pickup || 'Port Harcourt, Rivers State');
  const [pickupAddress, setPickupAddress] = useState('Old GRA Avenue');
  const [pickupFloor, setPickupFloor] = useState<number>(1);
  const [pickupHasElevator, setPickupHasElevator] = useState<boolean>(true);

  const [destCity, setDestCity] = useState(initialParams?.destination || 'Ikoyi, Lagos State');
  const [destAddress, setDestAddress] = useState('Bourdillon Road');
  const [destFloor, setDestFloor] = useState<number>(3);
  const [destHasElevator, setDestHasElevator] = useState<boolean>(true);

  const [distanceKm, setDistanceKm] = useState<number>(610);

  const [propertyType, setPropertyType] = useState<PropertyType>(initialParams?.propertyType || '3bed');

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([
    'packing',
    'loading',
    'transportation',
    'unloading',
    'furniture_assembly',
  ]);

  const [moveDate, setMoveDate] = useState<string>(() => {
    if (initialParams?.moveDate) return initialParams.moveDate;
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon' | 'full_day' | 'flexible'>('morning');

  // Selected Inventory State (Item Name -> Quantity)
  const [inventoryQuantities, setInventoryQuantities] = useState<Record<string, number>>({
    '3-Seater Sofa / Sectional': 1,
    'King / Queen Size Bed & Frame': 2,
    'Double-Door Refrigerator': 1,
    '65" - 85" Smart OLED TV': 1,
    'Standard Medium Moving Box (Dishes/Books)': 10,
    'Wardrobe Box with Hanging Rail': 6,
  });

  const [activeInventoryCategory, setActiveInventoryCategory] = useState<string>('All');

  // Contact Info
  const [clientName, setClientName] = useState('Chief Adeleke Briggs');
  const [clientPhone, setClientPhone] = useState('+234 803 555 0192');
  const [clientEmail, setClientEmail] = useState('adeleke.briggs@example.com');
  const [specialInstructions, setSpecialInstructions] = useState('High-value glassware and fragile art pieces require custom crating.');

  const [createdMoveRef, setCreatedMoveRef] = useState<string | null>(null);

  // Sync initial params if passed
  React.useEffect(() => {
    if (initialParams?.pickup) setPickupCity(initialParams.pickup);
    if (initialParams?.destination) setDestCity(initialParams.destination);
    if (initialParams?.propertyType) setPropertyType(initialParams.propertyType);
    if (initialParams?.moveDate) setMoveDate(initialParams.moveDate);
  }, [initialParams]);

  // Convert current inventory quantities into InventoryItem objects
  const compiledInventory: InventoryItem[] = useMemo(() => {
    const items: InventoryItem[] = [];
    POPULAR_INVENTORY_ITEMS.forEach((catalogItem, idx) => {
      const qty = inventoryQuantities[catalogItem.name] || 0;
      if (qty > 0) {
        items.push({
          id: `est-inv-${idx}`,
          name: catalogItem.name,
          category: catalogItem.category,
          quantity: qty,
          volumeCbmPerUnit: catalogItem.volumeCbmPerUnit,
          weightKgPerUnit: catalogItem.weightKgPerUnit,
          isFragile: catalogItem.isFragile,
          requiresDisassembly: catalogItem.requiresDisassembly,
        });
      }
    });
    return items;
  }, [inventoryQuantities]);

  // Dynamic estimate calculation
  const estimate = useMemo(() => {
    return calculateMoveCost({
      propertyType,
      distanceKm,
      services: selectedServices,
      inventory: compiledInventory,
      pickupFloor,
      pickupHasElevator,
      destinationFloor: destFloor,
      destinationHasElevator: destHasElevator,
      isSpecialHandling: specialInstructions.length > 5,
    });
  }, [
    propertyType,
    distanceKm,
    selectedServices,
    compiledInventory,
    pickupFloor,
    pickupHasElevator,
    destFloor,
    destHasElevator,
    specialInstructions,
  ]);

  if (!isOpen) return null;

  const propertyOptions: { id: PropertyType; title: string; desc: string; icon: string }[] = [
    { id: 'studio', title: 'Studio Apartment', desc: '1 Room / Bedsitter', icon: '🏠' },
    { id: '1bed', title: '1 Bedroom Home', desc: 'Living room + 1 Bed', icon: '🏡' },
    { id: '2bed', title: '2 Bedroom Home', desc: 'Standard 2BR Apartment', icon: '🏢' },
    { id: '3bed', title: '3 Bedroom Home', desc: 'Spacious Family House', icon: '🏘️' },
    { id: '4bed', title: '4 Bedroom Home', desc: 'Large Multi-Level Residence', icon: '🏰' },
    { id: '5plus', title: '5+ Bedroom Luxury Estate', desc: 'Villa / Penthouse / Estate', icon: '👑' },
    { id: 'office', title: 'Office / Corporate', desc: 'Workstations & Server Equipment', icon: '💼' },
    { id: 'custom', title: 'Custom Relocation', desc: 'Specific Bulky or Storage Move', icon: '📦' },
  ];

  const serviceOptions: { id: ServiceType; title: string; desc: string; icon: string }[] = [
    { id: 'packing', title: 'Packing Services', desc: 'Triple-ply boxes, bubble cushioning & bubble wrap', icon: '📦' },
    { id: 'loading', title: 'Loading Assistance', desc: 'Heavy lift crew & hydraulic tailgate', icon: '💪' },
    { id: 'transportation', title: 'Air-Ride Transportation', desc: 'GPS-tracked dedicated logistics truck', icon: '🚛' },
    { id: 'unloading', title: 'Unloading', desc: 'Placement into designated rooms', icon: '🏠' },
    { id: 'unpacking', title: 'Unpacking Services', desc: 'Unboxing and debris removal', icon: '✨' },
    { id: 'furniture_assembly', title: 'Furniture Assembly', desc: 'Beds, tables, and wardrobe rebuilds', icon: '🛠️' },
    { id: 'storage', title: 'Climate Storage', desc: 'Secure temporary holding vault', icon: '🔒' },
  ];

  const toggleService = (sId: ServiceType) => {
    setSelectedServices((prev) =>
      prev.includes(sId) ? prev.filter((s) => s !== sId) : [...prev, sId]
    );
  };

  const updateItemQty = (name: string, delta: number) => {
    setInventoryQuantities((prev) => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [name]: next };
    });
  };

  const handleCompleteBooking = () => {
    const newMove = createQuote({
      customerName: clientName,
      customerPhone: clientPhone,
      customerEmail: clientEmail,
      pickupCity,
      pickupAddress,
      pickupFloor,
      pickupHasElevator,
      destinationCity: destCity,
      destinationAddress: destAddress,
      destinationFloor: destFloor,
      destinationHasElevator: destHasElevator,
      distanceKm,
      moveDate,
      moveTimeSlot: timeSlot,
      propertyType,
      services: selectedServices,
      inventory: compiledInventory,
      specialInstructions,
      estimatedCostMin: estimate.minPrice,
      estimatedCostMax: estimate.maxPrice,
    });

    setCreatedMoveRef(newMove.id);
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    if (onMoveCreated) {
      onMoveCreated(newMove.id);
    }
  };

  const filteredCatalog = POPULAR_INVENTORY_ITEMS.filter((item) => {
    if (activeInventoryCategory === 'All') return true;
    return item.category === activeInventoryCategory;
  });

  const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Dining', 'Electronics', 'Office', 'Boxes'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="bg-[#0B1220] text-white px-6 py-5 flex items-center justify-between border-b border-[#1E293B] shrink-0">
          <div className="flex items-center gap-3">
            <XpressMovementIcon className="w-10 h-10 ring-1 ring-emerald-500/30" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white">
                  XpressMovement Moving Estimator
                </h3>
                <span className="text-[10px] bg-[#D4A72C]/20 border border-[#D4A72C]/40 text-[#D4A72C] font-bold px-1.5 py-0.5 rounded">
                  7-STEP WIZARD
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                {createdMoveRef 
                  ? `Booking Confirmed: Reference ${createdMoveRef}` 
                  : `Step ${currentStep} of 7 — Transparent instant calculation`}
              </p>
            </div>
          </div>

          <button
            id="close-estimator-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        {!createdMoveRef && (
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-2.5 flex items-center justify-between text-xs text-[#64748B]">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {[
                '1. Pickup',
                '2. Destination',
                '3. Property',
                '4. Services',
                '5. Date',
                '6. Inventory',
                '7. Contact',
                '8. Estimate',
              ].map((label, idx) => {
                const stepNum = idx + 1;
                const isCurrent = currentStep === stepNum;
                const isDone = currentStep > stepNum;

                return (
                  <button
                    key={idx}
                    disabled={stepNum > currentStep && currentStep !== 8}
                    onClick={() => setCurrentStep(stepNum)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'bg-[#155EEF] text-white'
                        : isDone
                        ? 'bg-[#E0F2FE] text-[#0284C7] hover:bg-[#BAE6FD]'
                        : 'text-[#94A3B8] opacity-60'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Quick Live Cost Ticker */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-3 border-l border-[#E2E8F0]">
              <span className="text-[10px] uppercase font-bold text-[#64748B]">Est:</span>
              <span className="text-xs font-bold text-[#155EEF]">
                {formatCurrency(estimate.minPrice, currency)} - {formatCurrency(estimate.maxPrice, currency)}
              </span>
            </div>
          </div>
        )}

        {/* Body Content / Step Views */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: PICKUP LOCATION */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Step 1: Where are we picking up your belongings?
                </h4>
                <p className="text-xs text-[#667085] mt-1">
                  Specify your departure city, neighborhood address, and building floor access.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Pickup City / Metro Area
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#155EEF]" />
                    <input
                      type="text"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      placeholder="e.g. Port Harcourt, Rivers State"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Street Address / Estate Name
                  </label>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="e.g. Plot 14, Old GRA Avenue"
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Building Floor Level
                    </label>
                    <select
                      value={pickupFloor}
                      onChange={(e) => setPickupFloor(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium"
                    >
                      <option value={0}>Ground Floor (0)</option>
                      <option value={1}>1st Floor</option>
                      <option value={2}>2nd Floor</option>
                      <option value={3}>3rd Floor</option>
                      <option value={4}>4th Floor</option>
                      <option value={5}>5th Floor or Higher</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Elevator / Service Lift Available?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPickupHasElevator(true)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                          pickupHasElevator
                            ? 'bg-[#155EEF] text-white border-[#155EEF]'
                            : 'bg-white text-[#344054] border-[#D0D5DD]'
                        }`}
                      >
                        Yes, Elevator
                      </button>
                      <button
                        type="button"
                        onClick={() => setPickupHasElevator(false)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                          !pickupHasElevator
                            ? 'bg-[#155EEF] text-white border-[#155EEF]'
                            : 'bg-white text-[#344054] border-[#D0D5DD]'
                        }`}
                      >
                        Stairs Only
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DESTINATION LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Step 2: Where are we delivering your items?
                </h4>
                <p className="text-xs text-[#667085] mt-1">
                  Destination address and estimated distance between properties.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Destination City / State
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#12B76A]" />
                    <input
                      type="text"
                      value={destCity}
                      onChange={(e) => setDestCity(e.target.value)}
                      placeholder="e.g. Ikoyi, Lagos State"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Destination Street / Complex
                  </label>
                  <input
                    type="text"
                    value={destAddress}
                    onChange={(e) => setDestAddress(e.target.value)}
                    placeholder="e.g. Bourdillon Road, Ikoyi"
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Estimated Distance (km)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={2500}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-bold text-[#155EEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Destination Floor
                    </label>
                    <select
                      value={destFloor}
                      onChange={(e) => setDestFloor(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium"
                    >
                      <option value={0}>Ground Floor (0)</option>
                      <option value={1}>1st Floor</option>
                      <option value={2}>2nd Floor</option>
                      <option value={3}>3rd Floor</option>
                      <option value={4}>4th Floor</option>
                      <option value={5}>5th Floor or Higher</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Elevator Access?
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDestHasElevator(true)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                          destHasElevator
                            ? 'bg-[#155EEF] text-white border-[#155EEF]'
                            : 'bg-white text-[#344054] border-[#D0D5DD]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setDestHasElevator(false)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                          !destHasElevator
                            ? 'bg-[#155EEF] text-white border-[#155EEF]'
                            : 'bg-white text-[#344054] border-[#D0D5DD]'
                        }`}
                      >
                        No (Stairs)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROPERTY TYPE */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Step 3: What type of property are you relocating?
                </h4>
                <p className="text-xs text-[#667085] mt-1">
                  Select your home or commercial space size to help us gauge baseline capacity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {propertyOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setPropertyType(opt.id)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 ${
                      propertyType === opt.id
                        ? 'border-[#155EEF] bg-[#155EEF]/5 shadow-md ring-1 ring-[#155EEF]'
                        : 'border-[#E4E7EC] hover:border-[#CBD5E1] bg-white'
                    }`}
                  >
                    <div className="text-2xl p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-[#111827]">{opt.title}</h5>
                      <p className="text-xs text-[#667085]">{opt.desc}</p>
                    </div>
                    {propertyType === opt.id && (
                      <div className="w-6 h-6 rounded-full bg-[#155EEF] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: SERVICES REQUIRED */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Step 4: Which services do you require?
                </h4>
                <p className="text-xs text-[#667085] mt-1">
                  Choose multiple options for a full white-glove turnkey relocation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((srv) => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-[#155EEF] bg-[#155EEF]/5 shadow-sm'
                          : 'border-[#E4E7EC] hover:border-[#CBD5E1] bg-white'
                      }`}
                    >
                      <div className="text-xl pt-0.5">{srv.icon}</div>
                      <div className="flex-1">
                        <h5 className="text-sm font-bold text-[#111827]">{srv.title}</h5>
                        <p className="text-xs text-[#667085] mt-0.5">{srv.desc}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 ${
                          isChecked
                            ? 'bg-[#155EEF] border-[#155EEF] text-white'
                            : 'border-[#D0D5DD] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: MOVING DATE & TIME */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Step 5: When would you like to move?
                </h4>
                <p className="text-xs text-[#667085] mt-1">
                  Pick your preferred calendar date and arrival time window.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Scheduled Moving Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-[#155EEF]" />
                    <input
                      type="date"
                      value={moveDate}
                      onChange={(e) => setMoveDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-semibold text-[#111827]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'morning', label: 'Morning Slot', sub: '08:00 AM - 12:00 PM' },
                      { id: 'afternoon', label: 'Afternoon Slot', sub: '01:00 PM - 05:00 PM' },
                      { id: 'full_day', label: 'Full Day Dedicated', sub: 'Whole Day Service' },
                      { id: 'flexible', label: 'Flexible Window', sub: 'Best Rate Priority' },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setTimeSlot(slot.id as any)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          timeSlot === slot.id
                            ? 'border-[#155EEF] bg-[#155EEF]/5 font-bold text-[#155EEF]'
                            : 'border-[#E4E7EC] bg-white text-[#344054]'
                        }`}
                      >
                        <span className="block text-xs font-bold">{slot.label}</span>
                        <span className="block text-[10px] text-[#667085] mt-0.5">{slot.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#155EEF] shrink-0" />
                  <p className="text-xs text-[#1E40AF]">
                    Our operations team provides a guaranteed 30-minute arrival window on your move day.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: INVENTORY SELECTOR */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                    Step 6: Approximate Item Inventory
                  </h4>
                  <p className="text-xs text-[#667085]">
                    Select items so we can configure the optimal truck size and packing crating.
                  </p>
                </div>

                <div className="bg-[#0B1220] text-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4A72C]" />
                  <span>Est Volume: <strong className="text-[#60A5FA]">{estimate.totalVolumeCbm} m³</strong></span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveInventoryCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeInventoryCategory === cat
                        ? 'bg-[#155EEF] text-white'
                        : 'bg-[#F2F4F7] text-[#475467] hover:bg-[#E4E7EC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {filteredCatalog.map((item) => {
                  const qty = inventoryQuantities[item.name] || 0;
                  return (
                    <div
                      key={item.name}
                      className="p-3 rounded-xl border border-[#E4E7EC] bg-white flex items-center justify-between shadow-xs hover:border-[#B2CCFF]"
                    >
                      <div className="pr-2 flex-1">
                        <span className="text-xs font-bold text-[#111827] block truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[#667085]">
                          {item.category} • ~{item.volumeCbmPerUnit} m³
                          {item.isFragile && ' • ⚠️ Fragile'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateItemQty(item.name, -1)}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-lg bg-[#F2F4F7] disabled:opacity-30 hover:bg-[#E4E7EC] flex items-center justify-center text-xs font-bold text-[#344054]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold font-mono">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateItemQty(item.name, 1)}
                          className="w-7 h-7 rounded-lg bg-[#155EEF] hover:bg-[#124dc7] text-white flex items-center justify-center text-xs font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: CONTACT INFORMATION */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-xl font-bold text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
                  Step 7: Contact Information
                </h4>
                <p className="text-xs text-[#667085] mt-1">
                  Where should we send your official quotation summary and booking reference?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Full Name / Company Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-[#98A2B3]" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Chief Adeleke Briggs"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Phone Number (WhatsApp Active)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#98A2B3]" />
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#98A2B3]" />
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Special Items & Handling Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Glass tabletop, piano, server racks, fragile artwork..."
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#D0D5DD] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#155EEF]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 / RESULT SCREEN */}
          {(currentStep === 8 || createdMoveRef) && (
            <div className="space-y-6 animate-fade-in">
              {/* Success Badge */}
              {createdMoveRef && (
                <div className="p-4 rounded-2xl bg-[#ECFDF3] border border-[#A6F4C5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#12B76A] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#027A48]">
                      Move Booking Confirmed — Reference #{createdMoveRef}
                    </h5>
                    <p className="text-xs text-[#05603A]">
                      Your request is registered in the ExpressMove Dispatch Matrix. You can now track live updates in the Customer Portal.
                    </p>
                  </div>
                </div>
              )}

              {/* Estimate Cost Highlight Card */}
              <div className="bg-gradient-to-br from-[#0B1220] via-[#111C30] to-[#1E293B] text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider block mb-1">
                      Estimated Moving Cost
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-tight">
                      {formatCurrency(estimate.minPrice, currency)} – {formatCurrency(estimate.maxPrice, currency)}
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      *Preliminary price based on {propertyType.toUpperCase()} • {distanceKm} km • {estimate.totalVolumeCbm} m³
                    </p>
                  </div>

                  <div className="bg-white/10 border border-white/15 px-4 py-3 rounded-2xl text-right">
                    <span className="text-[10px] uppercase font-bold text-[#CBD5E1] block">Vehicle Recommended</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{estimate.recommendedVehicleLabel}</span>
                    <span className="text-[11px] text-[#D4A72C] block mt-1">Crew: {estimate.estimatedCrewSize} Specialist Movers</span>
                  </div>
                </div>

                {/* Important Disclaimer Required By System Instructions */}
                <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#94A3B8] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Note:</strong> This estimate is preliminary. Final pricing may vary after physical inspection or virtual assessment, access conditions, and final inventory count.
                  </p>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAECF0]">
                  <span className="text-[#667085] block">Origin / Pickup</span>
                  <strong className="text-[#111827] block truncate mt-0.5">{pickupCity}</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAECF0]">
                  <span className="text-[#667085] block">Destination</span>
                  <strong className="text-[#111827] block truncate mt-0.5">{destCity}</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAECF0]">
                  <span className="text-[#667085] block">Moving Date</span>
                  <strong className="text-[#111827] block truncate mt-0.5">{moveDate} ({timeSlot})</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAECF0]">
                  <span className="text-[#667085] block">Est. Duration</span>
                  <strong className="text-[#111827] block truncate mt-0.5">~{estimate.estimatedHours} Hours</strong>
                </div>
              </div>

              {/* Services Selected Tags */}
              <div>
                <h5 className="text-xs font-bold text-[#344054] uppercase tracking-wider mb-2">
                  Included Services ({selectedServices.length})
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedServices.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-[#155EEF]/10 text-[#155EEF] text-xs font-semibold">
                      ✓ {s.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 flex items-center justify-between shrink-0">
          {currentStep > 1 && !createdMoveRef ? (
            <button
              id="estimator-back-btn"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2.5 rounded-xl border border-[#D0D5DD] hover:bg-white text-xs font-bold text-[#344054] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 && (
            <button
              id="estimator-next-btn"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#124dc7] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {currentStep === 7 && (
            <button
              id="estimator-view-result-btn"
              onClick={() => setCurrentStep(8)}
              className="px-6 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#155EEF] text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all"
            >
              <span>Calculate Final Estimate</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            </button>
          )}

          {currentStep === 8 && !createdMoveRef && (
            <button
              id="estimator-book-move-btn"
              onClick={handleCompleteBooking}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4A72C] to-[#E6B83B] text-[#0B1220] text-xs font-extrabold shadow-xl hover:shadow-amber-500/30 flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0B1220]" />
              <span>Confirm & Lock In Move</span>
            </button>
          )}

          {createdMoveRef && (
            <button
              id="estimator-finish-btn"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#155EEF] text-white text-xs font-bold shadow-md"
            >
              Close & View In Portal
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
