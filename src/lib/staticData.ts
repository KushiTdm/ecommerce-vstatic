// src/lib/staticData.ts
import { staticProducts, StaticProduct } from '../data/products';
import { staticCategories, getCategoryBySlug, getCategoryById } from '../data/categories';

// Transform static product to store product format
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  categorySlug: string;
  inStock: boolean;
  featured?: boolean;
}

export const transformStaticProduct = (product: StaticProduct): Product => {
  const category = getCategoryById(product.categoryId);
  
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0]?.url || '',
    description: product.description,
    category: category?.name || 'Uncategorized',
    categorySlug: category?.slug || 'uncategorized',
    inStock: product.inStock,
    featured: product.featured
  };
};

// Get all products or filter by category/featured
export const getProducts = (categorySlug?: string, featured?: boolean): Product[] => {
  let filtered = [...staticProducts];
  
  // Filter by in stock
  filtered = filtered.filter(p => p.inStock);
  
  // Filter by featured
  if (featured !== undefined) {
    filtered = filtered.filter(p => p.featured === featured);
  }
  
  // Filter by category
  if (categorySlug) {
    const category = getCategoryBySlug(categorySlug);
    if (category) {
      filtered = filtered.filter(p => p.categoryId === category.id);
    } else {
      return [];
    }
  }
  
  return filtered.map(transformStaticProduct);
};

// Get single product by ID
export const getProductById = (id: string): StaticProduct | null => {
  return staticProducts.find(p => p.id === id) || null;
};

// Get single product by slug
export const getProductBySlug = (slug: string): StaticProduct | null => {
  return staticProducts.find(p => p.slug === slug) || null;
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  const filtered = staticProducts.filter(p => 
    p.inStock && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  );
  
  return filtered.map(transformStaticProduct);
};

// Get categories
export const getCategories = () => {
  return staticCategories;
};