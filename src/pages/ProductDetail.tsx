import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { ArrowLeft, ShoppingBag, Plus, Minus, Facebook, Twitter, Phone } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, products } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find(p => p.id === id);
      if (found) setProduct(found);
      else navigate('/skincare');
    }
  }, [id, products, navigate]);

  if (!product) return <div>Loading...</div>;
  const isOutOfStock = !product.inStock || (product.countInStock !== undefined && product.countInStock <= 0);
  const handleQuantityChange = (delta: number) => setQuantity(prev => Math.max(1, prev + delta));
  const shareUrl = window.location.href;
  const shareText = `Check out ${product.name} on JAANMAK!`;

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFF9F9] py-12 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-500 hover:text-pink-600 mb-8 transition-colors duration-300"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md mr-3 transition-all duration-300">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span className="font-medium">Back to Shopping</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
          {/* Image Section */}
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(255,182,193,0.2)] bg-white p-6 md:p-8 border border-pink-50 group cursor-zoom-in">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-50"></div>
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/FADADD/4A4A4A?text=' + encodeURIComponent(product.name); }}
              className={`relative z-10 w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-150 origin-center ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
            />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-20 backdrop-blur-sm">
                <span className="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-serif font-bold uppercase tracking-widest shadow-xl transform -rotate-12 border-4 border-white">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-8 md:space-y-10 pt-4">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-[0.2em] uppercase">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-light text-pink-600">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="prose prose-pink max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <div className="grid gap-6">
              {product.benefits && (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-[4rem] -mr-4 -mt-4 opacity-50"></div>
                  <h3 className="font-serif font-semibold text-xl mb-3 text-gray-900 relative z-10">Why You'll Love It</h3>
                  <p className="text-gray-600 relative z-10 leading-relaxed">{product.benefits}</p>
                </div>
              )}

              {product.ingredients && (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                  <h3 className="font-serif font-semibold text-xl mb-3 text-gray-900">Key Ingredients</h3>
                  <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
                </div>
              )}

              {product.howToUse && (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                  <h3 className="font-serif font-semibold text-xl mb-3 text-gray-900">How to Use</h3>
                  <p className="text-gray-600 leading-relaxed">{product.howToUse}</p>
                </div>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:block space-y-6 pt-6 border-t border-pink-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-white border border-pink-100 rounded-full px-2 py-2 shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-50 text-gray-500 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg text-gray-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-50 text-gray-500 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => { addToCart(product, quantity); navigate('/cart'); }}
                  disabled={isOutOfStock}
                  className="flex-1 px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-full hover:from-pink-600 hover:to-rose-500 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-200/50 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <ShoppingBag className="h-5 w-5 group-hover:animate-bounce" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-4">
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        // Try to share with image if possible
                        const response = await fetch(product.image);
                        const blob = await response.blob();
                        const file = new File([blob], 'product.png', { type: blob.type });

                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                          await navigator.share({
                            title: product.name,
                            text: shareText,
                            files: [file],
                            url: shareUrl
                          });
                        } else {
                          throw new Error('Files not shareable');
                        }
                      } catch (err) {
                        // Fallback to just text/url
                        navigator.share({
                          title: product.name,
                          text: shareText,
                          url: shareUrl
                        }).catch(console.error);
                      }
                    } else {
                      // Fallback for desktop
                      alert('Copy this link to share: ' + shareUrl);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-50 text-pink-600 font-bold hover:bg-pink-100 transition-colors"
                >
                  <span className="uppercase tracking-wider text-sm">Share Product</span>
                  <div className="flex gap-2">
                    <Facebook className="h-4 w-4" />
                    <Twitter className="h-4 w-4" />
                    <Phone className="h-4 w-4 rotate-90" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="pt-16 border-t border-pink-100 mb-24">
          <h3 className="font-serif font-bold text-4xl mb-12 text-gray-900 text-center">Client Reviews</h3>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-10 rounded-[2rem] border border-pink-100 shadow-sm">
              <div className="flex text-yellow-400 gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">"Absolutely divine!"</h4>
              <p className="text-gray-600 italic text-lg leading-relaxed mb-6">"I've been using this for two weeks and the difference is night and day. The packaging is beautiful and it feels so luxurious on my skin."</p>
              <p className="text-pink-600 font-bold text-sm uppercase tracking-wide">— Ngozi A.</p>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-10 rounded-[2rem] border border-pink-100 shadow-sm">
              <div className="flex text-yellow-400 gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">"Worth every penny"</h4>
              <p className="text-gray-600 italic text-lg leading-relaxed mb-6">"Fast delivery to Abuja and the product quality is unmatched. It really lives up to the promise of uncompromising quality."</p>
              <p className="text-pink-600 font-bold text-sm uppercase tracking-wide">— Fatima B.</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-pink-100">
            <h3 className="font-serif font-bold text-3xl mb-8 text-gray-900">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="group cursor-pointer">
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-pink-50 mb-4 relative">
                    <div className="aspect-square p-6">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{p.name}</h4>
                  <p className="text-pink-600 font-medium">₦{p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 p-4 md:hidden z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-full px-2 py-2 border border-gray-100">
            <button onClick={() => handleQuantityChange(-1)} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500"><Minus className="h-3 w-3" /></button>
            <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500"><Plus className="h-3 w-3" /></button>
          </div>
          <button
            onClick={() => { addToCart(product, quantity); navigate('/cart'); }}
            disabled={isOutOfStock}
            className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
