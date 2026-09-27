import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { testimonials } from "@/data/site";

export const Route = createFileRoute("/_authenticated/dashboard/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Deco Sur" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardTestimonials,
});

const field =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

function DashboardTestimonials() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-3xl">Share your experience</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Worked with the studio? We would love to hear how the space feels now that you live with
          it.
        </p>
        {submitted ? (
          <p className="mt-8 text-sm text-accent">
            Thank you — your testimonial has been received and will be reviewed by the studio.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <input required placeholder="Project or room" className={field} />
            <textarea required rows={4} placeholder="Your testimonial" className={field} />
            <button type="submit" className="btn-gold self-start">
              Submit testimonial
            </button>
          </form>
        )}
      </div>

      <div>
        <h2 className="font-display text-3xl">What clients say</h2>
        <div className="mt-8 flex flex-col gap-8">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote key={t.name} className="border-l-2 border-accent pl-6">
              <p className="text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
              <footer className="mt-3 label-caps text-foreground">
                {t.name} <span className="text-muted-foreground">· {t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
