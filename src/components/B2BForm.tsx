import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import {
  businessTypes,
  monthlyVolumes,
  b2bCategories,
  FORM_ENDPOINT,
} from '../data/b2bData';

interface FormData {
  company: string;
  businessType: string;
  name: string;
  phone: string;
  email: string;
  vat: string;
  volume: string;
  categories: string[];
  message: string;
  consent: boolean;
}

const initialForm: FormData = {
  company: '',
  businessType: '',
  name: '',
  phone: '',
  email: '',
  vat: '',
  volume: '',
  categories: [],
  message: '',
  consent: false,
};

export function B2BForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (!form.company.trim()) errs.company = 'Απαιτείται η επωνυμία';
    if (!form.businessType) errs.businessType = 'Επιλέξτε τύπο επιχείρησης';
    if (!form.name.trim()) errs.name = 'Απαιτείται το όνομα';
    if (!form.phone.trim()) errs.phone = 'Απαιτείται το τηλέφωνο';
    if (!form.email.trim()) errs.email = 'Απαιτείται το email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Μη έγκυρο email';
    if (!form.consent) errs.consent = 'Πρέπει να συμφωνείτε με την πολιτική απορρήτου';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: form.company,
          businessType: form.businessType,
          name: form.name,
          phone: form.phone,
          email: form.email,
          vat: form.vat,
          volume: form.volume,
          categories: form.categories.join(', '),
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const toggleCategory = (id: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 rounded-2xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-emerald-900 mb-2">Το αίτημα σας εστάλη!</h3>
        <p className="text-emerald-700">
          Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό. Ευχαριστούμε για το ενδιαφέρον σας!
        </p>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900`;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Επωνυμία Επιχείρησης *</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass('company')} />
          {errors.company && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.company}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Τύπος Επιχείρησης *</label>
          <select value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} className={inputClass('businessType')}>
            <option value="">Επιλέξτε...</option>
            {businessTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
          {errors.businessType && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.businessType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ονοματεπώνυμο *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
          {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Τηλέφωνο *</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} />
          {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />
          {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">ΑΦΜ</label>
          <input type="text" value={form.vat} onChange={(e) => setForm({ ...form, vat: e.target.value })} className={inputClass('vat')} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Εκτιμώμενη Μηνιαία Αξία</label>
          <select value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className={inputClass('volume')}>
            <option value="">Επιλέξτε...</option>
            {monthlyVolumes.map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Επιθυμητές Κατηγορίες</label>
        <div className="flex flex-wrap gap-2">
          {b2bCategories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                form.categories.includes(cat.id)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Μήνυμα / Σχόλια</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass('message')}
          placeholder="Γράψτε ό,τι επιπλέον θέλετε να μας πείτε..."
        />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-gray-600">
            Συμφωνώ με την{' '}
            <a href="/gdpr" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-800">
              Πολιτική Απορρήτου
            </a>{' '}
            και συναινώ στην επεξεργασία των στοιχείων μου για την εξυπηρέτηση του αιτήματος. *
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-50 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          Υπήρξε ένα σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε τηλεφωνικά.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
      >
        {status === 'sending' ? (
          <><Loader className="animate-spin" size={22} /> Αποστολή...</>
        ) : (
          <><Send size={20} /> Αποστολή Αιτήματος</>
        )}
      </button>
    </form>
  );
}
