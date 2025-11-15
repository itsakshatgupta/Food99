'use client'
import React, { useState, useCallback } from 'react';
import { Package, DollarSign, Text, Tag, UploadCloud, CheckCircle, XCircle, Loader, Zap, AlertTriangle, Truck, Settings, ClipboardList } from 'lucide-react';

// --- MOCK API FUNCTIONS ---

// The mock API function now accepts the full product data structure
const mockUploadProduct = (productData) => {
    console.log('Submitting Product Data:', productData);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!productData.productName || !productData.price || productData.price <= 0) {
                return reject({ message: 'Validation failed: Product name and a positive price are required.' });
            }
            // Mock failure case
            if (productData.productName.toLowerCase().includes('fail') || productData.description.toLowerCase().includes('fail')) {
                 return reject({ message: 'Product submission failed security review. Content flagged for restricted terms.' });
            }
            resolve({ success: true, productId: Math.random().toString(36).substring(2, 9).toUpperCase() });
        }, 1800);
    });
};

// --- CONSTANTS & DEFAULT STATE ---

const defaultProductState = {
    productName: '',
    sku: '',
    price: '',
    category: 'Industrial Machinery',
    description: '',
    imageFile: null,

    // NEW FIELDS
    minBulkQuantity: 100, // Minimum quantity for bulk offer
    bulkDiscountPercent: 10, // Discount percentage
    isDeliveryEnabled: true, // Delivery toggle
    isServiceEnabled: false, // Service toggle
    warrantyDetails: '1-Year Limited Manufacturer Warranty (On parts only)', // Warranty
    deliveryRegions: 'North America (US, CA, MX), Western Europe (UK, DE, FR)', // Regions list
};

const categoryOptions = [
    'Industrial Machinery',
    'Electronics & Sensors',
    'Raw Materials',
    'Logistics & Freight',
    'Software Licensing',
    'Consulting Services',
];

// --- COMPONENTS ---

// Custom Input Field with enhanced styling
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

// Toggle Switch/Checkbox Component
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


// Main Product Upload Form Content
const ProductUploadPage = () => {
    const [product, setProduct] = useState(defaultProductState);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        
        setProduct(prev => ({
            ...prev,
            // Handle checkboxes for boolean state
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        setProduct(prev => ({ ...prev, imageFile: file }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse(null);
        setIsLoading(true);

        try {
            // Basic client-side validation for required fields
            if (!product.productName || !product.price || product.price <= 0) {
                 throw new Error('Please fill out all required fields (Product Name and Price).');
            }
            
            // Filter out the image file from submission payload for mock API
            const { imageFile, ...submissionData } = product;

            const result = await mockUploadProduct(submissionData);
            setResponse({
                status: 'success',
                message: `Product uploaded successfully! Catalog ID: ${result.productId}. It is now pending verification.`,
            });
            setProduct(defaultProductState);
            document.getElementById('imageFile').value = '';

        } catch (error) {
            setResponse({
                status: 'error',
                message: error.message || 'An unknown server error occurred during submission.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
             <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-8 h-8 text-indigo-600" />
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-['Inter']">
                    CATALYST <span className="text-indigo-600">CENTRAL</span>
                </h1>
            </div>
            <p className="text-gray-500 text-lg mb-8">
                Submit comprehensive data for efficient supply chain integration.
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
                            isLoading={isLoading}
                        />
                        <InputField
                            label="Manufacturer SKU / Model No."
                            name="sku"
                            icon={Tag}
                            placeholder="SM-HT-P2400-A"
                            value={product.sku}
                            onChange={handleChange}
                            isLoading={isLoading}
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
                            isLoading={isLoading}
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
                                disabled={isLoading}
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
                            disabled={isLoading}
                        />
                    </div>

                    {/* Section 3: Commercial Terms & Logistics */}
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-indigo-700 border-b border-gray-200 pb-3 mb-4">3. Commercial Terms & Logistics</h2>

                        {/* Bulk Offer */}
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
                                isLoading={isLoading}
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
                                isLoading={isLoading}
                            />
                        </div>
                        
                        {/* Delivery/Service Toggles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <ToggleField
                                label="Delivery Service Enabled"
                                name="isDeliveryEnabled"
                                icon={Truck}
                                checked={product.isDeliveryEnabled}
                                onChange={handleChange}
                                description="Check if you can ship this product to buying partners."
                                isLoading={isLoading}
                            />
                            <ToggleField
                                label="Installation/Support Service Enabled"
                                name="isServiceEnabled"
                                icon={Settings}
                                checked={product.isServiceEnabled}
                                onChange={handleChange}
                                description="Check if you provide post-sale installation, maintenance, or support."
                                isLoading={isLoading}
                            />
                        </div>

                        {/* Warranty and Regions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Warranty Details"
                                name="warrantyDetails"
                                icon={CheckCircle}
                                placeholder="e.g., 2-Year Full Replacement / Limited Lifetime"
                                value={product.warrantyDetails}
                                onChange={handleChange}
                                isLoading={isLoading}
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
                                    disabled={isLoading}
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
                                    {product.imageFile ? 'File Selected: ' : 'Drag & Drop or Click to Upload'}
                                </p>
                                <p className={`text-sm ${product.imageFile ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
                                    {product.imageFile ? product.imageFile.name : 'Max size 5MB. Supports JPG, PNG, TIFF.'}
                                </p>
                            </label>
                            <input
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Submit Button (Vibrant Gradient) */}
                    <button
                        type="submit"
                        className={`w-full flex items-center justify-center px-4 py-4 text-xl font-bold rounded-xl transition duration-300 ease-in-out shadow-lg transform active:scale-[0.98] mt-12 text-white
                            ${
                                isLoading
                                    ? 'bg-indigo-700 cursor-not-allowed opacity-80'
                                    : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70'
                            }`
                        }
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="animate-spin w-6 h-6 mr-4" />
                                Processing Transaction: Awaiting Server Response...
                            </>
                        ) : (
                            <>
                                <Package className="w-6 h-6 mr-4" />
                                Finalize & Submit Listing
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};


// Main App Component
export default function ProductNewPage(){
    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <main className="flex-grow w-full">
                <div className="max-w-4xl mx-auto py-10">
                    <ProductUploadPage />
                </div>
            </main>
        </div>
    );
};