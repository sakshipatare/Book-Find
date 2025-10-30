import { Heart, Calendar } from "lucide-react";

export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <button
          onClick={() => onToggleFavorite(book)}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300"
        >
          <Heart
            size={20}
            className={`transition-colors duration-300 ${
              isFavorite
                ? "fill-red-500 stroke-red-500"
                : "stroke-gray-400 hover:stroke-red-400"
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
          {book.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
          {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
        </p>
        {book.first_publish_year && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <Calendar size={14} />
            <span>{book.first_publish_year}</span>
          </div>
        )}
      </div>
    </div>
  );
}
