'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Edit, Trash2Icon, Plus, MoreVertical, ChevronLeft, Edit2Icon } from 'lucide-react';
import Link from 'next/link';

export default function AddressBook() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA 12345',
      phone: '555-123-4567',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, Somewhere, USA 67890',
      phone: '555-987-6543',
    },
  ]);

  const [formState, setFormState] = useState({
    id: null,
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [formError, setFormError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    if (!formState.name || !formState.email || !formState.address || !formState.phone) {
      setFormError('All fields are required.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      setAddresses(addresses.map(addr => addr.id === formState.id ? formState : addr));
      setIsEditing(false);
    } else {
      const newAddress = { ...formState, id: Date.now() };
      setAddresses([...addresses, newAddress]);
    }

    setFormState({ id: null, name: '', email: '', address: '', phone: '' });
  };

  const handleEdit = (address) => {
    setFormState(address);
    setIsEditing(true);
    setFormError('');
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter(addr => addr.id !== addressToDelete.id));
      setAddressToDelete(null);
      setShowModal(false);
    }
  };

  const handleDelete = (address) => {
    setAddressToDelete(address);
    setShowModal(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormState({ id: null, name: '', email: '', address: '', phone: '' });
    setFormError('');
  };

  return (
    <>
      <style>
        {`

          .address-form {
            background-color: white;
            padding: 2rem;
            border-radius: 1rem;
            // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
          }

          .form-header {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 1.5rem;
          }
          
          .form-grid {
            display: grid;
            gap: 1.5rem;
          }
          
          .input-group {
            display: flex;
            flex-direction: column;
          }
          
          .input-group label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #4b5563;
            margin-bottom: 0.5rem;
          }
          
          .input-group input, .input-group textarea {
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            background-color: #f9fafb;
          }
          
          .input-group input:focus, .input-group textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
          }

          .form-error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 1rem;
            text-align: center;
          }

          .form-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 2rem;
            justify-content: flex-end;
          }

          .form-actions button {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            color: white;
            transition: background-color 0.2s ease-in-out;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .form-actions .submit-btn {
            background-color: #3b82f6;
          }
          .form-actions .submit-btn:hover {
            background-color: #2563eb;
          }

          .form-actions .cancel-btn {
            background-color: #6b7280;
          }
          .form-actions .cancel-btn:hover {
            background-color: #4b5563;
          }

          .address-list {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
          }

          .address-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          .address-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          }
          
          .address-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 0.75rem;
            margin-bottom: 0.75rem;
          }
          
          .address-card-name {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1f2937;
          }
          
          .card-actions {
            display: flex;
            gap: 0.5rem;
          }

          .action-btn {
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.2s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            background:'#353339';
          }

          .action-btn:hover {
            background-color: #f3f4f6;
          }

          .card-details {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .detail-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            font-size: 0.875rem;
            color: #4b5563;
          }
          
          .detail-item .icon {
            color: #6b7280;
            flex-shrink: 0;
            margin-top: 2px;
          }
          
          .detail-item .value {
            font-weight: 500;
            color: #1f2937;
          }
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal {
            background-color: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 25rem;
          }
          
          .modal h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          
          .modal-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
          }
          
          .modal-buttons button {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: background-color 0.2s ease-in-out;
          }
          
          .modal-cancel-btn {
            background-color: #d1d5db;
            color: #1f2937;
          }
          
          .modal-cancel-btn:hover {
            background-color: #9ca3af;
          }
          
          .modal-delete-btn {
            background-color: #ef4444;
            color: white;
          }
          
          .modal-delete-btn:hover {
            background-color: #dc2626;
          }

        `}
      </style>

      <div>
          <div className="df aic jcsb pd03 pR bdb" style={{background:'white', zIndex:1}}>
            <div className='df aic gap03'>

            <Link href="/account" className='df'><ChevronLeft size={24} color="black"/></Link>
            <h1 className="font700 font-lg" style={{color:'black'}}>Address Book</h1>
            </div>
            <span
              className="df aic mgr08"
              onClick={() => {
                setIsEditing(false);
                setFormState({ id: null, name: '', email: '', address: '', phone: '' });
                setFormError('');
              }}
            >
              <Plus size={24} color="black"/>
            </span>
          </div>

          {isEditing || isNewAddress && <div className="address-form">
            <h2 className="form-header">
              {isEditing && 'Edit Address'}{isNewAddress && 'Add New Address'}
            </h2>
            {isNewAddress && <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="e.g., john.doe@example.com"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 555-123-4567"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="e.g., 123 Main St, Anytown, USA 12345"
                  ></textarea>
                </div>
              </div>
              {formError && <div className="form-error">{formError}</div>}
              <div className="form-actions">
                {isEditing && (
                  <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
                <button type="submit" className="submit-btn">
                  {isEditing ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>}
          </div>}

          <div className="address-list pd07">
            {addresses.map((address) => (
              <div key={address.id} className="bd df fd-c pd1 bdTrds bdBrds xbg">
                <div className="address-card-header">
                  <span className="address-card-name">{address.name}</span>
                  <div className="card-actions">
                    <span className="action-btn bd bdrds xfg" onClick={() => handleEdit(address)}>
                      <Edit2Icon size={16} color='blue'/>
                    </span>
                    <span className="action-btn bd bdrds xfg" onClick={() => handleDelete(address)}>
                      <Trash2Icon size={16} color='red'/>
                    </span>
                  </div>
                </div>
                <div className="card-details">
                  <div className="detail-item">
                    <Mail size={16} className="icon" />
                    <span className="value">{address.email}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} className="icon" />
                    <span className="value">{address.address}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} className="icon" />
                    <span className="value">{address.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this address?</p>
            <div className="modal-buttons">
              <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-delete-btn" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

