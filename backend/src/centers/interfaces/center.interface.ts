export interface Center {
  id: string;
  name: string;
  code: string;
  type: 'hospital' | 'clinic' | 'laboratory' | 'research_center';
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  capacity: number;
  isActive: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  specialties: string[];
  services: string[];

  // Medical Record Number Configuration (Legacy)
  mrPrefix?: string; // 3-letter prefix for INAMSOS MR (e.g., 'SBY', 'JKT')
  mrSequenceCounter?: number; // Current sequence counter
  mrSequenceYear?: number; // Year of last sequence reset
  
  // NEW: National Registration Configuration
  registrationCode?: string; // 2-digit numeric code (01-99)
  tempNumberPrefix?: string; // Prefix for temporary numbers (default: 'T')

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCenterDto {
  name: string;
  code: string;
  type: 'hospital' | 'clinic' | 'laboratory' | 'research_center';
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  capacity: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  specialties: string[];
  services: string[];

  // MR Configuration (legacy - for backward compatibility)
  mrPrefix?: string; // 3 uppercase letters (e.g., 'SBY', 'JKT', 'BDG')
  
  // NEW: National Registration Configuration (required)
  registrationCode: string; // 2 digit numeric (01-99)
}

export interface UpdateCenterDto {
  name?: string;
  type?: 'hospital' | 'clinic' | 'laboratory' | 'research_center';
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  capacity?: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  specialties?: string[];
  services?: string[];
  isActive?: boolean;

  // MR Configuration (legacy - can be updated)
  mrPrefix?: string; // Must be 3 uppercase letters and unique
  
  // NEW: National Registration Configuration (can be updated)
  registrationCode?: string; // 2 digit numeric (01-99), must be unique
  tempNumberPrefix?: string; // Prefix for temporary numbers (default: 'T')
}
