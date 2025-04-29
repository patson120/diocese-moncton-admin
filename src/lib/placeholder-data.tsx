
export const users: User[] = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Test',
    email: 'patrickkennenl@gmail.com',
    password: '123456',
  },
];

export const categories: Category[] = [
  { id: "081df2eb-50aa-4e06-bfdd-d84a165be0c5", name: "Housing", type: "expense", color: "#ec4899" },
  { id: "79838294-0a8b-491d-a709-2a98be07f284", name: "Food", type: "expense", color: "#8b5cf6" },
  { id: "9e427b78-d977-4f9f-9b39-9a6235e6f002", name: "Transport", type: "expense", color: "#10b981" },
  { id: "ac5d7098-e651-4e4f-b241-e8e0a42f9186", name: "Entertainment", type: "expense", color: "#f59e0b" },
  { id: "4f95a7a5-0230-4373-b9e9-bb2289a4b532", name: "Shopping", type: "expense", color: "#3b82f6" },
  { id: "586797f0-4798-407a-be90-f8a7269eff1f", name: "Healthcare", type: "expense", color: "#ef4444" },
  { id: "111f45c7-2411-43a7-b03f-fe9a2eddae88", name: "Salary", type: "income", color: "#22c55e" },
  { id: "7bc796bb-349a-44b7-94e0-75f14bf3930b", name: "Investment", type: "income", color: "#6366f1" },
];

export const accounts: Account[] = [
  {
    id: "6dbf9cde-a3af-4914-9635-96ba095878f2",
    name: "Checking Account",
    subtitle: "Main Account",
    type: "checking",
    balance: 2500.00,
    currency: "USD",
  },
  {
    id: "e2f63da0-5c3e-4097-9fe0-d8f18cab72c2",
    name: "Savings Account",
    subtitle: "Emergency Fund",
    type: "savings",
    balance: 10000.00,
    currency: "USD",
  },
  {
    id: "d1bdb4e7-340c-4adc-b58b-4fd05457c801",
    name: "Investment Account",
    subtitle: "Checking Account",
    type: "investment",
    balance: 5750.00,
    currency: "USD",
  },
];

export const transactions: Transaction[] = [
  {
    id: "0aa07cc4-6cff-4404-a08e-cfa27349995d",
    date: new Date(),
    description: "Grocery Shopping",
    amount: -120.50,
    type: "expense",
    category_id: "79838294-0a8b-491d-a709-2a98be07f284",
    account_id: "6dbf9cde-a3af-4914-9635-96ba095878f2",
  },
  {
    id: "bd739035-c6b1-4601-a948-4a8c000e8e30",
    date: new Date(),
    description: "Monthly Salary",
    amount: 3000.00,
    type: "income",
    category_id: "111f45c7-2411-43a7-b03f-fe9a2eddae88",
    account_id: "6dbf9cde-a3af-4914-9635-96ba095878f2",
  },
  {
    id: "889f543d-659d-4ffe-8577-410d735ed468",
    date: new Date(),
    description: "Netflix Subscription",
    amount: -15.99,
    type: "expense",
    category_id: "ac5d7098-e651-4e4f-b241-e8e0a42f9186",
    account_id: "6dbf9cde-a3af-4914-9635-96ba095878f2",
  },
  {
    id: "e8a1474f-e79d-454e-9086-9cc83ff7be9b",
    date: new Date(),
    description: "Gas Station",
    amount: -45.00,
    type: "expense",
    category_id: "9e427b78-d977-4f9f-9b39-9a6235e6f002",
    account_id: "6dbf9cde-a3af-4914-9635-96ba095878f2",
  },
];

export const goalCategories: GoalCategories[] = [
  { id: "0aa07cc4-6cff-4404-a08e-cfa27349995d", name: "Savings" },
  { id: "889f543d-659d-4ffe-8577-410d735ed468", name: "Vehicle" },
  { id: "e8a1474f-e79d-454e-9086-9cc83ff7be9b", name: "Travel" },
  { id: "bd739035-c6b1-4601-a948-4a8c000e8e30", name: "Education" },
  { id: "896b7ab4-65cf-4e65-a63e-75da2cc0cf07", name: "Insurance" },
]

export const savingsGoals: SavingsGoal[] = [
  {
    id: "bd55e32d-91d8-473c-8691-3a8dda078ddc",
    name: "Emergency Fund",
    target_amount: 10000,
    current_amount: 5000,
    deadline: (new Date(2024, 11, 31)),
    // categoryId: "Savings",
    category_id: "0aa07cc4-6cff-4404-a08e-cfa27349995d",
    description: "6 months of living expenses",
    currency: "USD",
    account_id: "e2f63da0-5c3e-4097-9fe0-d8f18cab72c2",
    color: "#22c55e",
  },
  {
    id: "fba8b7b0-856a-410a-8a7d-f826dc7d7dd0",
    name: "New Car",
    target_amount: 25000,
    current_amount: 8000,
    deadline: new Date(2025, 5, 30),
    // categoryId: "Vehicle",
    category_id: "889f543d-659d-4ffe-8577-410d735ed468",
    description: "Down payment for a new car",
    currency: "USD",
    account_id: "e2f63da0-5c3e-4097-9fe0-d8f18cab72c2",
    color: "#3b82f6",
  },
  {
    id: "1e23f854-5992-48b8-b29f-6d7e995f7f4a",
    name: "Vacation Fund",
    target_amount: 5000,
    current_amount: 2500,
    deadline: new Date(2024, 7, 1),
    // categoryId: "Travel",
    category_id: "e8a1474f-e79d-454e-9086-9cc83ff7be9b",
    description: "Summer vacation in Europe",
    currency: "USD",
    account_id: "e2f63da0-5c3e-4097-9fe0-d8f18cab72c2",
    color: "#f59e0b",
  },
];

/// Types ///

export type TransactionType = "expense" | "income"

export type User ={
  id: string;
  name: string;
  email: string;
  password: string;
}

export type Category = {
  id: string;
  name: string;
  type: "expense" | "income";
  color: string;
  icon?: string;
};

export type Account = {
  id: string;
  name: string;
  subtitle: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
};

export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category_id: string;
  account_id: string;
  notes?: string;
};

export type SavingsGoal = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: Date;
  category_id: string;
  description?: string;
  currency: string;
  account_id: string;
  color: string;
};

export type GoalCategories = {
  id: string;
  name: string;
}