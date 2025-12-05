
export interface AbnRecord {
  id: string;
  abn: string;
  entityName: string;
  tradingName?: string; // Primary trading name
  otherTradingNames: string[]; // New: List of all trading names
  state: string;
  postcode: string;
  addressDate?: string; // New: When address was updated
  status: 'Active' | 'Cancelled';
  statusDate: string; // ISO date string
  entityType: string;
  entityTypeCode: string; // New: e.g. PRV, TRT
  // Industry Classification Fields
  industryCode?: string;                    // Grant Thornton category code (e.g., "4601")
  industryName?: string;                    // Category name (e.g., "Applied computing")
  industryGroup?: string;                   // Group name (e.g., "INFORMATION AND COMPUTING SCIENCES")
  classificationSource?: 'AI' | 'MANUAL';   // How was it classified?
  classificationConfidence?: number;        // 0-100% confidence score
  classificationReason?: string;            // Brief AI explanation
  classificationReviewed?: boolean;         // Has user reviewed this?
  classificationDate?: string;              // When was it classified?

  // Legacy/Deprecated (kept for backward compatibility)
  anzsicCode?: string;
  anzsicDescription?: string;
  businessSummary?: string;
  website?: string;
  confidence?: number;
  evidence?: string; 
  email?: string; 
  socials?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  // New ABN Lookup Fields
  acn?: string;
  gst?: string; // GST Effective Date string
  gstRegistered?: boolean; // New: Explicit boolean for active registration
  dgr?: { // New: Deductible Gift Recipient
    isDgr: boolean;
    from?: string;
  };
  charityType?: string[]; // New: List of charity types
  // Data Preservation
  metadata?: Record<string, string>; // Stores original CSV columns (e.g. Client ID, Mobile)
}

export interface DashboardStats {
  totalRecords: number;
  activeCount: number;
  cancelledCount: number;
  topState: string;
  topIndustry: string;
}

export interface ChartDataYear {
  year: string;
  active: number;
  cancelled: number;
}

export interface ChartDataState {
  name: string;
  value: number;
  color: string;
}

export interface ChartDataIndustry {
  name: string;
  value: number;
}

export enum UploadStatus {
  IDLE = 'IDLE',
  PARSING = 'PARSING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface UploadProgress {
  current: number;
  total: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  credits_balance: number;
  subscription_tier: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise';
  is_admin?: boolean;
}
