/* eslint-disable react/no-unescaped-entities */
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah M.",
    review: "The quality of sweets is exceptional! Perfect for gifting.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", // Local image
  },
  {
    name: "John D.",
    review: "Great variety and excellent packaging. Will order again!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww", // External image
  },
  {
    name: "Priya R.",
    review: "Authentic taste and prompt delivery. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", // Local image
  },
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
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                {/* User Image */}
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if the provided image fails to load
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
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