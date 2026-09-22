"use client";

import React, { useEffect, useState } from "react";
import NttDataLogo from "./NttDataLogo";
import { 
  Sparkles, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  Database, 
  ArrowRight,
  Building2,
  Globe,
  Calendar,
  CheckCircle2,
  MapPin,
  RefreshCw
} from "lucide-react";
import { chatApi, ChatSuggestion } from "@/lib/api";

interface ChatWelcomeScreenProps {
  onSelectPrompt: (promptText: string) => void;
  userName?: string;
}

const ICON_MAP: Record<string, { icon: any; color: string }> = {
  building: {
    icon: Building2,
    color: "from-blue-500/20 to-sky-500/10 border-blue-500/30 text-sky-400",
  },
  globe: {
    icon: Globe,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  },
  calendar: {
    icon: Calendar,
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
  },
  quality: {
    icon: CheckCircle2,
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400",
  },
  map: {
    icon: MapPin,
    color: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400",
  },
  shield: {
    icon: ShieldCheck,
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
  },
  layers: {
    icon: Layers,
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
  },
};

export default function ChatWelcomeScreen({
  onSelectPrompt,
  userName = "Colega",
}: ChatWelcomeScreenProps) {
  const [suggestions, setSuggestions] = useState<ChatSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuggestions();
  }, []);

  async function loadSuggestions() {
    setLoading(true);
    try {
      const data = await chatApi.getSuggestions();
      setSuggestions(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }

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
      
      <p className="text-sm md:text-base text-slate-400 max-w-xl mb-6 leading-relaxed">
        Olá, <span className="text-slate-200 font-semibold">{userName}</span>! 
        Faça perguntas sobre as especificações, regras de negócio e documentações técnicas indexadas no repositório.
      </p>

      {/* Cabeçalho da Seção de Sugestões Contextuais */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Perguntas Sugeridas com Base no Contexto Indexado:</span>
        </div>
        <button
          onClick={loadSuggestions}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-300 transition"
          title="Atualizar sugestões"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin text-blue-400" : ""}`} />
          <span>Outras sugestões</span>
        </button>
      </div>

      {/* Suggested Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
        {loading && suggestions.length === 0 ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 animate-pulse h-28 flex flex-col justify-between"
            >
              <div className="h-6 w-6 rounded-lg bg-slate-800 mb-2" />
              <div className="space-y-2">
                <div className="h-3 w-32 bg-slate-800 rounded" />
                <div className="h-2.5 w-48 bg-slate-800/60 rounded" />
              </div>
            </div>
          ))
        ) : (
          suggestions.map((prompt) => {
            const conf = ICON_MAP[prompt.icon] || ICON_MAP.layers;
            const Icon = conf.icon;
            return (
              <button
                key={prompt.id}
                onClick={() => onSelectPrompt(prompt.desc)}
                className="group flex flex-col justify-between p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-800/80 hover:border-blue-500/40 transition-all duration-200 text-left shadow-sm hover:shadow-md hover:shadow-blue-500/5"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br border ${conf.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {prompt.topic && (
                      <span className="text-[10px] font-medium text-slate-400 px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/40 truncate max-w-[170px]">
                        {prompt.topic}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
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
          })
        )}
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
