// ──────────────────────────────────────────────
// ProductCard — κάρτα προϊόντος για grids
// ──────────────────────────────────────────────
import { Product } from '../data/siteData';
import { Link } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer h-full relative">
        <div className="relative overflow-hidden h-64">
          <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/10 transition-all duration-500 z-10" />
          <OptimizedImage
            src={product.image_url}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
            showBlur={false}
          />
          {product.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-20">
              Προτεινόμενο
            </div>
          )}
        </div>

        <div className="p-6 relative flex flex-col gap-3">
          <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover:w-full transition-all duration-500" />
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-all duration-300 transform group-hover:translate-x-1">
            {product.name}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3 flex-1">
            {product.description}
          </p>
          <span className="text-xs text-gray-400 font-medium group-hover:text-emerald-600 transition-colors pt-3 border-t border-gray-100 text-right">
            Δείτε περισσότερα →
          </span>
        </div>
      </div>
    </Link>
  );
}
