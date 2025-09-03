export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-8 flex items-center justify-between text-sm text-slate-400">
        <span>© {new Date().getFullYear()} İclal İnal</span>
        <div className="flex gap-4">
          <a href="https://github.com/iclalinal" className="hover:text-white" rel="noreferrer noopener" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com" className="hover:text-white" rel="noreferrer noopener" target="_blank">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

