"use client";

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

interface ApplicationFormProps {
  jobId: string;
}

export const ApplicationForm = ({ jobId }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeLink: '',
    coverNote: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please provide a valid email';
    if (!formData.resumeLink || !/^https?:\/\/.+/.test(formData.resumeLink)) newErrors.resumeLink = 'Please provide a valid URL starting with http:// or https://';
    if (!formData.coverNote || formData.coverNote.length < 10) newErrors.coverNote = 'Cover note must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
      const token = localStorage.getItem("token");
      
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          jobId,
          ...formData
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          // Map backend validation errors (express-validator format) to our frontend errors state
          const backendErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            backendErrors[err.field] = err.message;
          });
          setErrors(backendErrors);
          throw new Error('Please fix the validation errors');
        }
        throw new Error(data.message || 'Failed to submit application');
      }

      setToast({ message: 'Application submitted successfully! We will be in touch.', type: 'success' });
      setFormData({ name: '', email: '', resumeLink: '', coverNote: '' }); // Reset form
      
    } catch (error: any) {
      setToast({ message: error.message || 'Something went wrong', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm mt-12 mb-20" id="apply-form">
      <div className="mb-8">
        <h3 className="text-2xl font-bold font-clash text-heading">Apply for this Job</h3>
        <p className="text-muted mt-2">Submit your details below and we'll get back to you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <Input 
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            required
          />
          <Input 
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            error={errors.email}
            required
          />
        </div>
        
        <div className="mb-8">
          <Input 
            label="Resume Link (Portfolio/LinkedIn/Drive)"
            name="resumeLink"
            type="url"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
            error={errors.resumeLink}
            required
          />
        </div>

        <div className="flex flex-col gap-2 relative mb-12">
          <label htmlFor="coverNote" className="font-bold text-sm text-heading font-clash">
            Cover Note <span className="text-accent-red">*</span>
          </label>
          <textarea
            id="coverNote"
            name="coverNote"
            value={formData.coverNote}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us why you are a great fit for this role..."
            className={`w-full bg-white border ${
              errors.coverNote ? 'border-accent-red focus:outline-accent-red' : 'border-border focus:outline-primary'
            } rounded-lg px-4 py-3 text-heading placeholder:text-muted/70 transition-colors resize-y`}
            required
          />
          {errors.coverNote && (
            <span className="text-xs text-accent-red font-medium mt-1 absolute -bottom-5 left-0">
              {errors.coverNote}
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <Button type="submit" size="lg" className="w-full md:w-auto" isLoading={isSubmitting}>
            Submit Application
          </Button>
        </div>
      </form>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};
