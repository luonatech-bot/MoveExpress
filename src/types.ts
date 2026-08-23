export type Currency = 'NGN' | 'USD';

export type ViewMode = 
  | 'home'
  | 'services'
  | 'calculator'
  | 'quote'
  | 'track'
  | 'customer-portal'
  | 'admin-portal'
  | 'about'
  | 'contact'
  | 'how-it-works'
  | 'coverage'
  | 'testimonials'
  | 'faq'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'refund-policy'
  | 'support';

export type PropertyType = 
  | 'studio'
  | '1bed'
  | '2bed'
  | '3bed'
  | '4bed'
  | '5plus'
  | 'office'
  | 'custom';

export type ServiceType = 
  | 'packing'
  | 'loading'
  | 'transportation'
  | 'unloading'
  | 'unpacking'
  | 'furniture_assembly'
  | 'storage';

export type VehicleType = 
  | 'small_van'
  | 'medium_truck'
  | 'large_truck'
  | 'box_truck'
  | 'special_transport';

export type MoveStatus = 
  | 'quote_requested'
  | 'quote_confirmed'
  | 'packing_scheduled'
  | 'packing_complete'
  | 'pickup_complete'
  | 'in_transit'
  | 'arriving_soon'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'deposit_paid' | 'paid_in_full' | 'refunded';

export type ItemCategory = 
  | 'Living Room'
  | 'Bedroom'
  | 'Kitchen'
  | 'Dining'
  | 'Office'
  | 'Electronics'
  | 'Boxes'
  | 'Other';

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  isFragile?: boolean;
  requiresDisassembly?: boolean;
  volumeCbmPerUnit: number; // in cubic meters
  weightKgPerUnit?: number;
  notes?: string;
}

export interface TimelineEvent {
  status: MoveStatus;
  label: string;
  description: string;
  date?: string;
  time?: string;
  completed: boolean;
  current?: boolean;
  location?: string;
}

export interface MoveDocument {
  id: string;
  title: string;
  type: 'quote' | 'invoice' | 'insurance_certificate' | 'inventory_manifest' | 'bill_of_lading';
  date: string;
  size: string;
  status: 'Ready' | 'Signed' | 'Pending Approval';
  fileUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'coordinator' | 'driver' | 'system' | 'admin';
  senderName: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Lead Move Captain' | 'Senior Packing Specialist' | 'Heavy Equipment Specialist' | 'Relocation Coordinator' | 'Master Driver';
  phone: string;
  photo: string;
  rating: number;
  movesCompleted: number;
  assignedVehicleId?: string;
  status: 'available' | 'assigned' | 'on_route' | 'busy' | 'offline';
  experienceYears: number;
}

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  name: string;
  type: VehicleType;
  capacityTons: number;
  volumeCbm: number;
  driverName: string;
  driverPhone: string;
  status: 'available' | 'active' | 'in_transit' | 'maintenance';
  image: string;
  currentLocation?: string;
}

export interface MoveBooking {
  id: string; // e.g. "LM-2048"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress?: string;
  
  pickupAddress: string;
  pickupCity: string;
  pickupFloor: number;
  pickupHasElevator: boolean;
  
  destinationAddress: string;
  destinationCity: string;
  destinationFloor: number;
  destinationHasElevator: boolean;
  
  distanceKm: number;
  moveDate: string;
  moveTimeSlot: 'morning' | 'afternoon' | 'full_day' | 'flexible';
  
  propertyType: PropertyType;
  customRoomsCount?: number;
  
  services: ServiceType[];
  inventory: InventoryItem[];
  uploadedPhotos?: string[];
  specialInstructions?: string;
  
  status: MoveStatus;
  timeline: TimelineEvent[];
  
  // Pricing
  estimatedCostMin: number;
  estimatedCostMax: number;
  finalPrice?: number;
  depositAmount: number;
  paymentStatus: PaymentStatus;
  
  // Assignment
  assignedVehicleId?: string;
  assignedVehicleName?: string;
  assignedTeamMemberIds?: string[];
  leadDriverName?: string;
  leadDriverPhone?: string;
  leadDriverPhoto?: string;
  
  documents: MoveDocument[];
  messages: ChatMessage[];
  
  createdAt: string;
  notes?: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  features: string[];
  idealFor: string[];
  startingPriceNgn: number;
}
