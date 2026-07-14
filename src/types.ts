export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_30ml: number;
  price_50ml: number;
  price_100ml: number;
  category_id: string | null;
  featured: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  stock_30ml: number;
  stock_50ml: number;
  stock_100ml: number;
  rating: number;
  created_at: string;
};

export type ProductWithRelations = Product & {
  category: Category | null;
  product_images: ProductImage[];
};

export type Review = {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  created_at: string;
};

export type SizeKey = '30ml' | '50ml' | '100ml';

export type CartItem = {
  product_id: string;
  name: string;
  slug: string;
  size: SizeKey;
  unit_price: number;
  quantity: number;
  image_url: string | null;
};

export type OrderPayload = {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_email: string;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  status: string;
};

export type OrderItemPayload = {
  product_id: string | null;
  product_name: string;
  size: string;
  unit_price: number;
  quantity: number;
  line_total: number;
};
