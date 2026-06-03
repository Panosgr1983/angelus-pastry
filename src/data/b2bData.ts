import { categories } from './siteData';

export interface B2BBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface B2BStep {
  step: number;
  title: string;
  description: string;
}

export const b2bBenefits: B2BBenefit[] = [
  {
    icon: 'Award',
    title: 'Ποιότητα & Συνέπεια',
    description:
      'Όλα τα προϊόντα μας παρασκευάζονται καθημερινά με παραδοσιακές μεθόδους, φυσικό προζύμι και premium υλικά. Η σταθερή ποιότητα είναι η βάση κάθε συνεργασίας.',
  },
  {
    icon: 'Truck',
    title: 'Ευέλικτη Διανομή',
    description:
      'Παραδόσεις προσαρμοσμένες στο ωράριο και τις ανάγκες της επιχείρησής σας, με συνέπεια και σεβασμό στο πρόγραμμά σας.',
  },
  {
    icon: 'Package',
    title: 'Πλούσια Γκάμα',
    description:
      'Πάνω από 130 προϊόντα σε 13 κατηγορίες — από ψωμιά και σφολιάτες μέχρι γλυκά, καφέδες και ροφήματα. Ό,τι χρειάζεστε σε έναν προμηθευτή.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Υποστήριξη & Συνεργασία',
    description:
      'Εξατομικευμένες λύσεις για κάθε επιχείρηση, με διάθεση για μακροχρόνια συνεργασία και αμοιβαία ανάπτυξη.',
  },
];

export const b2bSteps: B2BStep[] = [
  {
    step: 1,
    title: 'Εκδήλωση Ενδιαφέροντος',
    description:
      'Συμπληρώστε την παρακάτω φόρμα ή καλέστε μας στο 21 1418 0215 για να εκφράσετε το ενδιαφέρον σας.',
  },
  {
    step: 2,
    title: 'Προσωπική Επικοινωνία',
    description:
      'Θα επικοινωνήσουμε μαζί σας άμεσα για να γνωριστούμε, να συζητήσουμε τις ανάγκες σας και να κανονίσουμε δοκιμή προϊόντων.',
  },
  {
    step: 3,
    title: 'Έναρξη Συνεργασίας',
    description:
      'Αφού συμφωνήσουμε στους όρους, ξεκινάμε τις παραδόσεις φρέσκων, χειροποίητων προϊόντων στην επιχείρησή σας.',
  },
];

export const b2bCategories = categories.filter((c) =>
  ['psomia', 'sfoliates', 'sandwiches', 'glyka-atomika', 'cakes-tsourekia', 'kafedes', 'donuts-muffins', 'bares', 'voutimata'].includes(c.id),
);

export const businessTypes = [
  'Cafe / Καφετέρια',
  'Εστιατόριο / Ταβέρνα',
  'Ξενοδοχείο',
  'Αρτοποιείο / Ζαχαροπλαστείο',
  'Catering',
  'Σχολείο / Ιδιωτικός Φορέας',
  'Άλλο',
];

export const monthlyVolumes = [
  'Έως 200€',
  '200€ – 500€',
  '500€ – 1.000€',
  '1.000€+',
  'Δεν γνωρίζω ακόμα',
];

// Τα leads στέλνονται στο info@angelusbakery.gr μέσω FormSubmit (δωρεάν, χωρίς λογαριασμό)
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@angelusbakery.gr';
