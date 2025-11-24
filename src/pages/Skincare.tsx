import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Product } from '../types';

const ITEMS_PER_PAGE = 9;

const Skincare: React.FC = () => {
  const { addToCart, products, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [notification, setNotification] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setNotification(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      setNotification(`${product.name} added to wishlist`);
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] font-sans relative overflow-hidden">
      <div className="relative bg-white/50 backdrop-blur-sm border-b border-pink-100 pt-24 pb-16 text-center">
        <span className="block text-pink-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">The Collection</span>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Dr JaneA. Skincare</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">Science-backed formulations designed to reveal your skin's natural radiance and magnetic attractiveness.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {notification && <div className="fixed top-24 right-4 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-2"><ShoppingBag className="h-4 w-4 text-pink-400" />{notification}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {currentProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative" onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
              <div className="relative h-80 overflow-hidden bg-[#F9F9F9] p-8 flex items-center justify-center group-hover:bg-[#F0F0F0] transition-colors duration-500">
                <img src={product.image} alt={product.name} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/F9F9F9/999999?text=' + encodeURIComponent(product.name); }} className={`w-full h-full object-contain drop-shadow-xl transition-transform duration-700 ${hoveredProduct === product.id ? 'scale-110 -translate-y-2' : 'scale-100'}`} />
                {!product.inStock && <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10"><span className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase">Out of Stock</span></div>}

                {/* Wishlist Button - Always visible on mobile, hover on desktop */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-all duration-300 z-20 ${isInWishlist(product.id) ? 'bg-pink-500 text-white' : 'bg-white text-gray-400 hover:text-pink-500'} ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>

                <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-300 ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <Link to={`/product/${product.id}`} className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-pink-50"><Eye className="h-5 w-5" /></Link>
                  <button onClick={() => handleAdd(product)} disabled={!product.inStock} className="p-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-pink-600 disabled:bg-gray-400"><ShoppingBag className="h-5 w-5" /></button>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}><h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">{product.name}</h3></Link>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50"><span className="text-lg font-medium text-gray-900">₦{product.price.toLocaleString()}</span></div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 py-8">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-pink-50 disabled:opacity-50"><ChevronLeft className="h-5 w-5" /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => handlePageChange(page)} className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all ${currentPage === page ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{page}</button>))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-pink-50 disabled:opacity-50"><ChevronRight className="h-5 w-5" /></button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Skincare;
