'use client'
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Package, DollarSign, Text, Tag, UploadCloud, CheckCircle, XCircle, Loader, Zap, AlertTriangle, Truck, Settings, ClipboardList, Plus, CornerDownRight, ArrowDownAz, Search, Minus, Trash2, Edit, ArrowLeft, Star, Boxes, Share2Icon } from 'lucide-react';
import { fetchAPI } from '@/app/(api)/api';
import Seller_Page_Header from '@/components/seller-cpmt/header';
import { initialProducts } from '../subpages/s-product_manage';
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

// //--dummy-data
//  const initialProducts = [
//   // Added fields for Enquiry and Search metrics
//   { id: 1001, name: 'Industrial Grade Steel Beam (Type A)', model_no: 'SB-001-A', views: 6000, enquires: 150, searches: 800, status: true, category: 'Structural Materials' },
//   { id: 1002, name: 'CNC Precision Router', model_no: 'CR-4K-22', views: 4500, enquires: 90, searches: 550, status: true, category: 'Machinery & Tools' },
//   { id: 1003, name: 'High-Torque Actuator Unit', model_no: 'HTAU-900', views: 1800, enquires: 200, searches: 1200, status: false, category: 'Automation Components' }, // High Enquiry/Search
//   { id: 1004, name: 'Advanced Sensor Array Kit', model_no: 'ASA-V3', views: 3200, enquires: 40, searches: 300, status: true, category: 'Automation Components' },
//   { id: 1005, name: 'Hydraulic Piston Set (Medium)', model_no: 'HPS-M-05', views: 5500, enquires: 120, searches: 700, status: true, category: 'Hydraulics' },
//   { id: 1006, name: 'Reinforced Concrete Mix (Bag)', model_no: 'RCM-40', views: 1200, enquires: 30, searches: 200, status: true, category: 'Structural Materials' },
//   { id: 1007, name: 'Heavy Duty Lathe Machine', model_no: 'HDLM-X', views: 7100, enquires: 80, searches: 400, status: false, category: 'Machinery & Tools' }, // High View
// ];

// --- COMPONENTS ---
// Custom Input Field with enhanced styling
const InputField = ({ label, name, type = 'text', icon: Icon, placeholder, step, value, onChange, required = false, isLoading, min, className = '' }) => {

    return (
        <div className={`${className}`}>
            <label htmlFor={name} className="block text-sm  text-blue-800 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`relative `}>
                <Icon className="absolute left-3 top-3 transform ranslate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    placeholder={placeholder}
                    step={step}
                    required={required}
                    min={min}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-blue-400 focus:rounded-lg outline-none transition duration-200 shadow-sm_ disabled:bg-gray-100 disabled:opacity-70"
                    disabled={isLoading}
                />
            </div>
        </div>
    )
};

// Toggle Switch/Checkbox Component
export const ToggleField = (({ label, name, checked, onChange, icon: Icon, description, isLoading }) => (
    <div className="flex items-start jcsb">
        <div className="text-sm">
            <label htmlFor={name} className="font-semibold_ flex items-center">
                <Icon className="w-4 h-4 mr-2 text-indigo-500" />
                {label}
            </label>
            <p className="text-gray-500 mt-0.5">{description}</p>
        </div>

        <div className="flex items-center h-5 mt-1">
            <input
                id={name}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.name, e.target.checked)}
                disabled={isLoading}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    </div>
));


