
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-[#D4A373] text-white p-3 rounded-full shadow-lg hover:bg-[#db9286] transition"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;