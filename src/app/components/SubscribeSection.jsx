'use client';
import React from 'react';
import { motion } from 'framer-motion'; 

/**
 * A reusable subscription section component.
 * 
 * Props:
 * - title (string): Heading text (default: "Insights Delivered")
 * - description (string): Subtext/paragraph below the heading
 * - buttonText (string): Text for the button (default: "Subscribe Now")
 * - onSubmit (function): Callback when the user clicks the button
 * - placeholder (string): Placeholder for the input (default: "Your email address")
 */
export default function SubscribeSection({
    title = "Insights Delivered",
    description = "Get the latest articles, exclusive alumni interviews, and career tips sent straight to your inbox every week.",
    buttonText = "Subscribe Now",
    placeholder = "Your professional email address",
    onSubmit = () => alert('Subscribed!'),
}) {
    const [email, setEmail] = React.useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            onSubmit(email);
            setEmail('');
        }
    };

    return (
        <motion.div
            // Framer Motion animation for entrance
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 md:p-16 bg-[#002e50] rounded-2xl shadow-2xl overflow-hidden relative">

            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            </div>

            <div className="relative text-center max-w-4xl mx-auto">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight font-serif">
                    Insights Delivered
                </h3>
                <p className="text-xl text-sky-100 mb-8 font-light">
                    Get the latest articles, exclusive alumni interviews, and career tips sent straight to your inbox every week.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input
                        type="email"
                        placeholder="Your professional email address"
                        className="w-full sm:w-80 p-3 rounded-full text-neutral-800 border-2 border-transparent focus:ring-4 focus:ring-sky-200/50 shadow-md transition-all duration-300 bg-white"
                    />
                    {/* Using standard <a> tag for the submit button */}
                    <a href="#" className="flex items-center justify-center bg-rose-500 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-rose-400 transition-colors duration-200 transform hover:scale-105">
                        Subscribe Now
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
