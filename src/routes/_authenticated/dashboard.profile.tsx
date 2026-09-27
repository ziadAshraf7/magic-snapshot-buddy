import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Deco Sur" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const field =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

function ProfilePage() {
  const { user } = useSession();
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setFullName(data?.full_name ?? (user.user_metadata?.full_name as string) ?? "");
      });
  }, [user]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    setMessage(null);
    setError(null);
    const { error: err } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("id", user.id);
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setMessage("Profile updated.");
  }

  return (
    <div className="max-w-md">
      <h2 className="font-display text-3xl">Your profile</h2>
      <form onSubmit={handleSave} className="mt-8 flex flex-col gap-6">
        <div>
          <label className="label-caps text-muted-foreground">Email</label>
          <p className="mt-2 border-b border-border/50 py-3 text-sm text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <div>
          <label className="label-caps text-muted-foreground">Full name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className={field}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {message && <p className="text-sm text-accent">{message}</p>}
        <button type="submit" disabled={busy} className="btn-gold self-start disabled:opacity-60">
          {busy ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
