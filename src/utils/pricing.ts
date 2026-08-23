import { Currency, InventoryItem, PropertyType, ServiceType, VehicleType } from '../types';

export const MIN_FEE = 100000;
export const MAX_FEE = 300000;

export function formatCurrency(amount: number, _currency?: Currency): string {
  // Ensure formatted amounts obey bounds when displaying estimates
  const safeAmount = Math.round(amount);
  return '₦' + new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(safeAmount);
}

/**
 * Returns a randomly selected price between 100,000 and 300,000 NGN
 */
export function getRandomEstimateFee(min: number = MIN_FEE, max: number = MAX_FEE, step: number = 2500): number {
  const steps = Math.floor((max - min) / step);
  const randomStep = Math.floor(Math.random() * (steps + 1));
  const rawPrice = min + (randomStep * step);
  return Math.min(MAX_FEE, Math.max(MIN_FEE, rawPrice));
}

export interface PricingCalculationResult {
  minPrice: number;
  maxPrice: number;
  baseFare: number;
  distanceFare: number;
  propertyFare: number;
  servicesFare: number;
  inventoryFare: number;
  floorPenalty: number;
  recommendedVehicle: VehicleType;
  recommendedVehicleLabel: string;
  estimatedCrewSize: number;
  estimatedHours: number;
  totalVolumeCbm: number;
  totalEstimatedWeightKg: number;
}

export interface PricingInput {
  propertyType: PropertyType;
  distanceKm: number;
  services: ServiceType[];
  inventory: InventoryItem[];
  pickupFloor?: number;
  pickupHasElevator?: boolean;
  destinationFloor?: number;
  destinationHasElevator?: boolean;
  isSpecialHandling?: boolean;
  randomSeed?: number;
}

// Property Base Pricing structured to keep total estimates cleanly within ₦100,000 - ₦300,000
const PROPERTY_BASE_PRICING: Record<PropertyType, { base: number; typicalVolumeCbm: number; crew: number; hours: number; vehicle: VehicleType; label: string }> = {
  studio: { base: 105000, typicalVolumeCbm: 12, crew: 2, hours: 3, vehicle: 'small_van', label: 'Studio Apartment' },
  '1bed': { base: 125000, typicalVolumeCbm: 20, crew: 2, hours: 4, vehicle: 'small_van', label: '1 Bedroom Home' },
  '2bed': { base: 155000, typicalVolumeCbm: 32, crew: 3, hours: 5, vehicle: 'medium_truck', label: '2 Bedroom Home' },
  '3bed': { base: 185000, typicalVolumeCbm: 48, crew: 4, hours: 6, vehicle: 'large_truck', label: '3 Bedroom Home' },
  '4bed': { base: 215000, typicalVolumeCbm: 65, crew: 5, hours: 8, vehicle: 'box_truck', label: '4 Bedroom Home' },
  '5plus': { base: 245000, typicalVolumeCbm: 90, crew: 6, hours: 10, vehicle: 'special_transport', label: '5+ Bedroom Luxury Estate' },
  office: { base: 220000, typicalVolumeCbm: 45, crew: 4, hours: 7, vehicle: 'large_truck', label: 'Office / Corporate Space' },
  custom: { base: 145000, typicalVolumeCbm: 30, crew: 3, hours: 5, vehicle: 'medium_truck', label: 'Custom Relocation' },
};

const SERVICE_RATES: Record<ServiceType, number> = {
  packing: 15000,
  loading: 10000,
  transportation: 15000,
  unloading: 10000,
  unpacking: 8000,
  furniture_assembly: 8000,
  storage: 18000,
};

