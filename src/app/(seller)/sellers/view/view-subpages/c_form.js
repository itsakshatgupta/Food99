'use client'
import React, { useState, useCallback, useEffect } from 'react';
import {
    Plus, Clock, CheckCircle, XCircle, FileText, Send, Loader2, Edit, UserCircle, LayoutList, Package, Zap, Eye, CornerDownRight,
    Filter
} from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';

// --- Global Mock Data ---
const MOCK_EMPLOYEES = ['Agent Ava (Admin)', 'Analyst Ben', 'Manager Chloe'];
const STATUSES = ['Pending Client Action', 'Client Reviewing', 'Submitted', 'Complete', 'Archived'];

// Function to generate a simple unique ID (simulating Firestore ID)
const generateId = (prefix) => prefix + '-' + Math.random().toString(36).substring(2, 9).toUpperCase();

const MOCK_TEMPLATES = [
    {
        id: 'T-001',
        title: 'New Client Onboarding Form',
        description: 'Collects initial required data for new customers.',
        fields: ['Full Name', 'Email Address', 'Phone Number', 'Service Tier'],
        createdBy: MOCK_EMPLOYEES[0],
        createdAt: new Date(Date.now() - 86400000 * 5),
    },
    {
        id: 'T-002',
        title: 'Internal Expense Report',
        description: 'For travel and petty cash reimbursement.',
        fields: ['Date of Expense', 'Category', 'Amount', 'Receipt Attached (Y/N)'],
        createdBy: MOCK_EMPLOYEES[0],
        createdAt: new Date(Date.now() - 86400000 * 2),
    },
];

const MOCK_SUBMISSIONS = [
    {
        id: 'S-001',
        templateId: 'T-001',
        templateTitle: MOCK_TEMPLATES[0].title,
        customerName: 'Tech Solutions LLC',
        assignedTo: MOCK_EMPLOYEES[1],
        status: 'Pending Client Action',
        formData: {
            'Full Name': '',
            'Email Address': 'support@techsol.com',
            'Phone Number': '',
            'Service Tier': 'Premium',
        },
        assignedBy: MOCK_EMPLOYEES[0],
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        lastUpdated: new Date(),
    },
    {
        id: 'S-002',
        templateId: 'T-002',
        templateTitle: MOCK_TEMPLATES[1].title,
        customerName: 'Manager Chloe (Self-Submission)',
        assignedTo: MOCK_EMPLOYEES[2],
        status: 'Client Reviewing',
        formData: {
            'Date of Expense': '2025-10-25',
            'Category': 'Travel',
            'Amount': '145.50',
            'Receipt Attached (Y/N)': 'Y',
        },
        assignedBy: MOCK_EMPLOYEES[2],
        createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
        lastUpdated: new Date(Date.now() - 86400000 * 2),
    },
];
const MOCK_USER_ID = MOCK_EMPLOYEES[0]; // Set a default user for mock data

// Helper for Status UI
const getStatusClasses = (status) => {
    let colorClasses = '';
    let Icon = Clock;
    switch (status) {
        case 'Complete':
            colorClasses = 'bg-green-100 text-green-800 border-green-200';
            Icon = CheckCircle;
            break;
        case 'Submitted':
            colorClasses = 'bg-blue-100 text-blue-800 border-blue-200';
            Icon = Send;
            break;
        case 'Pending Client Action':
            colorClasses = 'bg-yellow-100 text-yellow-800 border-yellow-200';
            Icon = Clock;
            break;
        case 'Client Reviewing':
            colorClasses = 'bg-orange-100 text-orange-800 border-orange-200';
            Icon = FileText;
            break;
        case 'Archived':
        default:
            colorClasses = 'bg-gray-100 text-gray-600 border-gray-200';
            Icon = XCircle;
            break;
    }
    return { colorClasses, Icon };
};

const StatusBadge = ({ status }) => {
    const { colorClasses, Icon } = getStatusClasses(status);
    return (
        <span className={`inline-flex items-center px-2 py-0.5 text-[0.675rem] font-semibold rounded-full border ${colorClasses}`}>
            <Icon className="w-3 h-3 mr-1" />
            {status}
        </span>
    );
};

// --- Utility Components (Modal) ---

