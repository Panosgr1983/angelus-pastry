// ──────────────────────────────────────────────
// About — ιστορία, φωτογραφίες καταστήματος, stats
// ──────────────────────────────────────────────
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Award, Clock, Heart } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

// Φωτογραφίες καταστήματος για το carousel
const storeImages = [
  'https://res.cloudinary.com/duvtwanvc/image/upload/v1779832053/angelus/katastima-1.png',
  'https://res.cloudinary.com/duvtwanvc/image/upload/v1779832057/angelus/complete_logo.jpg',
  'https://res.cloudinary.com/duvtwanvc/image/upload/angelus/about/about-01.jpg',
  'https://res.cloudinary.com/duvtwanvc/image/upload/angelus/about/about-02.jpg',
  'https://res.cloudinary.com/duvtwanvc/image/upload/angelus/about/about-03.jpg',
];

export function About() {
  const [activeImage, setActiveImage] = useState(0);

  // Auto-rotate images κάθε 4 δευτερόλεπτα
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % storeImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side — image carousel */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-200 rounded-3xl transform -rotate-6"></div>
            <div className="relative rounded-3xl shadow-2xl w-full h-[500px] overflow-hidden">
              {storeImages.map((image, index) => (
                <OptimizedImage
                  key={image}
                  src={image}
                  alt={index === 0 ? 'Ο φούρνος και το κατάστημα του Angelus Bakery στο Γαλάτσι' : index === 1 ? 'Angelus Pastry & Bakery - Επίσημο λογότυπο' : `Χειροποίητα προϊόντα από τον φούρνο Angelus στο Γαλάτσι ${index + 1}`}
                  width={1200}
                  height={500}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    index === activeImage ? 'opacity-100' : 'opacity-0'
                  }`}
                  showBlur={false}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveImage((prev) => (prev - 1 + storeImages.length) % storeImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:bg-white transition-all"
              aria-label="Προηγούμενη εικόνα"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setActiveImage((prev) => (prev + 1) % storeImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:bg-white transition-all"
              aria-label="Επόμενη εικόνα"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {storeImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeImage ? 'w-6 bg-emerald-600' : 'w-2 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Εικόνα καταστήματος ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right side — content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              Η Ιστορία μας
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Παράδοση & Ποιότητα
              <span className="block text-emerald-700 mt-2">Από το 2022</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Το Angelus Pastry & Bakery ξεκίνησε το ταξίδι του το 2022 στο
              Γαλάτσι με ένα όνειρο: να φέρνει στους πελάτες μας την αυθεντική γεύση
              της παραδοσιακής ελληνικής αρτοποιίας και ζαχαροπλαστικής με σύγχρονες
              τεχνικές και premium υλικά.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Κάθε μέρα ξυπνάμε νωρίς για να ζυμώσουμε με τα χέρια μας το ψωμί και να
              δημιουργήσουμε τα χειροποίητα γλυκά μας, χρησιμοποιώντας μόνο τις καλύτερες
              πρώτες ύλες και οικογενειακές συνταγές που κρατάμε για γενιές.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                  <Users className="text-emerald-700" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">10,000+</p>
                <p className="text-sm text-gray-600">Ευχαριστημένοι Πελάτες</p>
              </div>

              <div className="space-y-2 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                  <Award className="text-emerald-700" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">50+</p>
                <p className="text-sm text-gray-600">Είδη Προϊόντων</p>
              </div>

              <div className="space-y-2 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                  <Clock className="text-emerald-700" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">365</p>
                <p className="text-sm text-gray-600">Μέρες το Χρόνο</p>
              </div>

              <div className="space-y-2 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                  <Heart className="text-emerald-700" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">100%</p>
                <p className="text-sm text-gray-600">Χειροποίητα</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
