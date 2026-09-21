"use client";

import React from "react";
import NttDataLogo from "./NttDataLogo";
import { 
  Sparkles, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  Database, 
  ArrowRight 
} from "lucide-react";

interface ChatWelcomeScreenProps {
  onSelectPrompt: (promptText: string) => void;
  userName?: string;
}

const SUGGESTED_PROMPTS = [
  {
    title: "Arquitetura do Sistema",
    desc: "Explique como os serviços Docker, backend FastAPI e Qdrant se integram.",
    icon: Layers,
    color: "from-blue-500/20 to-sky-500/10 border-blue-500/30 text-sky-400",
  },
  {
    title: "Guia de Deploy e Execução",
    desc: "Quais são os passos e requisitos para subir o ambiente localmente?",
    icon: Rocket,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    title: "Segurança e Autenticação",
    desc: "Como funciona o fluxo de aprovação de contas e auditoria do administrador?",
    icon: ShieldCheck,
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400",
  },
  {
    title: "Ingestão e Embeddings",
    desc: "Como os arquivos Markdown são divididos em seções e indexados no Qdrant?",
    icon: Database,
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
  },
];

export default function ChatWelcomeScreen({
  onSelectPrompt,
  userName = "Colega",
}: ChatWelcomeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 text-center max-w-4xl mx-auto my-auto animate-in fade-in duration-300">
      {/* Brand Hero */}
      <div className="mb-5 inline-flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 shadow-2xl shadow-blue-500/10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-md shadow-blue-500/20 border border-blue-400/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/ntt-assistant-avatar.png" 
            alt="NTT DATA Emblem" 
            className="h-full w-full object-contain"
          />
        </div>
        <NttDataLogo size="lg" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
        Base de Conhecimento Inteligente
      </h1>
      
      <p className="text-sm md:text-base text-slate-400 max-w-xl mb-8 leading-relaxed">
        Olá, <span className="text-slate-200 font-semibold">{userName}</span>! 
        Faça perguntas sobre as especificações, arquitetura e documentações técnicas indexadas no repositório.
      </p>

      {/* Suggested Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
        {SUGGESTED_PROMPTS.map((prompt, idx) => {
          const Icon = prompt.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(prompt.desc)}
              className="group flex flex-col justify-between p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-800/80 hover:border-blue-500/40 transition-all duration-200 text-left shadow-sm hover:shadow-md hover:shadow-blue-500/5"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br border ${prompt.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition-colors mb-1">
                  {prompt.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {prompt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          Indexação Vetorial Qdrant
        </span>
        <span>•</span>
        <span>Isolamento Total por Usuário</span>
        <span>•</span>
        <span>Citações e Fontes Confiáveis</span>
      </div>
    </div>
  );
}
