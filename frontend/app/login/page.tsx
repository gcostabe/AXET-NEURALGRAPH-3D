"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi, ApiError, OktaPollResponse } from "@/lib/api";
import { setToken } from "@/lib/auth";
import NttDataLogo from "@/components/NttDataLogo";
import OktaSsoModal from "@/components/OktaSsoModal";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showOktaModal, setShowOktaModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("expired")) {
        setSessionExpired(true);
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      setToken(res.access_token, res.role);
      const isAdm = (res.role || "").toLowerCase() === "admin";
      router.push(isAdm ? "/admin" : "/chat");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 403 && /pending/i.test(err.message)) {
          router.push("/pending");
          return;
        }
        setError(err.message);
      } else {
        setError("Erro inesperado ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleOktaSuccess(data: OktaPollResponse) {
    setShowOktaModal(false);
    const isAdm = (data.role || "").toLowerCase() === "admin";
    router.push(isAdm ? "/admin" : "/chat");
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
            AXET-NEURALGRAPH-3D
          </h1>
          <p className="text-xs text-slate-400">
            Plataforma Neural 3D e RAG Corporativo de Conhecimento
          </p>
        </div>

        {/* Card Container */}
        <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl backdrop-blur-xl">
          {/* Okta SSO Primary Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowOktaModal(true)}
              className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0072BC] via-sky-600 to-sky-500 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:opacity-95 active:scale-[0.99] transition-all"
            >
              <ShieldCheck className="h-5 w-5 text-sky-200 transition-transform group-hover:scale-110" />
              <span>Entrar com SSO Okta (OneNTT)</span>
            </button>
            <p className="text-center text-[11px] text-slate-400">
              Autenticação corporativa • Atualiza a API Gateway aXet
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="mx-3 flex-shrink text-[11px] uppercase tracking-wider text-slate-500">
              ou credenciais locais
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Local Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            {sessionExpired && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
                Sua sessão expirou por segurança. Por favor, entre novamente.
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 active:scale-[0.99] disabled:opacity-50 transition-all"
            >
              {loading ? "Autenticando..." : "Entrar com Senha Local"}
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>

            <p className="text-center text-xs text-slate-400 pt-1">
              Não possui uma conta?{" "}
              <Link href="/register" className="font-medium text-sky-400 hover:text-sky-300 transition underline underline-offset-2">
                Solicitar cadastro
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-[11px] text-slate-500">
          Ambiente corporativo seguro • AXET-NEURALGRAPH-3D
        </p>
      </div>

      {/* Okta Device Authorization Modal */}
      <OktaSsoModal
        isOpen={showOktaModal}
        onClose={() => setShowOktaModal(false)}
        onSuccess={handleOktaSuccess}
      />
    </main>
  );
}

