export interface SpendingType{
  name: string;
  id: number;
  date: string;
  amount: number;
  category?: SpendingCategoryType;
  items: SpendingItemsType[];
}

export interface SpendingItemsType{
  name: string;
  id: number;
  price: number;
  quantity?: number;
}

export interface SpendingCategoryType{
  name: string;
  id: number;
}

export interface SpendingMonthlyReportType{
  summary: {
    totalCurrentMonth: number,
    totalPreviousMonth: number,
    percentageChange: number
  };
  details: {
    currentMonthIncomes: SpendingType[];
    previousMonthIncomes: SpendingType[];
  }
}