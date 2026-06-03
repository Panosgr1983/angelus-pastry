// ──────────────────────────────────────────────
// Reviews — Google κριτικές πελατών
// ──────────────────────────────────────────────
import { Quote, Star } from 'lucide-react';
import { reviews } from '../data/siteData';

// Component για εμφάνιση αστεριών
function Stars({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`${className} fill-yellow-400 text-yellow-400`} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            Κριτικές Google
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Τι Λένε οι Πελάτες μας</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Stars className="w-6 h-6" />
            <span className="text-3xl font-bold text-gray-900">4,9</span>
            <span className="text-gray-500 text-sm">(138 αξιολογήσεις)</span>
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
              className="h-6 w-6 object-contain ml-1"
            />
          </div>
        </div>

        {/* Grid κριτικών */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article key={review.name} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 relative flex flex-col">
              <Quote className="w-8 h-8 text-emerald-200 mb-3 shrink-0" />
              <p className="text-gray-700 leading-relaxed text-sm flex-1 mb-5">&quot;{review.text}&quot;</p>
              <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    {review.guide && <span className="text-xs text-emerald-700 font-medium">Τοπικός Οδηγός</span>}
                    <span className="text-xs text-gray-400">{review.time}</span>
                  </div>
                </div>
                <Stars />
              </div>
            </article>
          ))}
        </div>

        {/* Link προς Google reviews */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?q=ANGELUS+Pastry+%26+Bakery+%CE%9A%CF%81%CE%B9%CF%84%CE%B9%CE%BA%CE%AD%CF%82"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-700 text-emerald-700 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
          >
            Δείτε όλες τις κριτικές στο Google
          </a>
        </div>
      </div>
    </section>
  );
}
