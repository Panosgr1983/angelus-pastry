import { ArrowRight, Award, Truck, Package, HeartHandshake, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { B2BForm } from '../components/B2BForm';
import { b2bBenefits, b2bSteps, b2bCategories } from '../data/b2bData';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={28} />,
  Truck: <Truck size={28} />,
  Package: <Package size={28} />,
  HeartHandshake: <HeartHandshake size={28} />,
};

export function B2BPage() {
  return (
    <>
      <SEO
        title="Χονδρική Συνεργασία"
        description="Γίνετε συνεργάτης χονδρικής του Angelus Pastry & Bakery. Φρέσκα χειροποίητα προϊόντα για καφέ, εστιατόρια και ξενοδοχεία στο Γαλάτσι και την Αθήνα."
        canonical="/xondriki"
      />

      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(/images/how-to-start-a-bakery.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 to-emerald-800/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-emerald-600/50 backdrop-blur-sm text-emerald-100 rounded-full text-sm font-medium mb-6 border border-emerald-400/30">
            B2B — Χονδρική Συνεργασία
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Γίνε Συνεργάτης
            <br />
            <span className="text-emerald-300">του Angelus</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            Φρεσκάδα και ποιότητα για την επιχείρησή σας. Χειροποίητα προϊόντα,
            συνεπείς παραδόσεις, μακροχρόνια συνεργασία.
          </p>
          <a
            href="#b2b-form"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Εκδήλωση Ενδιαφέροντος
            <ArrowRight size={22} />
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              Οφέλη Συνεργασίας
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Γιατί να Συνεργαστείτε μαζί μας
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Το Angelus είναι ο αξιόπιστος συνεργάτης που χρειάζεται η επιχείρησή σας
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {b2bBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-5 text-emerald-700">
                  {iconMap[benefit.icon]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              Η Γκάμα μας
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Προϊόντα για Χονδρική
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Πάνω από 130 χειροποίητα προϊόντα σε 13 κατηγορίες — ό,τι χρειάζεστε από έναν προμηθευτή
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {b2bCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-md"
              >
                <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-3 text-emerald-700 group-hover:bg-emerald-300 transition-colors">
                  <Package size={22} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">Δείτε όλες τις κατηγορίες και τα προϊόντα μας</p>
            <Link
              to="/#products"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold transition-colors"
            >
              Όλα τα Προϊόντα <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              Διαδικασία
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Πώς Δουλεύει
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Τρία απλά βήματα για να ξεκινήσει η συνεργασία μας
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {b2bSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < b2bSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-emerald-300" />
                )}
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center relative z-10">
                  <div className="w-16 h-16 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Form Section */}
      <section id="b2b-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              Φόρμα Ενδιαφέροντος
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ξεκινήστε τη Συνεργασία
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό
            </p>
          </div>

          <B2BForm />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ή προτιμάτε τηλεφωνική επικοινωνία;
          </h2>
          <p className="text-emerald-200 text-lg mb-6">
            Καλέστε μας απευθείας και θα συζητήσουμε τις ανάγκες σας
          </p>
          <a
            href="tel:+302114180215"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold py-4 px-10 rounded-xl text-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg"
          >
            <Phone size={22} />
            21 1418 0215
          </a>
          <p className="text-emerald-300 text-sm mt-4">
            Δευτέρα – Σάββατο: 06:30 – 20:30 &nbsp;|&nbsp; Κυριακή: 08:00 – 15:00
          </p>
        </div>
      </section>
    </>
  );
}
