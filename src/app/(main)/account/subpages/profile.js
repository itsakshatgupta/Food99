'use client';

import React, { useState } from 'react';
import { ChevronLeft, Edit, Mail, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

export default function App() {
    const [device, setDevice] = useState('mobile');

    // A reusable "back" button component for mobile
    // Since we cannot use Next.js's Link component, we use a standard button.
    const backBtn = (
        <Link href="/account" className='df'
            onClick={() => {
                // In a real app, this would be a router back function
                console.log('Back Link clicked!');
            }}
        >
            <ChevronLeft size={24} color="#000000" />
        </Link>
    );

    return (
        <>
            <style>
                {`

          @media (min-width: 640px) {
            .page-container {
              padding: 1rem;
            }
          }

          .toggle-btn {
            margin-bottom: 1rem;
            padding: 0.5rem 1rem;
            background-color: #3b82f6;
            color: white;
            border-radius: 0.5rem;
            transition: background-color 0.15s ease-in-out;
          }
          .toggle-btn:hover {
            background-color: #2563eb;
          }

          .profile-container {
            width: 100%;
            max-width: 32rem;
          }

          .header-section {
            padding-top: 1rem;
            padding-bottom: 1rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            display: flex;
            align-items: center;
          }

          .header-section.mobile-layout {
            gap: 0.75rem;
          }
          
          .header-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #4b5563;
          }
          
          .back-btn {
            display: flex;
            padding: 0.75rem;
            border-radius: 9999px;
            background-color: #d1d5db;
            transition: background-color 0.15s ease-in-out;
          }
          .back-btn:hover {
            background-color: #9ca3af;
          }
          
          .profile-info-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            margin-bottom: 1rem;
          }
          
          .profile-picture {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            width: 4rem;
            height: 4rem;
            background-color: #edeafe;
            border: 2px solid #6476dd;
            color: #F44336;
            font-size: 1.5rem;
          }
          
          .profile-details {
            flex: 1 1 0%;
            display: flex;
            flex-direction: column;
          }
          
          .name-label {
            font-size: 0.875rem;
            color: #3b82f6;
            font-weight: 500;
          }
          
          .name-value {
            font-size: 1rem;
            font-weight: 600;
            color: #1f2937;
          }
          
          .info-card-section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          
          .info-item {
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .info-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          
          .info-label-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.25rem;
          }
          
          .info-label {
            font-size: 0.875rem;
            color: #4b5563;
            font-weight: 500;
          }
          
          .info-value {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1f2937;
            padding-left: 0.5rem;
          }
          
          .info-value.block {
            display: block;
            margin-top: 0.25rem;
          }
        `}
            </style>
            

                {/* Main Profile container, with responsive width */}
                <div className="profile-container">
                    {/* Header Section with Back Button (Mobile only) and Title */}
                              <div className="df aic jcsb pd03 pR bdb" style={{background:'white', zIndex:1}}>
                                <div className='df aic gap03'>
                    
                                <Link href="/account" className='df'><ChevronLeft size={24} color="black"/></Link>
                                <h1 className="font700 font-lg" style={{color:'black'}}>Profile</h1>
                                </div>
                                <span
                                  className="df aic mgr08"
                                  onClick={() => {
                                    setIsEditing(false);
                                    setFormState({ id: null, name: '', email: '', address: '', phone: '' });
                                    setFormError('');
                                  }}
                                >
                                  <Edit size={24} color="black"/>
                                </span>
                              </div>
                                  <div className="pd07">
                    {/* Profile Picture and Name Section */}
                    <div className="profile-info-card">
                        <span className="profile-picture">
                            AG
                        </span>
                        <div className="profile-details">
                            <span className="name-label">Name</span>
                            <span className="name-value">Akshat Gupta</span>
                        </div>
                    </div>

                    {/* User Information Card Section */}
                    <div className="info-card-section">

                        {/* Email Section */}
                        <div className="info-item">
                            <div className="info-label-container">
                                <Mail size={16} color="#6c6c6c" />
                                <span className="info-label">Email</span>
                            </div>
                            <span className="info-value">akshatguptanov@gmail.com</span>
                        </div>

                        {/* Address Section */}
                        <div className="info-item">
                            <div className="info-label-container">
                                <MapPin size={16} color="#6c6c6c" />
                                <span className="info-label">Permanent Address</span>
                            </div>
                            <span className="info-value">Manduadhi sabji mandi, varanasi</span>
                        </div>

                        {/* Phone Numbers Section */}
                        <div className="info-item">
                            <div className="info-label-container">
                                <Phone size={16} color="#6c6c6c" />
                                <span className="info-label">Phone No.</span>
                            </div>
                            <span className="info-value">+91 8881316612</span>
                            <span className="info-value block">
                                +91 9696607224
                            </span>
                        </div>

                        {/* Gender Section */}
                        <div className="info-item">
                            <div className="info-label-container">
                                <User size={16} color="#6c6c6c" />
                                <span className="info-label">Gender</span>
                            </div>
                            <span className="info-value">Male</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
