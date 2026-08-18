import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Trash2, CheckCheck, Eye, EyeOff, RefreshCw,
  Lock, LogOut, MessageSquare, Users, Calendar, ChevronDown,
  ChevronUp, Inbox,
} from "lucide-react";
import { supabase, ContactMessage } from "@/lib/supabase";
import { useFinePointer } from "@/hooks/use-fine-pointer";

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || "admin@vk2025";

const actionBtn =
  "flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all btn-touch touch-manipulation";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const hasFinePointer = useFinePointer();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const attempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onAuth();
    } else {
      setError(true);
      setShaking(true);
      setPw("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center px-4 py-8">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <motion.div
          animate={shaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white/[0.04] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,170,204,0.08)]"
        >
          {/* Logo */}
          <div className="flex justify-center mb-5 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center">
              <img
                src="/assets/images/vk.png"
                alt="VK Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white text-center mb-1">Admin Access</h1>
          <p className="text-muted-foreground text-xs sm:text-sm text-center mb-5 sm:mb-8">
            Enter your password to continue
          </p>

          <form onSubmit={attempt} className="space-y-3 sm:space-y-4">
            <div className="relative">
              <Lock className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(false); }}
                placeholder="Password"
                autoFocus
                className={`w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-black/30 border rounded-xl text-sm sm:text-base text-white focus:outline-none focus:ring-1 transition-all touch-manipulation ${error
                  ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
                  : "border-white/10 focus:border-primary focus:ring-primary/30"
                  }`}
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center">Incorrect password. Try again.</p>
            )}
            <button
              type="submit"
              className={`w-full py-3 sm:py-3.5 rounded-xl bg-primary text-background font-bold text-sm sm:text-base transition-all duration-300 btn-touch ${
                hasFinePointer
                  ? "hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,170,204,0.4)]"
                  : "active:bg-primary/90 active:shadow-[0_0_20px_rgba(0,170,204,0.4)]"
              }`}
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Message Card ─────────────────────────────────────────────────────────────
function MessageCard({
  msg,
  onMarkRead,
  onDelete,
}: {
  msg: ContactMessage;
  onMarkRead: (id: string, read: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={`rounded-xl sm:rounded-2xl border transition-all duration-300 touch-manipulation ${msg.is_read
        ? "bg-white/[0.02] border-white/5"
        : "bg-primary/[0.04] border-primary/20 shadow-[0_0_20px_rgba(0,170,204,0.06)]"
        }`}
    >
      {/* Header row */}
      <div
        className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 cursor-pointer group active:bg-white/[0.02] rounded-xl sm:rounded-2xl transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${msg.is_read ? "bg-white/10 text-muted-foreground" : "bg-primary/20 text-primary"
          }`}>
          {msg.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="font-bold text-white text-xs sm:text-sm">{msg.name}</span>
            {!msg.is_read && (
              <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold border border-primary/30">
                NEW
              </span>
            )}
            <span className="text-[10px] sm:text-xs text-muted-foreground ml-auto shrink-0">{timeAgo(msg.created_at)}</span>
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">{msg.email}</p>
          <p className="text-xs sm:text-sm text-white/80 font-medium mt-1 truncate">{msg.subject}</p>
          {!expanded && (
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 line-clamp-1">{msg.message}</p>
          )}
        </div>

        <div className="flex-shrink-0 text-muted-foreground group-hover:text-white group-active:text-white transition-colors pt-0.5">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 border-t border-white/5 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                <div className="bg-white/5 rounded-xl p-2.5 sm:p-3">
                  <p className="text-muted-foreground mb-1 text-[11px] sm:text-xs">From</p>
                  <p className="text-white font-semibold text-sm break-words">{msg.name}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 sm:p-3">
                  <p className="text-muted-foreground mb-1 text-[11px] sm:text-xs">Email</p>
                  <a href={`mailto:${msg.email}`} className="text-primary font-semibold text-sm break-all hover:underline active:underline">
                    {msg.email}
                  </a>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 sm:p-3">
                  <p className="text-muted-foreground mb-1 text-[11px] sm:text-xs">Subject</p>
                  <p className="text-white font-semibold text-sm break-words">{msg.subject}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 sm:p-3">
                  <p className="text-muted-foreground mb-1 text-[11px] sm:text-xs">Received</p>
                  <p className="text-white font-semibold text-xs sm:text-sm">{formatDate(msg.created_at)}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <p className="text-muted-foreground text-[11px] sm:text-xs mb-2">Message</p>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.message}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); onMarkRead(msg.id, !msg.is_read); }}
                  className={`${actionBtn} ${msg.is_read
                    ? "bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 active:text-white active:bg-white/10"
                    : "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/20 border border-primary/30"
                    }`}
                >
                  {msg.is_read ? <EyeOff className="w-3.5 h-3.5" /> : <CheckCheck className="w-3.5 h-3.5" />}
                  {msg.is_read ? "Mark unread" : "Mark as read"}
                </button>
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className={`${actionBtn} bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 active:text-white active:bg-white/10`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-3.5 h-3.5" /> Reply
                </a>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(msg.id); }}
                  className={`${actionBtn} bg-red-500/10 text-red-400 hover:bg-red-500/20 active:bg-red-500/20 border border-red-500/20 sm:ml-auto`}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchMessages = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setFetchError(null);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      setFetchError(error.message || "Failed to load messages from Supabase.");
    } else if (data) {
      setMessages(data as ContactMessage[]);
      setLastRefreshed(new Date());
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => fetchMessages(true), 30000);

    const channel = supabase
      .channel("contact_messages_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_messages" },
        (payload) => {
          setMessages((prev) => [payload.new as ContactMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [fetchMessages]);

  const handleMarkRead = async (id: string, read: boolean) => {
    await supabase.from("contact_messages").update({ is_read: read }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: read } : m)));
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const total = messages.length;
  const unread = messages.filter((m) => !m.is_read).length;
  const today = messages.filter((m) => {
    const d = new Date(m.created_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return m.is_read;
    return true;
  });

  const stats = [
    { label: "Total", value: total, icon: MessageSquare, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { label: "Unread", value: unread, icon: Inbox, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
    { label: "Today", value: today, icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    { label: "Contacts", value: new Set(messages.map((m) => m.email)).size, icon: Users, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
  ];

  return (
    <div className="min-h-screen bg-[#050810]">
      {/* Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050810]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
              <img
                src="/assets/images/vk.png"
                alt="VK Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-white font-black text-sm sm:text-base leading-none truncate">Admin Dashboard</h1>
              <p className="text-muted-foreground text-[10px] sm:text-[11px] mt-0.5">Contact Messages</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span className="text-muted-foreground text-[10px] sm:text-xs hidden md:block">
              Updated {timeAgo(lastRefreshed.toISOString())}
            </span>
            <button
              onClick={() => fetchMessages(true)}
              disabled={refreshing}
              className="p-2 rounded-lg border border-white/10 text-muted-foreground hover:text-white hover:border-white/20 active:text-white active:border-white/20 transition-all btn-touch touch-manipulation"
              aria-label="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-lg border border-white/10 text-muted-foreground hover:text-white hover:border-white/20 active:text-white active:border-white/20 transition-all text-[11px] sm:text-xs font-medium btn-touch touch-manipulation"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8 relative">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl sm:rounded-2xl border p-3 sm:p-5 ${bg} bg-white/[0.02]`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-muted-foreground text-[10px] sm:text-xs font-medium uppercase tracking-wider">{label}</span>
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color}`} />
              </div>
              <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto pb-1 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap">
            {(["all", "unread", "read"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold capitalize transition-all btn-touch touch-manipulation ${filter === f
                  ? "bg-primary text-background"
                  : "bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 active:text-white active:bg-white/10"
                  }`}
              >
                {f} {f === "all" ? `(${total})` : f === "unread" ? `(${unread})` : `(${total - unread})`}
              </button>
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {fetchError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 rounded-xl sm:rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 sm:px-5 sm:py-4"
          >
            <p className="text-red-400 font-bold text-xs sm:text-sm mb-1">Supabase Connection Error</p>
            <p className="text-red-300/70 text-[11px] sm:text-xs leading-relaxed break-words">{fetchError}</p>
            <p className="text-red-300/50 text-[11px] sm:text-xs mt-2">
              Make sure the <code className="bg-red-500/20 px-1 rounded">contact_messages</code> table exists and RLS policies are set up.
            </p>
            <button
              onClick={() => fetchMessages()}
              className="mt-2.5 sm:mt-3 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-[11px] sm:text-xs font-semibold hover:bg-red-500/30 active:bg-red-500/30 transition-all btn-touch"
            >
              Retry Connection
            </button>
          </motion.div>
        )}

        {/* Messages */}
        {loading ? (
          <div className="flex items-center justify-center py-16 sm:py-24">
            <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 sm:mb-4">
              <Inbox className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
            </div>
            <p className="text-white font-bold text-sm sm:text-base mb-1">No messages yet</p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {filter !== "all" ? "No messages match this filter." : "Contact form submissions will appear here."}
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="space-y-2.5 sm:space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((msg) => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// ─── Admin Root ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}
