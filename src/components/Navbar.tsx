import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User as UserIcon, Lock, Search, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Product } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { cart, user, logout, products } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skincare', path: '/skincare' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.ingredients && product.ingredients.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filtered);
  }, [searchQuery, products]);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-pink-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 group">
              <img src="/logo.png" alt="JAANMAK" className="h-20 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative hover:text-pink-500 hover:underline underline-offset-4 ${isActive(link.path) ? 'text-pink-600' : 'text-gray-600'}`}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div className="relative" ref={searchRef}>
              <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 bg-pink-50 rounded-full px-3 py-1' : 'w-8'}`}>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-600 hover:text-pink-600"><Search className="h-5 w-5" /></button>
                {isSearchOpen && (
                  <input type="text" placeholder="Search skincare..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full ml-2 text-gray-700" />
                )}
              </div>
              {isSearchOpen && searchQuery && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-pink-100 overflow-hidden max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <Link key={product.id} to={`/product/${product.id}`} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="flex items-center gap-3 p-3 hover:bg-pink-50 border-b border-gray-50 last:border-none group">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-contain p-1 bg-white rounded-md border border-gray-100 group-hover:border-pink-200 transition-colors" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-pink-600 transition-colors">{product.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{product.category}</p>
                          <p className="text-xs font-medium text-pink-600 mt-0.5">₦{product.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
                  )}
                </div>
              )}
            </div>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-pink-500 rounded-full">{cart.length}</span>}
            </Link>
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-pink-100">
                <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} className="flex flex-col items-end group">
                  <span className="text-sm font-serif text-gray-800 group-hover:text-pink-600 transition-colors">{user.role === 'admin' ? 'Admin' : 'Hi'}, <span className="text-pink-600">{user.name.split(' ')[0]}</span></span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">My Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-gray-900 uppercase tracking-wide border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="p-2 text-gray-600 hover:text-pink-600 transition-colors flex items-center gap-2"><UserIcon className="h-5 w-5" /><span className="text-sm font-medium hidden lg:inline">Login</span></Link>
                <Link to="/admin/login" className="p-2 text-gray-300 hover:text-pink-600 transition-colors"><Lock className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-pink-600 hover:bg-pink-50 focus:outline-none">
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 shadow-lg h-screen overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.path) ? 'bg-pink-50 text-pink-700' : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'}`}>{link.name}</Link>
            ))}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600"><ShoppingBag className="h-5 w-5 mr-3" /> Cart ({cart.length})</Link>
            {user ? (
              <>
                <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsOpen(false)} className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                  <UserIcon className="h-5 w-5 mr-3" /> {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50">
                  <LogOut className="h-5 w-5 mr-3" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                  <UserIcon className="h-5 w-5 mr-3" /> Login
                </Link>
                <Link to="/admin/login" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-400 hover:bg-pink-50 hover:text-pink-600">
                  <Lock className="h-5 w-5 mr-3" /> Admin Access
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
