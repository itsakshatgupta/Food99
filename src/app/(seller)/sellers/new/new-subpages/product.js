'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Package, DollarSign, Text, Tag, UploadCloud, CheckCircle, XCircle, Loader, Zap, AlertTriangle, Truck, Settings, ClipboardList, Plus, CornerDownRight, ArrowDownAz, Search, Minus, Trash2, Edit, Star } from 'lucide-react';
import { fetchAPI } from '@/app/(api)/api';
import Seller_Page_Header from '@/components/seller-cpmt/header';
import { Option_Window } from '../../product/product';
import Image from 'next/image';

// --- CONSTANTS & DEFAULT STATE ---

// const defaultProductState = {
//     name: '',
//     moq: '',
//     price: '',
//     category: 'Industrial Machinery',
//     description: '',
//     image: null,

//     // // NEW FIELDS
//     // minBulkQuantity: 100, // Minimum quantity for bulk offer
//     // bulkDiscountPercent: 10, // Discount percentage
//     // isDeliveryEnabled: true, // Delivery toggle
//     // isServiceEnabled: false, // Service toggle
//     // warrantyDetails: '1-Year Limited Manufacturer Warranty (On parts only)', // Warranty
//     // deliveryRegions: 'North America (US, CA, MX), Western Europe (UK, DE, FR)', // Regions list
// };

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
const InputField = (({ label, name, type = 'text', icon: Icon, placeholder, step, value, onChange, required = false, isLoading, min, className = '' }) => (
    <div className={`${className}`}>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className={`relative `}>
            <Icon className="absolute left-3 top-3 transform ranslate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                id={name}
                name={name}
                type={type}
                autoFocus={false}
                autoComplete={false}
                // value={value}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                placeholder={placeholder}
                step={step}
                required={required}
                min={min}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-purple-600 outline-none transition duration-200 shadow-sm disabled:bg-gray-100 disabled:opacity-70"
                disabled={isLoading}
            />
        </div>
    </div>
));

