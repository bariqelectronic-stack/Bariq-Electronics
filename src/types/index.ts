export type UserRole = "CUSTOMER" | "STAFF" | "ADMIN";

export type ProductStatus = "draft" | "published" | "archived";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder" | "discontinued";

export type OrderStatus =
  | "pending"
  | "payment_confirmed"
  | "processing"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "paid" | "partially_paid" | "refunded";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  price: string | null;
  salePrice: string | null;
  status: string | null;
  stockStatus: string | null;
  images: string[];
  features: string[];
  applications: string[];
  compatibility: string[];
  whatsIncluded: string[];
  warranty: string | null;
  isFeatured: boolean | null;
  isDemo: boolean | null;
  category?: Category | null;
  brand?: Brand | null;
  specs?: ProductSpec[];
  inventory?: Inventory | null;
  reviews?: Review[];
  tags: string[];
  viewCount: number | null;
  saleCount: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number | null;
  isActive: boolean | null;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
}

export interface ProductSpec {
  id: string;
  name: string;
  value: string | null;
  unit: string | null;
  sortOrder: number | null;
  groupName: string | null;
}

export interface Inventory {
  quantity: number;
  reserved: number;
  lowStockThreshold: number | null;
}

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  isVerified: boolean | null;
  isApproved: boolean | null;
  createdAt: Date;
  user?: { name: string | null } | null;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtAdd: string | null;
  product: Product;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type SortOption = "featured" | "newest" | "price_asc" | "price_desc" | "best_selling";

export interface ShopFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: SortOption;
  search?: string;
  page?: number;
}
