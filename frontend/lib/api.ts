import { getToken, clearToken } from "./auth";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      // ignore
    }

    if (res.status === 401 && typeof window !== "undefined" && !path.includes("/auth/login")) {
      clearToken();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login?expired=1";
      }
    }

    throw new ApiError(res.status, detail);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export interface UserOut {
  id: string;
  email: string;
  status: "pending" | "approved" | "blocked";
  role: "admin" | "user";
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  role: "admin" | "user";
  status: "pending" | "approved" | "blocked";
}

export interface OktaDeviceAuthStartResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

export interface OktaPollResponse {
  status: "pending" | "slow_down" | "expired" | "success" | "error";
  detail?: string | null;
  access_token?: string | null;
  token_type?: string;
  role?: "admin" | "user" | null;
  user_status?: "pending" | "approved" | "blocked" | null;
  email?: string | null;
  user_name?: string | null;
}

export interface GatewayAuthStatusResponse {
  status: string;
  authenticated: boolean;
  expires_at: number;
  remaining_seconds: number;
  email?: string | null;
  display_name?: string | null;
  login?: string | null;
  okta_id?: string | null;
  tenant?: string | null;
  org?: string | null;
  role?: string | null;
  idp?: string | null;
  gateway_url?: string | null;
  gateway_port?: number | null;
  gateway_online?: boolean | null;
  auto_refresh?: boolean | null;
  last_sync?: string | null;
  refreshed?: boolean | null;
}

export interface TokenSummaryOut {
  total_tokens: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_messages: number;
  total_conversations: number;
  total_users: number;
  usage_by_model: Record<string, number>;
}

export interface UserTokenUsageOut {
  user_id: string;
  email: string;
  role: string;
  conversation_count: number;
  message_count: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  last_active_at?: string | null;
}

