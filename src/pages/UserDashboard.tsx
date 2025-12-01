import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronRight, ArrowLeft, RefreshCw, Box, Heart, ShoppingBag, LogOut, Search } from 'lucide-react';
import { api } from '../services/api';

const UserDashboard: React.FC = () => {
   const { user, updateUserProfile, orders, cancelOrder, setOrders, wishlist, logout, refreshOrders: storeRefreshOrders } = useStore();
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState('profile');
   const [formData, setFormData] = useState({ name: '', phone: '', address: '', city: '', state: '' });
   const [trackingOrder, setTrackingOrder] = useState<string | null>(null);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [searchOrderId, setSearchOrderId] = useState('');

   // Initialize form data
   useEffect(() => {
      if (!user) navigate('/login');
      else setFormData({
         name: user.name,
         phone: user.phone || '',
         address: user.address || '',
         city: user.city || '',
         state: user.state || ''
      });
   }, [user, navigate]);

   // Real-time polling for orders
   useEffect(() => {
      if (!user) return;

      // Initial fetch
      storeRefreshOrders();

      // Poll every 5 seconds
      const intervalId = setInterval(storeRefreshOrders, 5000);

      return () => clearInterval(intervalId);
   }, [user, storeRefreshOrders]);

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      await updateUserProfile(formData);
      alert("Profile updated successfully!");
   };

   const handleCancel = async (id: string) => {
      if (window.confirm("Are you sure you want to cancel this order?")) {
         await cancelOrder(id);
      }
   };

   const handleLogout = () => {
      logout();
      navigate('/');
   };

   const refreshOrders = async () => {
      if (!user) return;
      setIsRefreshing(true);
      try {
         await storeRefreshOrders();
      } catch (error) {
         console.error("Failed to refresh orders:", error);
      } finally {
         setTimeout(() => setIsRefreshing(false), 1000);
      }
   };

   const getStatusStep = (status: string) => {
      switch (status) {
         case 'Processing': return 1;
         case 'Shipped': return 2;
         case 'Ready for Pickup': return 2;
         case 'Delivered': return 3;
         case 'Cancelled': return -1;
         default: return 0;
      }
   };

   if (!user) return null;

   const selectedOrder = orders.find(o => o.id === trackingOrder);
   const myOrders = orders;
   const activeOrders = myOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

   return (
      <div className="min-h-screen bg-[#FFF9F9] py-16 font-sans">
         <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                  <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                     Welcome back, <span className="text-pink-600">{user.name.split(' ')[0]}</span>
                  </h1>
                  <p className="text-gray-500 font-light">Here's what's happening with your account today.</p>
               </div>

               {/* Quick Stats */}
               <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 flex items-center gap-4 min-w-[160px]">
                     <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                        <ShoppingBag size={20} />
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Orders</p>
                        <p className="text-xl font-bold text-gray-900">{myOrders.length}</p>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 flex items-center gap-4 min-w-[160px]">
                     <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                        <Truck size={20} />
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Active</p>
                        <p className="text-xl font-bold text-gray-900">{activeOrders}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
               {/* Sidebar Navigation */}
               <div className="w-full lg:w-1/4">
                  <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-pink-50 sticky top-24">
                     <div className="flex items-center gap-4 mb-6 md:mb-8 p-2 border-b border-gray-50 pb-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center text-pink-600 font-bold text-lg md:text-xl shadow-inner flex-shrink-0">
                           {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                           <h3 className="font-bold text-gray-900 truncate text-sm md:text-base">{user.name}</h3>
                           <p className="text-xs text-gray-500">Valued Member</p>
                        </div>
                     </div>
                     <nav className="flex lg:block overflow-x-auto lg:overflow-visible gap-2 lg:gap-0 pb-2 lg:pb-0 no-scrollbar">
                        <button
                           onClick={() => { setActiveTab('profile'); setTrackingOrder(null); }}
                           className={`flex-shrink-0 lg:w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-3 whitespace-nowrap ${activeTab === 'profile' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                           <Box size={18} /> <span className="hidden md:inline">My Profile</span><span className="md:hidden">Profile</span>
                        </button>
                        <button
                           onClick={() => { setActiveTab('orders'); setTrackingOrder(null); }}
                           className={`flex-shrink-0 lg:w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-3 whitespace-nowrap ${activeTab === 'orders' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                           <Package size={18} /> <span className="hidden md:inline">My Orders</span><span className="md:hidden">Orders</span>
                        </button>
                        <button
                           onClick={() => { setActiveTab('wishlist'); setTrackingOrder(null); }}
                           className={`flex-shrink-0 lg:w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-3 whitespace-nowrap ${activeTab === 'wishlist' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                           <Heart size={18} /> Wishlist <span className="ml-auto bg-pink-100 text-pink-600 text-xs py-0.5 px-2 rounded-full">{wishlist.length}</span>
                        </button>
                        <button
                           onClick={() => { setActiveTab('track-order'); setTrackingOrder(null); setSearchOrderId(''); }}
                           className={`flex-shrink-0 lg:w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-3 whitespace-nowrap ${activeTab === 'track-order' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                           <Search size={18} /> <span className="hidden md:inline">Track Order</span><span className="md:hidden">Track</span>
                        </button>
                        <div className="lg:pt-4 lg:mt-4 lg:border-t lg:border-gray-50 flex-shrink-0 lg:w-full">
                           <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-3 text-red-500 hover:bg-red-50 whitespace-nowrap"
                           >
                              <LogOut size={18} /> <span className="hidden md:inline">Sign Out</span><span className="md:hidden">Logout</span>
                           </button>
                        </div>
                     </nav>
                  </div>
               </div>

               {/* Content Area */}
               <div className="flex-1">
                  <AnimatePresence mode="wait">
                     {activeTab === 'profile' && (
                        <motion.div
                           key="profile"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50"
                        >
                           <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Account Details</h2>
                           <form onSubmit={handleSave} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Phone Number</label>
                                    <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all" />
                                 </div>
                                 <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Address</label>
                                    <input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">City</label>
                                    <input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">State</label>
                                    <input value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all" />
                                 </div>
                              </div>
                              <div className="pt-6">
                                 <button type="submit" className="px-10 py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200">Save Changes</button>
                              </div>
                           </form>
                        </motion.div>
                     )}

                     {activeTab === 'wishlist' && (
                        <motion.div
                           key="wishlist"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           className="space-y-6"
                        >
                           <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">My Wishlist</h2>
                           {wishlist.length === 0 ? (
                              <div className="bg-white p-16 rounded-[2.5rem] text-center border border-pink-50">
                                 <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-10 h-10 text-pink-300" />
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                                 <p className="text-gray-500 mb-8">Save items you love to find them easily later.</p>
                                 <button onClick={() => navigate('/skincare')} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                                    Browse Products
                                 </button>
                              </div>
                           ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {wishlist.map(product => (
                                    <div key={product.id} className="bg-white p-4 rounded-[2rem] shadow-sm border border-pink-50 flex gap-4 items-center group hover:shadow-md transition-all">
                                       <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 p-2">
                                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                                       </div>
                                       <div className="flex-1">
                                          <h4 className="font-bold text-gray-900 mb-1">{product.name}</h4>
                                          <p className="text-pink-600 font-bold mb-3">₦{product.price.toLocaleString()}</p>
                                          <button onClick={() => navigate(`/product/${product.id}`)} className="text-sm font-bold text-gray-900 underline hover:text-pink-600">View Product</button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </motion.div>
                     )}

                     {activeTab === 'track-order' && (
                        <motion.div
                           key="track-order"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50"
                        >
                           <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Track Your Order</h2>
                           <p className="text-gray-500 mb-8">Enter your Order ID to see the current status and delivery details.</p>

                           <div className="max-w-md">
                              <div className="relative mb-6">
                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                 </div>
                                 <input
                                    type="text"
                                    value={searchOrderId}
                                    onChange={(e) => setSearchOrderId(e.target.value)}
                                    placeholder="Enter Order ID (e.g., 673df...)"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                                 />
                              </div>
                              <button
                                 onClick={() => {
                                    const order = orders.find(o => o.id === searchOrderId.trim());
                                    if (order) {
                                       setTrackingOrder(order.id);
                                       setActiveTab('orders');
                                    } else {
                                       alert('Order not found in your history. Please check the ID and try again.');
                                    }
                                 }}
                                 className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                              >
                                 Track Order
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {activeTab === 'orders' && !trackingOrder && (
                        <motion.div
                           key="orders-list"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           className="space-y-6"
                        >
                           <div className="flex justify-between items-center mb-4">
                              <h2 className="text-2xl font-serif font-bold text-gray-900">Order History</h2>
                              <button
                                 onClick={refreshOrders}
                                 className={`p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-all ${isRefreshing ? 'animate-spin text-pink-600' : ''}`}
                                 title="Refresh Orders"
                              >
                                 <RefreshCw size={20} />
                              </button>
                           </div>

                           {myOrders.length === 0 ? (
                              <div className="bg-white p-16 rounded-[2.5rem] text-center border border-pink-50">
                                 <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-10 h-10 text-pink-300" />
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                                 <p className="text-gray-500 mb-8">Start your skincare journey today.</p>
                                 <button onClick={() => navigate('/skincare')} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                                    Browse Products
                                 </button>
                              </div>
                           ) : (
                              myOrders.map(order => (
                                 <motion.div
                                    key={order.id}
                                    layoutId={order.id}
                                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50 hover:shadow-md transition-all group cursor-pointer"
                                    onClick={() => setTrackingOrder(order.id)}
                                 >
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6 border-b border-gray-50 pb-6">
                                       <div>
                                          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Order ID</p>
                                          <p className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">#{order.id}</p>
                                       </div>
                                       <div>
                                          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Date</p>
                                          <p className="font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                                       </div>
                                       <div>
                                          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Total</p>
                                          <p className="font-bold text-pink-600">₦{order.totalPrice.toLocaleString()}</p>
                                       </div>
                                       <div>
                                          <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                             order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                                order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' :
                                                   order.status === 'Ready for Pickup' ? 'bg-indigo-100 text-indigo-600' :
                                                      order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                                             }`}>
                                             {order.status}
                                          </span>
                                       </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                       <div className="flex items-center gap-2 text-sm text-gray-500">
                                          <Box size={16} />
                                          <span>{order.orderItems.length} items</span>
                                       </div>
                                       <div className="flex items-center text-pink-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                          Track Order <ChevronRight size={16} />
                                       </div>
                                    </div>
                                 </motion.div>
                              ))
                           )}
                        </motion.div>
                     )}

                     {activeTab === 'orders' && trackingOrder && selectedOrder && (
                        <motion.div
                           key="order-detail"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-pink-50"
                        >
                           <button
                              onClick={() => setTrackingOrder(null)}
                              className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                           >
                              <ArrowLeft size={20} className="mr-2" /> Back to Orders
                           </button>

                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-gray-100">
                              <div>
                                 <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order #{selectedOrder.id}</h2>
                                 <p className="text-gray-500">Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className="mt-4 md:mt-0 text-right">
                                 <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                 <p className="text-2xl font-bold text-pink-600">₦{selectedOrder.totalPrice.toLocaleString()}</p>
                              </div>
                           </div>

                           {/* Tracking Stepper */}
                           <div className="mb-12 relative">
                              {selectedOrder.status === 'Cancelled' ? (
                                 <div className="bg-red-50 p-6 rounded-2xl text-center text-red-600 font-medium border border-red-100">
                                    This order has been cancelled.
                                 </div>
                              ) : (
                                 <div className="relative">
                                    {/* Progress Bar Background */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0"></div>

                                    {/* Active Progress Bar */}
                                    <motion.div
                                       initial={{ width: 0 }}
                                       animate={{ width: `${((getStatusStep(selectedOrder.status) - 1) / 2) * 100}%` }}
                                       className="absolute top-1/2 left-0 h-1 bg-pink-500 -translate-y-1/2 rounded-full z-0 transition-all duration-1000"
                                    ></motion.div>

                                    <div className="relative z-10 flex justify-between">
                                       {['Processing', 'Shipped', 'Delivered'].map((step, index) => {
                                          const currentStep = getStatusStep(selectedOrder.status);
                                          const isActive = currentStep >= index + 1;

                                          return (
                                             <div key={step} className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive ? 'bg-pink-500 border-pink-100 text-white shadow-lg shadow-pink-200' : 'bg-white border-gray-100 text-gray-300'
                                                   }`}>
                                                   {index === 0 && <Clock size={18} />}
                                                   {index === 1 && <Truck size={18} />}
                                                   {index === 2 && <CheckCircle size={18} />}
                                                </div>
                                                <p className={`mt-3 text-xs md:text-sm font-medium transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                                   {step}
                                                </p>
                                             </div>
                                          );
                                       })}
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div>
                                 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Box size={18} className="text-pink-500" /> Items
                                 </h3>
                                 <div className="space-y-4">
                                    {selectedOrder.orderItems.map((item: any, idx: number) => (
                                       <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                          <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 p-2 border border-gray-100">
                                             <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                          </div>
                                          <div>
                                             <p className="font-bold text-gray-900">{item.name}</p>
                                             <p className="text-sm text-gray-500">{item.qty} x ₦{item.price.toLocaleString()}</p>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              <div className="space-y-8">
                                 <div>
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                       <MapPin size={18} className="text-pink-500" /> Shipping Details
                                    </h3>
                                    <div className="bg-gray-50 p-6 rounded-2xl space-y-2 text-sm text-gray-600">
                                       <p><span className="font-medium text-gray-900">Address:</span> {selectedOrder.shippingAddress.address}</p>
                                       <p><span className="font-medium text-gray-900">City:</span> {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                                       <p><span className="font-medium text-gray-900">Postal Code:</span> {selectedOrder.shippingAddress.postalCode}</p>
                                       <p><span className="font-medium text-gray-900">Country:</span> {selectedOrder.shippingAddress.country}</p>
                                    </div>
                                 </div>

                                 {selectedOrder.status === 'Processing' && (
                                    <button
                                       onClick={() => handleCancel(selectedOrder.id)}
                                       className="w-full py-4 border-2 border-red-100 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-colors"
                                    >
                                       Cancel Order
                                    </button>
                                 )}
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserDashboard;
