import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/site";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Deco Sur" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  const featured = projects.slice(0, 3);

  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Welcome to your private client area. Track your project journey, manage your profile, and
        share your experience with the studio.
      </p>

      <h2 className="mt-14 font-display text-3xl">Featured work</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <Link
            key={p.id}
            to="/projects/$id"
            params={{ id: p.id }}
            className="group border border-border bg-surface"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="label-caps text-accent">{p.category}</p>
                <p className="mt-2 font-display text-xl">{p.title}</p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground transition-colors group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
