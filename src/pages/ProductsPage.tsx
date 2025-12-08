// src/pages/ProductsPage.tsx (Version statique)
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { SEOHead } from '../components/SEO/SEOHead';
import { ProductGrid } from '../components/Products/ProductGrid';
import { useStore } from '../store/useStore';

export const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useStore();
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'clothing', 'accessories', 'shoes', 'bags'];
  const currentCategory = category || 'all';

  useEffect(() => {
    if (currentCategory === 'all') {
      fetchProducts();
    } else {
      fetchProducts(currentCategory);
    }
  }, [currentCategory]);

  const sortedProducts = useMemo(() => {
    if (products.length === 0) return [];

    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [products, sortBy]);

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === 'all') {
      navigate('/products');
    } else {
      navigate(`/category/${newCategory}`);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${currentCategory !== 'all' ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) : 'All Products'} - Minimal Store`}
        description={`Browse our ${currentCategory !== 'all' ? currentCategory : 'complete'} collection of minimal fashion pieces.`}
        canonical={`https://minimal-store.com/${currentCategory !== 'all' ? `category/${currentCategory}` : 'products'}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-black mb-4"
          >
            {currentCategory !== 'all' 
              ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) 
              : 'All Products'}
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our {currentCategory !== 'all' ? currentCategory : 'complete'} collection of carefully curated minimal fashion pieces.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter size={20} />
            <div className="flex flex-wrap gap-2">
              {categories.map(categoryName => (
                <button
                  key={categoryName}
                  onClick={() => handleCategoryChange(categoryName)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    currentCategory === categoryName
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryName}
                </button>
              ))}
            </div>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 bg-white"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              {currentCategory === 'all' 
                ? 'No products are available at the moment.' 
                : `No products found in the "${currentCategory}" category.`}
            </p>
            {currentCategory !== 'all' && (
              <button 
                onClick={() => handleCategoryChange('all')}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              {currentCategory !== 'all' && ` in "${currentCategory}"`}
            </div>
            <ProductGrid products={sortedProducts} />
          </>
        )}
      </div>
    </div>
  );
};