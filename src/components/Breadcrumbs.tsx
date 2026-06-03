// ──────────────────────────────────────────────
// Breadcrumbs — navigation path με links
// ──────────────────────────────────────────────
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <span key={item.to} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">/</span>}
          <Link
            to={item.to}
            className="text-emerald-700 hover:text-emerald-800 transition-colors hover:underline"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
