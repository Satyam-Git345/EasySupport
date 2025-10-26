import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Search,Filter, SortDesc } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { RootState } from "../store";
import type { Ticket } from "../types";
import TicketCard from "../components/TicketCard";

export default function TicketsList() {
  const ITEMS_PER_PAGE = 10;
  // extract tickets from redux state 
  const tickets = useSelector((s: RootState) => s.tickets.list);
  

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Open" | "In Progress" | "Resolved"
  >("All");
  const [sort, setSort] = useState<"date" | "priority">("date");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("searchquery") || "";
    setSearchQuery(searchParam);
  }, [location.search]);

  const sortByPriority = (a: Ticket, b: Ticket): number => {
    const priorityOrder: Record<Ticket["priority"], number> = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };

  const filtered = useMemo(() => {
    let out = tickets.slice();
    //filter that run when user select status
    if (statusFilter !== "All")
      out = out.filter((t) => t.status === statusFilter);
    //search logic for search input that apperaed in header 
    if (searchQuery)
      out = out.filter(
        (t) =>
          t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||  t.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    // sort data by priority  
    if (sort === "priority") out.sort(sortByPriority);
    //sort by newest record(ticket)
    else
      out.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return out;
  }, [tickets, statusFilter, sort, searchQuery]);

  const visibleTickets = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount]
  );
  const hasMore = displayCount < filtered.length;

  const loadMore = useCallback(() => {
    if (hasMore) setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, [hasMore]);
 
  //infinite scroll logic 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loadMore]);
  
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [statusFilter, sort, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
  
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="text-indigo-600 text-sm font-medium"
            >
              {isFiltersOpen ? "Hide" : "Show"}
            </button>
          </div>

          <div
            className={`${
              isFiltersOpen ? "block" : "hidden"
            } lg:block space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4`}
          >
            {/* status filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* sort filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="date">Newest First</option>
                  <option value="priority">Priority</option>
                </select>
                <SortDesc className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* clear all filters */}
            {(statusFilter !== "All" || sort !== "date" || searchQuery) && (
              <div className="lg:flex-1 flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter("All");
                    setSort("date");
                    setSearchQuery("");
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* show initial tickets  */}
        {visibleTickets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {visibleTickets.map((t) => (
                <TicketCard key={t.id} ticket={t} />
              ))}
            </div>

            {/*loder see when infinite loading */}
            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">
                    Loading more tickets...
                  </span>
                </div>
              </div>
            )}

            {/* message to show if user reached end of lisk of tickets */}
            {!hasMore && filtered.length > ITEMS_PER_PAGE && (
              <div className="text-center py-8">
                <p className="text-slate-500 text-sm">
                  You've reached the end of the list
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No tickets found
              </h3>
              <p className="text-slate-600 mb-6">
                {searchQuery || statusFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first ticket"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
