"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi, ApiError } from "@/lib/api";
import NttDataLogo from "@/components/NttDataLogo";
import { ArrowRight, Lock, Mail, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.register(email, password);
      router.push("/pending");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Erro inesperado ao cadastrar.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080d1a] p-6 text-slate-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl shadow-blue-500/5 mb-2">
            <NttDataLogo size="lg" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Criar Nova Conta
          </h1>
          <p className="text-xs text-slate-400">
            Solicite acesso ao AXET-NEURALGRAPH-3D
          </p>
        </div>

        {/* Card Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Email corporativo
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@empresa.com"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Senha (mínimo 8 caracteres)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0072BC] to-sky-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 transition-all"
          >
            {loading ? "Enviando solicitação..." : "Solicitar Acesso"}
            <UserPlus className="h-4 w-4" />
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            Já possui uma conta?{" "}
            <Link href="/login" className="font-medium text-sky-400 hover:text-sky-300 transition underline underline-offset-2">
              Fazer login
            </Link>
          </p>
        </form>

        <p className="text-center text-[11px] text-slate-500">
          Novos cadastros passam por aprovação de um administrador antes da liberação.
        </p>
      </div>
    </main>
  );
}