// Toggle Switch/Checkbox Component
const ToggleField = (({ label, name, checked, onChange, icon: Icon, description, isLoading }) => (
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
    const initial_required_fields= {name:null, price:null, delivery_available:null,  description:null}
    const [product, setProduct] = useState(initial_required_fields);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [content, setcontent] = useState(null);

    const [Child_Window_, setChild_Window_] = useState(null);
    const [adv_view, setAdv_view] = useState(false);

    const handleChange = useCallback((key, value) => {
        // const { name, value, type, checked } = e.target;
        console.log('key and value:', key, value)
        setProduct(prev => ({
            ...prev,
            // Handle checkboxes for boolean state
            // [name]: type === 'checkbox' ? checked : value,
             [key]: value
        }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        console.log('f:', file, e, product)
        setProduct(prev => ({ ...prev, image: file }));
        console.log('f_2:', file, e, product)

    }, []);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        setIsLoading(true);
        setResponse(null);
        console.log(product)

        try {
            const formData = new FormData();

            // append everything
            for (const key in product) {
                formData.append(key, product[key]);
            }

            const result = await fetchAPI("s/products", "POST", formData, true, 'FormData');

            setResponse({
                status: "success",
                message: "Product uploaded successfully",
            });

            // setProduct(defaultProductState);
            // document.getElementById("imageFile").value = "";

        } catch (err) {
            setResponse({ status: "error", message: err.message });
        } finally {
            setIsLoading(false);
        }
    };


    const Primary_info = () => (
        <div className="">
            {/* Section 1: Core Details */}
            {/* <div className="text-sm font-bold text-indigo-700 border-b_ border-gray-200 pb-3 df gap-2 mb-2">1. Primary Information</div> */}
            <div className="df fd-c gap-5">
                <div className="df gap-6">
                    <InputField
                        label="Product Name (Title)"
                        name="name"
                        icon={Package}
                        placeholder={product.name}
                        value={product.name}
                        onChange={handleChange}
                        required
                        isLoading={isLoading}
                        className="fx1"
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

                <div className="df aic gap-6">
                    {/* Category Select */}

                    <div>
                        <label htmlFor="category" className="block text-sm  text-blue-800 mb-1">
                            Product Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required
                                className="appearance-none w-full text-sm pl-4 pr-10 py-2.5 bg-white outline-none border border-gray-300 rounded-xl text-gray-900 focus:ring-indigo-500 focus:border-purple-600 transition duration-200 shadow-sm disabled:bg-gray-100"
                                disabled={isLoading}
                            >
                                {categoryOptions.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    <InputField
                        label="Manufacturer moq / Model No."
                        name="model_no"
                        icon={Tag}
                        placeholder="SM-HT-P2400-A"
                        value={product.model_no}
                        onChange={handleChange}
                        isLoading={isLoading}
                        className="fx1"
                    />
                </div>

                <div>
                    <label htmlFor="deliveryRegions" className="block text-sm  text-blue-800 mb-1">
                        Product Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={product.description}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        placeholder="List all available delivery regions (e.g., EMEA, Asia Pacific, US East Coast)"
                        className="w-full p-3 bg-white border border-gray-300 rounded-sm text-gray-900 outline-none focus:ring-indigo-500 focus:border-purple-600 transition duration-200 placeholder:text-gray-400 shadow-sm_ disabled:bg-gray-100"
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    )

    const Commercial_sec = () => (
        <div>
            {/* Section 3: Commercial Terms & Logistics */}
            <div className="border-gray-100">
                {/* Bulk Offer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    {/* <InputField
                        label="Product Name (Title)"
                        name="name"
                        icon={Package}
                        placeholder={product.name}
                        value={product.name}
                        onChange={handleChange}
                        required
                        isLoading={isLoading}
                        className="fx1"
                    /> */}
                    <InputField
                        label="Minimum Bulk Quantity"
                        name="moq"
                        type="number"
                        icon={ClipboardList}
                        placeholder="100"
                        min="1"
                        value={product.moq}
                        onChange={handleChange}
                        isLoading={isLoading}
                    />
                    {/* <InputField
                                        label="Bulk Discount Percentage (%)"
                                        name="bulkDiscountPercent"
                                        type="number"
                                        icon={DollarSign}
                                        placeholder="10"
                                        min="0"
                                        step="1"
                                        value={product.delivery_available}
                                        onChange={handleChange}
                                        isLoading={isLoading}
                                    /> */}
                </div>

                {/* Delivery/Service Toggles */}
                <div className="gridl dn grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <ToggleField
                        label="Delivery Service Enabled"
                        name="isDeliveryEnabled"
                        icon={Truck}
                        checked={product.delivery_available && true}
                        onChange={handleChange}
                        description="Check if you can ship this product to buying partners."
                        isLoading={isLoading}
                    />
                    <ToggleField
                        label="Installation/Support Service Enabled"
                        name="installation_available"
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
                        name="warranty_detail"
                        icon={CheckCircle}
                        placeholder="e.g., 2-Year Full Replacement / Limited Lifetime"
                        value={product.warranty_detail}
                        onChange={handleChange}
                        isLoading={isLoading}
                    />
                    <div>
                        <label htmlFor="delivery_available" className="block text-sm  text-blue-800 mb-1">
                            Delivery Service Regions
                        </label>
                        <textarea
                            id="delivery_available"
                            name="delivery_available"
                            rows="3"
                            value={product.delivery_available}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="List all available delivery regions (e.g., EMEA, Asia Pacific, US East Coast)"
                            className="w-full p-3 bg-white border border-gray-300 rounded-sm text-gray-900 focus:ring-blue-500 transition duration-200 placeholder:text-gray-400 shadow-sm_ disabled:bg-gray-100"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const Media_sec = () => (
        <div className="">
            {/* Section 4: Media Assets (Image Upload) */}
            {product.image &&
                <>
                    <div className="df aic jcsb">
                        <h1 className="text-md">Product Gallery</h1>
                        {/* <span className="px-2 bg-purple-600 text-white text-sm rounded-lg">Add New</span> */}
                    </div>
                </>
            }
            <div className="border rounded-md m-1  p-3">

                <div className="df fxw aic gap-2 mb-3"><div className="p-1 border rounded-sm"><Image src={product.image} alt={product.name} width={110} height={100} /> </div>
                </div>

                <div className="border-gray-100">
                    <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 rounded-xl hover:border-indigo-400 transition duration-300">
                        <label htmlFor="image" className="flex flex-col items-center justify-center cursor-pointer">
                            <UploadCloud className="w-10 h-10 text-indigo-500 mb-3" />
                            <p className="text-lg font-semibold text-gray-700 mb-1">
                                {product.image ? 'File Selected: ' : 'Drag & Drop or Click to Upload'}
                            </p>
                            <p className={`text-sm ${product.image ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
                                {product.image ? product.image.name : 'Max size 5MB. Supports JPG, PNG, TIFF.'}
                            </p>
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button (Vibrant Gradient) */}
            <button
                type="submit"
                className={`w-full flexl dn items-center justify-center px-4 py-4 text-xl font-bold rounded-xl transition duration-300 ease-in-out shadow-lg transform active:scale-[0.98] mt-12 text-white
                                ${isLoading
                        ? 'bg-indigo-700 cursor-not-allowed opacity-80'
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70'
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
        </div>
    )

    const dataToRenderPack = () => (
        <div className="mx-2 df fd-c hfp">
            <div className="df aic gap-2 text-xs mb-1">

                <span className="border rounded-md df aic gap-1 cursor-pointer hover:text-black-600 px-2 py-1 bg-black-600 hover:bg-gray-50 hover- hover:border-black-600 transition"><Trash2 size={14} className="c " />Category</span>
                <span className="border rounded-md df aic gap-1 cursor-pointer hover:text-black-600 px-2 py-1 bg-black-600 hover:bg-gray-50 hover- hover:border-black-600 transition"><Edit size={14} className="" />Sub Category</span>
                <span className="border rounded-md df aic gap-1 cursor-pointer text-white hover:text-red-600 px-2 py-1 bg-red-600 hover:bg-gray-50 hover- hover:border-red-600 transition"><Trash2 size={14} className="c " />Delete</span>
                <span className="border rounded-md df aic gap-1 cursor-pointer text-white hover:text-blue-600 px-2 py-1 bg-blue-600 hover:bg-gray-50 hover- hover:border-blue-600 transition"><Edit size={14} className="" />Edit</span>
                <div className="df aic gap-1 border border-gray-300 p-1 fx1 rounded-lg"><Search size={14} /><div>Search Category..</div></div>
            </div>
            <div className="fx1 border rounded-md text-sm oh">
                <div className="bg-gray-50_ border-b border-gray-100">
                    <div className="px-2 py-1 border-b_ border-gray-100_ df aic hover:bg-gray-50"><Minus size={14} className="mr-2 text-black-500" /> Biscuit</div>
                    <div className="px-5 py-1 bg-gray-50_ border-l-2 border-gray-200 df aic hover:bg-gray-50 cursor-pointer"><CornerDownRight size={10} className="mr-2 text-black-500" /> Parle</div>
                    <div className="px-5 py-1 bg-gray-50_ border-l-2 border-gray-200 df aic hover:bg-gray-50 cursor-pointer"><CornerDownRight size={10} className="mr-2 text-black-500" />Anmol</div>
                </div>
                <div className="px-2 py-1 border-b border-gray-100 df aic hover:bg-gray-50"><Plus size={14} className="mr-2" /> Snacks</div>
            </div>
            <div className="df gap-2 justify-end text-sm mt-2"><span className="py-1 px-3 border border-black rounded-md text-white bg-black cursor-pointer" onClick={() => setAdv_view(null)}>Cancel</span><span className="py-1 px-3 border cursor-pointer hover:bg-gray-50 rounded-md">Done</span></div>
            <div></div>
        </div>
    )
    return (
        <div className="df fd-c hfp pR">
            {adv_view && <Option_Window controller_={{ control: adv_view, setControl: setAdv_view, child_Window: Child_Window_ }} dataToRender={dataToRenderPack()} meta={{ heading: "Category", side_btns: <><span className="px-2 py-1 border text-black hover:bg-gray-50 rounded-xl cursor-pointer transition hover:border-black">New Sub-Category</span><span className="df aic gap-2 border  px-2 py-1 rounded-xl hover:bg-gray-50 cursor-pointer transition hover:border-black"><Plus size={16} />New Category</span></> }} />}

            <div className="pA dfl dn aic jcc hfp wfp z-50 bg-[#00000008]" style={{ backdropFilter: 'blur(0.8px)' }}>
                <div className="w-[35rem] h-[25rem] border oh rounded-xl bg-white pR shadow-md">
                    <div className="pA hfp wfp df aic jcc " style={{ backdropFilter: 'blur(1px)_' }}>
                        <div className="w-[15rem] bg-white border rounded-xl p-2.5 space-y-3 shadow-md"><h1 className="text-md">New Sub-Category</h1>
                            <div className="px-2"><h2 className="text-sm mb-2">Sub-Category Name</h2><div className="h-[22px] border-2 border-purple-600 rounded-sm"></div></div><div className="df aic justify-end gap-1 text-sm pt-1"><span className="px-2 py-1 border rounded-md cursor-pointer bg-black text-white">Cancel</span><span className="px-2 py-1 border rounded-md cursor-pointer hover:bg-gray-50">Done</span></div></div>
                    </div>

                    <div className="p-5 df fd-c hfp">
                        <div className="df jcsb mb-5"><h1 className="text-md">Category</h1> <div className="df aic gap-2  text-sm"><span className="px-2 py-1 border text-black hover:bg-gray-50 rounded-xl cursor-pointer transition hover:border-black">New Sub-Category</span><span className="df aic gap-2 border  px-2 py-1 rounded-xl hover:bg-gray-50 cursor-pointer transition hover:border-black"><Plus size={16} />New Category</span></div></div>
                        <div className="df aic gap-2 text-xs mb-1"><div className="df aic gap-1 border p-1 fx1 rounded-lg"><Search size={14} /><div>Search Category..</div></div>
                            <span className="border rounded-lg df aic gap-1 cursor-pointer text-white hover:text-red-600 px-2 py-1 bg-red-600 hover:bg-gray-50 hover- hover:border-red-600 transition"><Trash2 size={14} className="c " />Delete</span>
                            <span className="border rounded-lg df aic gap-1 cursor-pointer text-white hover:text-blue-600 px-2 py-1 bg-blue-600 hover:bg-gray-50 hover- hover:border-blue-600 transition"><Edit size={14} className="" />Edit</span>
                        </div>
                        <div className="fx1 border rounded-md text-sm oh">
                            <div className="bg-gray-50_ border-b border-gray-100">
                                <div className="px-2 py-1 border-b_ border-gray-100_ df aic hover:bg-gray-50"><Minus size={14} className="mr-2 text-black-500" /> Biscuit</div>
                                <div className="px-5 py-1 bg-gray-50_ border-l-2 border-gray-200 df aic hover:bg-gray-50 cursor-pointer"><CornerDownRight size={10} className="mr-2 text-black-500" /> Parle</div>
                                <div className="px-5 py-1 bg-gray-50_ border-l-2 border-gray-200 df aic hover:bg-gray-50 cursor-pointer"><CornerDownRight size={10} className="mr-2 text-black-500" />Anmol</div>
                            </div>
                            <div className="px-2 py-1 border-b border-gray-100 df aic hover:bg-gray-50"><Plus size={14} className="mr-2" /> Snacks</div>
                        </div>
                        <div className="df gap-2 justify-end text-sm mt-2"><span className="py-1 px-3 border border-black rounded-md text-white bg-black cursor-pointer">Cancel</span><span className="py-1 px-3 border cursor-pointer hover:bg-gray-50 rounded-md">Done</span></div>
                        <div></div>
                    </div>
                </div>

            </div>

            <Seller_Page_Header pageTitle="Upload" icon={<UploadCloud/>} pageSubTitle="Submit comprehensive data for efficient supply chain integration." />
            {/* Response Message (Refined Look) */}
            {response && (
                <div
                    className={` p-3 font-medium flex items-center border-l-4 ${response.status === 'success'
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
                    <span className="text-sm">{response.message}</span>
                </div>
            )}
            <div className="fx1 oh">
                {/* p-6 md:p-5  */}
                {product ? <form onSubmit={handleSubmit} className="p-3 hfp">
                    <div className="df gap-3 hfp">
                        <div className="fx1 oy py-3 df fd-c gap-2 px-1">
                            {Primary_info()}
                            {Commercial_sec()}
                            {Media_sec()}
                            <div className="justify-end px-5 df mt-2">
                                <button className="px-5 py-1 border bdArds cursor-pointer hover:bg-[#fbfbfb] text-sm" onClick={(e) => {
                                    e.preventDefault();
                                    let to_submit = true;
                                    console.log('my', product)
                                    for (const key in product) {
                                        const element = product[key];
                                        console.log("[][]:", key, element)
                                        if (element === "" || element === null) {
                                            console.log('reason to break;', key, element)
                                            to_submit = false
                                            setResponse({
                                                status: "error",
                                                message: "Fields Cannot be Blank.",
                                            });
                                            break;
                                        }
                                    }
                                    to_submit && product ? handleSubmit() : null
                                }}
                                    disabled={!product && true}
                                >{'Publish'}
                                </button>
                            </div>
                        </div>

                        <div className="w-[14rem] hfp oy">
                            <div className='p-1.5 fx1 bg-white border rounded-md'>

                                <h1 className="text-md mb-1 font-semibold border-b">Product Overview</h1>
                                <div className='text-sm m-1.5 space-y-2 text-black/95'>
                                    <div className='df aic gap-1'><span>Views:</span><span>{product.views}</span></div>
                                    <div className='df aic gap-1'><span>Enquires:</span><span>{product.enquires}</span></div>
                                    <div className='df aic gap-1'><span>Total Watch Hours:</span><span>0.6</span></div>
                                    <div className='df aic gap-1'><span>Average Media Watch:</span><span>80%</span></div>
                                    <div className='df aic gap-1'><span>Users Save:</span><span>90%</span></div>
                                    <div className='df aic gap-1'><span>Rating:</span><span className="df gap-1 text-sm text-blue-500 aic"><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><span className="cursor-pointer">(59)</span></span></div>

                                    {/* Advance User Setting's content.
                                                    <div className='df aic gap-1'><span>Uploaded:</span><span>{product.created_at.split('T')[0]}</span></div> */}
                                </div>

                                <div className='df jcc aic my-3'><span className="border rounded-full w-[80%] py-[0.125rem] text-blue-600  border-gray-300 hover:bg-blue-100 hover:border-blue-600 transition text-sm tac cursor-pointer" onClick={() => setAdv_view(true)}>Advance Setting</span>
                                </div>

                            </div>
                            <div className="h-[8rem] pR border mx-1 rounded-md my-3 bg-[royalblue] text-white df fd-c aic jcc gap-3 p-1.5"><div className="font-semibold text-[0.925rem] tac">Get More Views and Earn More Value</div>
                                <div className="px-3  text-sm font-semibold py-1 border border-white rounded-md ">Advertise Now</div>
                            </div>
                        </div>
                    </div>
                </form> : 'data loading'}
            </div>
        </div>
    );
};


// Main App Component
export default function ProductNewPage() {
    return (
        <ProductUploadPage />
    );
};