import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl bg-white text-black">
      <h1 className="text-4xl font-bold mb-8 border-b-4 border-primary pb-4">Terms of Service</h1>
      
      <div className="space-y-8 text-gray-900 font-medium leading-relaxed">
        <p className="font-bold">By accessing HIND NATION NEWS, you agree to these terms.</p>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-black">1. Content Usage</h2>
          <p className="text-gray-900">All content published on this portal is the intellectual property of HIND NATION NEWS. Unauthorized reproduction is strictly prohibited.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4 uppercase text-black">2. User Conduct</h2>
          <p className="text-gray-900">Users must act responsibly when using our platform and must not engage in any activity that disrupts our services.</p>
        </section>
      </div>
    </div>
  );
}
