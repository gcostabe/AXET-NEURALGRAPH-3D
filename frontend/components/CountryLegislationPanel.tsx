"use client";

import { useEffect, useRef, useState } from "react";
import {
  Globe2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Play,
  ArrowRight,
  Sparkles,
  Search,
  Database,
  Building2,
  PlusCircle,
  X,
} from "lucide-react";
import {
  adminApi,
  CountryOption,
  LegislationCountriesResponse,
  LegislationSyncStatus,
  ApiError,
} from "@/lib/api";

interface CountryLegislationPanelProps {
  onTriggerReindex?: () => void;
}

export default function CountryLegislationPanel({ onTriggerReindex }: CountryLegislationPanelProps) {
  const [data, setData] = useState<LegislationCountriesResponse | null>(null);
  const [activeCountryId, setActiveCountryId] = useState<string>("brasil");
  const [displayedCountry, setDisplayedCountry] = useState<CountryOption | null>(null);
  
  // Estado de troca / busca por IA
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [discovering, setDiscovering] = useState(false);
  const [discoveredCountry, setDiscoveredCountry] = useState<CountryOption | null>(null);

  const [statusData, setStatusData] = useState<LegislationSyncStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const logTerminalRef = useRef<HTMLDivElement>(null);

  async function loadCountries(targetCountryId?: string) {
    setLoading(true);
    try {
      const res = await adminApi.getLegislationCountries();
      setData(res);
      const activeId = res.active_country || "brasil";
      setActiveCountryId(activeId);

      const toShow = targetCountryId || activeId;
      const found = res.countries.find((c) => c.id === toShow);
      if (found) {
        setDisplayedCountry(found);
      } else if (res.countries.length > 0) {
        setDisplayedCountry(res.countries[0]);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Falha ao carregar configuração de legislação.");
    } finally {
      setLoading(false);
    }
  }

  async function pollStatus() {
    try {
      const st = await adminApi.getLegislationSyncStatus();
      setStatusData(st);
      if (st.status === "completed" && st.country_id) {
        setActiveCountryId(st.country_id);
      }
    } catch {
      // polling silencioso
    }
  }

  useEffect(() => {
    loadCountries();
    pollStatus();
  }, []);

  useEffect(() => {
    if (statusData?.status === "running") {
      const timer = setInterval(pollStatus, 1000);
      return () => clearInterval(timer);
    }
  }, [statusData?.status]);

  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [statusData?.logs]);

  // Função disparada quando o administrador pesquisa um novo país com o LLM
  async function handleDiscoverCountry(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setDiscovering(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const result = await adminApi.discoverCountryLegislation(searchQuery.trim());
      setDiscoveredCountry(result);
      setDisplayedCountry(result);
      setSuccessMsg(
        `A IA mapeou com sucesso os órgãos reguladores e portais oficiais de ${result.name} ${result.flag_emoji}! O botão de atualização foi liberado.`
      );
      setShowSearchModal(false);
      // Recarrega lista para incluir o novo país salvo
      await loadCountries(result.id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao pesquisar órgãos reguladores com a IA.");
    } finally {
      setDiscovering(false);
    }
  }

  // Dispara a sincronização e substituição mono-país
  async function handleStartSync(countryToSyncId?: string) {
    const targetId = countryToSyncId || displayedCountry?.id;
    if (!targetId) return;

    setTriggering(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await adminApi.triggerLegislationSync(targetId);
      setSuccessMsg(res.message);
      await pollStatus();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao iniciar sincronização.");
    } finally {
      setTriggering(false);
    }
  }

  const isRunning = statusData?.status === "running";
  const isCurrentActive = displayedCountry?.id === activeCountryId;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-sky-500/20 text-sky-400 border border-sky-500/30 shadow-inner">
            <Globe2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Legislação & Regulação por País
              </h2>
              <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded-full">
                Mono-País Ativo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              O sistema opera com uma jurisdição ativa por vez. Selecione ou informe qualquer país para mapear os órgãos reguladores oficiais e normas aplicáveis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Botão de Trocar País com IA */}
          <button
            onClick={() => {
              setShowSearchModal(!showSearchModal);
              setError(null);
            }}
            disabled={isRunning || discovering}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-medium text-xs px-4 py-2 shadow-lg shadow-blue-500/20 transition active:scale-[0.99] disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Trocar / Configurar País</span>
          </button>

          <button
            onClick={() => {
              loadCountries(displayedCountry?.id);
              pollStatus();
            }}
            disabled={loading || isRunning}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-700 bg-slate-800/70 px-3 py-2 rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
            title="Recarregar portais cadastrados"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Caixa de Pesquisa / Troca de País via LLM (Expansível) */}
      {showSearchModal && (
        <div className="rounded-xl border border-blue-500/40 bg-slate-950 p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-100">
                Mapear Órgãos Reguladores e Leis de Seguros por País
              </h3>
            </div>
            <button
              onClick={() => setShowSearchModal(false)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Informe o nome de qualquer país (ex.: <strong>Espanha</strong>, <strong>México</strong>, <strong>Portugal</strong>, <strong>Estados Unidos</strong>, <strong>Colômbia</strong>, etc.). O modelo estruturará as agências reguladoras oficiais, links governamentais e leis canônicas de seguros e preencherá a tela para validação e atualização local.
          </p>

          <form onSubmit={handleDiscoverCountry} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o nome do país desejado..."
                disabled={discovering}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={discovering || !searchQuery.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition disabled:opacity-50 shrink-0"
            >
              {discovering ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Mapeando órgãos e normas oficiais...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Mapear Órgãos Reguladores</span>
                </>
              )}
            </button>
          </form>

          {/* Atalhos para Países já cadastrados */}
          {data && data.countries.length > 1 && (
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 mr-2">Países já mapeados no sistema:</span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {data.countries.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setDisplayedCountry(c);
                      setShowSearchModal(false);
                    }}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition ${
                      displayedCountry?.id === c.id
                        ? "border-blue-500 bg-blue-950/40 text-blue-300"
                        : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {c.flag_emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cartão de Resumo do País em Exibição / Preenchido na Tela */}
      {displayedCountry && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl filter drop-shadow">{displayedCountry.flag_emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-100">{displayedCountry.name}</h3>
                  {isCurrentActive ? (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-2.5 w-2.5" /> ATIVO NO SISTEMA
                    </span>
                  ) : (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      PRONTO PARA ATUALIZAÇÃO
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Autoridade Reguladora:{" "}
                  <span className="text-slate-200 font-medium">
                    {displayedCountry.primary_regulator}
                  </span>{" "}
                  | Moeda: <span className="font-mono text-slate-300">{displayedCountry.currency}</span>
                </p>
              </div>
            </div>

            {/* Se houver mais de um país cadastrado, seletor rápido */}
            {data && data.countries.length > 1 && (
              <div className="flex items-center gap-1.5">
                {data.countries.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setDisplayedCountry(c)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                      displayedCountry.id === c.id
                        ? "border-blue-500 bg-blue-950 text-blue-300 font-semibold"
                        : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {c.flag_emoji} {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Portais Oficiais Preenchidos na Tela */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-blue-400" />
                Agências Reguladoras & Portais Oficiais Mapeados ({displayedCountry.portals.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                Fontes governamentais que serão consultadas durante a sincronização
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedCountry.portals.map((portal) => (
                <div
                  key={portal.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {portal.agency_name}
                    </span>
                    <a
                      href={portal.official_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 shrink-0 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/40 hover:bg-sky-900/40 transition"
                      title="Abrir portal oficial na internet"
                    >
                      <span>Acessar Portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {portal.scope_description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/70">
                    <span className="text-[10px] font-mono text-amber-300/90 bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-900/40 flex items-center gap-1">
                      <FileText className="h-2.5 w-2.5" />
                      {portal.target_filename}
                    </span>
                    {portal.topics.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Atualização Liberado */}
          <div className="rounded-xl border border-blue-900/50 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2 justify-center sm:justify-start">
                <Play className="h-4 w-4 text-emerald-400 fill-current" />
                Atualizar e Sincronizar Legislação de {displayedCountry.name} ({displayedCountry.flag_emoji})
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                O LLM fará a busca e coleta nos portais oficiais listados, gerará os documentos Markdown e{" "}
                <span className="text-amber-300 font-medium">
                  substituirá a pasta de legislação ativa ({displayedCountry.name} passará a ser o país em vigor no RAG)
                </span>.
              </p>
            </div>

            <button
              onClick={() => handleStartSync(displayedCountry.id)}
              disabled={isRunning || triggering}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-3 shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Sincronizando Portais...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Iniciar Coleta & Substituição</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Monitor Visual em Tempo Real (Barra de Progresso e Terminal de Logs) */}
      {(isRunning || (statusData && statusData.status !== "idle")) && (
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-sky-400" />
              <span className="text-xs font-semibold text-slate-200">
                Acompanhamento em Tempo Real do Processo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  statusData?.status === "running"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                    : statusData?.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-red-500/20 text-red-300 border border-red-500/40"
                }`}
              >
                {statusData?.status === "running"
                  ? "EM EXECUÇÃO"
                  : statusData?.status === "completed"
                  ? "CONCLUÍDO"
                  : "FALHOU"}
              </span>
              <span className="text-xs font-mono text-sky-400">{statusData?.percent || 0}%</span>
            </div>
          </div>

          {/* Barra de Progresso com Gradiente */}
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${statusData?.percent || 0}%` }}
            />
          </div>

          <div className="text-xs text-slate-300 flex items-center justify-between">
            <span className="truncate">{statusData?.current_step}</span>
            {statusData?.current_portal && (
              <span className="text-slate-400 text-[11px] shrink-0 font-mono">
                Portal: {statusData.current_portal}
              </span>
            )}
          </div>

          {/* Terminal de Logs Escuro */}
          <div
            ref={logTerminalRef}
            className="h-48 overflow-y-auto rounded-xl border border-slate-800 bg-black/95 p-3.5 font-mono text-[11px] space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {statusData?.logs.length === 0 ? (
              <p className="text-slate-500 italic">Iniciando tarefas de conexão com portais oficiais...</p>
            ) : (
              statusData?.logs.map((log, i) => (
                <div key={i} className="leading-relaxed flex items-start gap-2">
                  <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                  <span
                    className={`font-bold shrink-0 text-[10px] px-1 rounded ${
                      log.level === "SUCCESS"
                        ? "text-emerald-400 bg-emerald-950/40"
                        : log.level === "WARN"
                        ? "text-amber-400 bg-amber-950/40"
                        : log.level === "ERROR"
                        ? "text-red-400 bg-red-950/40"
                        : "text-blue-400 bg-blue-950/40"
                    }`}
                  >
                    [{log.tag}]
                  </span>
                  <span
                    className={`${
                      log.level === "SUCCESS"
                        ? "text-slate-200 font-medium"
                        : log.level === "WARN"
                        ? "text-amber-200/90"
                        : log.level === "ERROR"
                        ? "text-red-300"
                        : "text-slate-400"
                    }`}
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Sucesso pós-conclusão */}
          {statusData?.status === "completed" && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  {statusData.generated_files.length} documentos da regulação de{" "}
                  <strong>{displayedCountry?.name}</strong> ativos e prontos no diretório de fontes.
                </span>
              </div>

              {onTriggerReindex && (
                <button
                  onClick={onTriggerReindex}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 shadow-lg shadow-emerald-900/30 transition"
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>Reindexar RAG Agora</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
