import { useState, useRef } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Github, Linkedin, Mail, MapPin, Send, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useFinePointer } from "@/hooks/use-fine-pointer";

const inputClass =
  "w-full bg-black/20 border border-white/10 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all touch-manipulation";

export default function Contact() {
  const hasFinePointer = useFinePointer();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Supabase insert error:", err);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Location", value: "India" },
    { icon: Mail, title: "Email", value: "vinaykumarmvk17@gmail.com" },
    { icon: Linkedin, title: "LinkedIn", value: "linkedin.com/in/vinaykumarmoturi" },
    { icon: Github, title: "GitHub", value: "github.com/VinayKumar-MVK" },
  ];

  return (
    <PageWrapper>
      {/* ── Toast Notifications ── */}
      <AnimatePresence>
        {(isSuccess || isError) && (
          <motion.div
            key={isSuccess ? "toast-success" : "toast-error"}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-sm px-2 sm:px-0"
          >
            {isSuccess ? (
              <div className="rounded-2xl border border-green-500/40 bg-[#0d1f14] shadow-[0_0_40px_rgba(34,197,94,0.3)] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                  className="h-[3px] bg-green-500 w-full"
                />
                <div className="flex items-start gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4">
                  <div className="mt-0.5 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center shadow-[0_0_16px_rgba(34,197,94,0.4)]">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">Message Sent!</p>
                    <p className="text-green-300/70 text-xs mt-0.5 leading-relaxed">
                      Thanks for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="flex-shrink-0 text-white/40 hover:text-white active:text-white transition-colors mt-0.5 btn-touch p-1"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-red-500/40 bg-[#1f0d0d] shadow-[0_0_40px_rgba(239,68,68,0.3)] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                  className="h-[3px] bg-red-500 w-full"
                />
                <div className="flex items-start gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4">
                  <div className="mt-0.5 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center shadow-[0_0_16px_rgba(239,68,68,0.4)]">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">Failed to send</p>
                    <p className="text-red-300/70 text-xs mt-0.5 leading-relaxed">
                      Something went wrong. Please try again or email directly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsError(false)}
                    className="flex-shrink-0 text-white/40 hover:text-white active:text-white transition-colors mt-0.5 btn-touch p-1"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 md:mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground leading-relaxed px-1">
            Have a project in mind or want to collaborate? Let's build something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glassmorphism p-4 sm:p-5 md:p-6 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4 hover:border-primary/50 active:border-primary/50 transition-colors group touch-manipulation"
              >
                <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:neon-glow-primary group-active:shadow-[0_0_18px_rgba(0,170,204,0.55)] transition-all shrink-0">
                  <info.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-0.5 sm:mb-1">{info.title}</h3>
                  <p className="font-bold text-sm sm:text-base break-words">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl border border-white/5 touch-manipulation"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-muted-foreground ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-muted-foreground ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground ml-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-none min-h-[120px] sm:min-h-[140px]`}
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 bg-primary text-background transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed btn-touch ${
                    hasFinePointer
                      ? "hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,170,204,0.5)] disabled:hover:scale-100 disabled:hover:shadow-none"
                      : "active:bg-primary/90 active:scale-[0.98] active:shadow-[0_0_24px_rgba(0,170,204,0.45)]"
                  } neon-glow-primary`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send
                        size={18}
                        className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:-translate-y-0.5"
                      />
                      <span className="tracking-wide group-hover:tracking-wider group-active:tracking-wider transition-all duration-300">
                        Send Message
                      </span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