export function calculateMoveCost(input: PricingInput): PricingCalculationResult {
  const propConfig = PROPERTY_BASE_PRICING[input.propertyType] || PROPERTY_BASE_PRICING['2bed'];
  
  // Calculate total volume & weight from inventory if items selected, else fallback to standard property volume
  let totalVolumeCbm = 0;
  let totalWeightKg = 0;
  
  if (input.inventory && input.inventory.length > 0) {
    totalVolumeCbm = input.inventory.reduce((sum, item) => sum + (item.volumeCbmPerUnit * item.quantity), 0);
    totalWeightKg = input.inventory.reduce((sum, item) => sum + ((item.weightKgPerUnit || 15) * item.quantity), 0);
  } else {
    totalVolumeCbm = propConfig.typicalVolumeCbm;
    totalWeightKg = propConfig.typicalVolumeCbm * 70; // avg density
  }

  // Base rate (min 100k)
  let baseFare = propConfig.base;

  // Distance rate (scaled to fit within budget limits)
  const km = Math.max(5, input.distanceKm || 15);
  let distanceFare = 0;
  if (km <= 30) {
    distanceFare = km * 350; // Local metro
  } else if (km <= 150) {
    distanceFare = 10500 + (km - 30) * 200; // Regional
  } else {
    distanceFare = 34500 + Math.min(25000, (km - 150) * 45); // Interstate capped
  }

  // Services Cost
  let servicesFare = 0;
  input.services.forEach((s) => {
    servicesFare += SERVICE_RATES[s] || 0;
  });

  // Additional Inventory Volume Cost
  let inventoryFare = 0;
  if (totalVolumeCbm > propConfig.typicalVolumeCbm) {
    const excessVolume = totalVolumeCbm - propConfig.typicalVolumeCbm;
    inventoryFare = Math.min(20000, excessVolume * 800);
  }

  // Floor difficulty calculation
  let floorPenalty = 0;
  const pFloor = input.pickupFloor || 0;
  const dFloor = input.destinationFloor || 0;
  
  if (pFloor > 1 && !input.pickupHasElevator) {
    floorPenalty += (pFloor - 1) * 3500;
  }
  if (dFloor > 1 && !input.destinationHasElevator) {
    floorPenalty += (dFloor - 1) * 3500;
  }

  // Special handling fee
  let specialFee = 0;
  if (input.isSpecialHandling) {
    specialFee = 8000;
  }

  // Random variance within bounds (random selection variation +/- ₦12,500)
  const randomJitter = Math.floor((Math.random() * 25000 - 12500) / 1000) * 1000;
  
  let rawSubtotal = baseFare + distanceFare + servicesFare + inventoryFare + floorPenalty + specialFee + randomJitter;

  // STRICT GUARANTEE: Price must be between ₦100,000 and ₦300,000 (never exceeding 300,000)
  const targetPrice = Math.min(MAX_FEE, Math.max(MIN_FEE, Math.round(rawSubtotal / 1000) * 1000));

  // Calculate minPrice and maxPrice strictly within [100,000, 300,000]
  let minPrice = Math.max(MIN_FEE, Math.round((targetPrice * 0.93) / 1000) * 1000);
  let maxPrice = Math.min(MAX_FEE, Math.round((targetPrice * 1.07) / 1000) * 1000);

  if (maxPrice > MAX_FEE) {
    maxPrice = MAX_FEE;
  }
  if (minPrice < MIN_FEE) {
    minPrice = MIN_FEE;
  }
  if (minPrice >= maxPrice) {
    minPrice = Math.max(MIN_FEE, maxPrice - 15000);
  }

  // Scale breakdown fares proportionally if raw sum exceeds targetPrice
  const rawSum = baseFare + distanceFare + servicesFare + inventoryFare + floorPenalty;
  if (rawSum > MAX_FEE && rawSum > 0) {
    const factor = (targetPrice * 0.95) / rawSum;
    baseFare = Math.round((baseFare * factor) / 1000) * 1000;
    distanceFare = Math.round((distanceFare * factor) / 1000) * 1000;
    servicesFare = Math.round((servicesFare * factor) / 1000) * 1000;
    inventoryFare = Math.round((inventoryFare * factor) / 1000) * 1000;
    floorPenalty = Math.round((floorPenalty * factor) / 1000) * 1000;
  }

  // Determine vehicle & crew
  let recommendedVehicle: VehicleType = propConfig.vehicle;
  let recommendedVehicleLabel = 'Medium Moving Truck (18ft)';
  let estimatedCrewSize = propConfig.crew;

  if (totalVolumeCbm <= 15) {
    recommendedVehicle = 'small_van';
    recommendedVehicleLabel = 'Sprinter Cargo Van (10ft)';
    estimatedCrewSize = Math.max(2, estimatedCrewSize);
  } else if (totalVolumeCbm <= 35) {
    recommendedVehicle = 'medium_truck';
    recommendedVehicleLabel = 'Medium Moving Truck (16-18ft)';
    estimatedCrewSize = Math.max(3, estimatedCrewSize);
  } else if (totalVolumeCbm <= 60) {
    recommendedVehicle = 'large_truck';
    recommendedVehicleLabel = 'Heavy Duty Box Truck (24ft)';
    estimatedCrewSize = Math.max(4, estimatedCrewSize);
  } else if (totalVolumeCbm <= 85) {
    recommendedVehicle = 'box_truck';
    recommendedVehicleLabel = 'Commercial Freight Carrier (30ft)';
    estimatedCrewSize = Math.max(5, estimatedCrewSize);
  } else {
    recommendedVehicle = 'special_transport';
    recommendedVehicleLabel = 'Multi-Vehicle Fleet / Special Rig';
    estimatedCrewSize = Math.max(6, estimatedCrewSize);
  }

  const estimatedHours = Math.max(3, Math.round(propConfig.hours + (km / 45)));

  return {
    minPrice,
    maxPrice,
    baseFare,
    distanceFare,
    propertyFare: baseFare,
    servicesFare,
    inventoryFare,
    floorPenalty,
    recommendedVehicle,
    recommendedVehicleLabel,
    estimatedCrewSize,
    estimatedHours,
    totalVolumeCbm: Math.round(totalVolumeCbm * 10) / 10,
    totalEstimatedWeightKg: Math.round(totalWeightKg),
  };
}
