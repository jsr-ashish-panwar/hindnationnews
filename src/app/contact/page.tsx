import React from 'react';
import { Mail, Phone, MapPin, Youtube, Instagram, Twitter, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex-1 bg-white">
      {/* Contact Header */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get In <span className="text-black">Touch</span></h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-medium">Have a story to share or a query? We're here to listen.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Contact Info */}
            <div className="space-y-12">
               <div>
                  <h2 className="text-2xl font-bold mb-8 border-b-2 border-primary pb-2 inline-block text-black">Contact Information</h2>
                  <p className="text-gray-900 text-lg leading-relaxed mb-10 font-medium">
                    Reach out to the HIND NATION NEWS team or Lalit Shishodia directly for press inquiries, story tips, or collaborations.
                  </p>
               </div>

               <div className="space-y-8">
                  <div className="flex items-start bg-gray-50 p-6 border-l-4 border-primary group transition-all">
                    <div className="p-3 bg-primary text-white transition-colors rounded-lg"><MapPin className="w-6 h-6" /></div>
                    <div className="ml-6 flex flex-col justify-center">
                        <h4 className="font-bold text-lg text-black group-hover:text-primary transition-colors">Business Address</h4>
                        <p className="text-gray-900 font-medium transition-colors mt-2 text-sm leading-relaxed">
                          Shop No. 6F, A Block<br/>
                          Landmark: Near LG Showroom<br/>
                          Govindpuram, Ghaziabad (Gzb), Uttar Pradesh (UP)
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-gray-50 p-6 border-l-4 border-primary group transition-all">
                    <div className="p-3 bg-primary text-white transition-colors rounded-lg"><Phone className="w-6 h-6" /></div>
                    <div className="ml-6 flex flex-col justify-center">
                        <h4 className="font-bold text-lg text-black group-hover:text-primary transition-colors">Phone Support</h4>
                        <p className="text-gray-900 font-medium transition-colors mt-1">+91 99108 35426</p>
                    </div>
                  </div>

                  <div className="flex items-start bg-gray-50 p-6 border-l-4 border-primary group transition-all">
                    <div className="p-3 bg-primary text-white transition-colors rounded-lg"><Mail className="w-6 h-6" /></div>
                    <div className="ml-6 flex flex-col justify-center">
                        <h4 className="font-bold text-lg text-black group-hover:text-primary transition-colors">Email Us</h4>
                        <p className="text-gray-900 font-medium transition-colors mt-1">info@hindnationnews.com</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-white p-10 md:p-12 shadow-xl rounded-2xl border-t-8 border-primary border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-black">Send a Message</h3>
                <form className="space-y-6">
                   <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-xl font-medium" />
                   <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-xl font-medium" />
                   <textarea rows={4} placeholder="Your Message" className="w-full px-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-xl resize-none font-medium"></textarea>
                   <button className="w-full bg-primary text-white py-4 px-8 font-bold uppercase tracking-widest rounded-xl hover:bg-black shadow-lg transition-all flex items-center justify-center space-x-3">
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                   </button>
                </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
