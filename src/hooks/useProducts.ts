import { categories, products, Product, Category } from '../data/siteData';

export function useProducts() {
  return { products: [...products].sort((a, b) => a.display_order - b.display_order), loading: false };
}

export function useCategories() {
  return { categories: [...categories].sort((a, b) => a.display_order - b.display_order), loading: false };
}

export function useFeaturedProducts() {
  return {
    products: products.filter((product) => product.featured).slice(0, 6),
    loading: false,
  };
}

export function getCategory(categoryId?: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

export function getProduct(productId?: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getProductsByCategory(categoryId?: string): Product[] {
  return products
    .filter((product) => product.category_id === categoryId)
    .sort((a, b) => a.display_order - b.display_order);
}
