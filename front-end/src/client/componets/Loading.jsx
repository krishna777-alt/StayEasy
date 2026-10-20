function Loading() {
  return (
    <div className="h-screen flex items-center justify-center p-8  bg-zinc-950">
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Outer Glowing Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />

        {/* Inner Reverse Spinning Ring */}
        <div className="absolute inset-2 rounded-full border-2 border-zinc-800 border-b-amber-300 animate-[spin_1.5s_linear_infinite_reverse]" />

        {/* Ambient Glow Pulse */}
        <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/80 animate-pulse" />
      </div>
    </div>
  );
}

export default Loading;
