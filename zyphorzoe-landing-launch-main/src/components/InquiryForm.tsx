import { useState, useEffect } from "react";
import { saveEnquiry } from "@/lib/mongodb";
import { User, Briefcase, Phone, Mail, Building, Layers, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  details: string;
  location?: string;
}

const projectTypes = [
  "Website",
  "Web application",
  "Mobile app",
  "UI/UX design",
  "Backend & Cloud Database",
  "Custom Software Development",
  "Other",
];

interface InquiryFormProps {
  className?: string;
  initialValues?: Partial<InquiryFormData>;
  onSuccess?: () => void;
}

export function InquiryForm({ className = "", initialValues, onSuccess }: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormData>({
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    company: initialValues?.company || "",
    serviceType: initialValues?.serviceType || "Web application",
    details: initialValues?.details || "",
    location: initialValues?.location || "",
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
    const company = form.company.trim();
    const serviceType = form.serviceType.trim();
    const details = form.details.trim();
    const location = form.location?.trim() || "Online / Remote";

    if (!name || name.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!details || details.length < 10) {
      setError("Please describe your project (at least 10 characters).");
      return;
    }

    setSubmitting(true);
    try {
      await saveEnquiry({
        data: {
          name,
          email,
          phone,
          location: company ? `${company} • ${location}` : location,
          serviceType,
          details,
        },
      });

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "Web application",
        details: "",
        location: "",
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("[InquiryForm] Submission error:", err);
      // Fallback: open mailto
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nProject Type: ${serviceType}\n\n${details}`;
      window.location.href = `mailto:Zypherzone07@gmail.com?subject=${encodeURIComponent(
        `Project enquiry: ${serviceType}`
      )}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="inquiry-form-element"
      onSubmit={handleSubmit}
      className={`card-editorial p-6 sm:p-8 md:p-10 space-y-5 rounded-3xl border border-white/[0.08] bg-[#121217]/95 backdrop-blur-xl ${className}`}
      noValidate
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
            Project Scope Form
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F5F5F7] tracking-tight mt-0.5">
            Send an Enquiry
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9A9AA6] bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08] self-start sm:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
          Fast 24h Response
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <User className="h-3.5 w-3.5 text-[#C8FF00]" />
            Name <span className="text-[#C8FF00]">*</span>
          </span>
          <input
            id="n"
            type="text"
            required
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Alex Morgan"
            className="input-editorial"
          />
        </label>

        {/* Email */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <Mail className="h-3.5 w-3.5 text-[#C8FF00]" />
            Email <span className="text-[#C8FF00]">*</span>
          </span>
          <input
            id="e"
            type="email"
            required
            autoComplete="email"
            maxLength={255}
            value={form.email}
            onChange={update("email")}
            placeholder="alex@company.com"
            className="input-editorial font-mono"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <Phone className="h-3.5 w-3.5 text-[#C8FF00]" />
            Phone
          </span>
          <input
            id="p"
            type="tel"
            autoComplete="tel"
            maxLength={20}
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 98765 43210"
            className="input-editorial font-mono"
          />
        </label>

        {/* Company */}
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
            <Building className="h-3.5 w-3.5 text-[#C8FF00]" />
            Company (optional)
          </span>
          <input
            id="co"
            type="text"
            maxLength={100}
            value={form.company}
            onChange={update("company")}
            placeholder="e.g. Acme Studio"
            className="input-editorial"
          />
        </label>
      </div>

      {/* Project Type */}
      <label className="block space-y-2">
        <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
          <Briefcase className="h-3.5 w-3.5 text-[#C8FF00]" />
          Project Type
        </span>
        <select
          id="pt"
          value={form.serviceType}
          onChange={update("serviceType")}
          className="input-editorial cursor-pointer"
        >
          {projectTypes.map((pt) => (
            <option key={pt} value={pt} className="bg-[#121217] text-[#F5F5F7]">
              {pt}
            </option>
          ))}
        </select>
      </label>

      {/* Details */}
      <label className="block space-y-2">
        <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#9A9AA6] uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5 text-[#C8FF00]" />
          Project Description <span className="text-[#C8FF00]">*</span>
        </span>
        <textarea
          id="d"
          required
          rows={4}
          value={form.details}
          onChange={update("details")}
          placeholder="Describe your project goals, pages, features or configured estimate summary..."
          className="input-editorial min-h-[110px] resize-y"
        />
      </label>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono animate-in fade-in duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {submitted && !error && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-[#C8FF00]/10 border border-[#C8FF00]/30 text-[#F5F5F7] text-xs font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#C8FF00] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#C8FF00] font-bold block mb-0.5">Inquiry Sent Successfully!</strong>
            Thank you! Your inquiry has been received. Our team will review your requirements and reach out within 24 hours.
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        id="sub"
        type="submit"
        disabled={submitting}
        className="btn-lime w-full min-h-[48px] py-3.5 px-6 rounded-xl font-bold font-display text-sm flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-[#09090B]" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div className="pt-2 text-center">
        <p className="text-[11px] font-mono text-[#9A9AA6] flex items-center justify-center gap-2">
          <span>✉️ Direct: Zypherzone07@gmail.com</span>
          <span>•</span>
          <span>🔒 Confidential & Protected</span>
        </p>
      </div>
    </form>
  );
}