export interface SessionTokenUsageOut {
  conversation_id: string;
  title: string;
  user_email: string;
  message_count: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface SourceRef {
  source_path: string;
  title?: string;
}

export interface MessageFeedback {
  id?: string;
  rating: "like" | "dislike";
  reason?: string | null;
  comment?: string | null;
  curation_status?: string;
}

export interface MessageOut {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources: SourceRef[] | null;
  created_at: string;
  feedback?: MessageFeedback | null;
}

export interface SourcesConfig {
  relative_path: string;
  resolved_path: string;
  sources_root: string;
}

export interface BrowseResult {
  relative_path: string;
  subdirectories: string[];
  markdown_files_here: number;
  is_root: boolean;
}

export interface ReindexProgress {
  phase?: "discovering" | "parsing" | "embedding" | "completed";
  current_file?: string;
  processed?: number;
  skipped?: number;
  remaining_files?: number;
  errors?: number;
  total_files?: number;
  total_chunks?: number;
  speed?: number;
  speed_files?: number;
  started_at?: string;
  eta_seconds?: number | null;
  eta_iso?: string | null;
}

export interface ReindexStatus {
  status: "never_run" | "running" | "interrupted" | "success" | "error" | "unknown";
  detail?: Record<string, unknown> | null;
  started_at?: string | null;
  finished_at?: string | null;
  mode?: "incremental" | "full";
  progress?: ReindexProgress | null;
}

export interface AuditLogEntry {
  id: string;
  actor_user_id: string;
  action: string;
  target_user_id: string | null;
  metadata_json: Record<string, unknown> | null;
  created_at: string;
}

export const authApi = {
  register: (email: string, password: string) =>
    request<UserOut>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<UserOut>("/auth/me"),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<void>("/auth/me/password", {
      method: "PUT",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    }),
  oktaStart: () =>
    request<OktaDeviceAuthStartResponse>("/auth/okta/start", {
      method: "POST",
    }),
  oktaPoll: (device_code: string) =>
    request<OktaPollResponse>("/auth/okta/poll", {
      method: "POST",
      body: JSON.stringify({ device_code }),
    }),
  oktaStatus: () =>
    request<GatewayAuthStatusResponse>("/auth/okta/status"),
  oktaRefresh: () =>
    request<GatewayAuthStatusResponse>("/auth/okta/refresh", {
      method: "POST",
    }),
};

export interface SmartGreetingResponse {
  greeting: string;
  has_history: boolean;
  subject: string | null;
  conversation_id: string | null;
  user_name: string;
  time_greeting: string;
}

export const conversationsApi = {
  list: () => request<Conversation[]>("/conversations"),
  messages: (conversationId: string) =>
    request<MessageOut[]>(`/conversations/${conversationId}/messages`),
  getGreeting: () => request<SmartGreetingResponse>("/conversations/greeting"),
  delete: (conversationId: string) =>
    request<void>(`/conversations/${conversationId}`, { method: "DELETE" }),
  rename: (conversationId: string, title: string) =>
    request<Conversation>(`/conversations/${conversationId}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    }),
};

export interface ChatSuggestion {
  id: string;
  title: string;
  desc: string;
  topic: string;
  source_path: string;
  icon: string;
}

export const chatApi = {
  getSuggestions: (refresh = false) =>
    request<ChatSuggestion[]>(`/chat/suggestions${refresh ? `?refresh=true&t=${Date.now()}` : ""}`),
  sendFeedback: (messageId: string, rating: "like" | "dislike", reason?: string, comment?: string) =>
    request<{ status: string; feedback_id: string }>(`/chat/messages/${messageId}/feedback`, {
      method: "POST",
      body: JSON.stringify({ rating, reason, comment }),
    }),
};

export interface FeedbackItem {
  id: string;
  message_id: string;
  user_id: string;
  user_email?: string | null;
  rating: "like" | "dislike";
  reason?: string | null;
  comment?: string | null;
  curation_status: string;
  ai_diagnosis?: {
    root_cause?: string;
    confidence?: number;
    summary?: string;
    suggested_action?: string;
    recommended_rule_title?: string;
    raw?: string;
  } | null;
  curator_notes?: string | null;
  resolved_at?: string | null;
  created_at: string;
  user_prompt: string;
  assistant_response: string;
  sources?: any;
}

export const adminApi = {
  listUsers: (statusFilter?: string) =>
    request<UserOut[]>(
      `/admin/users${statusFilter ? `?status_filter=${statusFilter}` : ""}`,
    ),
  approve: (userId: string) =>
    request<UserOut>(`/admin/users/${userId}/approve`, { method: "POST" }),
  block: (userId: string) =>
    request<UserOut>(`/admin/users/${userId}/block`, { method: "POST" }),
  changeRole: (userId: string, role: string) =>
    request<UserOut>(`/admin/users/${userId}/role`, {
      method: "POST",
      body: JSON.stringify({ role }),
    }),
  userConversations: (userId: string) =>
    request<Conversation[]>(`/admin/users/${userId}/conversations`),
  auditLog: () => request<AuditLogEntry[]>("/admin/audit-log"),
  getSourcesConfig: () => request<SourcesConfig>("/admin/sources-config"),
  browseSourcesDir: (relativePath: string) =>
    request<BrowseResult>(
      `/admin/sources-config/browse?relative_path=${encodeURIComponent(relativePath)}`,
    ),
  updateSourcesConfig: (relativePath: string) =>
    request<SourcesConfig>("/admin/sources-config", {
      method: "PUT",
      body: JSON.stringify({ relative_path: relativePath }),
    }),
  syncOneDrive: async (source_dir?: string, target_subfolder?: string) => {
    const payload = { source_dir, target_subfolder };
    try {
      return await request<SyncOneDriveResponse>(
        "/admin/sources/sync-onedrive",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
    } catch {
      const res = await fetch("http://localhost:8765/sync-onedrive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return (await res.json()) as SyncOneDriveResponse;
    }
  },
  triggerReindex: (mode: "incremental" | "full") =>
    request<{ status: string; relative_path: string; mode: string }>(
      `/admin/sources-config/reindex?mode=${mode}`,
      { method: "POST" },
    ),
  getReindexStatus: () =>
    request<ReindexStatus>("/admin/sources-config/reindex-status"),
  uploadSourcesFolder: async (files: File[], relativePaths: string[]) => {
    const token = getToken();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      formData.append("relative_paths", relativePaths[i]);
    }
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}/admin/sources/upload-folder`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const body = await res.json();
        detail = body.detail || detail;
      } catch {}
      throw new ApiError(res.status, detail);
    }
    return res.json() as Promise<{ saved: number; total: number }>;
  },
  getFeedbacks: (rating?: string, curationStatus?: string) => {
    const params = new URLSearchParams();
    if (rating) params.append("rating", rating);
    if (curationStatus) params.append("curation_status", curationStatus);
    const qs = params.toString();
    return request<FeedbackItem[]>(`/admin/feedbacks${qs ? `?${qs}` : ""}`);
  },
  curateFeedback: (feedbackId: string, status: string, curatorNotes?: string) =>
    request<{ status: string; curation_status: string }>(`/admin/feedbacks/${feedbackId}/curate`, {
      method: "POST",
      body: JSON.stringify({ status, curator_notes: curatorNotes }),
    }),
  createGoldAnswer: (feedbackId: string, question: string, approvedAnswer: string) =>
    request<{ status: string; source_path: string; curation_status: string; message: string }>(
      `/admin/feedbacks/${feedbackId}/create-gold-answer`,
      {
        method: "POST",
        body: JSON.stringify({ question, approved_answer: approvedAnswer }),
      },
    ),

  // Legislação & Regulação por País Ativo
  getLegislationCountries: () => request<LegislationCountriesResponse>("/admin/legislation/countries"),
  discoverCountryLegislation: (countryName: string) =>
    request<CountryOption>("/admin/legislation/discover", {
      method: "POST",
      body: JSON.stringify({ country_name: countryName }),
    }),
  saveCustomCountry: (country: CountryOption) =>
    request<{ status: string; country_id: string; country_name: string }>("/admin/legislation/save-country", {
      method: "POST",
      body: JSON.stringify(country),
    }),
  triggerLegislationSync: (country: string) =>
    request<{ status: string; country: string; message: string }>("/admin/legislation/sync", {
      method: "POST",
      body: JSON.stringify({ country }),
    }),
  getLegislationSyncStatus: () => request<LegislationSyncStatus>("/admin/legislation/status"),

  // Glossário De ➔ Para & Impacto Regulatório
  getGlossaryPairs: () => request<GlossaryPair[]>("/admin/glossary"),
  createGlossaryPair: (data: Omit<GlossaryPair, "id">) =>
    request<GlossaryPair>("/admin/glossary", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateGlossaryPair: (id: number, data: Omit<GlossaryPair, "id">) =>
    request<GlossaryPair>(`/admin/glossary/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteGlossaryPair: (id: number) =>
    request<{ status: string; message: string }>(`/admin/glossary/${id}`, {
      method: "DELETE",
    }),
  getRegulatoryImpact: () => request<RegulatoryImpactData>("/admin/regulatory-impact"),

  // Telemetria e Uso de Tokens
  getTokenSummary: () => request<TokenSummaryOut>("/admin/tokens/summary"),
  getTokenUsageByUsers: () => request<UserTokenUsageOut[]>("/admin/tokens/users"),
  getTokenUsageBySessions: () => request<SessionTokenUsageOut[]>("/admin/tokens/sessions"),

  // Processamento e Ingestão de Vídeos (.md com OCR/Visão vs Somente Áudio)
  getVideoSettings: () => request<VideoSettings>("/admin/video/settings"),
  updateVideoSettings: (data: Partial<VideoSettings>) =>
    request<VideoSettings>("/admin/video/settings", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  listVideos: () => request<VideoItem[]>("/admin/video/list"),
  getVideoStatus: () => request<VideoJobStatus>("/admin/video/status"),
  processVideo: (videoRelativePath: string, modeOverride?: string) =>
    request<{ status: string; video: string; mode_requested: string }>(
      "/admin/video/process",
      {
        method: "POST",
        body: JSON.stringify({
          video_relative_path: videoRelativePath,
          mode_override: modeOverride,
        }),
      }
    ),
};


export interface KnowledgeNode {
  source_path: string;
  title: string;
  summary: string;
  topics: string[];
  updated_at?: string | null;
}

export interface KnowledgeEdge {
  id: string;
  source_path: string;
  target_path: string;
  relation_type: string;
  description: string;
  weight: number;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export interface KnowledgeConflict {
  id: string;
  source_path_new: string;
  source_path_existing: string;
  conflict_type: string;
  explanation: string;
  resolved: boolean;
  resolution_strategy?: string | null;
  resolution_details?: string | null;
  resolved_at?: string | null;
  created_at?: string | null;
}

export interface CuratorSuggestion {
  recommended_option: "prevalence_new" | "prevalence_existing" | "synthesize_rule";
  recommended_winner_path?: string | null;
  analysis: string;
  draft_filename: string;
  draft_markdown: string;
}

export interface WatcherStatus {
  is_running: boolean;
  watched_path: string;
  total_events_detected: number;
  last_event?: { path: string; action: string; timestamp: string } | null;
  last_sync_time?: string | null;
}

export const knowledgeApi = {
  getGraph: () => request<KnowledgeGraph>("/knowledge/graph"),
  getConflicts: () => request<KnowledgeConflict[]>("/admin/knowledge/conflicts"),
  getCuratorSuggestion: (conflictId: string) =>
    request<CuratorSuggestion>(`/admin/knowledge/conflicts/${conflictId}/curator-suggest`),
  resolveWithPrevalence: (conflictId: string, winnerPath: string, reason?: string) =>
    request<{ status: string; conflict_id: string; strategy: string }>(
      `/admin/knowledge/conflicts/${conflictId}/resolve-prevalence`,
      {
        method: "POST",
        body: JSON.stringify({ winner_path: winnerPath, reason: reason || "" }),
      },
    ),
  resolveWithSynthesizedRule: (conflictId: string, filename: string, markdownContent: string) =>
    request<{ status: string; conflict_id: string; strategy: string }>(
      `/admin/knowledge/conflicts/${conflictId}/resolve-synthesize`,
      {
        method: "POST",
        body: JSON.stringify({ filename, markdown_content: markdownContent }),
      },
    ),
  resolveWithUpload: async (conflictId: string, file: File) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}/admin/knowledge/conflicts/${conflictId}/resolve-upload`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const body = await res.json();
        detail = body.detail || detail;
      } catch {}
      throw new ApiError(res.status, detail);
    }
    return res.json() as Promise<{ status: string; conflict_id: string; strategy: string }>;
  },
  resolveConflict: (conflictId: string) =>
    request<{ status: string; conflict_id: string; resolved: boolean }>(
      `/admin/knowledge/conflicts/${conflictId}/resolve`,
      { method: "POST" },
    ),
  getWatcherStatus: () => request<WatcherStatus>("/admin/knowledge/watcher-status"),
};

