import { useState, useEffect } from "react";
import { saveEnquiry } from "@/lib/mongodb";
import { User, Briefcase, Phone, Mail, MapPin, Layers, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export interface InquiryFormData {
  name: string;
  serviceType: string;
  phone: string;
  email: string;
  location: string;
  details: string;
}

const serviceTypes = [
  "Full-Stack Web Engineering",
  "iOS / Android Mobile App",
  "UI / UX Design & Prototyping",
  "Brand Identity & Guidelines",
  "Performance Marketing & SEO",
  "Supabase / Cloud Architecture",
  "Custom Full Suite",
];

interface InquiryFormProps {
  className?: string;
  initialValues?: Partial<InquiryFormData>;
  onSuccess?: () => void;
}

export function InquiryForm({ className = "", initialValues, onSuccess }: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormData>({
    name: initialValues?.name || "",
    serviceType: initialValues?.serviceType || "",
    phone: initialValues?.phone || "",
    email: initialValues?.email || "",
    location: initialValues?.location || "",
    details: initialValues?.details || "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for external estimate pre-fills
  useEffect(() => {
    const handleApplyEstimate = (e: CustomEvent<Partial<InquiryFormData>>) => {
      if (e.detail) {
        setForm((prev) => ({
          ...prev,
          ...e.detail,
        }));
      }
    };

    window.addEventListener("zyphor:apply-estimate" as any, handleApplyEstimate);
    return () => {
      window.removeEventListener("zyphor:apply-estimate" as any, handleApplyEstimate);
    };
  }, []);

  const update = (field: keyof InquiryFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const location = form.location.trim();
    const serviceType = form.serviceType.trim();
    const details = form.details.trim();

    if (!name || name.length > 100) {
      setError("Please enter your full name (max 100 characters).");
      return;
    }
    if (!serviceType) {
      setError("Please select a primary project domain.");
      return;
    }
    if (!/^[+\d][\d\s\-()]{6,20}$/.test(phone)) {
      setError("Please enter a valid phone number (e.g. +91 98765 43210).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (!location || location.length > 120) {
      setError("Please enter your location or city.");
      return;
    }

    setSubmitting(true);
    try {
      await saveEnquiry({
        data: {
          name,
          email,
          phone,
          location,
          serviceType,
          details,
        },
      });

      setSubmitted(true);
      setForm({
        name: "",
        serviceType: "",
        phone: "",
        email: "",
        location: "",
        details: "",
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("[InquiryForm] Submission error:", err);
      setError(
        err?.message ||
          "Failed to submit inquiry. Please retry or email directly at Zypherzone07@gmail.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="inquiry-form-element"
      onSubmit={handleSubmit}
      className={`card-editorial p-6 sm:p-8 md:p-10 space-y-5 rounded-2xl relative border border-white/[0.08] bg-[#121217]/90 backdrop-blur-xl ${className}`}
      noValidate
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
            Scope Discovery Request
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F5F5F7] tracking-tight mt-0.5">
            Initiate Project Blueprint
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9A9AA6] bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08] self-start sm:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
          Guaranteed 24h Response
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <User className="h-3.5 w-3.5 text-[#C8FF00]" />
            Full Name <span className="text-[#C8FF00]">*</span>
          </span>
          <input
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Alex Morgan"
            className="input-editorial"
          />
        </label>

        {/* Project Domain */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <Briefcase className="h-3.5 w-3.5 text-[#C8FF00]" />
            Primary Domain <span className="text-[#C8FF00]">*</span>
          </span>
          <select
            required
            value={form.serviceType}
            onChange={update("serviceType")}
            className="input-editorial cursor-pointer"
          >
            <option value="" disabled className="bg-[#121217] text-[#9A9AA6]">
              Select project domain...
            </option>
            {serviceTypes.map((s) => (
              <option key={s} value={s} className="bg-[#121217] text-[#F5F5F7]">
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <Phone className="h-3.5 w-3.5 text-[#C8FF00]" />
            Phone / WhatsApp <span className="text-[#C8FF00]">*</span>
          </span>
          <input
            type="tel"
            required
            maxLength={20}
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 98765 43210"
            className="input-editorial font-mono"
          />
        </label>

        {/* Email */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <Mail className="h-3.5 w-3.5 text-[#C8FF00]" />
            Work Email <span className="text-[#C8FF00]">*</span>
          </span>
          <input
            type="email"
            required
            maxLength={255}
            value={form.email}
            onChange={update("email")}
            placeholder="alex@company.com"
            className="input-editorial font-mono"
          />
        </label>
      </div>

      {/* Location */}
      <label className="block space-y-2">
        <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-[#C8FF00]" />
          Location / City <span className="text-[#C8FF00]">*</span>
        </span>
        <input
          type="text"
          required
          maxLength={120}
          value={form.location}
          onChange={update("location")}
          placeholder="e.g. San Francisco, CA / Bengaluru, IN"
          className="input-editorial"
        />
      </label>

      {/* Details */}
      <label className="block space-y-2">
        <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5 text-[#C8FF00]" />
          Technical Requirements & Scope Notes
        </span>
        <textarea
          value={form.details}
          onChange={update("details")}
          rows={4}
          placeholder="Briefly describe your product goals, desired launch timeline, target users, or paste configured estimate specs from above..."
          className="input-editorial min-h-[110px] resize-y"
        />
      </label>

      {/* Error Banner */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono animate-in fade-in duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Banner */}
      {submitted && !error && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-[#C8FF00]/10 border border-[#C8FF00]/30 text-[#F5F5F7] text-xs font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#C8FF00] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#C8FF00] font-bold block mb-0.5">Scope Request Received</strong>
            Your project requirements have been securely logged. Our senior engineering lead will review your architecture and contact you within 24 hours.
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-lime w-full min-h-[48px] py-3.5 px-6 rounded-xl font-bold font-display text-sm flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-[#09090B]" />
            <span>Transmitting Technical Blueprint...</span>
          </>
        ) : (
          <>
            <span>Submit Scope Consultation Request</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div className="pt-2 text-center">
        <p className="text-[11px] font-mono text-[#9A9AA6] flex items-center justify-center gap-2">
          <span>🔒 Strict Mutual NDA Protection</span>
          <span>•</span>
          <span>Zero spam guarantee</span>
        </p>
      </div>
    </form>
  );
}
