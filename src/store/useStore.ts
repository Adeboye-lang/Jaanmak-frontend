import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, User, Order } from '../types';
import { SKINCARE_PRODUCTS } from '../data/products';
import { api } from '../services/api';

interface StoreState {
    cart: CartItem[];
    wishlist: Product[];
    user: User | null;
    products: Product[];
    orders: Order[];
    allUsers: User[];

    // Cart Actions
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;

    // Wishlist Actions
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;

    // Auth Actions
    login: (user: User) => void;
    logout: () => void;
    updateUserProfile: (data: Partial<User>) => Promise<void>;

    // Product Actions
    refreshProducts: () => Promise<void>;
    addProduct: (product: Partial<Product>) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    // User Management Actions
    getAllUsers: () => Promise<void>;
    deleteUserAccount: (id: string) => Promise<void>;

    // Order Actions
    refreshOrders: () => Promise<void>;
    updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
    cancelOrder: (id: string) => Promise<void>;
    setOrders: (orders: Order[]) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],
            user: null,
            products: SKINCARE_PRODUCTS,
            orders: [],
            allUsers: [],

            // Cart
            addToCart: (product, quantity = 1) => set((state) => {
                const existing = state.cart.find((item) => item.id === product.id);
                if (existing) {
                    return {
                        cart: state.cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                        )
                    };
                }
                return { cart: [...state.cart, { ...product, quantity }] };
            }),
            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== productId)
            })),
            decreaseQuantity: (productId) => set((state) => {
                const existing = state.cart.find((item) => item.id === productId);
                if (existing && existing.quantity > 1) {
                    return {
                        cart: state.cart.map((item) =>
                            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                        )
                    };
                }
                return { cart: state.cart.filter((item) => item.id !== productId) };
            }),
            clearCart: () => set({ cart: [] }),

            // Wishlist
            addToWishlist: (product) => set((state) => {
                if (state.wishlist.some((item) => item.id === product.id)) return state;
                return { wishlist: [...state.wishlist, product] };
            }),
            removeFromWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.filter((item) => item.id !== productId)
            })),
            isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),

            // Auth
            login: (user) => {
                set({ user });
                get().refreshOrders();
            },
            logout: () => set({ user: null, orders: [] }),
            updateUserProfile: async (data) => {
                const { user } = get();
                if (user) {
                    try {
                        const updatedData = await api.auth.updateProfile(data, user.token!);
                        const updatedUser = {
                            ...user,
                            ...updatedData,
                            role: updatedData.isAdmin !== undefined ? (updatedData.isAdmin ? 'admin' : 'customer') : user.role,
                            token: updatedData.token || user.token
                        };
                        set({ user: updatedUser });
                    } catch (error) {
                        console.error("Failed to update profile:", error);
                        throw error;
                    }
                }
            },

            // Products
            refreshProducts: async () => {
                try {
                    const data = await api.products.getAll();
                    if (data && Array.isArray(data) && data.length > 0) {
                        const mapped = data.map((p: any) => ({ ...p, id: p._id || p.id }));
                        set({ products: mapped });
                    } else {
                        set({ products: SKINCARE_PRODUCTS });
                    }
                } catch (e) {
                    console.error("Failed to fetch products, using static data:", e);
                    set({ products: SKINCARE_PRODUCTS });
                }
            },
            addProduct: async (productData) => {
                const { user, products } = get();
                if (!user?.token) return;
                try {
                    const newProduct = await api.products.create(productData, user.token);
                    const mapped = { ...newProduct, id: newProduct._id || newProduct.id };
                    set({ products: [...products, mapped] });
                } catch (error) { throw error; }
            },
            updateProduct: async (updatedProduct) => {
                const { user, products } = get();
                if (!user?.token) return;
                try {
                    const result = await api.products.update(updatedProduct.id, updatedProduct, user.token);
                    const mapped = { ...result, id: result._id || result.id };
                    set({ products: products.map(p => p.id === updatedProduct.id ? mapped : p) });
                } catch (error) { throw error; }
            },
            deleteProduct: async (id) => {
                const { user, products } = get();
                if (!user?.token) return;
                try {
                    await api.products.delete(id, user.token);
                    set({ products: products.filter(p => p.id !== id) });
                } catch (error) { throw error; }
            },

            // Users
            getAllUsers: async () => {
                const { user } = get();
                if (!user?.token) return;
                try {
                    const users = await api.users.getAll(user.token);
                    const mapped = users.map((u: any) => ({ ...u, id: u._id || u.id }));
                    set({ allUsers: mapped });
                } catch (error) { console.error(error); }
            },
            deleteUserAccount: async (id) => {
                const { user, allUsers } = get();
                if (!user?.token) return;
                try {
                    await api.users.delete(id, user.token);
                    set({ allUsers: allUsers.filter(u => u.id !== id) });
                } catch (error) { throw error; }
            },

            // Orders
            refreshOrders: async () => {
                const { user } = get();
                if (user?.token) {
                    try {
                        let data;
                        if (user.role === 'admin' || user.isAdmin) {
                            data = await api.orders.getAll(user.token);
                        } else {
                            data = await api.orders.getMyOrders(user.token);
                        }
                        if (data) {
                            const mappedOrders = data.map((o: any) => ({
                                ...o,
                                id: o._id || o.id,
                                customer: o.user?.name || 'Unknown',
                                email: o.user?.email || 'Unknown',
                                date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
                                total: o.totalPrice,
                                items: o.orderItems
                            }));
                            set({ orders: mappedOrders });
                        }
                    } catch (e) {
                        console.error("Failed to fetch orders", e);
                    }
                } else {
                    set({ orders: [] });
                }
            },
            updateOrderStatus: async (id, status) => {
                const { user, orders } = get();
                if (!user?.token) return;
                try {
                    const updatedOrder = await api.orders.updateStatus(id, status, user.token);
                    set({
                        orders: orders.map(o => o.id === id ? {
                            ...o,
                            status: updatedOrder.status,
                            isDelivered: updatedOrder.isDelivered,
                            deliveredAt: updatedOrder.deliveredAt
                        } : o)
                    });
                } catch (error) { console.error("Failed to update order status", error); }
            },
            cancelOrder: async (id) => {
                const { user, orders } = get();
                if (!user?.token) return;
                try {
                    await api.orders.cancel(id, user.token);
                    set({ orders: orders.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o) });
                } catch (error) { throw error; }
            },
            setOrders: (orders) => set({ orders }),
        }),
        {
            name: 'jaanmak-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist, user: state.user }),
        }
    )
);
