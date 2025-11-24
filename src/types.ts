
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  benefits?: string;
  ingredients?: string;
  howToUse?: string;
  inStock?: boolean;
  countInStock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id?: string; // Added id for user management
  _id?: string; // For backend compatibility
  name: string;
  email: string;
  token?: string; // Made optional for listing users
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  createdAt?: string; // For display in admin table
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  _id?: string;
  user?: any;
  email?: string;
  orderItems: {
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    method?: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice?: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Ready for Pickup';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface DeliveryStatus {
  status: 'Processing' | 'In Transit' | 'Delivered';
  updatedAt: Date;
}
