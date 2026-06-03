import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export interface Category {
  id: string;
  name: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category_id: string;
  image_url: string;
  display_order: number;
  featured: boolean;
  created_at: string;
}
