import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { Product } from '../types';
import { TrendingUp, AlertTriangle, Clock, DollarSign, Users, ShoppingBag } from 'lucide-react';

const AdminDashboard: React.FC = () => {
   const { user, products, addProduct, updateProduct, deleteProduct, allUsers, getAllUsers, deleteUserAccount, orders, updateOrderStatus, refreshProducts, refreshOrders } = useStore();
   const [activeTab, setActiveTab] = useState('overview');
   const [productForm, setProductForm] = useState<Partial<Product>>({});
   const [isSubmitting, setIsSubmitting] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (user?.role === 'admin') {
         getAllUsers();
         // Initial fetch
         refreshProducts();
         refreshOrders();

         // Polling interval (every 5 seconds)
         const interval = setInterval(() => {
            refreshProducts();
            refreshOrders();
            getAllUsers();
         }, 5000);

         return () => clearInterval(interval);
      } else {
         navigate('/admin/login');
      }
   }, [user]);

   // Calculate Metrics
   const totalRevenue = orders.reduce((sum, order) => sum + (order.isPaid ? order.totalPrice : 0), 0);
   const lowStockProducts = products.filter(p => (p.countInStock || 0) < 5);
   const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

   // Simple Revenue Data for Chart (Last 7 orders for demo)
   const revenueData = [...orders].slice(-7).map(o => ({
      date: new Date(o.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
      amount: o.totalPrice
   }));
   const maxRevenue = Math.max(...revenueData.map(d => d.amount), 10000); // Avoid div by zero

   const handleSaveProduct = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         if (productForm.id) {
            await updateProduct(productForm as Product);
            alert('Product updated successfully!');
         } else {
            await addProduct(productForm);
            alert('Product created successfully!');
         }
         setProductForm({});
         refreshProducts(); // Force refresh
      } catch (error: any) {
         console.error(error);
         alert(`Failed to save product: ${error.message || 'Unknown error'}`);
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleEditClick = (product: Product) => {
      setProductForm(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const TabButton = ({ id, label, icon }: { id: string, label: string, icon?: React.ReactNode }) => (
      <button
         onClick={() => setActiveTab(id)}
         className={`w-auto md:w-full text-left px-4 md:px-6 py-2 md:py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 md:gap-3 whitespace-nowrap ${activeTab === id ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'}`}
      >
         {icon}
         {label}
      </button>
   );

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setProductForm({ ...productForm, image: reader.result as string });
         };
         reader.readAsDataURL(file);
      }
   };

   const handleDeleteProduct = async (id: string) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
         await deleteProduct(id);
      }
   };

   const handleSeedDatabase = async () => {
      if (window.confirm('This will import all demo products into your database. Continue?')) {
         setIsSubmitting(true);
         try {
            const { SKINCARE_PRODUCTS } = await import('../data/products');
            let count = 0;
            for (const p of SKINCARE_PRODUCTS) {
               // Remove ID to let MongoDB generate a new one
               const { id, ...productData } = p;
               await addProduct(productData);
               count++;
            }
            alert(`Successfully imported ${count} products!`);
            refreshProducts();
         } catch (error) {
            console.error(error);
            alert('Failed to seed database.');
         } finally {
            setIsSubmitting(false);
         }
      }
   };

   return (
      <div className="min-h-screen bg-[#FFF9F9] flex flex-col md:flex-row font-sans">
         {/* Sidebar */}
         <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-pink-100 p-6 flex flex-col md:sticky top-0 h-auto md:h-screen z-10">
            <div className="mb-6 md:mb-10 px-2 flex justify-between items-center md:block">
               <h1 className="text-2xl font-serif font-bold text-gray-900">Admin<span className="text-pink-500">Panel</span></h1>
               <button onClick={() => navigate('/')} className="md:hidden text-sm text-gray-400 hover:text-pink-500">Exit</button>
            </div>
            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0 pb-4 md:pb-0 no-scrollbar">
               <TabButton id="overview" label="Overview" />
               <TabButton id="products" label="Products" />
               <TabButton id="orders" label="Orders" />
               <TabButton id="users" label="Users" />
            </nav>
            <div className="hidden md:block pt-6 border-t border-pink-100 mt-auto">
               <button onClick={() => navigate('/')} className="w-full text-left px-6 py-3 text-sm text-gray-400 hover:text-pink-500 transition-colors">Back to Store</button>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 p-4 md:p-10 overflow-y-auto">
            <header className="flex justify-between items-center mb-10">
               <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 capitalize">{activeTab}</h2>
                  <p className="text-gray-500 font-light">Manage your store efficiently</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                     {user?.name?.charAt(0) || 'A'}
                  </div>
               </div>
            </header>

            {activeTab === 'overview' && (
               <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-pink-50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                           <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Products</h3>
                           <p className="text-2xl font-serif font-bold text-gray-900">{products.length}</p>
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-pink-50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                           <Users className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Users</h3>
                           <p className="text-2xl font-serif font-bold text-gray-900">{allUsers.length}</p>
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-pink-50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                           <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
                           <p className="text-2xl font-serif font-bold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
                        </div>
                     </div>
                     <div className="bg-gradient-to-br from-pink-500 to-rose-400 p-6 rounded-[2rem] shadow-lg text-white flex flex-col justify-center items-center text-center">
                        <h3 className="text-pink-100 text-xs font-bold uppercase tracking-wider mb-2">Quick Action</h3>
                        <div className="flex flex-col gap-2 w-full">
                           <button onClick={() => setActiveTab('products')} className="bg-white text-pink-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-pink-50 transition-colors w-full">Add Product</button>
                           <button onClick={handleSeedDatabase} className="bg-pink-600 text-white border border-pink-400 px-6 py-2 rounded-xl font-bold text-sm hover:bg-pink-700 transition-colors w-full">Import Demo Data</button>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Revenue Chart */}
                     <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                        <div className="flex items-center justify-between mb-6">
                           <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-pink-500" /> Revenue Trend
                           </h3>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2">
                           {revenueData.length > 0 ? revenueData.map((data, i) => (
                              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                 <div
                                    className="w-full bg-pink-100 rounded-t-xl transition-all duration-500 group-hover:bg-pink-500 relative"
                                    style={{ height: `${(data.amount / maxRevenue) * 100}%` }}
                                 >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                       ₦{data.amount.toLocaleString()}
                                    </div>
                                 </div>
                                 <span className="text-xs text-gray-400 font-medium">{data.date}</span>
                              </div>
                           )) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">No revenue data available</div>
                           )}
                        </div>
                     </div>

                     {/* Low Stock Alerts */}
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                           <AlertTriangle className="w-5 h-5 text-orange-500" /> Low Stock Alert
                        </h3>
                        <div className="space-y-4">
                           {lowStockProducts.length > 0 ? lowStockProducts.map(p => (
                              <div key={p.id} className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
                                 <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                                 <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{p.name}</h4>
                                    <p className="text-xs text-orange-600 font-medium">Only {p.countInStock} left</p>
                                 </div>
                                 <button onClick={() => { handleEditClick(p); setActiveTab('products'); }} className="text-xs bg-white px-2 py-1 rounded border border-orange-200 text-orange-600 font-bold hover:bg-orange-100">Restock</button>
                              </div>
                           )) : (
                              <div className="text-center text-gray-400 py-8">All products are well stocked!</div>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                     <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" /> Recent Orders
                     </h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="border-b border-gray-100 text-gray-400 text-sm uppercase tracking-wider">
                                 <th className="pb-4 font-medium">Order ID</th>
                                 <th className="pb-4 font-medium">Customer</th>
                                 <th className="pb-4 font-medium">Date</th>
                                 <th className="pb-4 font-medium">Amount</th>
                                 <th className="pb-4 font-medium">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {recentOrders.map(order => (
                                 <tr key={order.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-mono text-sm text-gray-500">#{order.id.substring(0, 8)}</td>
                                    <td className="py-4 font-bold text-gray-900">{order.user?.name || 'Guest'}</td>
                                    <td className="py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4 font-bold text-gray-900">₦{order.totalPrice.toLocaleString()}</td>
                                    <td className="py-4">
                                       <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                             'bg-yellow-100 text-yellow-600'
                                          }`}>{order.status}</span>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'products' && (
               <div className="space-y-8">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                     <h3 className="text-xl font-bold mb-6 text-gray-900">{productForm.id ? 'Edit Product' : 'Add New Product'}</h3>
                     <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input placeholder="Product Name" value={productForm.name || ''} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200" />
                        <input placeholder="Price" type="number" value={productForm.price || 0} onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200" />
                        <input placeholder="Stock Quantity" type="number" value={productForm.countInStock || 0} onChange={e => setProductForm({ ...productForm, countInStock: Number(e.target.value) })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200" />
                        <input placeholder="Category" value={productForm.category || ''} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200" />

                        <div className="space-y-2">
                           <input placeholder="Image URL" value={productForm.image || ''} onChange={e => setProductForm({ ...productForm, image: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200" />
                           <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">OR</span>
                              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" />
                           </div>
                        </div>

                        <textarea placeholder="Description" value={productForm.description || ''} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 md:col-span-2 h-32 resize-none" />
                        <div className="md:col-span-2">
                           <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                              {isSubmitting ? 'Saving...' : productForm.id ? 'Update Product' : 'Create Product'}
                           </button>
                        </div>
                     </form>
                  </div>

                  <div className="bg-white rounded-[2rem] shadow-sm border border-pink-50 overflow-hidden">
                     <div className="p-8 border-b border-pink-50"><h3 className="text-xl font-bold text-gray-900">Product List</h3></div>
                     <div className="divide-y divide-gray-50">
                        {products.map(p => (
                           <div key={p.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></div>
                                 <div>
                                    <h4 className="font-bold text-gray-900">{p.name}</h4>
                                    <p className="text-sm text-gray-500">₦{p.price.toLocaleString()}</p>
                                 </div>
                              </div>
                              <div className="w-full sm:w-auto flex items-center gap-2">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-full sm:w-auto text-center ${(p.countInStock || 0) === 0 ? 'bg-red-100 text-red-600' :
                                    (p.countInStock || 0) < 10 ? 'bg-orange-100 text-orange-600' :
                                       'bg-green-100 text-green-600'
                                    }`}>
                                    {(p.countInStock || 0) === 0 ? 'Out of Stock' : `${p.countInStock} Left`}
                                 </span>
                              </div>
                              <div className="w-full sm:w-auto flex gap-3">
                                 <button onClick={() => handleEditClick(p)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Edit</button>
                                 <button onClick={() => handleDeleteProduct(p.id)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-100">Delete</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'orders' && (
               <div className="bg-white rounded-[2rem] shadow-sm border border-pink-50 overflow-hidden">
                  <div className="p-8 border-b border-pink-50"><h3 className="text-xl font-bold text-gray-900">Order Management</h3></div>
                  <div className="divide-y divide-gray-50">
                     {orders && orders.length > 0 ? (
                        orders.map(order => (
                           <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                 <div>
                                    <div className="mb-2">
                                       <h4 className="font-bold text-gray-900 text-lg">Order #{order.id.substring(0, 8)}</h4>
                                       <p className="text-gray-600 font-medium mt-1">
                                          Customer: <span className="text-gray-900 font-bold text-base">{order.user?.name || 'Guest'}</span>
                                       </p>
                                       <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                             order.status === 'Processing' ? 'bg-yellow-100 text-yellow-600' :
                                                order.status === 'Ready for Pickup' ? 'bg-purple-100 text-purple-600' :
                                                   'bg-gray-100 text-gray-600'
                                          }`}>
                                          {order.status}
                                       </span>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="font-bold text-gray-900">₦{order.totalPrice.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">{order.orderItems.length} items</p>
                                 </div>
                              </div>

                              {/* Order Items List */}
                              <div className="bg-pink-50/50 p-4 rounded-xl mb-4 border border-pink-100">
                                 <h5 className="text-xs font-bold uppercase text-pink-500 mb-2">Items Ordered</h5>
                                 <div className="space-y-2">
                                    {order.orderItems.map((item, index) => (
                                       <div key={index} className="flex justify-between items-center text-sm">
                                          <div className="flex items-center gap-2">
                                             <span className="font-medium text-gray-900">{item.name}</span>
                                             <span className="text-xs text-gray-500">x{item.quantity}</span>
                                          </div>
                                          <span className="text-gray-600">₦{item.price.toLocaleString()}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                 <h5 className="text-xs font-bold uppercase text-gray-500 mb-2">Shipping Details</h5>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                       <p className="text-gray-500 text-xs">Address / GIG Center</p>
                                       <p className="font-medium text-gray-900">{order.shippingAddress?.address}</p>
                                       <p className="text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                                    </div>
                                    <div>
                                       <p className="text-gray-500 text-xs">Contact Phone</p>
                                       <p className="font-medium text-gray-900">{order.shippingAddress?.phone}</p>
                                       <p className="text-gray-500 text-xs mt-1">Method: <span className="font-medium capitalize">{order.shippingAddress?.method || 'Delivery'}</span></p>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                 <div className="text-sm text-gray-600">
                                    <span className="font-bold">Update Status:</span>
                                 </div>
                                 <div className="flex gap-2">
                                    {order.status !== 'Processing' && (
                                       <button
                                          onClick={async () => {
                                             const res = await updateOrderStatus(order.id, 'Processing');
                                             if (res) alert('Order marked as Processing.');
                                             else alert('Failed to update order status.');
                                          }}
                                          className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200 transition-colors"
                                       >
                                          Processing
                                       </button>
                                    )}
                                    {order.status !== 'Shipped' && (
                                       <button
                                          onClick={async () => {
                                             const res = await updateOrderStatus(order.id, 'Shipped');
                                             if (res) alert(`Order marked as Shipped. Email sent to: ${res.emailSentTo || 'Customer'}`);
                                             else alert('Failed to update order status.');
                                          }}
                                          className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                                       >
                                          Shipped
                                       </button>
                                    )}
                                    {order.status !== 'Delivered' && (
                                       <button
                                          onClick={async () => {
                                             const res = await updateOrderStatus(order.id, 'Delivered');
                                             if (res) alert(`Order marked as Delivered. Email sent to: ${res.emailSentTo || 'Customer'}`);
                                             else alert('Failed to update order status.');
                                          }}
                                          className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
                                       >
                                          Delivered
                                       </button>
                                    )}
                                    {order.status !== 'Ready for Pickup' && order.status !== 'Delivered' && (
                                       <button
                                          onClick={async () => {
                                             const res = await updateOrderStatus(order.id, 'Ready for Pickup');
                                             if (res) alert(`Order is Ready for Pickup. Email sent to: ${res.emailSentTo || 'Customer'}`);
                                             else alert('Failed to update order status.');
                                          }}
                                          className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors"
                                       >
                                          Ready for Pickup
                                       </button>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="p-12 text-center text-gray-500">No orders found.</div>
                     )}
                  </div>
               </div>
            )}

            {activeTab === 'users' && (
               <div className="bg-white rounded-[2rem] shadow-sm border border-pink-50 overflow-hidden">
                  <div className="p-8 border-b border-pink-50"><h3 className="text-xl font-bold text-gray-900">Registered Users</h3></div>
                  <div className="divide-y divide-gray-50">
                     {allUsers.map(u => (
                        <div key={u.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">{u.name.charAt(0)}</div>
                              <div>
                                 <h4 className="font-bold text-gray-900">{u.name}</h4>
                                 <p className="text-sm text-gray-500">{u.email}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${u.isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>{u.role || 'User'}</span>
                              {!u.isAdmin && <button onClick={() => deleteUserAccount(u.id!)} className="text-red-500 hover:text-red-700 font-bold text-sm">Remove</button>}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div >
   );
};
export default AdminDashboard;
