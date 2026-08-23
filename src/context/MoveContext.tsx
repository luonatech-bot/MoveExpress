import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, MoveBooking, MoveStatus, PaymentStatus, InventoryItem, ChatMessage, TeamMember, Vehicle } from '../types';
import { INITIAL_MOVES, TEAM_MEMBERS, VEHICLES_DATA } from '../data/mockData';

interface MoveContextType {
  moves: MoveBooking[];
  currentMoveId: string;
  activeMove: MoveBooking | undefined;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  setCurrentMoveId: (id: string) => void;
  createQuote: (bookingData: Partial<MoveBooking>) => MoveBooking;
  updateMoveStatus: (id: string, status: MoveStatus, note?: string) => void;
  assignTeamAndVehicle: (moveId: string, vehicleId?: string, teamMemberIds?: string[]) => void;
  updatePricing: (moveId: string, finalPrice: number, deposit: number) => void;
  makePayment: (moveId: string, amount: number, paymentType: 'deposit' | 'full') => void;
  addInventoryItem: (moveId: string, item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (moveId: string, itemId: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (moveId: string, itemId: string) => void;
  sendMessage: (moveId: string, text: string, sender: 'customer' | 'coordinator' | 'driver' | 'admin') => void;
  teams: TeamMember[];
  vehicles: Vehicle[];
  updateVehicleStatus: (id: string, status: Vehicle['status']) => void;
  updateTeamStatus: (id: string, status: TeamMember['status']) => void;
  resetToDefaultData: () => void;
}

const MoveContext = createContext<MoveContextType | undefined>(undefined);

const STORAGE_KEY = 'expressmove_bookings_v2';
const CURRENCY_KEY = 'expressmove_currency_v2';

export const MoveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem(CURRENCY_KEY) as Currency) || 'NGN';
  });

  const [moves, setMoves] = useState<MoveBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved moves', e);
    }
    return INITIAL_MOVES;
  });

  const [currentMoveId, setCurrentMoveId] = useState<string>('LM-2048');
  const [teams, setTeams] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES_DATA);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moves));
    } catch (e) {
      console.error('Failed to save moves to storage', e);
    }
  }, [moves]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
  };

  const activeMove = moves.find((m) => m.id === currentMoveId) || moves[0];

  const createQuote = (bookingData: Partial<MoveBooking>): MoveBooking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `LM-${randomNum}`;
    
    const newBooking: MoveBooking = {
      id: newId,
      customerName: bookingData.customerName || 'Valued Client',
      customerPhone: bookingData.customerPhone || '+234 800 000 0000',
      customerEmail: bookingData.customerEmail || 'client@xpressmovement.com',
      customerAddress: bookingData.customerAddress || bookingData.pickupAddress || 'Origin Address',
      
      pickupAddress: bookingData.pickupAddress || 'Pickup Address',
      pickupCity: bookingData.pickupCity || 'Lagos',
      pickupFloor: bookingData.pickupFloor ?? 1,
      pickupHasElevator: bookingData.pickupHasElevator ?? true,
      
      destinationAddress: bookingData.destinationAddress || 'Destination Address',
      destinationCity: bookingData.destinationCity || 'Abuja',
      destinationFloor: bookingData.destinationFloor ?? 1,
      destinationHasElevator: bookingData.destinationHasElevator ?? true,
      
      distanceKm: bookingData.distanceKm || 45,
      moveDate: bookingData.moveDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      moveTimeSlot: bookingData.moveTimeSlot || 'morning',
      
      propertyType: bookingData.propertyType || '2bed',
      services: bookingData.services || ['packing', 'loading', 'transportation', 'unloading'],
      inventory: bookingData.inventory || [],
      uploadedPhotos: bookingData.uploadedPhotos || [],
      specialInstructions: bookingData.specialInstructions || '',
      
      status: 'quote_requested',
      timeline: [
        {
          status: 'quote_requested',
          label: 'Quote Requested',
          description: 'Initial moving estimate generated and queued for specialist confirmation.',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          completed: true,
          current: true,
        },
        {
          status: 'quote_confirmed',
          label: 'Quote Confirmed',
          description: 'Specialist validates route, logistics crew & insurance.',
          completed: false,
        },
        {
          status: 'packing_scheduled',
          label: 'Packing & Preparation',
          description: 'Team arrives with crating and packing supplies.',
          completed: false,
        },
        {
          status: 'pickup_complete',
          label: 'Pickup & Sealed',
          description: 'Belongings carefully loaded and truck locked with tamper seal.',
          completed: false,
        },
        {
          status: 'in_transit',
          label: 'In Transit',
          description: 'Live GPS tracked movement to destination.',
          completed: false,
        },
        {
          status: 'delivered',
          label: 'Delivered & Settled',
          description: 'Unloaded, unpacked and placed in each room with white-glove care.',
          completed: false,
        },
      ],
      
      estimatedCostMin: Math.max(100000, Math.min(270000, bookingData.estimatedCostMin || 155000)),
      estimatedCostMax: Math.min(300000, Math.max(120000, bookingData.estimatedCostMax || 215000)),
      depositAmount: 0,
      paymentStatus: 'pending',
      
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          title: `Estimated Move Quote - #${newId}`,
          type: 'quote',
          date: new Date().toISOString().split('T')[0],
          size: '640 KB',
          status: 'Ready',
        },
      ],
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'coordinator',
          senderName: 'Ngozi Eze (Move Concierge)',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
          text: `Welcome to XpressMovement! We have received your relocation request for ${bookingData.pickupCity || 'your origin'} to ${bookingData.destinationCity || 'destination'}. A dedicated relocation coordinator is reviewing your requirements.`,
          timestamp: 'Just now',
        },
      ],
      createdAt: new Date().toISOString(),
    };

    setMoves((prev) => [newBooking, ...prev]);
    setCurrentMoveId(newId);
    return newBooking;
  };

  const updateMoveStatus = (id: string, status: MoveStatus, note?: string) => {
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== id) return move;

        const updatedTimeline = move.timeline.map((t) => {
          if (t.status === status) {
            return {
              ...t,
              completed: true,
              current: true,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              description: note || t.description,
            };
          }
          return { ...t, current: false };
        });

        return {
          ...move,
          status,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const assignTeamAndVehicle = (moveId: string, vehicleId?: string, teamMemberIds?: string[]) => {
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        const vehicle = vehicles.find((v) => v.id === vehicleId);
        const leadMember = teams.find((t) => teamMemberIds?.includes(t.id));

        return {
          ...move,
          assignedVehicleId: vehicleId || move.assignedVehicleId,
          assignedVehicleName: vehicle ? `${vehicle.name} (${vehicle.vehicleNumber})` : move.assignedVehicleName,
          assignedTeamMemberIds: teamMemberIds || move.assignedTeamMemberIds,
          leadDriverName: leadMember ? leadMember.name : (vehicle?.driverName || move.leadDriverName),
          leadDriverPhone: leadMember ? leadMember.phone : (vehicle?.driverPhone || move.leadDriverPhone),
          leadDriverPhoto: leadMember ? leadMember.photo : move.leadDriverPhoto,
        };
      })
    );
  };

  const updatePricing = (moveId: string, finalPrice: number, deposit: number) => {
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        return {
          ...move,
          finalPrice,
          depositAmount: deposit,
        };
      })
    );
  };

  const makePayment = (moveId: string, amount: number, paymentType: 'deposit' | 'full') => {
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        const newStatus: PaymentStatus = paymentType === 'full' ? 'paid_in_full' : 'deposit_paid';
        const docTitle = paymentType === 'full' ? 'Official Receipt - Full Payment' : 'Official Receipt - Deposit Payment';
        
        const newDoc = {
          id: `doc-pay-${Date.now()}`,
          title: `${docTitle} (Ref: ${move.id})`,
          type: 'invoice' as const,
          date: new Date().toISOString().split('T')[0],
          size: '420 KB',
          status: 'Ready' as const,
        };

        const newMsg: ChatMessage = {
          id: `msg-pay-${Date.now()}`,
          sender: 'system',
          senderName: 'ExpressMove Billing',
          text: `Payment confirmed! ${paymentType === 'full' ? 'Full balance' : 'Deposit'} received successfully. Receipt #${newDoc.id} generated.`,
          timestamp: 'Just now',
        };

        return {
          ...move,
          paymentStatus: newStatus,
          depositAmount: Math.max(move.depositAmount, amount),
          documents: [newDoc, ...move.documents],
          messages: [...move.messages, newMsg],
        };
      })
    );
  };

  const addInventoryItem = (moveId: string, item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        return {
          ...move,
          inventory: [...move.inventory, newItem],
        };
      })
    );
  };

  const updateInventoryItem = (moveId: string, itemId: string, updates: Partial<InventoryItem>) => {
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        return {
          ...move,
          inventory: move.inventory.map((inv) => (inv.id === itemId ? { ...inv, ...updates } : inv)),
        };
      })
    );
  };

  const deleteInventoryItem = (moveId: string, itemId: string) => {
    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        return {
          ...move,
          inventory: move.inventory.filter((inv) => inv.id !== itemId),
        };
      })
    );
  };

  const sendMessage = (moveId: string, text: string, sender: 'customer' | 'coordinator' | 'driver' | 'admin') => {
    let senderName = 'Customer';
    let avatar: string | undefined = undefined;

    if (sender === 'coordinator') {
      senderName = 'Ngozi Eze (Move Concierge)';
      avatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80';
    } else if (sender === 'driver') {
      senderName = 'Captain Emeka (Driver)';
      avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
    } else if (sender === 'admin') {
      senderName = 'Move Operations Control';
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      avatar,
      text,
      timestamp: 'Just now',
    };

    setMoves((prev) =>
      prev.map((move) => {
        if (move.id !== moveId) return move;
        return {
          ...move,
          messages: [...move.messages, newMsg],
        };
      })
    );
  };

  const updateVehicleStatus = (id: string, status: Vehicle['status']) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  const updateTeamStatus = (id: string, status: TeamMember['status']) => {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const resetToDefaultData = () => {
    setMoves(INITIAL_MOVES);
    setTeams(TEAM_MEMBERS);
    setVehicles(VEHICLES_DATA);
    setCurrentMoveId('LM-2048');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MoveContext.Provider
      value={{
        moves,
        currentMoveId,
        activeMove,
        currency,
        setCurrency,
        setCurrentMoveId,
        createQuote,
        updateMoveStatus,
        assignTeamAndVehicle,
        updatePricing,
        makePayment,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        sendMessage,
        teams,
        vehicles,
        updateVehicleStatus,
        updateTeamStatus,
        resetToDefaultData,
      }}
    >
      {children}
    </MoveContext.Provider>
  );
};

export const useMove = () => {
  const context = useContext(MoveContext);
  if (!context) {
    throw new Error('useMove must be used within a MoveProvider');
  }
  return context;
};
