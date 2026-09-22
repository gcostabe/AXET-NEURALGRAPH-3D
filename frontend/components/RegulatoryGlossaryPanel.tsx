"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BookOpen,
  Scale,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { adminApi, GlossaryPair, RegulatoryImpactData } from "@/lib/api";

export default function RegulatoryGlossaryPanel() {
  const [subTab, setSubTab] = useState<"glossary" | "impact">("glossary");

  // Dados do Glossário
  const [pairs, setPairs] = useState<GlossaryPair[]>([]);
  const [loadingPairs, setLoadingPairs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal de Adicionar/Editar Par
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPair, setEditingPair] = useState<GlossaryPair | null>(null);
  const [formData, setFormData] = useState({
    jargon: "",
    formal_term: "",
    definition: "",
    legal_basis: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal de Exclusão
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dados da Matriz de Impacto
  const [impactData, setImpactData] = useState<RegulatoryImpactData | null>(null);
  const [loadingImpact, setLoadingImpact] = useState(true);
  const [showFullDoc, setShowFullDoc] = useState(false);

  async function loadGlossary() {
    setLoadingPairs(true);
    try {
      const data = await adminApi.getGlossaryPairs();
      setPairs(data);
    } catch (err) {
      setErrorMsg((err as Error).message || "Erro ao carregar o glossário.");
    } finally {
      setLoadingPairs(false);
    }
  }

  async function loadImpact() {
    setLoadingImpact(true);
    try {
      const data = await adminApi.getRegulatoryImpact();
      setImpactData(data);
    } catch (err) {
      // silencioso
    } finally {
      setLoadingImpact(false);
    }
  }

  useEffect(() => {
    loadGlossary();
    loadImpact();
  }, []);

  function handleOpenCreateModal() {
    setEditingPair(null);
    setFormData({
      jargon: "",
      formal_term: "",
      definition: "",
      legal_basis: "",
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(pair: GlossaryPair) {
    setEditingPair(pair);
    setFormData({
      jargon: pair.jargon,
      formal_term: pair.formal_term,
      definition: pair.definition,
      legal_basis: pair.legal_basis,
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  }

  async function handleSubmitPair(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.jargon.trim() || !formData.formal_term.trim()) {
      setErrorMsg("Jargão e Termo Técnico são campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      if (editingPair) {
        const updated = await adminApi.updateGlossaryPair(editingPair.id, formData);
        setPairs((prev) =>
          prev.map((p) => (p.id === editingPair.id ? updated : p))
        );
        setSuccessMsg(`Par de equivalência "${updated.formal_term}" atualizado com sucesso!`);
      } else {
        const created = await adminApi.createGlossaryPair(formData);
        setPairs((prev) => [...prev, created]);
        setSuccessMsg(`Novo par "${created.formal_term}" incluído no glossário canônico!`);
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg((err as Error).message || "Erro ao salvar par de equivalência.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await adminApi.deleteGlossaryPair(deletingId);
      setPairs((prev) => prev.filter((p) => p.id !== deletingId));
      setSuccessMsg("Par de equivalência removido com sucesso.");
      setDeletingId(null);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg((err as Error).message || "Erro ao excluir par.");
    } finally {
      setIsDeleting(false);
    }
  }

  // Filtro de pares de equivalência por busca
  const filteredPairs = useMemo(() => {
    if (!searchQuery.trim()) return pairs;
    const q = searchQuery.toLowerCase();
    return pairs.filter(
      (p) =>
        p.jargon.toLowerCase().includes(q) ||
        p.formal_term.toLowerCase().includes(q) ||
        p.definition.toLowerCase().includes(q) ||
        p.legal_basis.toLowerCase().includes(q)
    );
  }, [pairs, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Alertas de Notificação */}
      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Header com Abas Internas */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-cyan-400" />
            Impacto Regulatório & Glossário De ➔ Para
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mapeamento canônico das normas locais sobre o REEF Core e tradução de jargões para o RAG cognitivo
          </p>
        </div>

        {/* Sub-abas */}
        <div className="flex bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setSubTab("glossary")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
              subTab === "glossary"
                ? "bg-cyan-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Glossário De ➔ Para ({pairs.length})
          </button>
          <button
            onClick={() => setSubTab("impact")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
              subTab === "impact"
                ? "bg-cyan-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            Matriz de Impacto REEF
          </button>
        </div>
      </div>

      {/* Cards de Métricas e Status Regulatório */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">Pares de Equivalência</div>
            <div className="text-lg font-bold text-white">{pairs.length} termos catalogados</div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">Jurisdição / País Ativo</div>
            <div className="text-lg font-bold text-white flex items-center gap-1.5">
              <span>{impactData?.country || "Brasil"}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                SUSEP / Código Civil
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">Módulos do REEF Mapeados</div>
            <div className="text-lg font-bold text-white">5 esteiras operacionais</div>
          </div>
        </div>
      </div>

      {/* ── SUB-ABA 1: GLOSSÁRIO DE ➔ PARA ── */}
      {subTab === "glossary" && (
        <div className="space-y-4">
          {/* Barra de Ações: Busca + Botão Adicionar Par */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Pesquisar por jargão coloquial, termo técnico, definição ou lei..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/20 transition shrink-0"
            >
              <Plus className="h-4 w-4" />
              Incluir Par de Equivalência
            </button>
          </div>

          {/* Tabela de Pares de Equivalência */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="sticky top-0 bg-slate-800/95 backdrop-blur text-slate-400 border-b border-slate-700 uppercase tracking-wider font-semibold z-10">
                  <tr>
                    <th className="p-3.5 w-12 text-center">#</th>
                    <th className="p-3.5 w-48">Expressão Usual (De)</th>
                    <th className="p-3.5 w-48">Termo Formal (Para)</th>
                    <th className="p-3.5">Definição Operacional & Jurídica</th>
                    <th className="p-3.5 w-48">Fundamentação Legal</th>
                    <th className="p-3.5 w-24 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {loadingPairs ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-cyan-400" />
                        Carregando termos e equivalências...
                      </td>
                    </tr>
                  ) : filteredPairs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        Nenhum par de equivalência encontrado para &ldquo;{searchQuery}&rdquo;.
                      </td>
                    </tr>
                  ) : (
                    filteredPairs.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/50 transition">
                        <td className="p-3.5 text-center font-mono text-slate-500">{p.id}</td>
                        <td className="p-3.5 font-medium text-amber-300">
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            {p.jargon}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-cyan-300">
                          <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                            {p.formal_term}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300 leading-relaxed">{p.definition}</td>
                        <td className="p-3.5 text-slate-400">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono border border-slate-700/60">
                            {p.legal_basis}
                          </span>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                              title="Editar este termo"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingId(p.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition"
                              title="Excluir este termo"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between text-[11px] text-slate-500">
              <div>
                Exibindo {filteredPairs.length} de {pairs.length} termos catalogados no arquivo canônico
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Info className="h-3.5 w-3.5 text-cyan-400" />
                Alterações são salvas diretamente no documento Markdown e ingeridas pelo RAG
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-ABA 2: MATRIZ DE IMPACTO REGULATÓRIO ── */}
      {subTab === "impact" && (
        <div className="space-y-4">
          {/* Resumo dos Módulos REEF Core */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {impactData?.modules_summary.map((mod) => (
              <div
                key={mod.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2 hover:border-cyan-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {mod.id}
                  </span>
                  <span className="text-xs font-semibold text-white">{mod.name}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{mod.rule}</p>
              </div>
            ))}
          </div>

          {/* Card do Documento Completo da Matriz */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">
                  Documento Completo da Matriz de Impacto ({impactData?.country || "Brasil"})
                </h3>
              </div>
              <button
                onClick={() => setShowFullDoc(!showFullDoc)}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                <span>{showFullDoc ? "Recolher texto" : "Expandir texto completo"}</span>
                {showFullDoc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {showFullDoc ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                {impactData?.content}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                A Matriz Canônica detalha formalmente a aplicabilidade dos prazos da Circular SUSEP nº 621/2021, do
                Código Civil Brasileiro e da Resolução CNSP nº 382/2020 sobre as regras e fluxos de negócio do REEF Core.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL DE ADICIONAR / EDITAR PAR DE EQUIVALÊNCIA ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  {editingPair ? "Editar Par de Equivalência" : "Incluir Novo Par de Equivalência"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitPair} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Expressão Usual / Jargão Coloquial (De):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Dar PT / Carcaça / Calote no boleto / Bater o carro"
                  value={formData.jargon}
                  onChange={(e) => setFormData({ ...formData, jargon: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Termo Técnico / Regulatório Formal (Para):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Indenização Integral / Salvados / Mora no Pagamento do Prêmio"
                  value={formData.formal_term}
                  onChange={(e) => setFormData({ ...formData, formal_term: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Definição Operacional e Jurídica:
                </label>
                <textarea
                  rows={3}
                  placeholder="Explicação objetiva de como esse conceito se aplica às operações e esteiras do REEF..."
                  value={formData.definition}
                  onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Fundamentação Legal / Órgão Regulador:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Circ. SUSEP 621, Art. 43; Código Civil, Art. 786"
                  value={formData.legal_basis}
                  onChange={(e) => setFormData({ ...formData, legal_basis: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-600/20 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      Salvando no Markdown...
                    </>
                  ) : (
                    "Salvar no Glossário"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ── */}
      {deletingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3 className="text-sm font-bold text-white">Remover Par de Equivalência</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tem certeza que deseja excluir o termo #{deletingId}? O documento Markdown será regravado e o índice
              vetorial do RAG será atualizado.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/20 transition disabled:opacity-50"
              >
                {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
