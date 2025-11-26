"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { productData } from "../products/data";
import { Users, Package, ShoppingBag, Edit, Trash2, Eye, ShieldAlert } from "lucide-react";
import { isAdmin } from "../lib/adminUtils";

export default function AdminPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    // Check if user is admin
    const userIsAdmin = user ? isAdmin(user.email) : false;

    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    };

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const usersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersList);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const ordersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersList);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        console.log("File selected:", file);

        if (!file) {
            console.log("No file selected");
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert("Please select an image file");
            return;
        }

        // Validate file size (10MB for Cloudinary)
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too large. Please upload an image smaller than 10MB.");
            return;
        }

        console.log("Starting upload to Cloudinary for:", file.name, "Size:", file.size);
        setUploading(true);

        try {
            // Create form data for Cloudinary
            const formDataUpload = new FormData();
            formDataUpload.append('file', file);
            formDataUpload.append('upload_preset', 'aamhi-khandeshi-products');
            formDataUpload.append('cloud_name', 'dtpzj2ubu');
            formDataUpload.append('folder', 'products');

            console.log("Uploading to Cloudinary...");

            // Upload to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dtpzj2ubu/image/upload`,
                {
                    method: 'POST',
                    body: formDataUpload
                }
            );

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Upload successful, response:", data);

            // Get the secure URL from Cloudinary
            const imageUrl = data.secure_url;
            console.log("Image URL obtained:", imageUrl);

            // Update form data
            setFormData(prev => ({ ...prev, image: imageUrl }));
            alert("Image uploaded successfully to Cloudinary!");
            console.log("Form data updated with image URL");
        } catch (error) {
            console.error("Detailed upload error:", error);
            console.error("Error message:", error.message);

            let errorMessage = "Error uploading image: ";
            if (error.message.includes('Network')) {
                errorMessage += "Network error. Check your internet connection.";
            } else if (error.message.includes('413')) {
                errorMessage += "File too large for upload.";
            } else {
                errorMessage += error.message;
            }

            alert(errorMessage);
        } finally {
            setUploading(false);
            console.log("Upload process completed");
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, "orders", orderId), {
                status: newStatus,
                updatedAt: new Date().toISOString()
            });
            fetchOrders();
            alert("Order status updated successfully!");
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Error updating order status");
        }
    };

    const handleSeedData = async () => {
        if (!confirm("Are you sure you want to upload initial data?")) return;
        try {
            for (const product of productData) {
                const { id, ...data } = product;
                if (data.idealWith) {
                    data.idealWith = data.idealWith.map(item => ({
                        label: item.label,
                        icon: item.label.toLowerCase().includes("snack") ? "snack" : "lunch"
                    }));
                }
                await addDoc(collection(db, "products"), data);
            }
            alert("Data seeded successfully!");
            fetchProducts();
        } catch (error) {
            console.error("Error seeding data:", error);
            alert("Error seeding data: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            alert("Please upload an image before saving!");
            return;
        }

        try {
            if (editingProduct) {
                await updateDoc(doc(db, "products", editingProduct.id), formData);
                setEditingProduct(null);
            } else {
                await addDoc(collection(db, "products"), formData);
            }
            setFormData({});
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const filteredOrders = statusFilter === "all"
        ? orders
        : orders.filter(order => order.status === statusFilter);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-[#f7f0dd] via-[#faf5eb] to-[#f7f0dd] p-4 lg:p-8">
                {!userIsAdmin ? (
                    // Unauthorized Access Message
                    <div className="flex items-center justify-center min-h-[80vh]">
                        <div className="bg-white/80 backdrop-blur-lg p-8 lg:p-12 rounded-2xl shadow-2xl border border-[#e0d5c1] max-w-md text-center">
                            <div className="p-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 flex items-center justify-center">
                                <ShieldAlert className="w-10 h-10 lg:w-12 lg:h-12 text-red-600" />
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-[#7a5c43] mb-4">Access Denied</h1>
                            <p className="text-sm lg:text-base text-[#5b4e3b] mb-6">
                                You don&apos;t have permission to access the admin dashboard.
                            </p>
                            <p className="text-xs lg:text-sm text-[#7a5c43] mb-6">
                                Only authorized administrators can access this page.
                            </p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all text-sm lg:text-base"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-[#7a5c43]">Admin Dashboard</h1>

                        {/* Tab Navigation */}
                        <div className="flex gap-2 lg:gap-4 mb-6 lg:mb-8 bg-white/80 backdrop-blur-lg p-2 rounded-xl shadow-lg overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("products")}
                                className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-all whitespace-nowrap text-sm lg:text-base ${activeTab === "products"
                                    ? "bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white shadow-lg"
                                    : "text-[#7a5c43] hover:bg-[#f7f0dd]"
                                    }`}
                            >
                                <Package className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span className="hidden sm:inline">Products ({products.length})</span>
                                <span className="sm:hidden">({products.length})</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("users")}
                                className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-all whitespace-nowrap text-sm lg:text-base ${activeTab === "users"
                                    ? "bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white shadow-lg"
                                    : "text-[#7a5c43] hover:bg-[#f7f0dd]"
                                    }`}
                            >
                                <Users className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span className="hidden sm:inline">Users ({users.length})</span>
                                <span className="sm:hidden">({users.length})</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-all whitespace-nowrap text-sm lg:text-base ${activeTab === "orders"
                                    ? "bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white shadow-lg"
                                    : "text-[#7a5c43] hover:bg-[#f7f0dd]"
                                    }`}
                            >
                                <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span className="hidden sm:inline">Orders ({orders.length})</span>
                                <span className="sm:hidden">({orders.length})</span>
                            </button>
                        </div>

                        {/* Products Tab */}
                        {activeTab === "products" && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                                {/* Product Form */}
                                <div className="bg-white/80 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-xl lg:col-span-1 border border-[#e0d5c1] max-h-[calc(100vh-200px)] overflow-y-auto">
                                    <h3 className="text-lg lg:text-xl font-bold mb-4 text-[#7a5c43] sticky top-0 bg-white/90 backdrop-blur-sm py-2 -mx-4 px-4 lg:-mx-6 lg:px-6">
                                        {editingProduct ? "Edit Product" : "Add New Product"}
                                    </h3>
                                    <form onSubmit={handleSave} className="space-y-3 lg:space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#7a5c43] mb-2">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title || ""}
                                                onChange={handleChange}
                                                className="w-full px-3 lg:px-4 py-2 rounded-xl border-2 border-[#e0d5c1] focus:border-[#7a5c43] focus:outline-none text-sm lg:text-base"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#7a5c43] mb-2">Category</label>
                                            <input
                                                type="text"
                                                name="category"
                                                value={formData.category || ""}
                                                onChange={handleChange}
                                                className="w-full px-3 lg:px-4 py-2 rounded-xl border-2 border-[#e0d5c1] focus:border-[#7a5c43] focus:outline-none text-sm lg:text-base"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#7a5c43] mb-2">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description || ""}
                                                onChange={handleChange}
                                                className="w-full px-3 lg:px-4 py-2 rounded-xl border-2 border-[#e0d5c1] focus:border-[#7a5c43] focus:outline-none text-sm lg:text-base"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#7a5c43] mb-2">Product Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleImageUpload(e);
                                                }}
                                                className="block w-full text-xs lg:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7a5c43] file:text-white hover:file:bg-[#6a4e3b]"
                                            />
                                            {uploading && <span className="text-xs lg:text-sm text-[#7a5c43] mt-1 block">Uploading...</span>}
                                            {formData.image && (
                                                <img src={formData.image} alt="Preview" className="mt-2 h-16 lg:h-20 w-16 lg:w-20 object-cover rounded-lg" />
                                            )}
                                        </div>

                                        {/* Size Options */}
                                        <div className="border-t-2 border-[#e0d5c1] pt-3 lg:pt-4">
                                            <label className="block text-sm font-semibold text-[#7a5c43] mb-2">Size Options</label>
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Size (e.g. 500g)"
                                                    id="newSize"
                                                    className="border-2 border-[#e0d5c1] rounded-lg p-2 flex-1 focus:border-[#7a5c43] focus:outline-none text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Price"
                                                    id="newPrice"
                                                    className="border-2 border-[#e0d5c1] rounded-lg p-2 w-20 lg:w-24 focus:border-[#7a5c43] focus:outline-none text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const size = document.getElementById('newSize').value;
                                                        const price = Number(document.getElementById('newPrice').value);
                                                        if (size && price) {
                                                            const currentOptions = formData.sizeOptions || [];
                                                            setFormData({ ...formData, sizeOptions: [...currentOptions, { size, price }] });
                                                            document.getElementById('newSize').value = '';
                                                            document.getElementById('newPrice').value = '';
                                                        }
                                                    }}
                                                    className="bg-[#7a5c43] text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-[#6a4e3b] text-sm whitespace-nowrap"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                                {formData.sizeOptions?.map((option, index) => (
                                                    <div key={index} className="flex justify-between items-center bg-[#f7f0dd]/50 p-2 rounded-lg">
                                                        <span className="text-[#5b4e3b] text-sm">{option.size} - ₹{option.price}</span>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const newOptions = formData.sizeOptions.filter((_, i) => i !== index);
                                                                setFormData({ ...formData, sizeOptions: newOptions });
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <button
                                                type="submit"
                                                disabled={uploading}
                                                className={`px-4 py-2 rounded-xl w-full text-white font-semibold text-sm lg:text-base ${uploading ? 'bg-gray-400' : 'bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] hover:shadow-lg'
                                                    }`}
                                            >
                                                {uploading ? "Uploading..." : (editingProduct ? "Update" : "Add")}
                                            </button>
                                            {editingProduct && (
                                                <button
                                                    type="button"
                                                    onClick={() => { setEditingProduct(null); setFormData({}); }}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 w-full font-semibold text-sm lg:text-base"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                    <button
                                        onClick={handleSeedData}
                                        className="mt-3 lg:mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 font-semibold text-sm lg:text-base"
                                    >
                                        Seed Initial Data
                                    </button>
                                </div>

                                {/* Product List */}
                                <div className="bg-white/80 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-xl lg:col-span-2 border border-[#e0d5c1] max-h-[calc(100vh-200px)] overflow-y-auto">
                                    <h3 className="text-lg lg:text-xl font-bold mb-4 text-[#7a5c43] sticky top-0 bg-white/90 backdrop-blur-sm py-2 -mx-4 px-4 lg:-mx-6 lg:px-6">Product List ({products.length})</h3>
                                    {loading ? (
                                        <p className="text-[#7a5c43]">Loading...</p>
                                    ) : (
                                        <div className="space-y-3 lg:space-y-4">
                                            {products.map(product => (
                                                <div key={product.id} className="border-2 border-[#e0d5c1] p-3 lg:p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-lg transition-shadow">
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-[#5b4e3b] text-sm lg:text-base">{product.title}</h4>
                                                        <p className="text-xs lg:text-sm text-[#7a5c43]">{product.category}</p>
                                                    </div>
                                                    <div className="flex gap-2 w-full sm:w-auto">
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="text-blue-600 hover:text-blue-800 p-2 flex-1 sm:flex-none"
                                                        >
                                                            <Edit className="w-4 lg:w-5 h-4 lg:h-5 mx-auto" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-800 p-2 flex-1 sm:flex-none"
                                                        >
                                                            <Trash2 className="w-4 lg:w-5 h-4 lg:h-5 mx-auto" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === "users" && (
                            <div className="bg-white/80 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-xl border border-[#e0d5c1]">
                                <h3 className="text-lg lg:text-xl font-bold mb-6 text-[#7a5c43]">Registered Users ({users.length})</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-[#e0d5c1]">
                                                <th className="text-left p-2 lg:p-3 text-[#7a5c43] font-semibold text-sm lg:text-base">Name</th>
                                                <th className="text-left p-2 lg:p-3 text-[#7a5c43] font-semibold text-sm lg:text-base">Email</th>
                                                <th className="text-left p-2 lg:p-3 text-[#7a5c43] font-semibold text-sm lg:text-base">Provider</th>
                                                <th className="text-left p-2 lg:p-3 text-[#7a5c43] font-semibold text-sm lg:text-base">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id} className="border-b border-[#e0d5c1] hover:bg-[#f7f0dd]/30">
                                                    <td className="p-2 lg:p-3 text-[#5b4e3b] text-sm lg:text-base">{user.displayName || "N/A"}</td>
                                                    <td className="p-2 lg:p-3 text-[#5b4e3b] text-xs lg:text-base break-all">{user.email}</td>
                                                    <td className="p-2 lg:p-3">
                                                        <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${user.provider === "google" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                                            }`}>
                                                            {user.provider || "email"}
                                                        </span>
                                                    </td>
                                                    <td className="p-2 lg:p-3 text-[#5b4e3b] text-xs lg:text-base">
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === "orders" && (
                            <div className="space-y-4 lg:space-y-6">
                                {/* Filter */}
                                <div className="bg-white/80 backdrop-blur-lg p-3 lg:p-4 rounded-xl shadow-lg border border-[#e0d5c1]">
                                    <label className="text-xs lg:text-sm font-semibold text-[#7a5c43] mr-4">Filter by Status:</label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-3 lg:px-4 py-2 rounded-lg border-2 border-[#e0d5c1] focus:border-[#7a5c43] focus:outline-none text-sm lg:text-base"
                                    >
                                        <option value="all">All Orders</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>

                                {/* Orders List */}
                                <div className="bg-white/80 backdrop-blur-lg p-4 lg:p-6 rounded-2xl shadow-xl border border-[#e0d5c1]">
                                    <h3 className="text-lg lg:text-xl font-bold mb-6 text-[#7a5c43]">
                                        Orders ({filteredOrders.length})
                                    </h3>
                                    <div className="space-y-4">
                                        {filteredOrders.map(order => (
                                            <div key={order.id} className="border-2 border-[#e0d5c1] p-4 lg:p-6 rounded-xl hover:shadow-lg transition-shadow">
                                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-4 gap-4">
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-[#5b4e3b] text-base lg:text-lg">Order #{order.id.slice(0, 8)}</h4>
                                                        <p className="text-xs lg:text-sm text-[#7a5c43]">{order.customerName}</p>
                                                        <p className="text-xs lg:text-sm text-[#7a5c43] break-all">{order.customerEmail}</p>
                                                        <p className="text-xs lg:text-sm text-[#7a5c43]">{order.customerPhone}</p>
                                                    </div>
                                                    <div className="text-left lg:text-right">
                                                        <p className="text-xl lg:text-2xl font-bold text-[#7a5c43]">₹{order.total}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <p className="text-xs lg:text-sm font-semibold text-[#7a5c43] mb-2">Items:</p>
                                                    {order.items?.map((item, idx) => (
                                                        <p key={idx} className="text-xs lg:text-sm text-[#5b4e3b]">
                                                            {item.title} x{item.quantity} - ₹{item.price}
                                                        </p>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                    <label className="text-xs lg:text-sm font-semibold text-[#7a5c43]">Status:</label>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                        className={`px-3 lg:px-4 py-2 rounded-lg font-semibold border-2 focus:outline-none text-sm lg:text-base w-full sm:w-auto ${order.status === "Delivered" ? "bg-green-100 text-green-700 border-green-300" :
                                                            order.status === "Shipped" ? "bg-blue-100 text-blue-700 border-blue-300" :
                                                                order.status === "Processing" ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
                                                                    "bg-orange-100 text-orange-700 border-orange-300"
                                                            }`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </ProtectedRoute>
    );
}
