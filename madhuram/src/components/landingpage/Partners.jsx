import { motion } from "framer-motion";

const partners = [
  { name: 'Partner 4', logo: './images/kisspng.png' },
  { name: 'Partner 5', logo: './images/m&m.png' },
  { name: 'Partner 1', logo: './images/mars.png' },
  { name: 'Partner 2', logo: './images/reeses.png' },
  { name: 'Partner 3', logo: './images/twix.png' },
  { name: 'Partner 4', logo: './images/cadbury.png' },
];

const Partners = () => {
  return (
    <section id="partners" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#333] mb-4">Our Partners</h2>
          <p className="text-[#666]">Trusted by the best in the industry</p>
        </div>

        {/* Marquee Container */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-40%"], // Move from 0% to -100%
            }}
            transition={{
              duration: 40, // Adjust duration for speed
              repeat: Infinity, // Infinite loop
              ease: "linear", // Smooth linear motion
            }}
          >
            {/* First Set of Logos */}
            {partners.map((partner, index) => (
              <div key={index} className="mx-9">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain" // Increased size to h-16
                />
              </div>
            ))}

            {/* Duplicate Set of Logos for Infinite Loop */}
            {partners.map((partner, index) => (
              <div key={`duplicate-${index}`} className="mx-9">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain" // Increased size to h-16
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;