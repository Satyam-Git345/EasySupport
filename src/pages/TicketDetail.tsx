import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowLeft,
  Mail,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Send,
  Save,
  Trash2,
} from "lucide-react";
import type { RootState, AppDispatch } from "../store";
import { updateTicket, addComment, deleteTicket } from "../store/ticketsSlice";

export default function TicketDetail() {
  const { id } = useParams();
  // find ticket by id that passed by ticketList component
  const ticket = useSelector((s: RootState) =>
    s.tickets.list.find((t) => t.id === Number(id))
  );
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  //set initaial state
  const [status, setStatus] = useState(ticket?.status ?? "Open");
  const [priority, setPriority] = useState(ticket?.priority ?? "Low");
  const [comment, setComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // error handeling when no ticket found 
  if (!ticket)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 mb-4">Ticket not found</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  // dispatch action and pass payload to update the ticket with changes
  const SaveUpdatedTicket = () =>
    dispatch(updateTicket({ id: ticket.id, changes: { status, priority } }));
  // dispach action to add comment in perticuler ticket in array format
  const submitComment = () => {
    if (!comment.trim()) return;
    dispatch(
      addComment({
        id: ticket.id,
        comment: { user: "Support Agent", text: comment },
      })
    );
    setComment("");
  };
  // dispatch action to delete ticket and navigate to home page
  const handleDeleteTicket = () => {
    dispatch(deleteTicket(ticket.id));
    nav("/");
  };
  
  //define proper status color to show status of of tickets
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
   
  //define priority color based on priority to show priority 
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
   
  //handile proper status icons to show status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                {ticket.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-mono">#{ticket.id}</span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {getStatusIcon(ticket.status)}
                  {ticket.status}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority} Priority
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete Ticket</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Customer Info */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Customer
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {ticket.customerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {ticket.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {ticket.description}
            </p>
          </div>

          {/* Actions */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Update Ticket
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:border-indigo-400 transition-colors"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:border-indigo-400 transition-colors"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button
                onClick={SaveUpdatedTicket}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>

              <button
                onClick={() =>
                  dispatch(
                    updateTicket({
                      id: ticket.id,
                      changes: { status: "Resolved" },
                    })
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Resolved
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comments
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({ticket.comments.length})
              </span>
            </div>

            {/* Comments List */}
            <div className="space-y-3 mb-4">
              {ticket.comments.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                  No comments yet. Be the first to add one!
                </p>
              ) : (
                ticket.comments.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {c.user}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {c.at ? new Date(c.at).toLocaleString() : "Just now"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                      {c.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && submitComment()}
                placeholder="Add a comment..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:border-indigo-400 transition-colors"
              />
              <button
                onClick={submitComment}
                disabled={!comment.trim()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Add Comment</span>
                <span className="sm:hidden">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Delete Ticket
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Are you sure you want to delete this ticket? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteTicket}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
