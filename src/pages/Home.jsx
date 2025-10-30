import { useState, useEffect, useCallback } from "react";
import { Heart, BookOpen, Trash2, ChevronLeft, ChevronRight, Library } from "lucide-react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

export default function Home() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [lastQuery, setLastQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchBooks = useCallback(
    async (query, currentPage = page) => {
      if (!query) return;
      setLoading(true);
      setError("");
      setLastQuery(query);

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?title=${query}&page=${currentPage}`
        );
        const data = await res.json();

        if (!data.docs || data.docs.length === 0) {
          setError("No books found. Try a different title.");
        }

        setBooks(data.docs.slice(0, 20));
        setTotalResults(data.numFound || 0);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    if (lastQuery) {
      fetchBooks(lastQuery, 1);
    }
  }, [fetchBooks, lastQuery]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (lastQuery) {
      fetchBooks(lastQuery, page);
    }
  }, [lastQuery, page, fetchBooks]);

  const toggleFavorite = (book) => {
    const exists = favorites.some((fav) => fav.key === book.key);
    const updated = exists
      ? favorites.filter((fav) => fav.key !== book.key)
      : [...favorites, book];
    setFavorites(updated);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const displayedBooks = showFavorites ? favorites : books;

  return (
    <div className="min-h-screen pb-12">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                <Library size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Book Finder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover millions of books from the Open Library collection
            </p>
          </div>

          <SearchBar
            onSearch={(query) => {
              setPage(1);
              fetchBooks(query, 1);
            }}
            defaultQuery={lastQuery}
          />

          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                showFavorites
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {showFavorites ? (
                <>
                  <BookOpen size={20} />
                  <span>All Books</span>
                </>
              ) : (
                <>
                  <Heart size={20} />
                  <span>Favorites ({favorites.length})</span>
                </>
              )}
            </button>

            {showFavorites && favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Trash2 size={20} />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && <Loader />}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 dark:text-red-400 text-lg font-medium">{error}</p>
          </div>
        )}

        {!showFavorites && totalResults > 0 && !loading && (
          <div className="text-center mb-6">
            <span className="inline-block px-6 py-2 bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-cyan-400 rounded-full font-medium">
              {totalResults.toLocaleString()} results found
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedBooks.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={favorites.some((fav) => fav.key === book.key)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {!loading && displayedBooks.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="mb-4">
              {showFavorites ? (
                <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-700" />
              ) : (
                <BookOpen size={64} className="mx-auto text-gray-300 dark:text-gray-700" />
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {showFavorites
                ? "No favorite books yet. Start adding some!"
                : "Search for a book to get started"}
            </p>
          </div>
        )}

        {!showFavorites && books.length > 0 && !loading && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg">
              Page {page}
            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
