// ──────────────────────────────────────────────
// Contact — στοιχεία επικοινωνίας + χάρτης Google Maps
// ──────────────────────────────────────────────
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            Επικοινωνία
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ελάτε να μας Βρείτε
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Θα χαρούμε να σας δούμε στο κατάστημά μας
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Cards επικοινωνίας */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <MapPin className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Διεύθυνση</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Καββαδία 3 & Αρχιμήδους γωνία<br />
                    111 46, Γαλάτσι<br />
                    Αθήνα, Ελλάδα
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Phone className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Τηλέφωνο</h3>
                  <p className="text-gray-600">
                    <a href="tel:+302114180215" className="hover:text-emerald-700 transition-colors">
                      21 1418 0215
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Clock className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ωράριο</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Δευτέρα - Παρασκευή: 06:30 - 20:30</p>
                    <p>Σάββατο: 06:30 - 20:30</p>
                    <p>Κυριακή: 08:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Mail className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@angelusbakery.gr" className="hover:text-emerald-700 transition-colors">
                      info@angelusbakery.gr
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps iframe */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.8747384891634!2d23.752824315530424!3d38.01878797971847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a2e7f7f7f7f7%3A0x0!2zMzjCsDAxJzA3LjYiTiAyM8KwNDUnMTcuNCJF!5e0!3m2!1sel!2sgr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Χάρτης Angelus Bakery"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
