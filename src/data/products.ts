// src/data/products.ts
export interface StaticProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  categoryId: string;
  featured: boolean;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  tags: string[];
  images: Array<{
    id: string;
    url: string;
    altText: string;
    position: number;
  }>;
  variants?: Array<{
    id: string;
    name: string;
    value: string;
    priceAdjustment: number;
    stockQuantity: number;
    sku: string;
  }>;
  reviews?: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    verifiedPurchase: boolean;
    createdAt: string;
  }>;
}

export const staticProducts: StaticProduct[] = [
  // CLOTHING CATEGORY
  {
    id: 'prod-1',
    name: 'Minimal White T-Shirt',
    slug: 'minimal-white-tshirt',
    description: 'A timeless essential crafted from premium organic cotton. This minimalist t-shirt features a classic crew neck, comfortable fit, and exceptional durability. Perfect for everyday wear or layering.',
    shortDescription: 'Premium organic cotton t-shirt with classic fit',
    price: 29.99,
    comparePrice: 39.99,
    categoryId: 'cat-clothing',
    featured: true,
    inStock: true,
    stockQuantity: 50,
    sku: 'MWT-001',
    tags: ['basics', 'cotton', 'everyday'],
    images: [
      {
        id: 'img-1',
        url: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
        altText: 'White minimal t-shirt front view',
        position: 1
      },
      {
        id: 'img-2',
        url: 'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg',
        altText: 'White minimal t-shirt back view',
        position: 2
      }
    ],
    variants: [
      { id: 'var-1', name: 'Size', value: 'S', priceAdjustment: 0, stockQuantity: 15, sku: 'MWT-001-S' },
      { id: 'var-2', name: 'Size', value: 'M', priceAdjustment: 0, stockQuantity: 20, sku: 'MWT-001-M' },
      { id: 'var-3', name: 'Size', value: 'L', priceAdjustment: 0, stockQuantity: 10, sku: 'MWT-001-L' },
      { id: 'var-4', name: 'Size', value: 'XL', priceAdjustment: 0, stockQuantity: 5, sku: 'MWT-001-XL' }
    ],
    reviews: [
      {
        id: 'rev-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        rating: 5,
        title: 'Perfect basic tee',
        comment: 'The quality is amazing and the fit is perfect. Will definitely buy more colors!',
        verifiedPurchase: true,
        createdAt: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Classic Black Hoodie',
    slug: 'classic-black-hoodie',
    description: 'Stay comfortable and stylish with our premium black hoodie. Made from soft cotton blend fabric with a relaxed fit and modern details.',
    shortDescription: 'Comfortable cotton blend hoodie',
    price: 79.99,
    categoryId: 'cat-clothing',
    featured: true,
    inStock: true,
    stockQuantity: 30,
    sku: 'CBH-001',
    tags: ['outerwear', 'casual', 'comfortable'],
    images: [
      {
        id: 'img-3',
        url: 'https://images.pexels.com/photos/8148579/pexels-photo-8148579.jpeg',
        altText: 'Black hoodie front view',
        position: 1
      }
    ],
    variants: [
      { id: 'var-5', name: 'Size', value: 'S', priceAdjustment: 0, stockQuantity: 8, sku: 'CBH-001-S' },
      { id: 'var-6', name: 'Size', value: 'M', priceAdjustment: 0, stockQuantity: 12, sku: 'CBH-001-M' },
      { id: 'var-7', name: 'Size', value: 'L', priceAdjustment: 0, stockQuantity: 7, sku: 'CBH-001-L' },
      { id: 'var-8', name: 'Size', value: 'XL', priceAdjustment: 0, stockQuantity: 3, sku: 'CBH-001-XL' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'Contemporary slim-fit jeans crafted from premium denim with just the right amount of stretch for comfort and mobility.',
    shortDescription: 'Premium stretch denim jeans',
    price: 89.99,
    categoryId: 'cat-clothing',
    featured: false,
    inStock: true,
    stockQuantity: 25,
    sku: 'SFJ-001',
    tags: ['denim', 'pants', 'everyday'],
    images: [
      {
        id: 'img-4',
        url: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
        altText: 'Slim fit jeans',
        position: 1
      }
    ],
    variants: [
      { id: 'var-9', name: 'Size', value: '30', priceAdjustment: 0, stockQuantity: 5, sku: 'SFJ-001-30' },
      { id: 'var-10', name: 'Size', value: '32', priceAdjustment: 0, stockQuantity: 10, sku: 'SFJ-001-32' },
      { id: 'var-11', name: 'Size', value: '34', priceAdjustment: 0, stockQuantity: 7, sku: 'SFJ-001-34' },
      { id: 'var-12', name: 'Size', value: '36', priceAdjustment: 0, stockQuantity: 3, sku: 'SFJ-001-36' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Oversized Sweater',
    slug: 'oversized-sweater',
    description: 'Cozy oversized sweater perfect for layering. Made from soft knit fabric with a relaxed fit.',
    shortDescription: 'Soft knit oversized sweater',
    price: 69.99,
    categoryId: 'cat-clothing',
    featured: true,
    inStock: true,
    stockQuantity: 20,
    sku: 'OSW-001',
    tags: ['knitwear', 'cozy', 'winter'],
    images: [
      {
        id: 'img-5',
        url: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
        altText: 'Oversized sweater',
        position: 1
      }
    ]
  },

  // ACCESSORIES CATEGORY
  {
    id: 'prod-5',
    name: 'Leather Wallet',
    slug: 'leather-wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and cash compartment. Ages beautifully over time.',
    shortDescription: 'Genuine leather bifold wallet',
    price: 49.99,
    categoryId: 'cat-accessories',
    featured: true,
    inStock: true,
    stockQuantity: 40,
    sku: 'LW-001',
    tags: ['leather', 'essentials', 'gift'],
    images: [
      {
        id: 'img-6',
        url: 'https://images.pexels.com/photos/1038935/pexels-photo-1038935.jpeg',
        altText: 'Brown leather wallet',
        position: 1
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Minimalist Watch',
    slug: 'minimalist-watch',
    description: 'Elegant minimalist watch with Japanese movement, sapphire crystal, and genuine leather strap.',
    shortDescription: 'Elegant timepiece with leather strap',
    price: 149.99,
    comparePrice: 199.99,
    categoryId: 'cat-accessories',
    featured: true,
    inStock: true,
    stockQuantity: 15,
    sku: 'MW-001',
    tags: ['watch', 'luxury', 'timepiece'],
    images: [
      {
        id: 'img-7',
        url: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
        altText: 'Minimalist watch',
        position: 1
      }
    ],
    reviews: [
      {
        id: 'rev-2',
        userId: 'user-2',
        userName: 'Michael Chen',
        rating: 5,
        title: 'Stunning design',
        comment: 'Beautiful watch that goes with everything. Great quality for the price.',
        verifiedPurchase: true,
        createdAt: '2024-01-20T14:20:00Z'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Wool Beanie',
    slug: 'wool-beanie',
    description: 'Warm and comfortable wool beanie, perfect for cold weather. Classic design that never goes out of style.',
    shortDescription: 'Classic wool beanie',
    price: 24.99,
    categoryId: 'cat-accessories',
    featured: false,
    inStock: true,
    stockQuantity: 50,
    sku: 'WB-001',
    tags: ['winter', 'wool', 'headwear'],
    images: [
      {
        id: 'img-8',
        url: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg',
        altText: 'Black wool beanie',
        position: 1
      }
    ]
  },

  // SHOES CATEGORY
  {
    id: 'prod-8',
    name: 'White Sneakers',
    slug: 'white-sneakers',
    description: 'Classic white sneakers with leather upper and comfortable cushioned sole. A versatile essential for any wardrobe.',
    shortDescription: 'Classic leather sneakers',
    price: 119.99,
    categoryId: 'cat-shoes',
    featured: true,
    inStock: true,
    stockQuantity: 35,
    sku: 'WS-001',
    tags: ['sneakers', 'casual', 'leather'],
    images: [
      {
        id: 'img-9',
        url: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
        altText: 'White leather sneakers',
        position: 1
      }
    ],
    variants: [
      { id: 'var-13', name: 'Size', value: '8', priceAdjustment: 0, stockQuantity: 8, sku: 'WS-001-8' },
      { id: 'var-14', name: 'Size', value: '9', priceAdjustment: 0, stockQuantity: 12, sku: 'WS-001-9' },
      { id: 'var-15', name: 'Size', value: '10', priceAdjustment: 0, stockQuantity: 10, sku: 'WS-001-10' },
      { id: 'var-16', name: 'Size', value: '11', priceAdjustment: 0, stockQuantity: 5, sku: 'WS-001-11' }
    ]
  },
  {
    id: 'prod-9',
    name: 'Chelsea Boots',
    slug: 'chelsea-boots',
    description: 'Timeless Chelsea boots in premium suede. Features elastic side panels and durable sole for all-day comfort.',
    shortDescription: 'Premium suede Chelsea boots',
    price: 159.99,
    categoryId: 'cat-shoes',
    featured: false,
    inStock: true,
    stockQuantity: 20,
    sku: 'CB-001',
    tags: ['boots', 'suede', 'formal'],
    images: [
      {
        id: 'img-10',
        url: 'https://images.pexels.com/photos/1619652/pexels-photo-1619652.jpeg',
        altText: 'Brown Chelsea boots',
        position: 1
      }
    ],
    variants: [
      { id: 'var-17', name: 'Size', value: '8', priceAdjustment: 0, stockQuantity: 5, sku: 'CB-001-8' },
      { id: 'var-18', name: 'Size', value: '9', priceAdjustment: 0, stockQuantity: 8, sku: 'CB-001-9' },
      { id: 'var-19', name: 'Size', value: '10', priceAdjustment: 0, stockQuantity: 5, sku: 'CB-001-10' },
      { id: 'var-20', name: 'Size', value: '11', priceAdjustment: 0, stockQuantity: 2, sku: 'CB-001-11' }
    ]
  },

  // BAGS CATEGORY
  {
    id: 'prod-10',
    name: 'Canvas Tote Bag',
    slug: 'canvas-tote-bag',
    description: 'Durable canvas tote bag perfect for daily errands or shopping. Features sturdy handles and spacious interior.',
    shortDescription: 'Eco-friendly canvas tote',
    price: 34.99,
    categoryId: 'cat-bags',
    featured: false,
    inStock: true,
    stockQuantity: 45,
    sku: 'CTB-001',
    tags: ['tote', 'canvas', 'eco-friendly'],
    images: [
      {
        id: 'img-11',
        url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
        altText: 'Natural canvas tote bag',
        position: 1
      }
    ]
  },
  {
    id: 'prod-11',
    name: 'Leather Backpack',
    slug: 'leather-backpack',
    description: 'Premium leather backpack with laptop compartment and multiple pockets. Perfect for work or travel.',
    shortDescription: 'Premium leather backpack',
    price: 199.99,
    comparePrice: 249.99,
    categoryId: 'cat-bags',
    featured: true,
    inStock: true,
    stockQuantity: 15,
    sku: 'LB-001',
    tags: ['backpack', 'leather', 'laptop'],
    images: [
      {
        id: 'img-12',
        url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
        altText: 'Brown leather backpack',
        position: 1
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        userId: 'user-3',
        userName: 'Emma Wilson',
        rating: 5,
        title: 'Best backpack ever',
        comment: 'Amazing quality and so spacious. Fits my 15" laptop perfectly!',
        verifiedPurchase: true,
        createdAt: '2024-02-01T09:15:00Z'
      },
      {
        id: 'rev-4',
        userId: 'user-4',
        userName: 'David Park',
        rating: 4,
        title: 'Great quality',
        comment: 'Very well made and looks professional. Worth the investment.',
        verifiedPurchase: true,
        createdAt: '2024-02-05T16:45:00Z'
      }
    ]
  },
  {
    id: 'prod-12',
    name: 'Crossbody Bag',
    slug: 'crossbody-bag',
    description: 'Compact crossbody bag in soft leather. Perfect size for essentials with adjustable strap.',
    shortDescription: 'Compact leather crossbody',
    price: 79.99,
    categoryId: 'cat-bags',
    featured: false,
    inStock: true,
    stockQuantity: 30,
    sku: 'XB-001',
    tags: ['crossbody', 'leather', 'compact'],
    images: [
      {
        id: 'img-13',
        url: 'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg',
        altText: 'Black crossbody bag',
        position: 1
      }
    ]
  }
];