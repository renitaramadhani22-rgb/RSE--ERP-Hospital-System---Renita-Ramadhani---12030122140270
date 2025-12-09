
export enum StockStatus {
  NORMAL = 'NORMAL',
  LOW_STOCK = 'LOW_STOCK',
  CRITICAL = 'CRITICAL',
  OVERSTOCK = 'OVERSTOCK'
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  reservedStock: number; // Reserved via PSO
  unit: string;
  status: StockStatus;
  lastUpdated: string;
  location: string;
  expiryDate: string;
}

export interface ProcurementOrder {
  id: string;
  prNumber: string; // Purchase Request Number
  vendor: string;
  totalAmount: number;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'ORDERED' | 'RECEIVED';
  date: string;
}

export interface ForecastData {
  date: string;
  actual: number | null;
  predicted: number;
  lowerBound: number;
  upperBound: number;
}

export interface KPI {
  label: string;
  value: string;
  trend: number; // Percentage
  trendDirection: 'up' | 'down';
  description: string;
}

// Financial Types
export interface InsuranceClaim {
  id: string;
  patientName: string;
  policyNumber: string;
  serviceDate: string;
  amountClaimed: number;
  amountApproved: number;
  status: 'MATCHED' | 'PARTIAL' | 'REJECTED' | 'PENDING';
  aiMatchScore: number; // 0 to 100 confidence
  discrepancyReason?: string;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  description: string;
  accountCode: string; // e.g., 4001-Revenue
  debit: number;
  credit: number;
  referenceId: string; // Link to Invoice or PO
}

// AI Response Types
export interface NLQResponse {
  answer: string;
  data?: any[];
  visualizationType?: 'bar' | 'line' | 'pie' | 'table' | 'none';
  sqlGenerated?: string; // For explainability
}
