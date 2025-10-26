import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "../store/ticketsSlice";
import type { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  FileText, 
  MessageSquare, 
  AlertCircle,
  Plus,
  X,
  ArrowLeft
} from "lucide-react";

export default function CreateTicket() {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  //initial form values
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    title: "",
    description: "",
    priority: "Medium",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  //validation to each form field to show proper error message
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customerName.trim()) e.customerName = "Customer name is required";
    if (!form.title.trim()) e.title = "Title is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  
  // function that sun and dispatch action and pass payload to add ticket with given values by user
  const submit = () => {
    if (!validate()) return;
    dispatch(
      addTicket({
        customerName: form.customerName,
        email: form.email,
        title: form.title,
        description: form.description,
        priority: form.priority as any,
        status: "Open",
      })
    );
    nav("/");
  };
 
  //set proper color to show priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      case "Medium":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300";
      case "Low":
        return "border-gray-500 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300";
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => nav("/")}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Create New Ticket
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Fill in the details below to create a support ticket
              </p>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* customer name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                Customer Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter customer name"
                value={form.customerName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customerName: e.target.value }))
                }
                className={`w-full rounded-lg border ${
                  errors.customerName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                } bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 transition-colors`}
              />
              {errors.customerName && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.customerName}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email Address
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="customer@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={`w-full rounded-lg border ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                } bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 transition-colors`}
              />
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                Ticket Title
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Brief summary of the issue"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={`w-full rounded-lg border ${
                  errors.title
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                } bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 transition-colors`}
              />
              {errors.title && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.title}
                </div>
              )}
            </div>

       
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Provide detailed information about the issue..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={5}
                className={`w-full rounded-lg border ${
                  errors.description
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                } bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 transition-colors resize-none`}
              />
              {errors.description && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.description}
                </div>
              )}
            </div>

     
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Low", "Medium", "High"].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, priority }))}
                    className={`relative rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                      form.priority === priority
                        ? getPriorityColor(priority) + " shadow-sm"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    {form.priority === priority && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-current rounded-full" />
                    )}
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>

       
          <div className="px-6 sm:px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => nav("/")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}