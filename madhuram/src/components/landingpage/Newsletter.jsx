import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <section id="contact" className="relative py-16 bg-gradient-to-r from-[#dabfb3] via-[#ae8474] to-[#db9286]">
      <div className="absolute inset-0 bg-[url('/images/hero-bg5.jpg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#ce8628] mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/80 mb-8">
            Get updates about new products, special offers, and sweet surprises!
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ce8628] text-white/80 bg-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-[#ce8628] text-white px-6 py-3 rounded-lg hover:bg-[#db9286] transition button-rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
