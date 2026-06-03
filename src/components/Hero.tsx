// ──────────────────────────────────────────────
// Hero — carousel fullscreen με slides
// ──────────────────────────────────────────────
import { useEffect, useState } from 'react';
import { Award, ChefHat, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

// Slides δεδομένων με εικόνες, τίτλους, subtitles
const slides = [
  {
    badge: 'Κάθε Μέρα',
    title: 'Φρέσκο Ψωμί',
    subtitle: 'Παραδοσιακές συνταγές με προζύμι και αργής ωρίμανσης',
    image: '/images/hero/slide-01.jpg',
  },
  {
    badge: 'Premium Ποιότητα',
    title: 'Χειροποίητα Γλυκά',
    subtitle: 'Τούρτες και γλυκά για κάθε περίσταση',
    image: '/images/hero/slide-02.jpg',
  },
  {
    badge: 'Μοναδικές Γεύσεις',
    title: 'Ζαχαροπλαστική',
    subtitle: 'Τάρτες και εκλαίρ με φρέσκα υλικά',
    image: '/images/hero/slide-03.jpg',
  },
  {
    badge: 'Για Όλη την Ημέρα',
    title: 'Αλμυρές Λιχουδιές',
    subtitle: 'Τυρόψωμα και ελαιόψωμα με ελληνικά υλικά',
    image: 'https://res.cloudinary.com/duvtwanvc/image/upload/v1779832055/angelus/hero-food-image.png',
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Αυτόματη εναλλαγή slides κάθε 5 δευτερόλεπτα
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const goPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <>
      <section id="hero" className="relative h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
            <OptimizedImage
              src={slide.image}
              alt={`${slide.title} από το Angelus Pastry & Bakery στο Γαλάτσι`}
              width={1600}
              height={700}
              className="w-full h-full"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'low'}
              showBlur={false}
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div
                    className={`transition-all duration-1000 delay-300 ${
                      index === activeSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="inline-block px-4 py-2 bg-emerald-600/90 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
                      {slide.badge}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="#products"
                        className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Δείτε τα Προϊόντα
                      </a>
                      <a
                        href="#contact"
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg font-medium hover:bg-white/20 transition-all"
                      >
                        Επικοινωνία
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Βέλη πλοήγησης */}
        <button
          type="button"
          onClick={goPrevious}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          aria-label="Προηγούμενη εικόνα"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          aria-label="Επόμενη εικόνα"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dots κάτω από το carousel */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`transition-all h-3 rounded-full ${
                index === activeSlide ? 'w-12 bg-emerald-600' : 'w-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Μετάβαση στο slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Διαβάθμιση στο κάτω μέρος → blend με επόμενο section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      {/* ─── Section: Φρεσκάδα ─── */}
      <section id="freshness" className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              Από το 2022
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Φρεσκάδα & Γεύση
              <span className="block text-emerald-700 mt-2">Κάθε Μέρα</span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Παραδοσιακές συνταγές, φρέσκα υλικά και αγάπη σε κάθε δημιουργία μας.
              Στο Angelus, κάθε μέρα ξεκινά με το άρωμα του φρέσκου ψωμιού και τη γεύση
              των χειροποίητων γλυκών μας.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#products"
                className="px-8 py-4 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Δείτε τα Προϊόντα μας
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-emerald-700 border-2 border-emerald-700 rounded-lg font-medium hover:bg-emerald-50 transition-all"
              >
                Επικοινωνία
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:rotate-12">
                  <ChefHat className="text-emerald-700" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">Χειροποίητα</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:rotate-12">
                  <Heart className="text-emerald-700" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">Με Αγάπη</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:rotate-12">
                  <Award className="text-emerald-700" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">Premium Ποιότητα</p>
              </div>
            </div>
          </div>

          {/* Image card με decorative rotate */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-200 rounded-3xl transform rotate-6 transition-transform duration-700 hover:-rotate-6"></div>
            <img
              src="/images/hero/slide-01.jpg"
              alt="Φρέσκο χειροποίητο ψωμί από το Angelus Bakery στο Γαλάτσι"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <p className="text-4xl font-bold text-emerald-700">3+</p>
              <p className="text-sm text-gray-600">Χρόνια Εμπειρίας</p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
