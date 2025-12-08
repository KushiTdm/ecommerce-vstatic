// src/store/useStore.ts (Version statique sans authentification)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProducts } from '../lib/staticData';

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

export interface CartItem {
  id: string;
  product: Product;
  variant?: {
    id: string;
    name: string;
    value: string;
  };
  quantity: number;
}

interface Store {
  // Products
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (categorySlug?: string, featured?: boolean) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  
  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Products
      products: [],
      loading: false,
      error: null,
      
      fetchProducts: (categorySlug?: string, featured?: boolean) => {
        console.log('📦 Fetching products:', { categorySlug, featured });
        set({ loading: true, error: null });
        
        try {
          // Simulate async loading for smoother UX
          setTimeout(() => {
            const products = getProducts(categorySlug, featured);
            console.log('✅ Products loaded:', products.length);
            set({ products, loading: false });
          }, 100);
        } catch (error) {
          console.error('❌ Error loading products:', error);
          set({ error: 'Failed to load products', loading: false });
        }
      },
      
      // Cart operations
      cart: [],
      
      addToCart: (product, variantId, quantity = 1) => {
        console.log('🛒 Adding to cart:', product.name);
        
        const existingItem = get().cart.find(item => 
          item.product.id === product.id && 
          item.variant?.id === variantId
        );
        
        if (existingItem) {
          // Update quantity
          set({
            cart: get().cart.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `cart-${Date.now()}-${Math.random()}`,
            product,
            variant: variantId ? { id: variantId, name: 'Size', value: 'M' } : undefined,
            quantity
          };
          set({ cart: [...get().cart, newItem] });
        }
      },

      removeFromCart: (itemId) => {
        console.log('🛒 Removing from cart:', itemId);
        set({ cart: get().cart.filter(item => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        console.log('🛒 Updating quantity:', { itemId, quantity });
        
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => {
        console.log('🛒 Clearing cart');
        set({ cart: [] });
      },
      
      // Wishlist operations
      wishlist: [],

      addToWishlist: (product) => {
        console.log('❤️ Adding to wishlist:', product.name);
        
        const isAlreadyInWishlist = get().wishlist.some(item => item.id === product.id);
        if (!isAlreadyInWishlist) {
          set({ wishlist: [...get().wishlist, product] });
        }
      },

      removeFromWishlist: (productId) => {
        console.log('❤️ Removing from wishlist:', productId);
        set({ wishlist: get().wishlist.filter(item => item.id !== productId) });
      },
      
      // UI State
      isCartOpen: false,
      setCartOpen: (open) => {
        console.log('🛒 Setting cart open:', open);
        set({ isCartOpen: open });
      },
      
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => {
        console.log('📱 Setting mobile menu open:', open);
        set({ isMobileMenuOpen: open });
      },
    }),
    {
      name: 'minimal-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
);