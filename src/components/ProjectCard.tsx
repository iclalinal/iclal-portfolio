"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import type { Project } from "@/lib/data";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer border-white/10 bg-white/[0.02] hover:border-cyan-400/40 transition transform-gpu hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(53,198,244,0.15)]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{p.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-slate-300">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map(t => (
                <Badge key={t} variant="outline" className="border-cyan-300/40 text-cyan-200">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="bg-[#0B0F14] border-white/10 text-slate-100">
        <DialogHeader>
          <DialogTitle>{p.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-slate-300">{p.desc}</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            {(p.details ?? []).map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
