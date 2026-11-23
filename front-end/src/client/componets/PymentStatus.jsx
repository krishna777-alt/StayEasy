import { useMemo } from "react";
import { AlertCircle, CheckCircle2, Clock3, RotateCcw } from "lucide-react";

const GLITTER_COLORS = [
  "bg-amber-400",
  "bg-amber-300",
  "bg-yellow-200",
  "bg-amber-100",
  "bg-amber-500",
];

export default function PaymentStatus({
  active = true,
  count = 48,
  durationMs = 2200,
  status = "paid",
  bookingCode,
  inline = false,
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Spread particles across a full radial burst angle (-160deg to -20deg upward + side arcs)
      const angleDeg =
        -170 + (i / Math.max(count - 1, 1)) * 160 + ((i * 19) % 15) - 7;
      const angleRad = (angleDeg * Math.PI) / 180;
      const distance = 90 + ((i * 37) % 150); // px burst travel distance
      const tx = Math.round(Math.cos(angleRad) * distance);
      const ty = Math.round(Math.sin(angleRad) * distance);
      const fallY = ty + 140 + ((i * 23) % 90);
      const rotate = ((i * 73) % 720) - 360;
      const delay = (i * 17) % 180; // slight staggered pop
      const sizeClass =
        i % 3 === 0
          ? "w-2.5 h-2.5 rounded-full"
          : i % 2 === 0
            ? "w-2 h-3.5 rounded-sm"
            : "w-3 h-1.5 rounded-sm";
      const colorClass = GLITTER_COLORS[i % GLITTER_COLORS.length];

      return {
        id: i,
        tx,
        ty,
        fallY,
        rotate,
        delay,
        sizeClass,
        colorClass,
      };
    });
  }, [count]);

  if (!active) return null;

  const statusDetails = {
    pending: {
      label: "Payment pending",
      description: "Your booking is saved and waiting for payment confirmation.",
      Icon: Clock3,
      styles: "border-amber-500/30 bg-amber-500/5 text-amber-200",
    },
    paid: {
      label: "Payment complete",
      description: "Your payment has been confirmed.",
      Icon: CheckCircle2,
      styles: "border-emerald-500/30 bg-emerald-500/5 text-emerald-200",
    },
    failed: {
      label: "Payment failed",
      description: "Payment was not completed.",
      Icon: AlertCircle,
      styles: "border-rose-500/30 bg-rose-500/5 text-rose-200",
    },
    refunded: {
      label: "Payment refunded",
      description: "Your payment has been refunded.",
      Icon: RotateCcw,
      styles: "border-sky-500/30 bg-sky-500/5 text-sky-200",
    },
    partially_refunded: {
      label: "Partially refunded",
      description: "Part of your payment has been refunded.",
      Icon: RotateCcw,
      styles: "border-sky-500/30 bg-sky-500/5 text-sky-200",
    },
  };
  const details = statusDetails[status] || statusDetails.pending;

  if (inline) {
    const { Icon } = details;
    return (
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 ${details.styles}`}
        role="status"
      >
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">{details.label}</p>
          <p className="mt-1 text-sm opacity-80">{details.description}</p>
          {bookingCode && (
            <p className="mt-2 font-mono text-xs">
              Booking reference: {bookingCode}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <style>{`
        @keyframes glitterBurst {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.2) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translate3d(var(--tx), var(--ty), 0) scale(1.15) rotate(calc(var(--rot) * 0.45));
          }
          100% {
            opacity: 0;
            transform: translate3d(calc(var(--tx) * 1.15), var(--fall-y), 0) scale(0.65) rotate(var(--rot));
          }
        }
        .glitter-piece {
          position: absolute;
          animation-name: glitterBurst;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.55);
        }
      `}</style>

      <div className="relative w-0 h-0">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--fall-y": `${p.fallY}px`,
              "--rot": `${p.rotate}deg`,
              animationDuration: `${durationMs}ms`,
              animationDelay: `${p.delay}ms`,
            }}
            className={`glitter-piece ${p.sizeClass} ${p.colorClass}`}
          />
        ))}
      </div>
    </div>
  );
}
