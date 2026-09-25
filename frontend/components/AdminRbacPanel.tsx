"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Trash2,
  Crown,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  Rocket,
  Download,
  ExternalLink,
  Brain,
  Zap,
  GitCommit,
  Upload,
  Check,
  X,
  FileBox,
  Filter,
  Sparkles,
} from "lucide-react";
import { rbacApi, RbacUserItem, learningsApi, CognitiveLearningItem } from "@/lib/api";
import { isMasterAdmin, MASTER_ADMIN_EMAIL } from "@/lib/auth";

export default function AdminRbacPanel() {
  const [users, setUsers] = useState<RbacUserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Automação Desktop 1-Clique (.dmg e .msi)
  const [buildVersion, setBuildVersion] = useState("v1.0.0");
  const [triggeringBuild, setTriggeringBuild] = useState(false);

  // Formulário para conceder privilégios
  const [emailInput, setEmailInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [revokingEmail, setRevokingEmail] = useState<string | null>(null);

  // Navegação por abas
  const [activeTab, setActiveTab] = useState<"synapses" | "rbac">("synapses");

  // Curadoria de Aprendizados Cognitivos e Neuroplasticidade (Cenário 1)
  const [learnings, setLearnings] = useState<CognitiveLearningItem[]>([]);
  const [loadingLearnings, setLoadingLearnings] = useState(false);
  const [publishingPack, setPublishingPack] = useState(false);
  const [syncingPack, setSyncingPack] = useState(false);
  const [synapseFilter, setSynapseFilter] = useState<"all" | "pending" | "approved">("all");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editConcept, setEditConcept] = useState("");
  const [editCorrection, setEditCorrection] = useState("");

  const isMaster = isMasterAdmin();

  const loadLearnings = async () => {
    setLoadingLearnings(true);
    try {
      const data = await learningsApi.getIncoming();
      setLearnings(data.items);
    } catch (err: any) {
      console.warn("Erro ao buscar aprendizados:", err);
    } finally {
      setLoadingLearnings(false);
    }
  };

  const handleReviewSynapse = async (
    canonical_id: string,
    action: "approve" | "reject",
    concept?: string,
    correction?: string
  ) => {
    setReviewingId(canonical_id);
    setError(null);
    setSuccess(null);
    try {
      await learningsApi.review(canonical_id, action, concept, correction);
      setSuccess(
        action === "approve"
          ? `Sinapse ${canonical_id} aprovada e consolidada no Grafo Neural e Qdrant com sucesso!`
          : `Sinapse ${canonical_id} rejeitada.`
      );
      setEditingId(null);
      await loadLearnings();
    } catch (err: any) {
      setError(err.message || "Falha ao revisar sinapse.");
    } finally {
      setReviewingId(null);
    }
  };

  const handlePublishPack = async () => {
    setPublishingPack(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await learningsApi.publishPack();
      setSuccess(
        `📦 Pacote global compilado com sucesso! Versão: ${res.pack.version} (${res.pack.synapses_count} sinapses prontas para distribuição global).`
      );
    } catch (err: any) {
      setError(err.message || "Falha ao compilar pacote de sinapses.");
    } finally {
      setPublishingPack(false);
    }
  };

  const handleSyncGlobalPack = async () => {
    setSyncingPack(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await learningsApi.syncGlobalPack();
      setSuccess(
        `⚡ ${res.imported_count} sinapses oficiais sincronizadas e ativadas na máquina local com zero permissões! (Versão: ${res.version})`
      );
      await loadLearnings();
    } catch (err: any) {
      setError(err.message || "Não foi possível sincronizar o pacote global das Releases.");
    } finally {
      setSyncingPack(false);
    }
  };

  const handleImportPackFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const res = await learningsApi.importPack(parsed);
      setSuccess(`📥 ${res.imported_count} sinapses importadas com sucesso do arquivo local!`);
      await loadLearnings();
    } catch (err: any) {
      setError("Arquivo de pacote inválido: " + err.message);
    } finally {
      e.target.value = "";
    }
  };

  const handleTriggerDesktopBuild = async () => {
    setTriggeringBuild(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await rbacApi.triggerDesktopBuild(buildVersion);
      setSuccess(`🚀 ${res.message}`);
    } catch (err: any) {
      setError(err.message || "Erro ao disparar compilação desktop.");
    } finally {
      setTriggeringBuild(false);
    }
  };

  const loadRbacUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await rbacApi.listUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar lista de administradores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRbacUsers();
    loadLearnings();
  }, []);

  const handleGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const created = await rbacApi.grantAdmin(emailInput.trim(), notesInput.trim() || undefined);
      setSuccess(`Privilégios de Administrador concedidos com sucesso para ${created.email}!`);
      setEmailInput("");
      setNotesInput("");
      await loadRbacUsers();
    } catch (err: any) {
      setError(err.message || "Falha ao conceder privilégios de Administrador.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevokeAdmin = async (email: string) => {
    if (!confirm(`Tem certeza de que deseja revogar o papel de Administrador de ${email}?`)) {
      return;
    }

    setRevokingEmail(email);
    setError(null);
    setSuccess(null);

    try {
      await rbacApi.revokeAdmin(email);
      setSuccess(`Privilégios de Administrador revogados para ${email}.`);
      await loadRbacUsers();
    } catch (err: any) {
      setError(err.message || "Falha ao revogar privilégios.");
    } finally {
      setRevokingEmail(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner de Identidade e Controle Master */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-400/20 text-yellow-300 rounded-xl border border-yellow-400/40">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">
                  👑 Gestão de Administradores Corporativos
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-yellow-400/20 text-yellow-200 border border-yellow-400/40">
                  Master Admin Exclusivo
                </span>
              </div>
              <p className="text-sm text-blue-200 mt-1">
                Controle supremo de privilégios. Somente o Master Admin Gustavo Costa Berbert (
                <span className="font-mono text-yellow-300">gcostabe@emeal.nttdata.com</span> /{" "}
                <span className="font-mono text-yellow-300">gustavo.costa.berbert@nttdata.com</span>
                ) pode elencar ou revogar novos administradores (Windows ou Mac).
              </p>
            </div>
          </div>
          <button
            onClick={loadRbacUsers}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-lg text-xs font-medium text-white transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Abas de Navegação Administrativa */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("synapses")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
            activeTab === "synapses"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>🧠 Curadoria de Sinapses Cognitivas (Neuroplasticidade Federada)</span>
          {learnings.filter((l) => l.status === "PENDING_REVIEW").length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
              {learnings.filter((l) => l.status === "PENDING_REVIEW").length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rbac")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
            activeTab === "rbac"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>🛡️ Controle de Acessos &amp; Compilação Desktop (.dmg / .msi)</span>
        </button>
      </div>

      {/* ABA 1: CURADORIA DE SINAPSES COGNITIVAS (CENÁRIO 1) */}
      {activeTab === "synapses" && (
        <div className="space-y-6">
          {/* Card Arquitetura do Cenário 1: Zero Impacto de Permissões */}
          <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/50 p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-100 pb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    Neuroplasticidade Federada via GitHub (Cenário 1)
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Zero Permissões para Usuários Finais
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                    Quando o assistente local se auto-corrige, a nova sinapse é gravada na outbox local e enviada como <strong>GitHub Issue</strong>. 
                    Nenhum colaborador precisa de permissão de commit. O Master Admin aprova e compila o pacote <code>.pack</code>, e todas as máquinas instaladas sincronizam via <strong>Releases públicas</strong> em menos de 2 segundos.
                  </p>
                </div>
              </div>

              {/* Botão de atualização rápida */}
              <button
                type="button"
                onClick={loadLearnings}
                disabled={loadingLearnings}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingLearnings ? "animate-spin" : ""}`} />
                Atualizar Sinapses
              </button>
            </div>

            {/* Barra de Ações Rápidas de Distribuição */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePublishPack}
                disabled={publishingPack}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {publishingPack ? "Compilando Pacote..." : "📦 Compilar Pacote Global (.pack)"}
              </button>

              <a
                href={learningsApi.downloadPackUrl}
                download="axet_cognitive_synapses_latest.pack"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                Baixar Pacote Compilado
              </a>

              <button
                type="button"
                onClick={handleSyncGlobalPack}
                disabled={syncingPack}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                {syncingPack ? "Sincronizando..." : "⚡ Sincronizar Sinapses Oficiais (Zero Permissões)"}
              </button>

              <label className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                Importar Arquivo .pack / .json
                <input
                  type="file"
                  accept=".pack,.json"
                  onChange={handleImportPackFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Filtros e Contagem */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtro:
              </span>
              {(["all", "pending", "approved"] as const).map((filter) => {
                const count =
                  filter === "all"
                    ? learnings.length
                    : filter === "pending"
                    ? learnings.filter((l) => l.status === "PENDING_REVIEW").length
                    : learnings.filter((l) => l.status === "APPROVED").length;
                const label =
                  filter === "all"
                    ? "Todas"
                    : filter === "pending"
                    ? "Pendentes de Curadoria"
                    : "Aprovadas no Grafo";
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSynapseFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      synapseFilter === filter
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lista de Sinapses */}
          <div className="space-y-3">
            {learnings
              .filter((l) => {
                if (synapseFilter === "pending") return l.status === "PENDING_REVIEW";
                if (synapseFilter === "approved") return l.status === "APPROVED";
                return true;
              })
              .map((item) => {
                const isPending = item.status === "PENDING_REVIEW";
                const isApproved = item.status === "APPROVED";
                const isRejected = item.status === "REJECTED";
                const isEditing = editingId === item.canonical_id;

                return (
                  <div
                    key={item.canonical_id}
                    className={`rounded-xl border p-4 shadow-sm transition ${
                      isPending
                        ? "border-amber-300 bg-amber-50/20"
                        : isApproved
                        ? "border-emerald-300 bg-emerald-50/15"
                        : "border-slate-200 bg-white opacity-70"
                    }`}
                  >
                    {/* Cabeçalho do Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                          <Zap className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{item.concept}</span>
                            <code className="text-[11px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                              {item.canonical_id}
                            </code>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleString("pt-BR")
                              : "Recentemente"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {item.github_issue_number ? (
                          <a
                            href={item.github_issue_url || `https://github.com/gcostabe/AXET-NEURALGRAPH-3D/issues/${item.github_issue_number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Issue #{item.github_issue_number}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
                            Outbox Local
                          </span>
                        )}

                        {isPending && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            Aguardando Aprovação
                          </span>
                        )}
                        {isApproved && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Aprovada no Grafo
                          </span>
                        )}
                        {isRejected && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            Rejeitada
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Conteúdo da Sinapse */}
                    <div className="mt-3 space-y-2 text-xs">
                      {item.mistake && (
                        <div>
                          <span className="font-semibold text-rose-600">Equívoco Superado no Raciocínio: </span>
                          <span className="text-slate-600 line-through">{item.mistake}</span>
                        </div>
                      )}

                      {!isEditing ? (
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="font-bold text-emerald-700 block mb-1">
                            Correção Canônica Adotada:
                          </span>
                          <p className="text-slate-800 leading-relaxed">{item.correction}</p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-200 space-y-2">
                          <label className="block font-semibold text-slate-700">
                            Refinar Conceito:
                          </label>
                          <input
                            type="text"
                            value={editConcept}
                            onChange={(e) => setEditConcept(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                          />
                          <label className="block font-semibold text-slate-700">
                            Refinar Correção Canônica:
                          </label>
                          <textarea
                            rows={3}
                            value={editCorrection}
                            onChange={(e) => setEditCorrection(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* Rodapé de Ações de Curadoria */}
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <GitCommit className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Tipo de Sinapse: <strong>{item.synapse_type || "RETIFICA_CONCEITO"}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleReviewSynapse(
                                  item.canonical_id,
                                  "approve",
                                  editConcept,
                                  editCorrection
                                )
                              }
                              disabled={reviewingId === item.canonical_id}
                              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Salvar &amp; Aprovar
                            </button>
                          </>
                        ) : (
                          <>
                            {isPending && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingId(item.canonical_id);
                                    setEditConcept(item.concept);
                                    setEditCorrection(item.correction);
                                  }}
                                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
                                >
                                  Editar / Refinar
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReviewSynapse(item.canonical_id, "reject")
                                  }
                                  disabled={reviewingId === item.canonical_id}
                                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 rounded disabled:opacity-50"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  Rejeitar
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReviewSynapse(item.canonical_id, "approve")
                                  }
                                  disabled={reviewingId === item.canonical_id}
                                  className="flex items-center gap-1 px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold shadow-sm disabled:opacity-50"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  {reviewingId === item.canonical_id ? "Aprovando..." : "Aprovar Sinapse"}
                                </button>
                              </>
                            )}
                            {isApproved && (
                              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Ativa no Grafo Neural Local
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {learnings.length === 0 && !loadingLearnings && (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-white">
                <Brain className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">Nenhuma sinapse cognitiva registrada ainda</p>
                <p className="text-xs text-slate-500 mt-1">
                  Quando o modelo se auto-corrigir durante as conversas, as novas sinapses aparecerão automaticamente aqui para validação.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ABA 2: RBAC & COMPILAÇÃO DESKTOP */}
      {activeTab === "rbac" && (
        <div className="space-y-6">
          {/* Card de Automação: Compilar e Publicar Versão Desktop (.dmg / .msi) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl border border-indigo-500/30 p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-800/40 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  🚀 Compilação e Distribuição Desktop (.dmg &amp; .msi)
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-semibold whitespace-nowrap shrink-0">
                  1-Clique Automático
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Dispara a compilação simultânea na nuvem do instalador para Mac (.dmg Universal) e Windows (.msi corporativo) e anexa nas Releases corporativas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400">Tag:</span>
              <input
                type="text"
                value={buildVersion}
                onChange={(e) => setBuildVersion(e.target.value)}
                placeholder="v1.0.0"
                className="pl-11 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-400 outline-none w-28"
              />
            </div>
            <button
              onClick={handleTriggerDesktopBuild}
              disabled={triggeringBuild || !buildVersion.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition disabled:opacity-50 whitespace-nowrap"
            >
              <Rocket className={`w-3.5 h-3.5 ${triggeringBuild ? "animate-bounce" : ""}`} />
              {triggeringBuild ? "Iniciando..." : "Disparar Compilação na Nuvem"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-1">
          <a
            href="https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases/latest/download/AXET-NeuralGraph.dmg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs text-slate-200"
          >
            <Download className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-white">🍏 Download macOS (.dmg)</div>
              <div className="text-[10px] text-slate-400 truncate">Link fixo da última versão</div>
            </div>
          </a>

          <a
            href="https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases/latest/download/AXET-NeuralGraph-Setup.msi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs text-slate-200"
          >
            <Download className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-white">🪟 Download Windows (.msi)</div>
              <div className="text-[10px] text-slate-400 truncate">Link fixo corporativo silencioso</div>
            </div>
          </a>

          <a
            href="https://github.com/gcostabe/AXET-NEURALGRAPH-3D/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs text-slate-200"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-white">📊 Monitor de Builds (Actions)</div>
              <div className="text-[10px] text-slate-400 truncate">Ver progresso no GitHub</div>
            </div>
          </a>
        </div>
      </div>

      {/* Formulário: Adicionar Novo Administrador */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-blue-600" />
          Elencar Novo Administrador Delegado
        </h3>
        <form onSubmit={handleGrantAdmin} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                E-mail Corporativo Okta (NTT DATA) *
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="colaborador@emeal.nttdata.com"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Observações / Justificativa (Opcional)
              </label>
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Ex.: Responsável Ingestão Vídeos Windows / Líder Técnico"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !emailInput.trim()}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              {submitting ? "Processando..." : "Conceder Privilégios de Administrador"}
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Administradores Ativos */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            Quadro de Administradores Autorizados ({users.length})
          </h3>
          <span className="text-xs text-slate-500">
            Administradores têm acesso a Ingestão OneDrive e Publicação de Bases.
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {users.map((u) => (
            <div
              key={u.email}
              className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                u.is_master ? "bg-amber-50/40" : "hover:bg-slate-50/70"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-sm text-slate-900">{u.email}</span>
                  {u.is_master ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                      <Crown className="w-3 h-3 text-amber-600" />
                      MASTER ADMIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <ShieldCheck className="w-3 h-3 text-indigo-500" />
                      ADMIN DELEGADO
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>
                    Concedido por:{" "}
                    <strong className="text-slate-700">{u.granted_by || "Sistema"}</strong>
                  </span>
                  {u.created_at && (
                    <span>
                      Data:{" "}
                      {new Date(u.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                {u.notes && <p className="text-xs text-slate-600 italic">“{u.notes}”</p>}
              </div>

              <div>
                {u.is_master ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/60 text-amber-800 text-xs font-medium border border-amber-200/80">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    Papel Imutável
                  </div>
                ) : (
                  <button
                    onClick={() => handleRevokeAdmin(u.email)}
                    disabled={revokingEmail === u.email}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 rounded-lg border border-red-200 transition disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {revokingEmail === u.email ? "Revogando..." : "Revogar Acesso"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {users.length === 0 && !loading && (
            <div className="p-8 text-center text-slate-500 text-sm">
              Nenhum administrador encontrado.
            </div>
          )}
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
