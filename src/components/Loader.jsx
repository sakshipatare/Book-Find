export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 dark:border-cyan-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading books...</p>
    </div>
  );
}
