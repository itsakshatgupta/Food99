'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Package, DollarSign, Text, Tag, UploadCloud, CheckCircle, XCircle, Loader, Zap, AlertTriangle, Truck, Settings, ClipboardList, Eye, Trash2, Edit } from 'lucide-react';

// --- MOCK API FUNCTIONS ---

// Mock data for a product being edited
const MOCK_EXISTING_PRODUCT = {
    id: 'PROD_XYZ_789',
    productName: 'High-Torque Precision Servo Motor',
    sku: 'SM-HT-P2400-A',
    price: '1250.99',
    category: 'Industrial Machinery',
    description: 'Successfully deployed in over 500 manufacturing plants. Features 0.01-degree precision, CE and RoHS certified. Packaged dimensions: 30x15x10cm.',
    existingImageName: 'servo_motor_main_hires.png', // Field to show current image
    
    // Commercial fields
    minBulkQuantity: 100,
    bulkDiscountPercent: 10,
    isDeliveryEnabled: true,
    isServiceEnabled: true,
    warrantyDetails: '2-Year Full Replacement Warranty',
    deliveryRegions: 'North America (US, CA, MX), Western Europe (UK, DE, FR), APAC (JP, SK)',
};

// Simulates fetching the product on page load
const mockFetchProduct = (productId) => {
    console.log(`Fetching data for product: ${productId}...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_EXISTING_PRODUCT);
        }, 800); // Simulate network delay
    });
};

// Simulates an UPDATE (PUT/PATCH) request
const mockUpdateProduct = (productId, productData) => {
    console.log(`Submitting Update for ${productId}:`, productData);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (productData.productName.toLowerCase().includes('fail')) {
                 return reject({ message: 'Update failed security review. Content flagged.' });
            }
            resolve({ success: true, productId: productId, status: 'Update Successful' });
        }, 1500);
    });
};

// Simulates a DELETE request
const mockDeleteProduct = (productId) => {
    console.log(`Submitting DELETE for: ${productId}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: `Product ${productId} has been permanently deleted.` });
        }, 1200);
    });
};

// --- CONSTANTS ---
const categoryOptions = [
    'Industrial Machinery',
    'Electronics & Sensors',
    'Raw Materials',
    'Logistics & Freight',
    'Software Licensing',
    'Consulting Services',
];

// --- COMPONENTS ---

// Custom Input Field (Memoized)
const InputField = React.memo(({ label, name, type = 'text', icon: Icon, placeholder, step, value, onChange, required = false, isLoading, min }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                step={step}
                required={required}
                min={min}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm disabled:bg-gray-100 disabled:opacity-70"
                disabled={isLoading}
            />
        </div>
    </div>
));

// Toggle Switch/Checkbox Component (Memoized)
const ToggleField = React.memo(({ label, name, checked, onChange, icon: Icon, description, isLoading }) => (
    <div className="flex items-start">
        <div className="flex items-center h-5 mt-1">
            <input
                id={name}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={isLoading}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor={name} className="font-semibold text-gray-700 flex items-center">
                <Icon className="w-4 h-4 mr-2 text-indigo-500" />
                {label}
            </label>
            <p className="text-gray-500 mt-0.5">{description}</p>
        </div>
    </div>
));


