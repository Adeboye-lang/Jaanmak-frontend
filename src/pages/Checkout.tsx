import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { api } from '../services/api';
import { usePaystackPayment } from 'react-paystack';
import { GIG_CENTERS } from '../data/gigCenters';

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara"
];

const STATE_DELIVERY_FEES: Record<string, number> = {
  "Lagos": 8000, "FCT - Abuja": 5000, "Jigawa": 9000, "Kaduna": 9000, "Kano": 9000,
  "Katsina": 9000, "Kebbi": 9000, "Sokoto": 9000, "Zamfara": 9000, "Adamawa": 9000,
  "Bauchi": 9000, "Borno": 9000, "Gombe": 9000, "Taraba": 9000, "Yobe": 9000,
  "Benue": 6000, "Kogi": 6000, "Kwara": 6000, "Nasarawa": 6000, "Niger": 6000,
  "Plateau": 6000, "Ekiti": 6000, "Ogun": 6000, "Ondo": 6000, "Osun": 6000,
  "Oyo": 6000, "Abia": 6000, "Anambra": 6000, "Ebonyi": 6000, "Enugu": 6000,
  "Imo": 6000, "Akwa Ibom": 6000, "Bayelsa": 6000, "Cross River": 6000,
  "Delta": 6000, "Edo": 6000, "Rivers": 6000
};

