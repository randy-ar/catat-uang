export interface IncomeType{
  name: string;
  id: number;
  date: string;
  amount: number;
  description?: string;
  category?: IncomeCategoryType;
}

export interface IncomeCategoryType{
  name: string;
  id: number;
}