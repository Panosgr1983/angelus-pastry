// ──────────────────────────────────────────────
// Footer — categories, επικοινωνία, ωράριο
// ──────────────────────────────────────────────
import { ArrowRight, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/siteData';

// Quick links footer navigation
const footerLinks: { label: string; href: string }[] = [
  { label: 'Αρχική', href: '/' },
  { label: 'Προϊόντα', href: '/#products' },
  { label: 'Χονδρική', href: '/xondriki' },
  { label: 'Σχετικά', href: '/#about' },
  { label: 'Επικοινωνία', href: '/#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Angelus Pastry & Bakery"
                className="h-14 w-14 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h3 className="text-xl font-bold">ANGELUS</h3>
                <p className="text-emerald-300 text-xs tracking-widest">PASTRY & BAKERY</p>
              </div>
            </div>
            <p className="text-emerald-200 leading-relaxed text-sm">
              Φρεσκάδα και ποιότητα από το 2022. Κάθε μέρα φτιάχνουμε με αγάπη
              τα προϊόντα μας για εσάς.
            </p>
          </div>

          {/* Categories links */}
          <div>
            <h3 className="text-base font-bold mb-5">Κατηγορίες</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-left">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/?category=${category.id}#tabs-end`} className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors text-sm group text-left">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-base font-bold mb-5">Επικοινωνία</h3>
            <div className="space-y-3 text-emerald-200 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>Καββαδία 3 & Αρχιμήδους, Γαλάτσι 111 46</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-emerald-400" />
                <a href="tel:+302114180215" className="hover:text-white transition-colors">21 1418 0215</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-emerald-400" />
                <a href="mailto:info@angelusbakery.gr" className="hover:text-white transition-colors">info@angelusbakery.gr</a>
              </div>
            </div>
          </div>

          {/* Ωράριο */}
          <div>
            <h3 className="text-base font-bold mb-5">Ωράριο</h3>
            <div className="space-y-2 text-emerald-200 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">Δευτέρα - Παρασκευή</p>
                  <p>06:30 - 20:30</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">Σάββατο</p>
                  <p>06:30 - 20:30</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">Κυριακή</p>
                  <p>08:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — copyright + links */}
        <div className="border-t border-emerald-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-emerald-300 text-sm flex items-center gap-2">
            © {currentYear} Angelus Pastry & Bakery. Φτιαγμένο με <Heart size={16} className="text-red-400 fill-current" /> για εσάς.
          </p>
          <div className="flex items-center gap-6 text-sm text-emerald-300">
            {footerLinks.map((link) => (
              <Link key={link.label} to={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <Link to="/gdpr" className="hover:text-white transition-colors">GDPR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