export interface OfficialPortal {
  id: string;
  agency_name: string;
  official_url: string;
  scope_description: string;
  target_filename: string;
  target_title: string;
  topics: string[];
}

export interface CountryOption {
  id: string;
  name: string;
  flag_emoji: string;
  currency: string;
  primary_regulator: string;
  portal_count: number;
  portals: OfficialPortal[];
}

export interface LegislationCountriesResponse {
  active_country: string;
  countries: CountryOption[];
}

export interface LegislationLogEntry {
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARN" | "ERROR" | "DEBUG";
  tag: string;
  message: string;
}

export interface LegislationSyncStatus {
  status: "idle" | "running" | "completed" | "failed";
  country_id: string;
  percent: number;
  current_step: string;
  current_portal?: string | null;
  logs: LegislationLogEntry[];
  generated_files: string[];
  started_at?: string | null;
  finished_at?: string | null;
}

export interface GlossaryPair {
  id: number;
  jargon: string;
  formal_term: string;
  definition: string;
  legal_basis: string;
}

export interface RegulatoryImpactModule {
  id: string;
  name: string;
  rule: string;
}

export interface RegulatoryImpactData {
  title: string;
  country: string;
  last_updated: string;
  content: string;
  modules_summary: RegulatoryImpactModule[];
}

