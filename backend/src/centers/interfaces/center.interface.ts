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

  // Medical Record Number Configuration
  mrPrefix?: string; // 3-letter prefix for INAMSOS MR (e.g., 'SBY', 'JKT')
  mrSequenceCounter?: number; // Current sequence counter
  mrSequenceYear?: number; // Year of last sequence reset

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

  // MR Configuration (required for new centers)
  mrPrefix: string; // 3 uppercase letters (e.g., 'SBY', 'JKT', 'BDG')
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

  // MR Configuration (can be updated)
  mrPrefix?: string; // Must be 3 uppercase letters and unique
}
