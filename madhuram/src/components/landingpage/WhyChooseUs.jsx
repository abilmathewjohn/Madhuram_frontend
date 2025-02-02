import { Heart, Clock, Gift } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="relative py-16 bg-gradient-to-r from-[#dabfb3] via-[#ae8474] to-[#db9286]">
      <div className="absolute inset-0 bg-[url('/images/hero-bg2.jpg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-8 text-[#ce8628]">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[ 
            { icon: Heart, title: "Premium Quality", desc: "Handcrafted with the finest ingredients." },
            { icon: Clock, title: "Fast Delivery", desc: "Guaranteed on-time delivery." },
            { icon: Gift, title: "Perfect Gifting", desc: "Elegant packaging for every occasion." }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white/10 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <item.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#db9286]">{item.title}</h3>
              <p className="text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