export interface VideoSettings {
  mode: "multimodal_ocr" | "audio_only";
  frame_interval_seconds: number;
  whisper_model: string;
  language: string;
  max_frames: number;
}

export interface VideoItem {
  name: string;
  relative_path: string;
  parent_dir: string;
  size_mb: number;
  modified_at: string;
  has_markdown: boolean;
  markdown_files: string[];
}

export interface VideoJobStatus {
  status: "idle" | "running" | "completed" | "failed";
  current_video?: string | null;
  mode?: string | null;
  progress: number;
  stage?: string | null;
  detail?: string | null;
  started_at?: string | null;
  finished_at?: string | null;
  logs: string[];
  error?: string | null;
}

export interface SnapshotItem {
  filename: string;
  file_type: "bundle" | "raw_snapshot";
  size_bytes: number;
  size_mb: number;
  created_at: string;
  sha256: string;
  points_count?: number | null;
  documents_count?: number | null;
  exported_by?: string | null;
}

export interface SnapshotStatus {
  collection_name: string;
  points_count: number;
  vectors_count: number;
  vector_size?: number | null;
  status: string;
  latest_snapshot?: string | null;
  documents_count: number;
  edges_count: number;
}

export interface ImportResult {
  success: boolean;
  message: string;
  filename: string;
  sha256: string;
  points_count: number;
  documents_restored: number;
  edges_restored: number;
}

