
import { Gift, Clock, ShieldCheck, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: Gift, title: "Premium Quality", desc: "Handcrafted with love" },
    { icon: Clock, title: "Fast Delivery", desc: "Within 24 hours" },
    { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected" },
    { icon: Heart, title: "Special Care", desc: "Perfect packaging" }
  ];

  return (
    <div className="bg-[#f8f8f8] py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-4 p-6 rounded-lg bg-white shadow-lg">
            <feature.icon className="w-8 h-8 text-[#FF6F61]" />
            <div>
              <h3 className="font-semibold text-[#333]">{feature.title}</h3>
              <p className="text-[#666]">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;