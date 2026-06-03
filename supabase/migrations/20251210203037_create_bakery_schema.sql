/*
  # Create Angelus Bakery Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Category name (e.g., "Ψωμιά", "Γλυκά", "Κουλούρια")
      - `description` (text) - Category description
      - `display_order` (integer) - Order for displaying categories
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `category_id` (uuid, foreign key)
      - `image_url` (text) - Product image URL from Pexels
      - `display_order` (integer) - Order within category
      - `featured` (boolean) - Whether to feature on homepage
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (bakery website is public)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial categories
INSERT INTO categories (name, description, display_order) VALUES
  ('Ψωμιά', 'Φρέσκο ψωμί κάθε μέρα', 1),
  ('Ζαχαροπλαστική', 'Χειροποίητα γλυκά και τούρτες', 2),
  ('Κουλούρια & Τυροπιτάκια', 'Αλμυρές λιχουδιές', 3),
  ('Παραδοσιακά', 'Παραδοσιακές συνταγές', 4)
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, category_id, image_url, display_order, featured) VALUES
  -- Ψωμιά
  ('Ψωμί Χωριάτικο', 'Παραδοσιακό ψωμί με προζύμι', (SELECT id FROM categories WHERE name = 'Ψωμιά'), 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', 1, true),
  ('Ψωμί Πολύσπορο', 'Με μείγμα σπόρων και δημητριακών', (SELECT id FROM categories WHERE name = 'Ψωμιά'), 'https://images.pexels.com/photos/4686960/pexels-photo-4686960.jpeg?auto=compress&cs=tinysrgb&w=800', 2, false),
  ('Λαγάνα', 'Παραδοσιακή λαγάνα Καθαράς Δευτέρας', (SELECT id FROM categories WHERE name = 'Ψωμιά'), 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', 3, false),
  
  -- Ζαχαροπλαστική
  ('Γαλακτομπούρεκο', 'Παραδοσιακό γαλακτομπούρεκο με κρέμα', (SELECT id FROM categories WHERE name = 'Ζαχαροπλαστική'), 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=800', 1, true),
  ('Εκλαίρ', 'Εκλαίρ με σοκολάτα', (SELECT id FROM categories WHERE name = 'Ζαχαροπλαστική'), 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=800', 2, true),
  ('Τούρτες', 'Χειροποίητες τούρτες για κάθε περίσταση', (SELECT id FROM categories WHERE name = 'Ζαχαροπλαστική'), 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800', 3, true),
  ('Μπακλαβάς', 'Φύλλο με ξηρούς καρπούς και μέλι', (SELECT id FROM categories WHERE name = 'Ζαχαροπλαστική'), 'https://images.pexels.com/photos/5848391/pexels-photo-5848391.jpeg?auto=compress&cs=tinysrgb&w=800', 4, false),
  
  -- Κουλούρια & Τυροπιτάκια
  ('Κουλούρια Θεσσαλονίκης', 'Παραδοσιακά κουλούρια με σουσάμι', (SELECT id FROM categories WHERE name = 'Κουλούρια & Τυροπιτάκια'), 'https://images.pexels.com/photos/6607235/pexels-photo-6607235.jpeg?auto=compress&cs=tinysrgb&w=800', 1, false),
  ('Τυροπιτάκια', 'Με φέτα και φύλλο κρούστας', (SELECT id FROM categories WHERE name = 'Κουλούρια & Τυροπιτάκια'), 'https://images.pexels.com/photos/5949897/pexels-photo-5949897.jpeg?auto=compress&cs=tinysrgb&w=800', 2, false),
  ('Σπανακοπιτάκια', 'Με φρέσκο σπανάκι και μυρωδικά', (SELECT id FROM categories WHERE name = 'Κουλούρια & Τυροπιτάκια'), 'https://images.pexels.com/photos/5949897/pexels-photo-5949897.jpeg?auto=compress&cs=tinysrgb&w=800', 3, false),
  
  -- Παραδοσιακά
  ('Κουλούρα Πασχαλινή', 'Παραδοσιακή πασχαλινή κουλούρα', (SELECT id FROM categories WHERE name = 'Παραδοσιακά'), 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', 1, false),
  ('Τσουρέκι', 'Αφράτο τσουρέκι με μαστίχα', (SELECT id FROM categories WHERE name = 'Παραδοσιακά'), 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', 2, true),
  ('Βασιλόπιτα', 'Για τυχερή χρονιά', (SELECT id FROM categories WHERE name = 'Παραδοσιακά'), 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800', 3, false)
ON CONFLICT DO NOTHING;