export interface RemoteSyncProgress {
  is_running: boolean;
  stage: "idle" | "downloading" | "verifying" | "extracting" | "restoring_qdrant" | "restoring_graph" | "completed" | "error";
  progress_percent: number;
  downloaded_bytes: number;
  total_bytes: number;
  downloaded_mb: number;
  total_mb: number;
  message: string;
  error: string | null;
  result: {
    points_count: number;
    documents_restored: number;
    edges_restored: number;
    sha256: string;
  } | null;
  started_at: string | null;
  completed_at: string | null;
  has_configured_url: boolean;
  configured_url: string;
}

export const snapshotsApi = {
  getStatus: () => request<SnapshotStatus>("/snapshots/status"),
  getRemoteSyncProgress: () => request<RemoteSyncProgress>("/snapshots/sync-remote/progress"),
  triggerRemoteSync: (body?: { url?: string; expected_sha256?: string }) =>
    request<{ status: string; message: string; target_url: string }>("/snapshots/sync-remote", {
      method: "POST",
      body: JSON.stringify(body || {}),
    }),
  listAdminSnapshots: () => request<SnapshotItem[]>("/admin/snapshots"),
  exportSnapshot: () => request<SnapshotItem>("/admin/snapshots/export", { method: "POST" }),
  deleteSnapshot: (filename: string) =>
    request<{ message: string }>(`/admin/snapshots/${encodeURIComponent(filename)}`, {
      method: "DELETE",
    }),
  getDownloadUrl: (filename: string) =>
    `${API_URL}/admin/snapshots/${encodeURIComponent(filename)}/download`,
  getDistributionConfig: () => request<DistributionConfig>("/admin/snapshots/distribution/config"),
  updateDistributionConfig: (onedrive_path: string) =>
    request<DistributionConfig>("/admin/snapshots/distribution/config", {
      method: "PUT",
      body: JSON.stringify({ onedrive_path }),
    }),
  publishToOneDrive: (body?: { filename?: string; destination_dir?: string; generate_new?: boolean }) =>
    request<PublishOneDriveResult>("/admin/snapshots/publish-onedrive", {
      method: "POST",
      body: JSON.stringify(body || {}),
    }),
  importSnapshot: async (file: File, expectedSha256?: string) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);
    if (expectedSha256) {
      formData.append("expected_sha256", expectedSha256);
    }
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/snapshots/import`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      let detail = res.statusText;
      try {
        const body = await res.json();
        detail = body.detail || detail;
      } catch {}
      throw new ApiError(res.status, detail);
    }
    return res.json() as Promise<ImportResult>;
  },
};

export interface DistributionConfig {
  onedrive_path: string;
  is_configured: boolean;
}

export interface PublishOneDriveResult {
  status: string;
  message: string;
  published_file: string;
  latest_file: string;
  destination_dir: string;
  size_mb: number;
  sha256?: string | null;
}

export interface SyncOneDriveResponse {
  status: string;
  message: string;
  source_dir?: string;
  target_subfolder?: string;
  target_dir?: string;
  md_files_found?: number;
  md_files_total_in_dest?: number;
  files_sample?: string[];
  output?: string;
}

export interface RbacUserItem {
  email: string;
  role: string;
  granted_by?: string | null;
  notes?: string | null;
  created_at: string;
  is_master: boolean;
}

export interface GrantAdminRequest {
  email: string;
  notes?: string;
}

export interface UserProfileOut {
  id: string;
  email: string;
  status: string;
  role: string;
  effective_role: string;
  is_master_admin: boolean;
  created_at: string;
}

export const rbacApi = {
  listUsers: () => request<RbacUserItem[]>("/admin/rbac/users"),
  grantAdmin: (email: string, notes?: string) =>
    request<RbacUserItem>("/admin/rbac/users", {
      method: "POST",
      body: JSON.stringify({ email, notes }),
    }),
  revokeAdmin: (email: string) =>
    request<void>(`/admin/rbac/users/${encodeURIComponent(email)}`, {
      method: "DELETE",
    }),
  getMe: () => request<UserProfileOut>("/auth/me"),
  triggerDesktopBuild: (version_tag?: string) =>
    request<{ status: string; method: string; version: string; repo: string; message: string }>(
      "/admin/rbac/desktop/trigger-build",
      {
        method: "POST",
        body: JSON.stringify({ version_tag: version_tag || "v1.0.0" }),
      }
    ),
  getDesktopBuildStatus: () =>
    request<{
      latest_version: string;
      supported_targets: string[];
      download_links: { macos_dmg: string; windows_msi: string };
      releases_page: string;
      actions_page: string;
    }>("/admin/rbac/desktop/build-status"),
};
