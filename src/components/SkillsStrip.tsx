export default function SkillsStrip({ skills }: { skills: string[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {skills.map(s => (
        <span
          key={s}
          className="whitespace-nowrap rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200 text-sm"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
