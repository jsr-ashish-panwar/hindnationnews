import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl bg-white text-black">
      <h1 className="text-4xl font-bold mb-8 border-b-4 border-primary pb-4">Privacy Policy</h1>
      
      <div className="space-y-8 text-gray-900 font-medium leading-relaxed">
        <p className="text-sm font-bold uppercase text-gray-400">Last Updated: March 25, 2026</p>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-black">1. Information Collection</h2>
          <p className="text-gray-900">We collect information that you provide directly to us, such as when you subscribe to our newsletter or contact us through our website.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 uppercase text-black">2. Use of Information</h2>
          <p className="text-gray-900">We use the information we collect to provide, maintain, and improve our services, and to communicate with you about updates and news.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 uppercase text-black">3. Data Security</h2>
          <p className="text-gray-900">We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
        </section>
      </div>
    </div>
  );
}