const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
    if (!isOpen) return null;
    const sizeClasses = size === 'lg' ? 'max-w-lg' : 'max-w-3xl';
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses} max-h-[90vh] overflow-y-auto transform transition-all`}>
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Template Creation Modal (Mock Add) ---

const TemplateCreationModal = ({ setTemplates, isModalOpen, setIsModalOpen }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fieldsString, setFieldsString] = useState('Full Name, Email Address, Phone Number, Date of Request');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setFieldsString('Full Name, Email Address, Phone Number, Date of Request');
        setError('');
    };

    const handleCreateTemplate = async (e) => {
        e.preventDefault();

        const fieldNames = fieldsString.split(',').map(f => f.trim()).filter(f => f);

        if (!title.trim() || fieldNames.length === 0) {
            setError("Title and at least one field are required.");
            return;
        }

        setIsSaving(true);
        setError('');

        try {
            const newTemplate = {
                id: generateId('T'),
                title: title.trim(),
                description: description.trim() || 'No description provided.',
                fields: fieldNames,
                createdBy: MOCK_USER_ID,
                createdAt: new Date(),
            };

            // --- Mock Data Update ---
            setTemplates(prev => [...prev, newTemplate]);
            // -------------------------

            resetForm();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error creating template:", err);
            setError("Failed to create template.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title="Create New Form Template">
            <form onSubmit={handleCreateTemplate} className="space-y-4">
                {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm">{error}</p>}

                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Template Title:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="e.g., New Client Onboarding Form"
                        required
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Form Fields (Comma Separated):</span>
                    <textarea
                        value={fieldsString}
                        onChange={(e) => setFieldsString(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="e.g., Full Name, Email, Preferred Service, Signature (Required)"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">List the names of all required fields, separated by commas.</p>
                </label>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`flex items-center px-6 py-3 font-semibold rounded-xl text-white transition ${isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                            }`}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5 mr-2" />
                                Save Template
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// --- Submission Assignment Modal (Mock Add) ---

const SubmissionCreationModal = ({ setSubmissions, templates, isModalOpen, setIsModalOpen }) => {
    const [customerName, setCustomerName] = useState('');
    const [selectedTemplateId, setSelectedTemplateId] = useState(templates.length > 0 ? templates[0].id : '');
    const [assignedEmployee, setAssignedEmployee] = useState(MOCK_EMPLOYEES[1]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (templates.length > 0 && !selectedTemplateId) {
            setSelectedTemplateId(templates[0].id);
        }
    }, [templates, selectedTemplateId]);

    const resetForm = () => {
        setCustomerName('');
        setAssignedEmployee(MOCK_EMPLOYEES[1]);
        setError('');
        if (templates.length > 0) setSelectedTemplateId(templates[0].id);
    };

    const handleCreateSubmission = async (e) => {
        e.preventDefault();

        if (!customerName.trim() || !selectedTemplateId) {
            setError("Customer Name and Template Selection are required.");
            return;
        }

        setIsSaving(true);
        setError('');

        try {
            const template = templates.find(t => t.id === selectedTemplateId);
            if (!template) throw new Error("Template not found.");

            // Initialize form data structure based on template fields (all empty for a new assignment)
            const initialFormData = template.fields.reduce((acc, fieldName) => {
                acc[fieldName] = '';
                return acc;
            }, {});

            const now = new Date();
            const newSubmission = {
                id: generateId('S'),
                templateId: template.id,
                templateTitle: template.title,
                customerName: customerName.trim(),
                assignedTo: assignedEmployee,
                status: 'Pending Client Action',
                formData: initialFormData,
                assignedBy: MOCK_USER_ID,
                createdAt: now,
                lastUpdated: now,
            };

            // --- Mock Data Update ---
            setSubmissions(prev => [...prev, newSubmission]);
            // -------------------------

            resetForm();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error creating submission:", err);
            setError("Failed to assign submission.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title="Assign Form to Customer">
            {templates.length === 0 ? (
                <div className="p-6 text-center bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="font-semibold text-yellow-800">No Templates Found</p>
                    <p className="text-sm text-yellow-700 mt-1">Please create a form template first in the **Form Templates** tab.</p>
                </div>
            ) : (
                <form onSubmit={handleCreateSubmission} className="space-y-4">
                    {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm">{error}</p>}

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Customer Name:</span>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="e.g., Jane Doe Consulting"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Select Template:</span>
                        <select
                            value={selectedTemplateId}
                            onChange={(e) => setSelectedTemplateId(e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            required
                        >
                            {templates.map(template => (
                                <option key={template.id} value={template.id}>{template.title}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Assign To:</span>
                        <select
                            value={assignedEmployee}
                            onChange={(e) => setAssignedEmployee(e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            required
                        >
                            {MOCK_EMPLOYEES.map(employee => (
                                <option key={employee} value={employee}>{employee}</option>
                            ))}
                        </select>
                    </label>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`flex items-center px-6 py-3 font-semibold rounded-xl text-white transition ${isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                                }`}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Assign Form
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

// --- Submission Update/View Modal (Mock Update) ---

const SubmissionDetailsModal = ({ submission, isModalOpen, setIsModalOpen, templates, setSubmissions }) => {
    if (!submission) return null;

    const template = templates.find(t => t.id === submission.templateId);
    const formFields = template ? template.fields : Object.keys(submission.formData || {});

    const [currentFormData, setCurrentFormData] = useState(submission.formData || {});
    const [currentStatus, setCurrentStatus] = useState(submission.status);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    // Update local state when submission prop changes 
    useEffect(() => {
        setCurrentFormData(submission.formData || {});
        setCurrentStatus(submission.status);
    }, [submission]);

    const handleFormChange = (fieldName, value) => {
        setCurrentFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleUpdateSubmission = async (e) => {
        e.preventDefault();

        setIsSaving(true);
        setError('');

        try {
            const updatedSubmission = {
                ...submission,
                formData: currentFormData,
                status: currentStatus,
                lastUpdated: new Date(),
            };

            // --- Mock Data Update ---
            setSubmissions(prevSubmissions =>
                prevSubmissions.map(s => (s.id === submission.id ? updatedSubmission : s))
            );
            // -------------------------

            setIsModalOpen(false);
        } catch (err) {
            console.error("Error updating submission:", err);
            setError("Failed to update submission.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Form for: ${submission.customerName}`} size="xl">
            <div className="grid md:grid-cols-3 gap-6">

                {/* Submission Details Panel */}
                <div className="md:col-span-1 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-bold text-indigo-700 flex items-center"><UserCircle className="w-5 h-5 mr-2" /> Customer Information</h4>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Customer:</span> {submission.customerName}</p>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Template:</span> {submission.templateTitle}</p>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Assigned To:</span> {submission.assignedTo}</p>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Created On:</span> {submission.createdAt?.toLocaleDateString() || 'N/A'}</p>

                    <div className="space-y-2 pt-2 border-t mt-4">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700 flex items-center"><Zap className="w-4 h-4 mr-1" /> Update Status:</span>
                            <select
                                value={currentStatus}
                                onChange={(e) => setCurrentStatus(e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            >
                                {STATUSES.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </label>
                        <div className="mt-2">
                            <StatusBadge status={currentStatus} />
                        </div>
                    </div>
                </div>

                {/* Form Data Input Panel */}
                <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2" /> Form Content</h4>
                    <form onSubmit={handleUpdateSubmission} className="space-y-4">
                        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm">{error}</p>}

                        {formFields.map((fieldName, index) => (
                            <label key={index} className="block">
                                <span className="text-sm font-medium text-gray-700 flex items-center">
                                    <CornerDownRight className="w-4 h-4 mr-2 text-indigo-500" />
                                    {fieldName}
                                </span>
                                <input
                                    type="text"
                                    value={currentFormData[fieldName] || ''}
                                    onChange={(e) => handleFormChange(fieldName, e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    placeholder={`Enter data for ${fieldName}`}
                                />
                            </label>
                        ))}

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={`flex items-center px-6 py-3 font-semibold rounded-xl text-white transition ${isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                                    }`}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Edit className="w-5 h-5 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};


// --- Template List View (Table Format) ---

const TemplateTable = ({ templates, openSubmissionModal }) => (
    <div className="overflow-x-auto ">
        <table className="min-w-full divide-y divide-gray-200 bg-white border-t pd1">
            <thead className="">
                <tr>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Template Title</th>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Fields</th>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Created By</th>
                    <th className="px-3 py-1.5 text-center text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {templates.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                            No form templates found. Click "Create Template" to add one.
                        </td>
                    </tr>
                ) : (
                    templates.map((template) => (
                        <tr key={template.id} className="hover:bg-gray-50 transition">
                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                {template.title}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                {template.fields.length} fields
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                <UserCircle className="w-4 h-4 inline mr-1 text-gray-400" /> {template.createdBy}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center text-xs font-medium">
                                <button
                                    onClick={() => openSubmissionModal(true)}
                                    className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs py-1 px-3 border border-indigo-200 rounded-lg transition hover:bg-indigo-50"
                                >
                                    <Zap className="w-3 h-3 inline mr-1" /> Assign Form
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);


// --- Submission List View (Table Format) ---

const SubmissionTable = ({ submissions, openDetailsModal }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white border-t pd1">
            <thead className="">
                <tr>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Customer Name</th>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Template</th>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Assigned To</th>
                    <th className="px-3 py-1.5 text-left text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-1.5 text-center text-[0.625rem] font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {submissions.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            No submissions assigned yet. Assign a new form using the "Assign New Form" button.
                        </td>
                    </tr>
                ) : (
                    submissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50 transition">
                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                {submission.customerName}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                {submission.templateTitle}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                {submission.assignedTo}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs">
                                <StatusBadge status={submission.status} />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center text-xs font-medium">
                                <button
                                    onClick={() => openDetailsModal(submission)}
                                    className="text-blue-600 hover:text-blue-900 font-semibold text-xs py-1 px-3 border border-blue-200 rounded-lg transition hover:bg-blue-50"
                                >
                                    <Eye className="w-3 h-3 inline mr-1" /> View/Update
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);


// --- Main Application Component ---

export default function FormCentral() {
    // --- Application Data State (Now uses local state initialized with MOCK Data) ---
    const [templates, setTemplates] = useState(MOCK_TEMPLATES);
    const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);

    // --- UI State ---
    const [activeTab, setActiveTab] = useState('Submissions');
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Handlers for Modals
    const handleOpenDetailsModal = useCallback((submission) => {
        setSelectedSubmission(submission);
        setIsDetailsModalOpen(true);
    }, []);

    const handleCloseDetailsModal = useCallback(() => {
        setIsDetailsModalOpen(false);
        setSelectedSubmission(null);
    }, []);


    // --- Render Logic ---

    const renderContent = () => {
        if (activeTab === 'Submissions') {
            return (
                <>
                    <div className="flex justify-between items-center bg-[#FAFAFA] py-1 px-2">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center">
                            <Package className="w-6 h-6 mr-2 text-indigo-500" /> Form Submissions
                        </h2>
                        <div className="df gap-2 text-[0.675rem] font-semibold ">
                        <button
                            onClick={() => setIsSubmissionModalOpen(true)}
                            className="flex items-center px-2 py-1.5 cursor-pointer rounded-lg text-indigo-600 hover:text-indigo-800 transition"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Assign New Form
                        </button>
                        <span className="df aic gap-1 flex items-center px-2 py-1 rounded-lg text-white_ cursor-pointer transition"><Filter size={14}/>Filter</span>
                        </div>
                    </div>

                    {/* Filtered bar */}
                    <div className="dfL dn jcsb wfp text-[0.675rem] font500 px-2 py-1.5 bg-white">
                        <div className="df aic gap-2 ">
                            <div className="pdx05 pdy01 border border-[skyblue] bdrds bg-white"><span>Total Submission : 12</span></div>
                            <div className="pdx05 pdy01 border border-gray-300 bdrds bg-white"><span>Total Reviewing : 22</span></div>
                        </div><div>View Chat</div></div>
                    <SubmissionTable
                        submissions={submissions}
                        openDetailsModal={handleOpenDetailsModal}
                    />
                </>
            );
        } else if (activeTab === 'Templates') {
            return (
                <>
                    <div className="flex justify-between items-center bg-white py-1 px-2">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center">
                            <LayoutList className="w-6 h-6 mr-2 text-indigo-500" /> Form Templates ({templates.length})
                        </h2>
                        <button
                            onClick={() => setIsTemplateModalOpen(true)}
                            className="flex items-center px-2 py-1.5 text-[0.675rem] font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Create Template
                        </button>
                    </div>
                    <TemplateTable
                        templates={templates}
                        openSubmissionModal={setIsSubmissionModalOpen}
                    />
                </>
            );
        }
    };

    return (
        <div className="df fd-c hfp">
            <Seller_Page_Header pageTitle="Form Management" buttons={[<TabButton name="Submissions" icon={Package} active={activeTab === 'Submissions'} onClick={() => setActiveTab('Submissions')} />,
            <TabButton name="Templates" icon={LayoutList} active={activeTab === 'Templates'} onClick={() => setActiveTab('Templates')} />]} />

            <div className="fx1 font-sans">
                <header className="mb-8 dn">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Form Manager Dashboard (Mock Data)</h1>
                    <div className="flex justify-between items-center">
                        <p className="text-md text-gray-600">
                            Using local state initialized with static mock data. Changes will not persist on refresh.
                        </p>
                        <div className="text-xs text-green-500 bg-green-100 py-1 px-3 rounded-full font-mono shadow-inner">
                            <UserCircle className="w-3 h-3 inline mr-1" /> Mock User: {MOCK_USER_ID}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="">
                    {renderContent()}
                </main>

                {/* Modals */}
                <TemplateCreationModal
                    setTemplates={setTemplates}
                    isModalOpen={isTemplateModalOpen}
                    setIsModalOpen={setIsTemplateModalOpen}
                />
                <SubmissionCreationModal
                    setSubmissions={setSubmissions}
                    templates={templates}
                    isModalOpen={isSubmissionModalOpen}
                    setIsModalOpen={setIsSubmissionModalOpen}
                />
                <SubmissionDetailsModal
                    submission={selectedSubmission}
                    isModalOpen={isDetailsModalOpen}
                    setIsModalOpen={handleCloseDetailsModal}
                    templates={templates}
                    setSubmissions={setSubmissions}
                />
            </div>
        </div>

    );
};

const TabButton = ({ name, icon: Icon, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center py-0.5 border bdrds px-2 text-[0.775rem] font500 transition ${active
                ? 'xfg border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-300'
            }`}
    >
        <Icon className="w-4 h-4 mr-2" />
        {name}
    </button>
);
