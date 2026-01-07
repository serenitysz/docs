import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LogOut, Copy, RefreshCw, Loader2, Send } from "lucide-react";
import serenityLogo from "@/assets/serenity-logo.png";

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch waitlist");
      console.error(error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  }, []);

  const checkUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    } else {
      fetchEntries();
    }
  }, [navigate, fetchEntries]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    if (!confirm(`Are you sure you want to send this email to ${entries.length} users?`)) {
      return;
    }

    setSending(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: { subject, message },
      });

      if (error) throw error;

      toast.success("Newsletter sent successfully!");
      setSubject("");
      setMessage("");
    } catch (error: unknown) {
      console.error('Error sending newsletter:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send newsletter";
      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={serenityLogo} alt="Serenity" className="w-8 h-8 rounded object-contain" />
            <h1 className="font-bold text-lg">Waitlist Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={fetchEntries} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/10 hover:bg-white/5">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Newsletter Section */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Send Newsletter</h2>
            <p className="text-muted-foreground text-sm">Send an update to all {entries.length} waitlisted users.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input 
                placeholder="Ex: Serenity Beta is Live!" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message (Markdown supported)</label>
              <Textarea 
                placeholder="Write your update here..." 
                className="min-h-[150px] bg-black/20 border-white/10 font-mono text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleSendNewsletter} 
                disabled={sending || entries.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send to {entries.length} users
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Waitlist Table */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Total Signups</h2>
            <span className="text-2xl font-bold text-primary font-mono">{entries.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                <tr>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Date Joined</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && entries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading entries...
                      </div>
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                      No signups yet.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{entry.email}</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                        {new Date(entry.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyEmail(entry.email)}
                          className="h-8 w-8 hover:bg-white/10"
                        >
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
