import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 border-b-4 border-primary pb-4 tracking-tight text-black">About HIND NATION NEWS</h1>
      
      <div className="space-y-8 text-lg font-medium leading-relaxed text-gray-900">
        <p>
          HIND NATION NEWS is a premier digital news portal dedicated to providing accurate, unbiased, and timely news across India. 
          Led by <span className="text-primary font-bold">Lalit Shishodia</span>, we strive to bring the voice of the people to the 
          forefront of national conversation.
        </p>
        
        <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-primary shadow-sm text-black">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Our Mission</h2>
          <p className="text-gray-900">
            To present the truth without fear or favor. In an era of digital misinformation, HIND NATION NEWS stands as a 
            beacon of integrity, delivering verified reports from every corner of the nation.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mt-12 mb-6 tracking-tight text-black">The Team</h2>
        <p>
          Our team consists of veteran journalists, field reporters, and digital content creators who are passionate about 
          journalism that makes a difference. Under the leadership of Lalit Shishodia, we maintain the highest standards 
          of editorial excellence.
        </p>
      </div>
    </div>
  );
}
