"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "@/lib/data";
import { m } from "framer-motion";
import { Github } from "lucide-react";
import { Card3DWrapper } from "@/components/ui/Card3DWrapper";
import clsx from "clsx";

const ghBtn =
  "z-20 grid place-items-center size-7 rounded-md " +
  "bg-transparent border border-transparent text-slate-400 " + // X butonundaki gibi
  "transition-colors hover:text-white hover:bg-white/5 hover:border-cyan-400/40 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <m.div className="group relative h-full min-h-[380px]">
          <Card3DWrapper>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                title="Open repository"
                aria-label={`Open ${p.title} repository`}
                onClick={(e) => e.stopPropagation()}
                className={clsx("absolute top-2.5 right-2.5", ghBtn)}
                style={{ transform: "translateZ(40px)" }}
              >
                <Github className="h-4 w-4" />
              </a>
            )}

            <CardHeader className="pb-4 pt-6" style={{ transform: "translateZ(20px)" }}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <CardTitle
                  className="text-base font-semibold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent"
                  style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {p.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent
              className="flex h-full flex-col justify-between px-6 pb-6 pt-0"
              style={{ transform: "translateZ(20px)" }}
            >
              <p
                className="mb-6 flex-grow leading-relaxed text-sm text-slate-200"
                style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >
                {p.desc}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-cyan-400/50 hover:bg-slate-700/50"
                  >
                    {tech}
                  </Badge>
                ))}
                {p.tags.length > 4 && (
                  <Badge variant="outline" className="bg-slate-800/50 border-slate-600 px-3 py-1 text-xs text-slate-200">
                    +{p.tags.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card3DWrapper>
        </m.div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900/95 backdrop-blur-md border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent text-xl">
            {p.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-cyan-300">About the Project</h3>
            <p className="leading-relaxed text-slate-200">{p.desc}</p>
            {p.details && (
              <ul className="mt-4 space-y-2">
                {p.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-cyan-300">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-slate-800/50 border-slate-600 text-slate-200 transition-colors hover:border-cyan-400/50 hover:bg-slate-700/50 text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