const Checkout: React.FC = () => {
  const { cart, user, clearCart } = useStore();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'doorstep' | 'pickup'>('doorstep');

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    phone: '',
    instructions: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
    if (user) {
      setFormData(prev => ({
        ...prev,
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        phone: user.phone || ''
      }));
    }
  }, [cart, navigate, user]);

  // Delivery Logic
  const canDoHome = ['Lagos', 'FCT - Abuja'].includes(formData.state);
  const canDoPickup = formData.state !== 'FCT - Abuja'; // Abuja is Home Delivery ONLY

  useEffect(() => {
    if (formData.state) {
      // If home delivery is not available, force pickup
      if (!canDoHome) setDeliveryMethod('pickup');
      // If pickup is not available (Abuja), force doorstep
      else if (!canDoPickup) setDeliveryMethod('doorstep');
      // If both are available (Lagos), default to doorstep but allow switch
      else if (deliveryMethod === 'pickup' && !canDoPickup) setDeliveryMethod('doorstep');
    }
  }, [formData.state, canDoHome, canDoPickup]);

  const getDeliveryFee = () => {
    if (!formData.state) return 0;
    if (formData.state === 'Lagos') return deliveryMethod === 'doorstep' ? 8000 : 6000;
    if (formData.state === 'FCT - Abuja') return 5000;
    return STATE_DELIVERY_FEES[formData.state] || 6000;
  };

  const deliveryFee = getDeliveryFee();
  const grandTotal = cartTotal + deliveryFee;

  // Paystack Configuration
  const reference = React.useMemo(() => (new Date()).getTime().toString(), []);

  const config = {
    reference,
    email: user?.email || '',
    amount: grandTotal * 100, // Amount is in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.id
        })),
        shippingAddress: {
          address: `${formData.address} ${formData.instructions}`,
          city: formData.city,
          state: formData.state,
          phone: formData.phone,
          method: deliveryMethod
        },
        paymentMethod: 'Paystack',
        itemsPrice: cartTotal,
        taxPrice: 0,
        shippingPrice: deliveryFee,
        totalPrice: grandTotal,
      };

      // 1. Create Order
      const createdOrder = await api.orders.create(orderData, user?.token || '');

      // 2. Verify Payment
      await api.orders.verifyPayment(createdOrder._id || createdOrder.id, reference.reference, user?.token || '');

      clearCart();
      navigate('/order-confirmed', { state: { order: createdOrder } });
      // alert('Payment successful! Order placed.'); // Removed alert as we are redirecting
    } catch (error: any) {
      console.error('Order creation failed:', error);
      alert(error.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    alert('Payment cancelled.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.phone.match(/^\d{10,11}$/)) {
      alert("Please enter a valid phone number (10-11 digits).");
      return;
    }
    if (formData.address.length < 5) {
      alert("Please enter a valid delivery address.");
      return;
    }

    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    if (!config.publicKey) {
      alert("Paystack Public Key is missing! Please add VITE_PAYSTACK_PUBLIC_KEY to your .env file.");
      return;
    }

    initializePayment({ onSuccess, onClose });
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <button onClick={() => navigate('/cart')} className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors absolute top-0 left-4 md:left-0">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="text-center mb-8 md:mb-12">
          <span className="text-pink-500 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Almost There</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Secure Checkout</h1>
          <p className="text-gray-500 font-light">Complete your purchase securely</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-white/50">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-10">

              {/* 1. Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm font-bold">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 ml-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="080..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-pink-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 ml-2">State</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-pink-100 rounded-2xl px-6 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                      >
                        <option value="" disabled>Select State</option>
                        {NIGERIAN_STATES.map(state => (<option key={state} value={state}>{state}</option>))}
                      </select>
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Delivery Method */}
              {formData.state && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm font-bold">2</span>
                    Delivery Method
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`relative overflow-hidden rounded-[2rem] p-6 border-2 cursor-pointer transition-all duration-300 ${deliveryMethod === 'doorstep' ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-100 hover:border-pink-200'} ${!canDoHome ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input type="radio" name="delivery" value="doorstep" disabled={!canDoHome} checked={deliveryMethod === 'doorstep'} onChange={() => setDeliveryMethod('doorstep')} className="hidden" />
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg text-gray-900">Home Delivery</span>
                        <span className="text-sm text-gray-500">We bring it to your doorstep</span>
                      </div>
                      {deliveryMethod === 'doorstep' && <div className="absolute top-4 right-4 w-4 h-4 bg-pink-500 rounded-full"></div>}
                    </label>

                    <label className={`relative overflow-hidden rounded-[2rem] p-6 border-2 cursor-pointer transition-all duration-300 ${deliveryMethod === 'pickup' ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-100 hover:border-pink-200'} ${!canDoPickup ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input type="radio" name="delivery" value="pickup" disabled={!canDoPickup} checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="hidden" />
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg text-gray-900">GIG Pickup</span>
                        <span className="text-sm text-gray-500">Pick up at nearest GIG center</span>
                      </div>
                      {deliveryMethod === 'pickup' && <div className="absolute top-4 right-4 w-4 h-4 bg-pink-500 rounded-full"></div>}
                    </label>
                  </div>
                </div>
              )}

              {/* 3. Shipping Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm font-bold">3</span>
                  {deliveryMethod === 'pickup' ? 'Pickup Details' : 'Shipping Details'}
                </h2>
                <div className="space-y-4">
                  {deliveryMethod === 'pickup' ? (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500 bg-pink-50 p-4 rounded-xl border border-pink-100 mb-4">
                        <p>Please select the <strong>GIG Logistics Terminal</strong> closest to you.</p>
                      </div>
                      <div className="relative">
                        <select
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-white border border-pink-100 rounded-2xl px-6 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                        >
                          <option value="" disabled>Select Nearest GIG Center</option>
                          {GIG_CENTERS[formData.state]?.map((center, index) => (
                            <option key={index} value={center}>{center}</option>
                          )) || <option value="" disabled>No centers found for this state</option>}
                        </select>
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                      </div>
                    </div>
                  ) : (
                    <input
                      required
                      type="text"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-pink-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    />
                  )}
                  <input
                    required
                    type="text"
                    placeholder="City / Town"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-pink-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                  <textarea
                    placeholder="Delivery Instructions (Optional)"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    className="w-full bg-white border border-pink-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all h-32 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-pink-100 h-full flex flex-col sticky top-24 shadow-lg">
                <h3 className="font-serif font-bold text-xl mb-6 text-gray-900">Order Summary</h3>

                <div className="space-y-4 mb-6 flex-1 overflow-y-auto max-h-60 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-dashed border-pink-200">
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>₦{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span className="font-bold text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="my-6 border-t border-pink-200 border-dashed"></div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-gray-900 font-bold pb-1">Total</span>
                  <span className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-pink-200/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Lock size={20} /> Pay Now
                    </>
                  )}
                </button>

                <div className="mt-4 flex justify-center gap-2 text-gray-400">
                  <ShieldCheck size={14} />
                  <span className="text-xs">Secured by Paystack</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
