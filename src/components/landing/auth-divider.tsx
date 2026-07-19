export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-[10px] uppercase tracking-widest text-white/40">
        или
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
