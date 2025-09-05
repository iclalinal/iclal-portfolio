"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import type { Project } from "@/lib/data";
import { motion } from "framer-motion";
import { Card3DWrapper } from "@/components/ui/Card3DWrapper";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div className="group relative h-full min-h-[380px]">
          <Card3DWrapper>
            <CardHeader className="pb-4 pt-6" style={{ transform: "translateZ(20px)" }}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <CardTitle className="text-base font-semibold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="pt-0 flex flex-col justify-between h-full px-6 pb-6" style={{ transform: "translateZ(20px)" }}>
              <p className="text-sm text-slate-200 mb-6 leading-relaxed flex-grow" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs px-3 py-1 bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700/50 hover:border-cyan-400/50 transition-colors">
                    {tech}
                  </Badge>
                ))}
                {p.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs px-3 py-1 bg-slate-800/50 border-slate-600 text-slate-200">
                    +{p.tags.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card3DWrapper>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900/95 backdrop-blur-md border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-xl bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              {p.title}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">About the Project</h3>
            <p className="text-slate-200 leading-relaxed">{p.desc}</p>
            {p.details && (
              <ul className="mt-4 space-y-2">
                {p.details.map((detail, i) => (
                  <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-cyan-300">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700/50 hover:border-cyan-400/50 transition-colors">
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
