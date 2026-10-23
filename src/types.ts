export type Language = 'es' | 'en' | 'pt';

export type Currency = 'USD' | 'EUR' | 'MXN';

export type InvestmentStrategyId = 'conservative' | 'balanced' | 'champion';

export interface InvestmentStrategy {
  id: InvestmentStrategyId;
  name: string;
  annualRate: number; // e.g. 0.085 for 8.5%
  riskLevel: 'low' | 'medium' | 'high';
  composition: {
    label: string;
    percentage: number;
    color: string;
  }[];
}

export interface WorldCupPackage {
  id: string;
  title: string;
  subtitle: string;
  targetUSD: number;
  includes: string[];
  recommendedMonths: number;
  tag: string;
}

export interface UserGoal {
  targetAmountUSD: number;
  currentBalanceUSD: number;
  monthlyContributionUSD: number;
  selectedPackageId: string;
  strategyId: InvestmentStrategyId;
  startDate: string; // ISO
  targetDate: string; // ISO (e.g. 2030-06-01)
  currency: Currency;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'scheduled' | 'extraordinary' | 'yield';
  amountUSD: number;
  status: 'completed' | 'processing';
  note: string;
  hash: string;
}

export interface PushNotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'progress' | 'yield' | 'security' | 'milestone';
  actionUrl?: string;
}

export interface HistoricalYearMetric {
  year: number;
  returnPercentage: number;
  benchmarkPercentage: number; // e.g. IPC / Inflation + 4%
  monthlyData: number[]; // 12 months returns
}

export interface PortfolioAllocation {
  category: string;
  percentage: number;
  color: string;
  description: string;
}

export interface BiometricAuthState {
  isAuthenticated: boolean;
  biometricsEnabled: boolean;
  biometricType: 'face_id' | 'touch_id';
  lastAuthTimestamp: string | null;
  encryptionKeyId: string;
  dataEncrypted: boolean;
}
