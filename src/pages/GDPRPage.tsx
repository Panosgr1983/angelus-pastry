// ──────────────────────────────────────────────
// GDPRPage — Πολιτική Απορρήτου
// ──────────────────────────────────────────────
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Τμήματα της πολιτικής — data-driven rendering
const sections = [
  {
    title: '1. Εισαγωγή',
    content: 'Η επιχείρηση ANGELUS Pastry & Bakery δεσμεύεται για την προστασία των προσωπικών σας δεδομένων και τη διαφανή επεξεργασία τους σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) — Κανονισμός (ΕΕ) 2016/679 και την ισχύουσα ελληνική νομοθεσία.',
  },
  {
    title: '2. Υπεύθυνος Επεξεργασίας',
    content: `ANGELUS Pastry & Bakery
Διεύθυνση: Καββαδία 3 & Αρχιμήδους, Γαλάτσι 111 46
Τηλέφωνο: 21 1418 0215
Email: info@angelusbakery.gr`,
  },
  {
    title: '3. Ποια Δεδομένα Συλλέγουμε',
    content: `Στοιχεία επικοινωνίας: όνομα, αριθμός τηλεφώνου, email
Δεδομένα παραγγελίας: είδη προϊόντων, ποσότητες, διεύθυνση παράδοσης
Δεδομένα πλοήγησης: cookies, διεύθυνση IP, στοιχεία browser
Δεδομένα επικοινωνίας: μηνύματα μέσω φόρμας ή τηλεφώνου`,
  },
  {
    title: '4. Σκοπός και Νομική Βάση Επεξεργασίας',
    content: `Εκτέλεση παραγγελίας (νομική βάση: εκτέλεση σύμβασης)
Απάντηση σε ερωτήματα (νομική βάση: έννομο συμφέρον)
Αποστολή newsletter, εφόσον έχετε συναινέσει (νομική βάση: συγκατάθεση)
Συμμόρφωση με νομικές υποχρεώσεις (νομική βάση: νομική υποχρέωση)`,
  },
  {
    title: '5. Διατήρηση Δεδομένων',
    content: 'Διατηρούμε τα δεδομένα σας μόνο για όσο χρόνο είναι απαραίτητο. Δεδομένα παραγγελιών διατηρούνται για 5 χρόνια λόγω φορολογικών υποχρεώσεων. Δεδομένα επικοινωνίας διαγράφονται μετά από 2 χρόνια από την τελευταία επικοινωνία.',
  },
  {
    title: '6. Δικαιώματά σας',
    content: `Σύμφωνα με τον GDPR έχετε τα εξής δικαιώματα:

Δικαίωμα πρόσβασης — να γνωρίζετε ποια δεδομένα επεξεργαζόμαστε
Δικαίωμα διόρθωσης — να ζητήσετε διόρθωση ανακριβών δεδομένων
Δικαίωμα διαγραφής — να ζητήσετε τη διαγραφή των δεδομένων σας
Δικαίωμα περιορισμού επεξεργασίας
Δικαίωμα φορητότητας δεδομένων
Δικαίωμα εναντίωσης στην επεξεργασία
Δικαίωμα ανάκλησης συγκατάθεσης ανά πάσα στιγμή

Για να ασκήσετε τα δικαιώματά σας: info@angelusbakery.gr`,
  },
  {
    title: '7. Κοινοποίηση σε Τρίτους',
    content: 'Δεν πωλούμε, δεν ενοικιάζουμε και δεν κοινοποιούμε τα προσωπικά σας δεδομένα σε τρίτους, εκτός εάν αυτό απαιτείται για την εκτέλεση της παραγγελίας σας ή υπάρχει νομική υποχρέωση.',
  },
  {
    title: '8. Cookies',
    content: 'Ο ιστότοπός μας ενδέχεται να χρησιμοποιεί cookies για τη βελτίωση της εμπειρίας πλοήγησής σας. Μπορείτε να απενεργοποιήσετε τα cookies από τις ρυθμίσεις του browser σας.',
  },
  {
    title: '9. Αρχή Προστασίας Δεδομένων',
    content: `Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)
Διεύθυνση: Κηφισίας 1-3, 115 23 Αθήνα
Τηλ.: 210 6475600
Email: contact@dpa.gr
Ιστότοπος: www.dpa.gr`,
  },
  {
    title: '10. Τροποποιήσεις',
    content: 'Διατηρούμε το δικαίωμα να τροποποιούμε την παρούσα Πολιτική Απορρήτου. Οποιεσδήποτε αλλαγές θα δημοσιεύονται στην παρούσα σελίδα με ενημερωμένη ημερομηνία.',
  },
];

export function GDPRPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Πολιτική Απορρήτου | Angelus Pastry & Bakery</title>
        <meta name="description" content="Πολιτική Απορρήτου του Angelus Pastry & Bakery. Μάθετε πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα σύμφωνα με τον GDPR." />
        <link rel="canonical" href="https://angeluspastry.gr/gdpr" />
      </Helmet>
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium mb-6 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Επιστροφή στην Αρχική
        </Link>
        <div className="mt-4">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            GDPR
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Πολιτική Απορρήτου</h1>
          <p className="text-gray-500 text-sm">Τελευταία ενημέρωση: Μάιος 2026</p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
        <p className="text-emerald-800 text-sm leading-relaxed">
          Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς. Η παρούσα πολιτική εξηγεί πώς
          συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα δεδομένα σας σύμφωνα με τον GDPR (ΕΕ) 2016/679.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="border-b border-gray-100 pb-8 last:border-0">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Contact footer */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
        <p className="text-gray-600 mb-3">Για ερωτήματα σχετικά με τα προσωπικά σας δεδομένα:</p>
        <a href="mailto:info@angelusbakery.gr" className="text-emerald-700 font-semibold hover:underline">
          info@angelusbakery.gr
        </a>
        <span className="mx-3 text-gray-400">|</span>
        <a href="tel:+302114180215" className="text-emerald-700 font-semibold hover:underline">
          21 1418 0215
        </a>
      </div>
    </div>
  );
}