// Main Product Edit Form Content
const ProductEditPage_ = () => {
    // State for the product data
    const [product, setProduct] = useState(null);
    // State for form file input
    const [imageFile, setImageFile] = useState(null);
    
    // Loading states
    const [isPageLoading, setIsPageLoading] = useState(true); // Initial page load
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // API response state
    const [response, setResponse] = useState(null); // { status: 'success'/'error', message: '...' }

    // 1. Fetch Existing Product Data on Load
    useEffect(() => {
        // We're simulating a page load for a *specific* product.
        // In a real app, you'd get the ID from the URL (e.g., /products/edit/PROD_XYZ_789)
        const currentProductId = 'PROD_XYZ_789'; 
        
        mockFetchProduct(currentProductId).then(data => {
            setProduct(data);
            setIsPageLoading(false);
        });
    }, []); // Empty dependency array means this runs once on mount

    // 2. Form Handlers
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }, []);

    // 3. Submit Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse(null);
        setIsSaving(true);

        try {
            // Filter out fields the API doesn't need
            const { id, existingImageName, ...submissionData } = product;
            
            // In a real app, you'd also handle the 'imageFile' upload here.
            // For now, we just pass the text data.
            console.log('Submitting new file (if any):', imageFile ? imageFile.name : 'No new file');

            const result = await mockUpdateProduct(product.id, submissionData);
            setResponse({
                status: 'success',
                message: `Update successful! Product ${result.productId} is pending re-verification.`,
            });
            // Unlike 'create', we *don't* reset the form
            setImageFile(null); // Clear the file input
            if(document.getElementById('imageFile')) {
                document.getElementById('imageFile').value = '';
            }
            
        } catch (error) {
            setResponse({
                status: 'error',
                message: error.message || 'An unknown server error occurred during update.',
            });
        } finally {
            setIsSaving(false);
        }
    };

    // 4. Handle Delete
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to permanently delete this product? This action cannot be undone.")) {
            return;
        }

        setResponse(null);
        setIsDeleting(true);

        try {
            const result = await mockDeleteProduct(product.id);
            setResponse({
                status: 'success',
                message: result.message,
            });
            // In a real app, you'd redirect the user, e.g., router.push('/products')
            // For this demo, we'll just disable the form.
            setProduct(null); 
            
        } catch (error) {
            setResponse({
                status: 'error',
                message: error.message || 'Failed to delete product.',
            });
        } finally {
            setIsDeleting(false);
        }
    };

    // --- RENDER STATES ---

    if (isPageLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <Loader className="animate-spin w-10 h-10 text-indigo-600" />
                <p className="ml-4 text-lg text-gray-600">Loading product data...</p>
            </div>
        );
    }
    
    if (!product) {
         // This state is reached after successful deletion
        return (
             <div className="p-8">
                 <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Product</h1>
                 <div
                    className={`p-5 mb-8 rounded-xl font-medium flex items-center border-l-4 shadow-md bg-green-50 text-green-800 border-green-500`}
                    role="alert"
                >
                    <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0" />
                    <span className="text-base">{response.message}</span>
                </div>
             </div>
        );
    }
    
    // --- MAIN RENDER (Form) ---
    return (
        <div className="p-4 md:p-8">
             <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-8 h-8 text-indigo-600" />
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-['Inter']">
                    CATALYST <span className="text-indigo-600">CENTRAL</span>
                </h1>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <Edit className="w-6 h-6 mr-3 text-gray-400" />
                Edit Product
            </h2>
            <p className="text-gray-500 text-lg mb-8">
                Updating listing for: <span className="font-semibold text-indigo-700">{product.productName} (SKU: {product.sku})</span>
            </p>

            {/* Response Message (Refined Look) */}
            {response && (
                <div
                    className={`p-5 mb-8 rounded-xl font-medium flex items-center border-l-4 shadow-md ${
                        response.status === 'success'
                            ? 'bg-green-50 text-green-800 border-green-500'
                            : 'bg-red-50 text-red-800 border-red-500'
                    }`}
                    role="alert"
                >
                    {response.status === 'success' ? (
                        <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0" />
                    ) : (
                        <AlertTriangle className="w-6 h-6 mr-4 flex-shrink-0" />
                    )}
                    <span className="text-base">{response.message}</span>
                </div>
            )}

            <div className="bg-white p-6 md:p-12 rounded-2xl shadow-xl border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Core Details */}
                    <h2 className="text-2xl font-bold text-indigo-700 border-b border-gray-200 pb-3">1. Primary Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputField
                            label="Product Name (Title)"
                            name="productName"
                            icon={Package}
                            placeholder="High-Torque Precision Servo Motor"
                            value={product.productName}
                            onChange={handleChange}
                            required
                            isLoading={isSaving || isDeleting}
                        />
                        <InputField
                            label="Manufacturer SKU / Model No."
                            name="sku"
                            icon={Tag}
                            placeholder="SM-HT-P2400-A"
                            value={product.sku}
                            onChange={handleChange}
                            isLoading={isSaving || isDeleting}
                        />
                        <InputField
                            label="Unit Price (USD)"
                            name="price"
                            type="number"
                            icon={DollarSign}
                            placeholder="1,250.99"
                            step="0.01"
                            value={product.price}
                            onChange={handleChange}
                            required
                            isLoading={isSaving || isDeleting}
                        />
                    </div>

                    {/* Category Select */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                            Product Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                                className="appearance-none w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm disabled:bg-gray-100"
                                disabled={isSaving || isDeleting}
                            >
                                {categoryOptions.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="pt-4">
                         <h2 className="text-2xl font-bold text-indigo-700 border-b border-gray-200 pb-3 mb-4">2. Technical Description & Use</h2>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                            Full Product Specification Details
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="7"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Specify technical parameters, compatibility data, compliance certifications (e.g., CE, RoHS), and packaging dimensions for logistics."
                            className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder:text-gray-400 shadow-sm disabled:bg-gray-100"
                            disabled={isSaving || isDeleting}
                        />
                    </div>

                    {/* Section 3: Commercial Terms & Logistics */}
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-indigo-700 border-b border-gray-200 pb-3 mb-4">3. Commercial Terms & Logistics</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <InputField
                                label="Minimum Bulk Quantity"
                                name="minBulkQuantity"
                                type="number"
                                icon={ClipboardList}
                                placeholder="100"
                                min="1"
                                value={product.minBulkQuantity}
                                onChange={handleChange}
                                isLoading={isSaving || isDeleting}
                            />
                            <InputField
                                label="Bulk Discount Percentage (%)"
                                name="bulkDiscountPercent"
                                type="number"
                                icon={DollarSign}
                                placeholder="10"
                                min="0"
                                step="1"
                                value={product.bulkDiscountPercent}
                                onChange={handleChange}
                                isLoading={isSaving || isDeleting}
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <ToggleField
                                label="Delivery Service Enabled"
                                name="isDeliveryEnabled"
                                icon={Truck}
                                checked={product.isDeliveryEnabled}
                                onChange={handleChange}
                                description="Check if you can ship this product to buying partners."
                                isLoading={isSaving || isDeleting}
                            />
                            <ToggleField
                                label="Installation/Support Service Enabled"
                                name="isServiceEnabled"
                                icon={Settings}
                                checked={product.isServiceEnabled}
                                onChange={handleChange}
                                description="Check if you provide post-sale installation or support."
                                isLoading={isSaving || isDeleting}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Warranty Details"
                                name="warrantyDetails"
                                icon={CheckCircle}
                                placeholder="e.g., 2-Year Full Replacement / Limited Lifetime"
                                value={product.warrantyDetails}
                                onChange={handleChange}
                                isLoading={isSaving || isDeleting}
                            />
                             <div>
                                <label htmlFor="deliveryRegions" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Delivery Service Regions
                                </label>
                                <textarea
                                    id="deliveryRegions"
                                    name="deliveryRegions"
                                    rows="3"
                                    value={product.deliveryRegions}
                                    onChange={handleChange}
                                    placeholder="List all available delivery regions (e.g., EMEA, Asia Pacific, US East Coast)"
                                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder:text-gray-400 shadow-sm disabled:bg-gray-100"
                                    disabled={isSaving || isDeleting}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Section 4: Media Assets (Image Upload) */}
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-indigo-700 border-b border-gray-200 pb-3 mb-4">4. Media Assets</h2>
                        <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 rounded-xl hover:border-indigo-400 transition duration-300">
                            <label htmlFor="imageFile" className="flex flex-col items-center justify-center cursor-pointer">
                                <UploadCloud className="w-10 h-10 text-indigo-500 mb-3" />
                                <p className="text-lg font-semibold text-gray-700 mb-1">
                                    {imageFile ? `New File: ${imageFile.name}` : `Current File: ${product.existingImageName}`}
                                </p>
                                <p className={`text-sm ${imageFile ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
                                    {imageFile ? '(Ready to upload on save)' : 'Drag & Drop or Click to Upload a New Image (Replaces Current)'}
                                </p>
                            </label>
                            <input
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={isSaving || isDeleting}
                            />
                        </div>
                    </div>

                    {/* Action Buttons: Delete, View, Save */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
                        
                        {/* Delete Button */}
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isSaving || isDeleting}
                            className="w-full sm:w-auto flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader className="animate-spin w-5 h-5 mr-2" /> Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-5 h-5 mr-2" /> Delete Product
                                </>
                            )}
                        </button>
                        
                        {/* Right-side Buttons */}
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* View Live Button (Mock) */}
                            <a 
                                href="#" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition duration-200 shadow-sm"
                            >
                                <Eye className="w-5 h-5 mr-2" /> View Live Listing
                            </a>
                            
                            {/* Save Changes Button */}
                            <button
                                type="submit"
                                className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl transition duration-300 ease-in-out shadow-lg transform active:scale-[0.98] text-white
                                    ${
                                        isSaving
                                            ? 'bg-indigo-700 cursor-not-allowed opacity-80'
                                            : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70'
                                    }`
                                }
                                disabled={isSaving || isDeleting}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader className="animate-spin w-6 h-6 mr-3" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-6 h-6 mr-3" />
                                        Save & Publish Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


// Main App Component
export default function ProductEditPage(){
    // This is the wrapper for the standalone edit page
    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <main className="flex-grow w-full">
                {/* Centered, max-width container for the form */}
                <div className="max-w-4xl mx-auto py-10">
                    <ProductEditPage_ />
                </div>
            </main>
        </div>
    );
};
