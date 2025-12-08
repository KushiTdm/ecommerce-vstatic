// src/data/categories.ts
export interface StaticCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export const staticCategories: StaticCategory[] = [
  {
    id: 'cat-clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Essential wardrobe pieces for everyday style',
    imageUrl: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with our curated accessories',
    imageUrl: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
  },
  {
    id: 'cat-shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Quality footwear for every occasion',
    imageUrl: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'
  },
  {
    id: 'cat-bags',
    name: 'Bags',
    slug: 'bags',
    description: 'Functional and stylish bags for everyday use',
    imageUrl: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'
  }
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): StaticCategory | undefined => {
  return staticCategories.find(cat => cat.slug === slug);
};

// Helper function to get category by id
export const getCategoryById = (id: string): StaticCategory | undefined => {
  return staticCategories.find(cat => cat.id === id);
};