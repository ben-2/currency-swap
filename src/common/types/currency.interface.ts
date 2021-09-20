export type CurrencyAccount = 'USD' | 'EUR' | 'GBP';
export type CurrencyDescription = 'US Dollar' | 'Euro' | 'GB Pound';
export type CurrencySymbol = '$' | '€' | '£';
export type FocusedBox = 'In' | 'Out';
export interface ExchangeRate {
  currency: CurrencyAccount;
  rate: number;
}

export interface Balance {
  currency: CurrencyAccount;
  balance?: number;
}
