import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { CirclePlus } from "lucide-react";

export default function Header() {
  const [searchquery, setSearchquery] = useState("");
  //call debounce(custom hook that use for some deley while searching that recieve search query and deley time in seconds)
  const debounced = useDebounce(searchquery,1000);
  const navigate = useNavigate();
  const location = useLocation();
  
  //read and pass seach query in this(header) component
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (debounced) params.set("searchquery", debounced);
    else params.delete("searchquery");
    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  }, [debounced]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3 md:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-3 group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
            <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hidden sm:block">
              Easy Support
            </span>
          </Link>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                value={searchquery}
                onChange={(e) => setSearchquery(e.target.value)}
                placeholder="Search by customer name,email or title"
                className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 pl-11 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-20 outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/tickets/new"
              className="px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 dark:from-indigo-500 dark:to-indigo-600 dark:hover:from-indigo-600 dark:hover:to-indigo-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-sm md:text-base"
            >
               <CirclePlus />
              <span className="hidden sm:inline">New Ticket</span>
            </Link>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={searchquery}
              onChange={(e) => setSearchquery(e.target.value)}
              placeholder="Search by customer or title"
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 pl-11 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-20 outline-none transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
