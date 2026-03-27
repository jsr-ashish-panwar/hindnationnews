import React from 'react';
import { Mail, Phone, MapPin, Youtube, Instagram, Twitter, Send } from 'lucide-react';
import { getSettings } from '@/lib/dataService';

export default async function ContactPage() {
  const settings = await getSettings();

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
            
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
                        <div className="mt-4 flex flex-col space-y-2">
                          <p className="text-primary font-bold text-xs uppercase tracking-widest">Office Location (GPS):</p>
                          <p className="text-black font-bold text-sm">28°40'48.4"N 77°29'22.4"E</p>
                          <a 
                            href="https://www.google.com/maps/dir/?api=1&destination=28.680111,77.489556" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary hover:text-black font-bold text-xs uppercase tracking-widest transition-colors mt-1"
                          >
                            Get Directions →
                          </a>
                        </div>
                    </div>
                  </div>

                  <div className="flex items-start bg-gray-50 p-6 border-l-4 border-primary group transition-all">
                    <div className="p-3 bg-primary text-white transition-colors rounded-lg"><Phone className="w-6 h-6" /></div>
                    <div className="ml-6 flex flex-col justify-center">
                        <h4 className="font-bold text-lg text-black group-hover:text-primary transition-colors">Phone Support</h4>
                        <p className="text-black font-bold text-lg mt-1">{settings.contactPhone}</p>
                        <p className="text-black font-bold text-lg">{settings.contactLandline || '0120-5044958'}</p>
                    </div>
                  </div>

                  <div className="flex items-start bg-gray-50 p-6 border-l-4 border-primary group transition-all">
                    <div className="p-3 bg-primary text-white transition-colors rounded-lg"><Mail className="w-6 h-6" /></div>
                    <div className="ml-6 flex flex-col justify-center">
                        <h4 className="font-bold text-lg text-black group-hover:text-primary transition-colors">Email Us</h4>
                        <p className="text-gray-900 font-medium transition-colors mt-1">{settings.contactEmail}</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 md:p-12 shadow-xl rounded-2xl border-t-8 border-primary border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-black">Send a Message</h3>
                <form 
                  className="space-y-6"
                  action={`mailto:${settings.contactEmail}`}
                  method="GET"
                  encType="text/plain"
                >
                   <input required name="subject" type="text" placeholder="Full Name / Subject" className="w-full px-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-xl font-medium" />
                   <input required name="body" type="text" placeholder="Brief Summary of Query" className="w-full px-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-xl font-medium" />
                   <textarea required name="message" rows={4} placeholder="Your Detailed Message" className="w-full px-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-xl resize-none font-medium"></textarea>
                   <button type="submit" className="w-full bg-primary text-white py-4 px-8 font-bold uppercase tracking-widest rounded-xl hover:bg-black shadow-lg transition-all flex items-center justify-center space-x-3">
                      <span>Open in Mail Client</span>
                      <Send className="w-5 h-5" />
                   </button>
                   <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">This will launch your default email app to send the message.</p>
                </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative group">
            <div className="absolute -top-6 left-12 z-20">
              <span className="bg-primary text-white px-8 py-3 text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-2xl flex items-center space-x-2 border-4 border-white">
                <MapPin className="w-4 h-4" />
                <span>Visit Our Headquarters</span>
              </span>
            </div>
            
            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white bg-white relative">
              <div className="w-full h-[550px] overflow-hidden grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d875.1432104561234!2d77.489556!3d28.680111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1916e75a747%3A0x633d45c60cff992a!2sGovindpuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201013!5e0!3m2!1sen!2sin!4v1711468200000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="scale-105 group-hover:scale-100 transition-transform duration-700"
                ></iframe>
              </div>

              {/* Floating Info Card */}
              <div className="absolute bottom-8 right-8 z-20 max-w-xs w-full">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                   <h4 className="font-black text-primary text-sm uppercase tracking-widest mb-4">Official Location</h4>
                   <p className="text-black font-bold leading-relaxed mb-6">
                     Shop No. 6F, A Block, Govindpuram, Ghaziabad, Uttar Pradesh
                   </p>
                   <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=28.680111,77.489556" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-black text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg"
                   >
                     <span>Open in Google Maps</span>
                     <Send className="w-3 h-3 rotate-45" />
                   </a>
                </div>
              </div>

              {/* Decorative Overlay for interaction prompt */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 flex items-center justify-center">
                 <div className="bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-white/20">
                    Hover to interact
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
