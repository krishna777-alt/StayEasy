import { Clock, ShieldCheck, Users } from "lucide-react";
import SectionTitle from "./SectionTitle";

function Policies() {
  return (
    <section className="mb-16">
      <SectionTitle eyebrow="Good to know" title="Hotel policies" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            icon: Clock,
            title: "Check-in",
            value: "From 2:00 PM",
          },
          {
            icon: Clock,
            title: "Check-out",
            value: "Until 11:00 AM",
          },
          {
            icon: ShieldCheck,
            title: "Cancellation",
            value: "Depends on selected room",
          },
          {
            icon: Users,
            title: "Children",
            value: "Welcome at the property",
          },
        ].map(({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#111113] p-5"
          >
            <div className="rounded-lg bg-amber-400/10 p-3">
              <Icon size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="mt-1 text-xs text-zinc-500">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Policies;
