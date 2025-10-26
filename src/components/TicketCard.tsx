import { Link } from "react-router-dom";
import { Clock, AlertCircle, CheckCircle2, User } from "lucide-react";
import type { Ticket } from "../types";

interface TicketCardProps {
  ticket: Ticket;
  compact?: boolean;
}

export default function TicketCard({ ticket, compact = false }: TicketCardProps) {
 //status styles for showing status
  const statusConfig = {
    Open: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", icon: Clock },
    "In Progress": {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-300",
      icon: AlertCircle,
    },
    Resolved: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-300",
      icon: CheckCircle2,
    },
  };

  // priority styles to show priority
  const priorityConfig = {
    High: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-700" },
    Medium: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-300",
      border: "border-orange-200 dark:border-orange-700",
    },
    Low: {
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-700 dark:text-slate-300",
      border: "border-slate-200 dark:border-slate-700",
    },
  };

  //extract icons and styles by provided values in ticket that show in ticket detail page
  const StatusIcon = statusConfig[ticket.status].icon;
  const statusStyle = statusConfig[ticket.status];
  const priorityStyle = priorityConfig[ticket.priority];

  // Compact view f (for lists, mobile, or dashboard)
  if (compact) {
    return (
      <Link
        to={`/tickets/${ticket.id}`}
        className={`block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border-l-4 ${priorityStyle.border} transition-all duration-200 hover:-translate-y-0.5`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{ticket.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.customerName}</p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">#{ticket.id}</div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className={`inline-block px-2 py-1 rounded ${priorityStyle.bg} ${priorityStyle.text} text-xs font-medium`}>
              {ticket.priority}
            </span>
            <span className={`inline-block px-2 py-1 rounded ${statusStyle.bg} ${statusStyle.text} text-xs font-medium`}>
              {ticket.status}
            </span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(ticket.createdAt).toLocaleDateString()}
          </div>
        </div>
      </Link>
    );
  }

  // Default detailed view
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border-l-4 ${priorityStyle.border} p-5 transition-all duration-200 hover:-translate-y-1 cursor-pointer block`}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}
        >
          {ticket.priority}
        </span>
        <span
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {ticket.status}
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 text-base">
        {ticket.title}
      </h3>

      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
        <User className="w-4 h-4" />
        <span className="truncate">{ticket.customerName}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
        <span className="font-mono">#{ticket.id}</span>
        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
