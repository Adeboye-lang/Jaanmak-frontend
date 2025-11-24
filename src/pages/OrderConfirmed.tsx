import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const OrderConfirmed: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, orders, refreshOrders } = useStore();
  const stateOrder = location.state?.order;
  const orderId = stateOrder?._id || stateOrder?.id || location.state?.orderId;

  useEffect(() => {
    if (!orderId) navigate('/');
  }, [orderId, navigate]);

  useEffect(() => {
    if (!stateOrder && !orders.find(o => o.id === orderId || o._id === orderId)) {
      refreshOrders();
    }
  }, [stateOrder, orders, orderId, refreshOrders]);

  const order = stateOrder || orders.find(o => o.id === orderId || o._id === orderId);

  if (!orderId) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-12 px-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border border-white/50 text-center mb-8">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-sm border border-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg font-light mb-8">Thank you for your purchase, <span className="font-medium text-pink-600">{user?.name}</span>.</p>

          <div className="bg-pink-50/50 rounded-3xl p-6 border border-pink-100 inline-block min-w-[200px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Order Reference</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide font-mono">{orderId}</p>
          </div>
        </div>

        {order && (
          <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-pink-50 overflow-hidden mb-8">
            <div className="p-8 border-b border-pink-50">
              <h2 className="text-2xl font-serif font-bold text-gray-900">Order Details</h2>
            </div>
            <div className="p-8 space-y-8">
              {/* Items */}
              <div className="space-y-6">
                {order.orderItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 md:gap-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-pink-600 text-lg">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-pink-200 my-6"></div>

              {/* Summary & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-widest">Shipping To</h3>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{order.itemsPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₦{order.shippingPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-bold text-xl pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-pink-600">₦{order.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={() => navigate('/dashboard')} className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">Track Order</button>
          <Link to="/skincare" className="flex-1 py-4 bg-white text-gray-600 font-bold rounded-2xl hover:bg-gray-50 border border-gray-200 block text-center transition-colors">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmed;
