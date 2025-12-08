// src/pages/ProductDetailPage.tsx (Version corrigée - imports fixes)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Star, ChevronLeft, ChevronRight,
  Minus, Plus, Share2, Truck, Shield, RotateCcw
} from 'lucide-react';
import { SEOHead } from '../components/SEO/SEOHead';
import { ProductGrid } from '../components/Products/ProductGrid';
import { useStore } from '../store/useStore';
import { getProductById, transformStaticProduct } from '../lib/staticData';
import type { StaticProduct } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    products, 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    wishlist,
    fetchProducts
  } = useStore();
  
  const [product, setProduct] = useState<StaticProduct | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Fetch related products from the same category
        const categorySlug = foundProduct.categoryId.replace('cat-', '');
        fetchProducts(categorySlug);
      }
    }
  }, [id, fetchProducts]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  const transformedProduct = transformStaticProduct(product);
  const isInWishlist = wishlist.some(item => item.id === transformedProduct.id);
  const relatedProducts = products.filter(p => 
    p.category === transformedProduct.category && p.id !== transformedProduct.id
  ).slice(0, 4);

  const productImages = product.images || [];
  const reviews = product.reviews || [];
  const variants = product.variants || [];
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(transformedProduct, selectedVariant || undefined);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(transformedProduct.id);
    } else {
      addToWishlist(transformedProduct);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": productImages[0]?.url,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": product.inStock ? "InStock" : "OutOfStock"
    },
    ...(reviews.length > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": reviews.length
      }
    })
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${product.name} - Minimal Store`}
        description={product.description}
        canonical={`https://e-commerce.netlify.app/product/${product.id}`}
        image={productImages[0]?.url}
        type="product"
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-black transition-colors">Products</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-gray-50 group">
              {productImages.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    src={productImages[selectedImageIndex]?.url}
                    alt={productImages[selectedImageIndex]?.altText || product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 ${
                      selectedImageIndex === index ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
              {reviews.length > 0 && (
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(averageRating) ? 'fill-black text-black' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({reviews.length} reviews)</span>
                </div>
              )}
              <p className="text-2xl font-semibold text-black">
                ${product.price}
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ${product.comparePrice}
                  </span>
                )}
              </p>
            </div>

            {/* Variants */}
            {variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">{variants[0]?.name || 'Options'}</h3>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 border transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 hover:border-black transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 hover:border-black transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-1 border-2 py-3 font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist
                      ? 'border-black bg-black text-white'
                      : 'border-black text-black hover:bg-black hover:text-white'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                  <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
                
                <button className="border-2 border-black text-black hover:bg-black hover:text-white transition-colors px-4 py-3">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Truck size={20} className="text-gray-500" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw size={20} className="text-gray-500" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield size={20} className="text-gray-500" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="prose max-w-none"
                >
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="font-medium">{review.userName}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'fill-black text-black' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-600">
                      We offer free standard shipping on all orders over $100. 
                      Orders are typically processed within 1-2 business days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Return Policy</h3>
                    <p className="text-gray-600">
                      Items can be returned within 30 days of purchase for a full refund. 
                      Items must be in original condition with tags attached.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-black mb-8 text-center">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
};