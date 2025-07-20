import { IncomeType } from "./types/income/income";
import { SpendingType } from "./types/spending/spending";

export const SpendingData: SpendingType[] = [
  {
    name: "Almaz Fried Chicken",
    id: 1,
    date: "21 July 2023",
    amount: 66000,
    category: {
      name: "Food",
      id: 1,
    },
    items: [
      {
        name: "Fried Chicken",
        id: 1,
        price: 33000,
        quantity: 1
      },
      {
        name: "Salad",
        id: 2,
        price: 10000,
        quantity: 1
      },
      {
        name: "Dessert",
        id: 3,
        price: 10000,
        quantity: 1
      }
    ]
  },  
  {
    name: "Starbucks",
    id: 2,
    date: "20 July 2023",
    amount: 50000,
    category: {
      name: "Food",
      id: 1,
    },
    items: [
      {
        name: "Caramel Macchiato",
        id: 4,
        price: 50000,
        quantity: 1
      }
    ]
  },
  {
    name: "Cinema XXI",
    id: 3,
    date: "19 July 2023",
    amount: 80000,
    category: {
      name: "Entertainment",
      id: 2,
    },
    items: [
      {
        name: "Movie Ticket",
        id: 5,
        price: 50000,
        quantity: 1
      },
      {
        name: "Popcorn Combo",
        id: 6,
        price: 30000,
        quantity: 1
      }
    ]
  },
  {
    name: "Gramedia",
    id: 4,
    date: "18 July 2023",
    amount: 120000,
    category: {
      name: "Hobbies",
      id: 3,
    },
    items: [
      {
        name: "Novel",
        id: 7,
        price: 85000,
        quantity: 1
      },
      {
        name: "Notebook",
        id: 8,
        price: 35000,
        quantity: 1
      }
    ]
  },
  {
    name: "Gojek",
    id: 5,
    date: "17 July 2023",
    amount: 25000,
    category: {
      name: "Transportation",
      id: 4,
    },
    items: [
      {
        name: "GoRide to Office",
        id: 9,
        price: 25000,
        quantity: 1
      }
    ]
  },
  {
    name: "Indomaret",
    id: 6,
    date: "16 July 2023",
    amount: 35000,
    category: {
      name: "Utilities",
      id: 5,
    },
    items: [
      {
        name: "Mineral Water",
        id: 10,
        price: 5000,
        quantity: 1
      },
      {
        name: "Snacks",
        id: 11,
        price: 15000,
        quantity: 1
      },
      {
        name: "Soap",
        id: 12,
        price: 15000,
        quantity: 1
      }
    ]
  },
  {
    name: "Netflix Subscription",
    id: 7,
    date: "15 July 2023",
    amount: 150000,
    category: {
      name: "Bills",
      id: 6,
    },
    items: [
      {
        name: "Premium Plan",
        id: 13,
        price: 150000,
        quantity: 1
      }
    ]
  },
  {
    name: "Local Cafe",
    id: 8,
    date: "14 July 2023",
    amount: 45000,
    category: {
      name: "Food",
      id: 1,
    },
    items: [
      {
        name: "Iced Coffee",
        id: 14,
        price: 25000,
        quantity: 1
      },
      {
        name: "Croissant",
        id: 15,
        price: 20000,
        quantity: 1
      }
    ]
  },
  {
    name: "Online Shopping",
    id: 9,
    date: "13 July 2023",
    amount: 200000,
    category: {
      name: "Shoppings",
      id: 7,
    },
    items: [
      {
        name: "T-Shirt",
        id: 16,
        price: 120000,
        quantity: 1
      },
      {
        name: "Phone Case",
        id: 17,
        price: 80000,
        quantity: 1
      }
    ]
  },
  {
    name: "Gym Membership",
    id: 10,
    date: "12 July 2023",
    amount: 100000,
    category: {
      name: "Health",
      id: 8,
    },
    items: [
      {
        name: "Monthly Fee",
        id: 18,
        price: 100000,
        quantity: 1
      }
    ]
  },
  {
    name: "Restaurant Dinner",
    id: 11,
    date: "11 July 2023",
    amount: 90000,
    category: {
      name: "Food",
      id: 1,
    },
    items: [
      {
        name: "Steak",
        id: 19,
        price: 70000,
        quantity: 1
      },
      {
        name: "Iced Tea",
        id: 20,
        price: 20000,
        quantity: 1
      }
    ]
  },

]

export const IncomeData: IncomeType[] = [
  {
    id: 1,
    name: "Salary",
    amount: 10000,
    date: "21 July 2025",
    description: "Monthly salary",
    category: {
      id: 1,
      name: "Salary"
    }
  },
  {
    id: 2,
    name: "Freelance",
    amount: 5000,
    date: "21 Febuary 2025",
    description: "Freelance work",
    category: {
      id: 2,
      name: "Freelance"
    }
  },
  {
    id: 3,
    name: "Gift",
    amount: 5000,
    date: "21 January 2025",
    description: "Gift from parents",
    category: {
      id: 3,
      name: "Gift"
    }
  }
]
