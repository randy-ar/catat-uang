export interface IncomeType{
  name: string;
  id: string;
  date: string;
  amount: number;
  description?: string;
  category?: IncomeCategoryType;
}

export interface IncomeCategoryType{
  name: string;
  id: number;
}