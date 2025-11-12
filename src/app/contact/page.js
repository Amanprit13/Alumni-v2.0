'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; 

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ show: false, message: '' });

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email address is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid.";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        // Simulate a network request
        setTimeout(() => {
            setLoading(false);
            setModal({ show: true, message: "Your message has been sent successfully!" });
            setFormData({ name: '', email: '', message: '' });
        }, 2000);
    };

    const handleModalClose = () => {
        setModal({ show: false, message: '' });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            {modal.show && (
                <div className="fixed inset-0 bg-gradient-to-r from-blue-900 to-indigo-950 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-blue-500 max-w-sm w-full transform transition-all duration-300 scale-95">
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-800">{modal.message}</p>
                            <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full max-w-6xl mx-auto my-16 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white">
                
                {/* Left Panel - Contact Info */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-8 lg:p-12 text-white flex-1 relative overflow-hidden flex flex-col justify-between rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                            Let's Talk About <br className="hidden sm:inline" /> Your Project
                        </h2>
                        <p className="text-gray-300 text-lg sm:text-xl">
                            We're here to help and answer any questions you may have. We look forward to hearing from you.
                        </p>
                        <ul className="mt-8 space-y-4">
                            
                            <li className="flex items-start gap-3">
                                <Mail className="w-6 h-6 text-amber-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-white">Email</h4>
                                    <a href="mailto:hello@example.com" className="text-amber-400 hover:underline transition-colors">hello@example.com</a>
                                </div>
                            </li>
                            
                            <li className="flex items-start gap-3">
                                <Phone className="w-6 h-6 text-amber-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-white">Phone</h4>
                                    <a href="tel:+1234567890" className="text-amber-400 hover:underline transition-colors">+1 (234) 567-890</a>
                                </div>
                            </li>
                            
                            <li className="flex items-start gap-3">
                                <MapPin className="w-6 h-6 text-amber-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-white">Address</h4>
                                    <a href="https://maps.google.com/?q=123+Creative+Blvd,+Suite+45,+CA+90210" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline transition-colors">123 Creative Blvd, Suite 45, CA 90210</a>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                
                {/* Right Panel - Contact Form (UPDATED) */}
                <div className="flex-1 p-8 lg:p-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Get in Touch</h2>
                    <p className="text-lg text-gray-600 mb-8">We'd love to hear from you. Please fill out the form below.</p>
                    {/* 💡 UPDATED: Increased vertical spacing between fields to space-y-8 */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            {/* 💡 UPDATED: Larger label text and more margin */}
                            <label htmlFor="name" className="block text-base font-semibold text-gray-800 mb-2">Name</label>
                            {/* 💡 UPDATED: Added padding (py-3 px-4) and larger text size (text-base) */}
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors py-3 px-4 text-base" />
                            {errors.name && <p className="mt-2 text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            {/* 💡 UPDATED: Larger label text and more margin */}
                            <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-2">Email</label>
                            {/* 💡 UPDATED: Added padding (py-3 px-4) and larger text size (text-base) */}
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors py-3 px-4 text-base" />
                            {errors.email && <p className="mt-2 text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            {/* 💡 UPDATED: Larger label text and more margin */}
                            <label htmlFor="message" className="block text-base font-semibold text-gray-800 mb-2">Message</label>
                            {/* 💡 UPDATED: Added padding (py-3 px-4) and larger text size (text-base) */}
                            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors py-3 px-4 text-base"></textarea>
                            {errors.message && <p className="mt-2 text-red-500 text-sm">{errors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-900 to-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'transform active:scale-95'}`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;