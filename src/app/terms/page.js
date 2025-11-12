"use client"; // This directive marks the component as a client component

import React from 'react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 transform transition-all duration-300 hover:scale-[1.005]">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the AlumniConnect website and services, you agree to be bound by these Terms and Conditions and all policies referenced herein. If you do not agree to all of these Terms and Conditions, do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. User Registration</h2>
            <p>
              To access certain features of the website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. User Conduct</h2>
            <p>
              You agree not to use the website for any unlawful purpose or any purpose prohibited by these Terms. You may not use the website in any manner that could damage, disable, overburden, or impair the website or interfere with any other party`'`s use and enjoyment of the website.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Do not post or transmit any material that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
              <li>Do not engage in any activity that could compromise the security of the website or its users.</li>
              <li>Do not impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Privacy Policy</h2>
            <p>
              Your use of the website is also governed by our Privacy Policy, which is incorporated into these Terms by this reference. Please review our Privacy Policy to understand our practices regarding your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of AlumniConnect or its content suppliers and is protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Disclaimers</h2>
            <p>
              {`The website and its content are provided "as is" without any warranties, express or implied. AlumniConnect does not warrant that the website will be uninterrupted or error-free.`}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Limitation of Liability</h2>
            <p>
              In no event shall AlumniConnect be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">8. Changes to Terms</h2>
            <p>
              AlumniConnect reserves the right to modify these Terms and Conditions at any time. Your continued use of the website after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">9. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">contact@alumniconnect.com</Link>.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            &larr; Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