// Main Product Upload Form Content
const ProductUploadPage = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);


    const [kvListPack, setkvListPack] = useState(false);
    const [Child_Window_, setChild_Window_] = useState(null);
    const [adv_view, setAdv_view] = useState(false);


    const handleChange = (key, value) => {
        // console.log(e, 123, e.target)
        // const { name, value, type, checked } = e.target;
        if (key === 'status') {
            console.log(key, value)

            const statuc_local_ = { true: 'Active', false: 'diactive' }
            value = statuc_local_[value]
        }
        console.log(key, value)
        setProduct(prev => ({
            ...prev,
            [key]: value
            // Handle checkboxes for boolean state
            // [name]: type === 'checkbox' ? checked : value,
        }));

        setProductToUpdate(prev => ({
            ...prev,
            [key]: value

            // Handle checkboxes for boolean state
            // [name]: type === 'checkbox' ? checked : value,
        }));

    };

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
        setProductToUpdate(null)

        try {
            const formData = new FormData();

            // append everything
            for (const key in productToUpdate) {
                formData.append(key, productToUpdate[key]);
            }

            const result = await fetchAPI("s/products" + productId, "PATCH", formData, true, 'FormData');

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

    useEffect(() => {
        try {
            async function getsellerproduct() {
                const result = await fetchAPI("products/" + productId, "GET", null, true);
                const res = await result;
                setProduct(res);
                setcontentfetched(true)
                console.log('res:', res);
            }

            getsellerproduct()
        } catch (error) {
            console.log('error__:', error);

        }
    }, [])

    // for test by using dummy data
    // useEffect(() => {
    //     const get_product = initialProducts.find(v => v.id === parseInt(productId))
    //     // alert(get_product.name)
    //     get_product['price'] = 26580;
    //     get_product['description'] = 'demo description'
    //     setProduct({
    //         name: get_product.name,
    //         model_no: get_product.model_no,
    //         price: get_product.price,
    //         category: get_product.category,
    //         description: get_product.description,
    //     })
    // }, [])


    // //{
    //     "id": 15,
    //     "name": "Washing Machine Commerical",
    //     "description": "Commerical washing machine.",
    //     "price": "1230.00",
    //     "moq": "1",
    //     "model_no": "SMG-MN-456-VBC",
    //     "warranty_detail": null,
    //     "image": "http://127.0.0.1:8000/products/images/ice_creame_sundae.jpg",
    //     "category": "Industrial Machinery",
    //     "tags": [],
    //     "delivery_available": "All India",
    //     "views": "0",
    //     "enquires": "0",
    //     "status": "Active",
    //     "installation_available": true,
    //     "created_at": "2025-11-19T14:24:17.100945-06:00"
    // }


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



    useEffect(() => {
        if (response) {
            setTimeout(() => setResponse(null), 5000)
        }
    }, [response])

    const handleDelete = async (e) => {
        // e.preventDefault();
        setIsLoading(true);
        setResponse(null);
        setProductToUpdate(null)

        try {
            const formData = new FormData();

            // append everything
            for (const key in productToUpdate) {
                formData.append(key, productToUpdate[key]);
            }

            const result = await fetchAPI("products/" + productId, "DELETE", null, true);

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

    useEffect(() => {
        if (product) {
            const _kvListPack = [
                {
                    name: "Visiblity", render: <div className="mx-1 text-sm">
                        <div className="text-lg mb-3">Visiblity</div>
                        <div className="space-y-4 divide-y mx-1">
                            <div className="">
                                {/* <h1 className="text-md mb-1">Manage Stock</h1> */}
                                <div className="df_ jcsb">
                                    {/* Current Stock State: {product.status && <span className={`${product.status === 'Active' ? "bg-gray-100 text-gray-200" : "bg-red-100 text-red-200"}`}>{product.status}</span>} */}
                                    <ToggleField name="status" label={`Stock: ${product.status === "Active" ? "In stock" : "Out of stock"}`} description="Update the product stock seamlessly." checked={product.status === "Active" ? true : false} onChange={handleChange} isLoading={isLoading} icon={Boxes} />
                                </div>
                            </div>
                            <div className="pt-1">
                                <h1 className="text-red-600 text-md mb-2">Delete this product permanently</h1>
                                <span className="border border-red text-white bg-red-600 px-2 rounded-md py-1" onClick={() =>setChild_Window_(
                                    <div className="text-sm">
                                        <h1 className="mb-3 df gap-1"><AlertTriangle size={22}/> All Information and Data Such as Forms, Enquires  and etc related this product also will be delete.</h1>
                                        <div className="df gap-1 justify-end">

                                        <span className="px-3 py-1 border cursor-pointer border-black rounded-md bg-white hover:bg-black hover:text-white" onClick={()=>setChild_Window_(null)}>Cancel</span>

                                        <span className="px-3 py-1 border cursor-pointer border-red-600 rounded-md bg-white text-red hover:bg-red-600 hover:text-white" onClick={()=>handleDelete()}>Delete Permanent</span>
                                        
                                        </div>
                                    </div>
                                    ) }>Delete</span>
                            </div>
                        </div>
                    </div>
                },
                { name: "Enquire", render: <div className="text-2xlg">m-2</div> },
                { name: "Form", render: <div className="text-2xlg">m-3</div> },
                { name: "Docmunent", render: <div className="text-2xlg">m-4</div> },
            ]
            setkvListPack(_kvListPack)
            console.log('G:', product.status)
        }
    }, [product])
    return (
        <div className="df fd-c hfp pR">
            {adv_view && <Option_Window controller_={{ control: adv_view, setControl: setAdv_view, child_Window:Child_Window_ }} kvList={kvListPack} dataToRender={false} meta={{heading:"Advance Setting"}}/>}

            <Seller_Page_Header pageTitle="Commercial stone oven" pageSubTitle="Model:#1001" back={true} buttons={[<span>Download Report</span>,<span>Guide</span>]}/>
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
            <div className="fx1 oy bg-gray-50">
                {/* p-6 md:p-5  */}
                {product ? <form onSubmit={handleSubmit} className="p-3 hfp">
                    <div className="df gap-3 min-h-full ">
                        <div className="fx1 hmc oy_ mb-9 border rounded-sm py-3 df fd-c gap-2 px-3 bg-white mb-5">
                            {Primary_info()}
                            {Commercial_sec()}
                            {Media_sec()}
                            <div className="justify-end px-5 df mt-2">
                                <button className="px-5 py-1 border border-purple-600 text-purple-600 rounded-md cursor-pointer bg-purple-100  hover:bg-purple-600 hover:text-white text-sm" onClick={(e) => {
                                    e.preventDefault();
                                    let to_submit = true;
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
                                    to_submit && productToUpdate ? handleSubmit() : null
                                }}
                                    disabled={!productToUpdate && true}
                                >{'Publish'}
                                </button>
                            </div>
                        </div>

                        <div className="min-w-[15rem] max-w-[min-content] hfp oy sbt" style={{scrollbarColor:'#eeeeeeff #fafafa '}}>
                            <div className='p-1.5 fx1  border rounded-lg bg-white'>

                                <h1 className="text-md font-semibold border-b df jcsb aic">Product Overview <Share2Icon size={18} className="mr-3"/></h1>
                                <div className='text-sm border_ rounded-lg p-2 space-y-2 text-black/95 bg-gray-50/30_'>
                                    <div className='df aic gap-1'><span>Views:</span><span>{product.views}</span></div>
                                    <div className='df aic gap-1'><span>Enquires:</span><span>{product.enquires}</span></div>
                                    <div className='df aic gap-1'><span>Total Watch Hours:</span><span>0.6</span></div>
                                    <div className='df aic gap-1'><span>Average Media Watch:</span><span>80%</span></div>
                                    <div className='df aic gap-1'><span>Users Save:</span><span>90%</span></div>
                                    <div className='df aic gap-1'><span>Rating:</span><span className="df gap-1 text-sm text-blue-500 aic"><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><Star fill="orangered" stroke="orangered" size={14} /><span className="cursor-pointer">(59)</span></span></div>

                                    {/* Advance User Setting's content.
                                        <div className='df aic gap-1'><span>Uploaded:</span><span>{product.created_at.split('T')[0]}</span></div> */}
                                </div>

                                <div className='df jcc aic mt-3 mb-1'><span className="border rounded-full w-[80%] py-[0.125rem] text-blue-600
                                bg-blue-50 border-blue-300 hover:bg-blue-100 hover:border-blue-300 transition text-sm tac cursor-pointer" onClick={() => setAdv_view(true)}>Advance Setting</span>
                                </div>

                            </div>
                            <div className="h-[8rem] pR border mx-1 rounded-md my-3 bg-[royalblue] text-white df fd-c aic jcc gap-3 p-1.5"><div className="font-semibold text-[0.925rem] tac">Get More Views and Earn More Value</div>
                                <div className="px-3  text-sm font-semibold py-1 border border-white rounded-md cursor-pointer">Advertise Now</div>
                            </div>
                        </div>
                    </div>
                </form> : 'data loading'}
            </div>
        </div>
    );
};


// Main App Component
export default function ProductEditPage({ productId }) {
    return (
        <ProductUploadPage productId={productId} />
    );
};

export function Option_Window({ controller_ = { control, setControl, child_Window:null }, kvList=null, dataToRender = null, meta={heading:null, side_btns:null} }) {
    const [view_, setView_] = useState(kvList?{ viewFor: kvList[0].name, viewToRender: kvList[0].render }:dataToRender);
    useEffect(() => {
        if (kvList && view_.viewFor) {
            setView_((prev) => ({ ...prev, viewToRender: kvList.find(f => f.name === prev.viewFor).render }))
        }
    }, [kvList])


    return (

        <div className="pA df aic jcc hfp wfp z-50 bg-[#00000008]" style={{ backdropFilter: 'blur(0.8px)' }}>
            <div className="w-[35rem] h-[25rem] border oh rounded-xl bg-white pR shadow-md">
                {controller_.child_Window&& <div className="pA hfp wfp df aic jcc " style={{ backdropFilter: 'blur(1px)_' }}>
                            <div className="min-w-[15rem] max-w-[25rem] bg-white border rounded-xl p-2.5 space-y-3 shadow-md">{controller_.child_Window}</div>
                        </div>}

                {/* {adv_view.main} */}
                <div className=" p-3 hfp df fd-c">
                    <div className="df gap-2 mb-3 aic">
                        <span className="hover:bg-gray-50 rounded-full cursor-pointer p-1">
                            <ArrowLeft size={18} onClick={() => controller_.setControl(false)} />
                        </span>
                        <h1 className="text-md">{meta.heading&&meta.heading}</h1>
                       
                    </div>
                    <div className={`${kvList&&"df"} fx1`}>
                        {kvList?
                        <>
                        <div className="flex-[0.4] border-r space-y-2 text-sm">
                            {kvList.map(v => (
                                <div className={` py-1 px-2 cursor-pointer ${view_.viewFor === v.name ? "bg-purple-600 text-white " : "hover:bg-gray-100"}`} onClick={() => setView_({ viewFor: v.name, viewToRender: v.render })}>{v.name}</div>
                            ))}

                        </div>
                        <div className="fx1">
                            {view_.viewToRender}

                        </div>
                        </>
                        :dataToRender}
                    </div>
                </div>
            </div>

        </div>


    )
}