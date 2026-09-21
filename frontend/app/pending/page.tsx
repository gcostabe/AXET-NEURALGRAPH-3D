import Link from "next/link";
import NttDataLogo from "@/components/NttDataLogo";
import { Clock, ArrowLeft } from "lucide-react";

export default function PendingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080d1a] p-6 text-slate-100">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl shadow-blue-500/5 mb-2">
            <NttDataLogo size="lg" />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="h-6 w-6" />
          </div>

          <h1 className="text-lg font-bold text-white">
            Cadastro em Análise
          </h1>

          <p className="text-xs leading-relaxed text-slate-300">
            Sua conta corporativa foi registrada e está aguardando a aprovação de um
            administrador do sistema. Você terá acesso imediato às documentações e ao chat assim que for aprovado.
          </p>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar para o Login</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
