

const partners = [
  { name: 'Partner 1', logo: '/logos/partner1.png' },
  { name: 'Partner 2', logo: '/logos/partner2.png' },
  { name: 'Partner 3', logo: '/logos/partner3.png' },
  { name: 'Partner 4', logo: '/logos/partner4.png' },
  { name: 'Partner 5', logo: '/logos/partner5.png' },
  { name: 'Partner 1', logo: '/logos/partner1.png' },
  { name: 'Partner 2', logo: '/logos/partner2.png' },
  { name: 'Partner 3', logo: '/logos/partner3.png' },
  { name: 'Partner 4', logo: '/logos/partner4.png' },
  { name: 'Partner 5', logo: '/logos/partner5.png' },
  { name: 'Partner 1', logo: '/logos/partner1.png' },
  { name: 'Partner 2', logo: '/logos/partner2.png' },
  { name: 'Partner 3', logo: '/logos/partner3.png' },
  { name: 'Partner 4', logo: '/logos/partner4.png' },
  { name: 'Partner 5', logo: '/logos/partner5.png' },
];

const Partners = () => {
  return (
    <section id="partners" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#333] mb-4">Our Partners</h2>
          <p className="text-[#666]">Trusted by the best in the industry</p>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {partners.map((partner, index) => (
              <div key={index} className="inline-block mx-8">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;