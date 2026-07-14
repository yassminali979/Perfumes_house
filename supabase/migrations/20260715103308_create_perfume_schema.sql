/*
# Luxury Perfume E-Commerce Schema

## Overview
Creates a scalable schema for a luxury perfume storefront with categories,
products, multiple product images, customer orders with line items, and
product reviews. Single-tenant (no auth) storefront: all policies are open to
`anon, authenticated` so the anon-key frontend can read products and submit
orders. Prices are in Egyptian Pounds (EGP). Delivery fee is a fixed 100 EGP
enforced in the frontend.

## Tables

1. `categories`
   - `id` uuid PK
   - `name` text unique (e.g. Men, Women, Unisex, Luxury Collection)
   - `slug` text unique
   - `description` text
   - `image_url` text (category banner)
   - `sort_order` int default 0
   - `created_at` timestamptz

2. `products`
   - `id` uuid PK
   - `name` text
   - `slug` text unique
   - `description` text
   - `price_30ml` numeric(10,2) — price for 30ml in EGP
   - `price_50ml` numeric(10,2)
   - `price_100ml` numeric(10,2)
   - `category_id` uuid FK -> categories(id)
   - `featured` boolean default false (Featured Perfumes)
   - `is_new` boolean default false (New Arrivals)
   - `is_best_seller` boolean default false (Best Sellers)
   - `top_notes` text[]
   - `heart_notes` text[]
   - `base_notes` text[]
   - `stock_30ml` int default 0 (inventory)
   - `stock_50ml` int default 0
   - `stock_100ml` int default 0
   - `rating` numeric(2,1) default 5.0
   - `created_at` timestamptz

3. `product_images`
   - `id` uuid PK
   - `product_id` uuid FK -> products(id) ON DELETE CASCADE
   - `image_url` text
   - `alt` text
   - `sort_order` int default 0

4. `orders`
   - `id` uuid PK
   - `customer_name` text
   - `customer_phone` text
   - `customer_address` text
   - `customer_city` text
   - `notes` text (optional)
   - `subtotal` numeric(12,2) (items total in EGP)
   - `delivery_fee` numeric(12,2) default 100.00
   - `total` numeric(12,2) (subtotal + delivery)
   - `payment_method` text default 'COD'
   - `status` text default 'pending'
   - `whatsapp_sent` boolean default false
   - `created_at` timestamptz

5. `order_items`
   - `id` uuid PK
   - `order_id` uuid FK -> orders(id) ON DELETE CASCADE
   - `product_id` uuid (denormalized snapshot, no FK to preserve order history)
   - `product_name` text (snapshot)
   - `size` text (30ml / 50ml / 100ml)
   - `unit_price` numeric(12,2) (snapshot in EGP)
   - `quantity` int
   - `line_total` numeric(12,2)

6. `reviews`
   - `id` uuid PK
   - `product_id` uuid FK -> products(id) ON DELETE CASCADE
   - `author_name` text
   - `rating` int (1-5)
   - `comment` text
   - `approved` boolean default true (for future admin moderation)
   - `created_at` timestamptz

## Security
- RLS enabled on all tables.
- All tables allow anon+authenticated SELECT (public storefront).
- orders + order_items + reviews allow anon+authenticated INSERT (guest checkout / reviews).
- orders allow anon UPDATE (whatsapp_sent flag) — kept open for single-tenant storefront.
- No UPDATE/DELETE on products/categories/images via anon (managed by future admin).
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price_30ml numeric(10,2) NOT NULL DEFAULT 0,
  price_50ml numeric(10,2) NOT NULL DEFAULT 0,
  price_100ml numeric(10,2) NOT NULL DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  featured boolean NOT NULL DEFAULT false,
  is_new boolean NOT NULL DEFAULT false,
  is_best_seller boolean NOT NULL DEFAULT false,
  top_notes text[] DEFAULT '{}',
  heart_notes text[] DEFAULT '{}',
  base_notes text[] DEFAULT '{}',
  stock_30ml int NOT NULL DEFAULT 0,
  stock_50ml int NOT NULL DEFAULT 0,
  stock_100ml int NOT NULL DEFAULT 0,
  rating numeric(2,1) NOT NULL DEFAULT 5.0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  customer_city text NOT NULL,
  notes text,
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  delivery_fee numeric(12,2) NOT NULL DEFAULT 100.00,
  total numeric(12,2) NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'COD',
  status text NOT NULL DEFAULT 'pending',
  whatsapp_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid,
  product_name text NOT NULL,
  size text NOT NULL,
  unit_price numeric(12,2) NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  line_total numeric(12,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating int NOT NULL DEFAULT 5,
  comment text,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_best ON products(is_best_seller);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- categories: public read
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- products: public read
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- product_images: public read
DROP POLICY IF EXISTS "anon_select_product_images" ON product_images;
CREATE POLICY "anon_select_product_images" ON product_images FOR SELECT
  TO anon, authenticated USING (true);

-- reviews: public read (approved only filter handled in app)
DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- orders: guest checkout — anon can insert + read own orders by phone is not enforceable without auth;
-- single-tenant storefront allows anon read of orders for order confirmation lookup.
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- order_items: guest checkout
DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items" ON order_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);
