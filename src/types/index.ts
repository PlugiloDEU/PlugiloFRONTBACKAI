export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string; // Added name property
}

export type UserRole = 'OWNER' | 'ADMIN' | 'MOD' | 'USER';

export interface UserPermissions {
  canVerify: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAddUsers: boolean;
  canModifyRoles: boolean;
  canExportData: boolean;
  canAccessAI: boolean;
  canManageSystem: boolean;
}

// Define VerificationEntry type
export interface VerificationEntry {
  date: string;
  verifiedBy: string;
  notes?: string;
}

// Existing interfaces
export interface TopProduct {
  name: string;
  description: string;
  url: string;
  annualRevenue: number; // in millions USD
}

export interface CompanyMetrics {
  trustScore: number; // 0-100
  dealProbability: number; // 0-100
  annualRevenue: number; // in millions USD
  yearOverYearGrowth: number; // percentage
  marketShare: number; // percentage
  topProducts: TopProduct[];
}

// Update Record interface to include metrics
export interface Record {
  id: string;
  status: string;
  level: string;
  lastAccessed: string;
  subject: string;
  details: string;
  requiredClearance: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  logo: string;
  images: string[];
  category: string[];
  tags: string[];
  socialMedia: {
    twitter?: string;
    linkedin?: string;
  };
  description: string;
  sourceFound: string;
  ceo: string;
  previousCEOs?: string[];
  language: string[];
  taxId: string;
  metrics: CompanyMetrics;
  verificationStatus: {
    [key: string]: {
      verified: boolean;
      lastChecked: string;
      verifiedBy: string;
      entries?: VerificationEntry[];
    };
  };
}
