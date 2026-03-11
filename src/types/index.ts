export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: 'admin' | 'dealer';
  companyName?: string;
  shopName?: string;
  city?: string;
  address?: string;
  commission?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  dob: string;
  address: string;
  occupation: string;
  aadhaar?: string;
  pan?: string;
  selfie?: string;
}

export interface Product {
  category: string;
  brand: string;
  model: string;
  price: number;
}

export interface Loan {
  id: string;
  customerId: string;
  dealerId: string;
  productId: string;
  product: Product;
  customer: Customer;
  downPayment: number;
  loanAmount: number;
  interest: number;
  tenure: number;
  emi: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  documents?: {
    aadhaar?: string;
    pan?: string;
    selfie?: string;
    invoice?: string;
  };
}

export interface Dealer {
  id: string;
  name: string;
  shopName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  commission: number;
  status: 'active' | 'suspended';
  activeLoans: number;
}

export interface EMI {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface LoanApplication {
  id: string;
  customer: Customer;
  product: Product;
  loan: Loan;
  dealer: Dealer;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
