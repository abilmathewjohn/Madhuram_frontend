
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah M.",
    review: "The quality of sweets is exceptional! Perfect for gifting.",
    rating: 5,
    image: "/images/testimonial1.jpg"
  },
  {
    name: "John D.",
    review: "Great variety and excellent packaging. Will order again!",
    rating: 5,
    image: "/images/testimonial2.jpg"
  },
  {
    name: "Priya R.",
    review: "Authentic taste and prompt delivery. Highly recommended!",
    rating: 5,
    image: "/images/testimonial3.jpg"
  }
];

const Testimonials = () => {
  return (
    <section id="about" className="py-16 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#666] text-sm font-medium">Testimonials</span>
          <h2 className="text-3xl font-bold text-[#333] mb-4">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-medium text-[#333]">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#666]">"{testimonial.review}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;