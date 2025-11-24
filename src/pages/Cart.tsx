import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

const Cart: React.FC = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useStore();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[#FFF9F9]">
      <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <ShoppingBag className="h-12 w-12 text-pink-300" />
      </div>
      <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our premium skincare collection.</p>
      <Link to="/skincare" className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-200/50">
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-12 text-gray-900 text-center">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-pink-50 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-all">
                <div className="w-full h-48 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 text-center sm:text-left w-full">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-pink-600 font-medium text-sm mb-4">₦{item.price.toLocaleString()}</p>

                  <div className="flex items-center justify-between sm:justify-start gap-6">
                    <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                      <button onClick={() => decreaseQuantity(item.id)} title="Decrease quantity" className="p-2 text-gray-500 hover:text-gray-900"><Minus className="h-4 w-4" /></button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => addToCart(item, 1)} title="Increase quantity" className="p-2 text-gray-500 hover:text-gray-900"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="text-right sm:ml-auto">
                      <p className="font-bold text-gray-900 text-lg">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} title="Remove item" className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors sm:static sm:p-3">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">₦{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-sm italic text-pink-500">Calculated at checkout</span></div>
                <div className="border-t border-dashed border-gray-200 pt-4 mt-4 flex justify-between items-end"><span className="font-bold text-gray-900 text-lg">Total</span><span className="font-bold text-3xl text-pink-600 font-serif">₦{cartTotal.toLocaleString()}</span></div>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full py-5 bg-gray-900 text-white rounded-2xl hover:bg-pink-600 transition-all duration-300 font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-200/50">
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </button>
              <div className="mt-6 text-center">
                <Link to="/skincare" className="text-sm text-gray-500 hover:text-gray-900 underline">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
