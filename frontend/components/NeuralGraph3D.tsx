"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Maximize2,
  Minimize2,
  RotateCw,
  Search,
  X,
  Tag,
  Sparkles,
  ArrowUpRight,
  Filter,
  Zap,
  Activity,
  Layers,
} from "lucide-react";
import { KnowledgeGraph, KnowledgeNode, KnowledgeEdge } from "@/lib/api";

interface NeuralGraph3DProps {
  data: KnowledgeGraph;
}

// Mapeamento de cores por tipo de relação semântica
const RELATION_COLORS: Record<string, { color: string; hex: number; label: string; rgb: [number, number, number] }> = {
  ATUALIZA: { color: "#d946ef", hex: 0xd946ef, label: "Atualiza", rgb: [0.85, 0.27, 0.94] },
  SUBSTITUI: { color: "#ff2d87", hex: 0xff2d87, label: "Substitui", rgb: [1.0, 0.18, 0.53] },
  COMPLEMENTA: { color: "#00f0ff", hex: 0x00f0ff, label: "Complementa", rgb: [0.0, 0.94, 1.0] },
  DEPENDE_DE: { color: "#10b981", hex: 0x10b981, label: "Depende de", rgb: [0.06, 0.73, 0.51] },
  REFERENCIA: { color: "#94a3b8", hex: 0x94a3b8, label: "Referência", rgb: [0.58, 0.64, 0.72] },
};

export interface BrainLobeConfig {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  hex: number;
  rgb: [number, number, number];
  description: string;
  anatomicalPosition: string;
  semanticCriteria: string;
  cognitiveRole: string;
}

// 6 Áreas Anatômicas Cerebrais em Estilo Cyberpunk com Alta Saturação e Bioluminescência
export const CYBERPUNK_BRAIN_LOBES: Record<string, BrainLobeConfig> = {
  frontal: {
    id: "frontal",
    name: "Lobo Frontal",
    shortName: "Frontal",
    icon: "⚡",
    color: "#00f0ff", // Cyber Cyan / Electric Aqua
    hex: 0x00f0ff,
    rgb: [0.0, 0.94, 1.0],
    description: "Planejamento, diretrizes, arquitetura executiva e políticas corporativas",
    anatomicalPosition: "Anterior Superior • Polo frontal projetado e curvado com fissura sagital",
    semanticCriteria: "arquitetura, central, política, diretriz, norma, governança",
    cognitiveRole: "Planejamento & Regras Centrais: tomada de decisão executiva, diretrizes normativas e governança do ecossistema Reef.",
  },
  parietal: {
    id: "parietal",
    name: "Lobo Parietal",
    shortName: "Parietal",
    icon: "🧠",
    color: "#b026ff", // Neon Violet / Electric Purple
    hex: 0xb026ff,
    rgb: [0.69, 0.15, 1.0],
    description: "Integração de módulos comuns, fluxos de sinistros e regras de negócio",
    anatomicalPosition: "Dorsal Superior • Cúpula craniana medial no ápice do encéfalo",
    semanticCriteria: "sinistro, módulo, banc, comum, cálculo, atuária",
    cognitiveRole: "Processamento & Lógica Operacional: esteiras de liquidação de sinistros, cálculos atuariais e componentes compartilhados.",
  },
  occipital: {
    id: "occipital",
    name: "Lobo Occipital",
    shortName: "Occipital",
    icon: "👁️",
    color: "#ff007f", // Cyber Magenta / Hot Pink
    hex: 0xff007f,
    rgb: [1.0, 0.0, 0.5],
    description: "Conformidade regulatória, auditoria, analytics e compliance",
    anatomicalPosition: "Posterior • Declive caudal da calota craniana",
    semanticCriteria: "auditoria, compliance, seguran, relat, visual, conformidade",
    cognitiveRole: "Visão & Inspeção Analítica: monitoramento de riscos regulatórios, auditoria de processos, segurança cibernética e telemetria.",
  },
  temporal: {
    id: "temporal",
    name: "Lobo Temporal",
    shortName: "Temporal",
    icon: "🔊",
    color: "#ffaa00", // Laser Amber / Gold
    hex: 0xffaa00,
    rgb: [1.0, 0.67, 0.0],
    description: "Memória associativa, contratos, tarifação, apólices e clientes",
    anatomicalPosition: "Lateral Inferior • Abaulamento sob a fissura de Sylvius em ambos os hemisférios",
    semanticCriteria: "contrato, apólice, tarifa, tribut, fiscal, cliente, parceiro",
    cognitiveRole: "Memória Declarativa & Semântica: repositório de apólices ativas, precificação dinâmica, contratos e cadastros relacionais.",
  },
  cerebellum: {
    id: "cerebellum",
    name: "Cerebelo Neural",
    shortName: "Cerebelo",
    icon: "💠",
    color: "#00ff66", // Matrix Lime / Neon Emerald
    hex: 0x00ff66,
    rgb: [0.0, 1.0, 0.4],
    description: "Motores de cognição IA, vetores semânticos, embeddings e cache rápido",
    anatomicalPosition: "Inferior Posterior • Estrutura globular horizontalmente estriada sob o occipital",
    semanticCriteria: "ia, cogni, vector, cache, embedding, banco, llm",
    cognitiveRole: "Coordenação & Indexação Rápida: motor vetorial no Qdrant, geração de embeddings, orquestração de LLMs e cache em memória.",
  },
  brainstem: {
    id: "brainstem",
    name: "Tronco Encefálico",
    shortName: "Tronco",
    icon: "🔌",
    color: "#ff3366", // Plasma Coral / Neon Red
    hex: 0xff3366,
    rgb: [1.0, 0.2, 0.4],
    description: "Barramento vital de infraestrutura, cloud, mensageria e gateways",
    anatomicalPosition: "Haste Inferior Central • Pedúnculo descendente conectando ao piso de circuitos",
    semanticCriteria: "infra, cloud, gateway, api, evento, mensageria, docker",
    cognitiveRole: "Barramento Vital & Conectividade: infraestrutura de microsserviços, barramentos assíncronos Kafka/RabbitMQ e gateways de API.",
  },
};

export const LOBE_KEYS = ["frontal", "parietal", "occipital", "temporal", "cerebellum", "brainstem"];

export function getNodeBrainLobe(node: KnowledgeNode, clusterIdx: number): BrainLobeConfig {
  const text = `${node.source_path} ${node.title} ${(node.topics || []).join(" ")}`.toLowerCase();

  if (text.includes("ia") || text.includes("cogni") || text.includes("vector") || text.includes("cache") || text.includes("embedding") || text.includes("banco")) {
    return CYBERPUNK_BRAIN_LOBES.cerebellum;
  }
  if (text.includes("infra") || text.includes("cloud") || text.includes("gateway") || text.includes("api") || text.includes("evento") || text.includes("mensageria")) {
    return CYBERPUNK_BRAIN_LOBES.brainstem;
  }
  if (text.includes("auditoria") || text.includes("compliance") || text.includes("seguran") || text.includes("relat") || text.includes("visual") || text.includes("regulató") || text.includes("cnsp") || text.includes("ouvidoria")) {
    return CYBERPUNK_BRAIN_LOBES.occipital;
  }
  if (text.includes("contrato") || text.includes("apólice") || text.includes("tarifa") || text.includes("tribut") || text.includes("fiscal") || text.includes("cliente") || text.includes("código civil") || text.includes("glossário")) {
    return CYBERPUNK_BRAIN_LOBES.temporal;
  }
  if (text.includes("arquitetura") || text.includes("central") || text.includes("política") || text.includes("diretriz") || text.includes("norma") || text.includes("susep")) {
    return CYBERPUNK_BRAIN_LOBES.frontal;
  }
  if (text.includes("sinistro") || text.includes("módulo") || text.includes("banc") || text.includes("comum")) {
    return CYBERPUNK_BRAIN_LOBES.parietal;
  }

  // Fallback baseado no clusterIdx para distribuição harmoniosa e balanceada
  const key = LOBE_KEYS[clusterIdx % LOBE_KEYS.length];
  return CYBERPUNK_BRAIN_LOBES[key];
}

// Criação de textura suave de brilho (Halo) reutilizável
function createSharedHaloTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(0.2, "rgba(56, 189, 248, 0.5)");
  gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.2)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

// Criação de rótulo em texto para o espaço 3D (Billboard Sprite para nós selecionados/hubs)
function createTextSprite(text: string, color = "#e2e8f0"): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 72;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 384, 72);

  // Fundo translúcido arredondado
  ctx.fillStyle = "rgba(10, 15, 30, 0.85)";
  ctx.beginPath();
  ctx.roundRect(10, 10, 364, 52, 12);
  ctx.fill();

  ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const truncated = text.length > 28 ? text.slice(0, 26) + "..." : text;
  ctx.fillText(truncated, 192, 36);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(32, 6.0, 1);
  return sprite;
}

// Criação do Piso de Circuito Holográfico (Motherboard Ground Plane) estilo Cyberpunk
function createMotherboardCircuitFloor(floorY: number, size: number): THREE.Group {
  const group = new THREE.Group();
  group.position.y = floorY;

  // 1. Grid Holográfico Principal
  const gridHelper = new THREE.GridHelper(size, 32, 0x00f0ff, 0x0369a1);
  (gridHelper.material as THREE.Material).transparent = true;
  (gridHelper.material as THREE.Material).opacity = 0.32;
  group.add(gridHelper);

  // 2. Trilhas PCB Ortogonais (Circuit Traces como na imagem de referência)
  const traceCount = 64;
  const linePoints: number[] = [];
  const lineColors: number[] = [];
  const viaPoints: number[] = [];

  const neonCyan = [0.0, 0.94, 1.0];
  const neonBlue = [0.01, 0.5, 0.98];
  const neonPink = [1.0, 0.0, 0.5];

  const step = size / 32;
  for (let i = 0; i < traceCount; i++) {
    let cx = Math.floor((Math.random() - 0.5) * 24) * step;
    let cz = Math.floor((Math.random() - 0.5) * 24) * step;
    const segments = 2 + Math.floor(Math.random() * 3);
    const color = i % 6 === 0 ? neonPink : i % 2 === 0 ? neonCyan : neonBlue;

    for (let s = 0; s < segments; s++) {
      const dirX = Math.random() > 0.5;
      const length = (1 + Math.floor(Math.random() * 3)) * step * (Math.random() > 0.5 ? 1 : -1);
      const nx = dirX ? cx + length : cx;
      const nz = dirX ? cz : cz + length;

      linePoints.push(cx, 0.4, cz, nx, 0.4, nz);
      lineColors.push(color[0], color[1], color[2], color[0], color[1], color[2]);

      cx = nx;
      cz = nz;
    }

    viaPoints.push(cx, 0.6, cz);
  }

  const traceGeo = new THREE.BufferGeometry();
  traceGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
  traceGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

  const traceMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  });
  const traces = new THREE.LineSegments(traceGeo, traceMat);
  group.add(traces);

  // 3. Vias bioluminescentes nas pontas das trilhas
  const viaGeo = new THREE.BufferGeometry();
  viaGeo.setAttribute("position", new THREE.Float32BufferAttribute(viaPoints, 3));
  const viaMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 4.5,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
  });
  const vias = new THREE.Points(viaGeo, viaMat);
  group.add(vias);

  // 4. Disco de reflexão neon no piso
  const discGeo = new THREE.CircleGeometry(size * 0.48, 36);
  const discMat = new THREE.MeshBasicMaterial({
    color: 0x021d38,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const disc = new THREE.Mesh(discGeo, discMat);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -0.1;
  group.add(disc);

  return group;
}

// Casca Suave de Vidro Anatômico (Fallback de alta fidelidade sem wireframe)
function createSmoothHolographicBrainShell(
  scale: number,
  shaderMaterial: THREE.ShaderMaterial
): THREE.Group {
  const group = new THREE.Group();

  function createHemisphereGeometry(hemSign: number): THREE.BufferGeometry {
    const segmentsW = 56;
    const segmentsH = 42;
    const baseGeo = new THREE.SphereGeometry(1.0, segmentsW, segmentsH);
    const posAttr = baseGeo.attributes.position;
    const count = posAttr.count;

    const rx = 88 * scale;
    const ry = 84 * scale;
    const rz = 126 * scale;
    const gap = 3.5 * scale;

    for (let i = 0; i < count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);

      const medialX = vx < 0 ? vx * 0.15 : vx;
      const frontalTaper = vz > 0 ? 1.0 - vz * 0.14 : 1.0;
      const parietalLift = vy > 0 && vz > -0.35 && vz < 0.45 ? 1.0 + 0.10 * Math.cos(vz * Math.PI) : 1.0;
      const temporalBulge = vx > 0.2 && vy < 0.1 && vz > -0.3 && vz < 0.4 ? 1.12 : 1.0;
      const occipitalSlope = vz < 0 ? 1.0 + vz * 0.07 : 1.0;

      const angleV = Math.atan2(vx, vz);
      const sulcus = (Math.sin(6.0 * vy + 7.0 * angleV) * Math.cos(7.0 * angleV) + Math.sin(14.0 * angleV) * 0.3) * 0.055;
      const factor = 1.0 + sulcus;

      const px = hemSign * (gap + (medialX + 0.12) * rx * frontalTaper * temporalBulge * factor);
      const py = vy * ry * parietalLift * factor;
      const pz = vz * rz * occipitalSlope * factor;

      posAttr.setXYZ(i, px, py, pz);
    }

    baseGeo.computeVertexNormals();
    return baseGeo;
  }

  [-1, 1].forEach((hemSign) => {
    const hemiGeo = createHemisphereGeometry(hemSign);
    const hemiMesh = new THREE.Mesh(hemiGeo, shaderMaterial);
    group.add(hemiMesh);
  });

  return group;
}

// Gerador de dados de estresse com 10.000 nós e 25.000 arestas para teste de escala e 60 FPS
function generate10kBenchmarkData(): KnowledgeGraph {
  const clusterNames = [
    "00. Arquitetura Central",
    "01. Gestão de Sinistros",
    "02. Módulos Comuns",
    "03. Terceiros & Provedores",
    "04. Políticas de Segurança",
    "05. Tarifação & Atuária",
    "06. Integração Bancária",
    "07. Emissão de Apólices",
    "08. Regras Fiscais & Tributos",
    "09. Auditoria & Compliance",
    "10. Gestão de Contratos",
    "11. Sinistros Auto",
    "12. Sinistros Vida & Saúde",
    "13. Redes Concessionárias",
    "14. Motores de IA & Cognição",
    "15. APIs & Gateways",
    "16. Relatórios & Analytics",
    "17. Mensageria & Eventos",
    "18. Bancos de Dados & Cache",
    "19. Infraestrutura & Cloud",
  ];

  const relationTypes = ["COMPLEMENTA", "DEPENDE_DE", "ATUALIZA", "REFERENCIA", "SUBSTITUI"];
  const totalNodes = 10000;
  const totalEdges = 24000;

  const nodes: KnowledgeNode[] = [];
  for (let i = 0; i < totalNodes; i++) {
    const cluster = clusterNames[i % clusterNames.length];
    const docNum = String(i + 1).padStart(5, "0");
    nodes.push({
      source_path: `${cluster}/DOC-${docNum}-especificacao-tecnica.md`,
      title: `Doc #${docNum} - ${cluster.split(". ")[1]}`,
      summary: `Especificação técnica e diretrizes normativas para o módulo ${cluster}. Documento sintético gerado para benchmark de alta escala (10.000 nós).`,
      topics: [cluster.split(". ")[1], "Normas 2026", "Alta Escala", "RAG Reef"],
    });
  }

  const edges: KnowledgeEdge[] = [];
  for (let e = 0; e < totalEdges; e++) {
    // 70% conexões dentro do mesmo cluster, 30% conexões entre clusters vizinhos
    const isIntraCluster = Math.random() < 0.7;
    let srcIdx: number;
    let tgtIdx: number;

    if (isIntraCluster) {
      const clusterIdx = e % clusterNames.length;
      const clusterSize = totalNodes / clusterNames.length;
      srcIdx = clusterIdx * clusterSize + Math.floor(Math.random() * clusterSize);
      tgtIdx = clusterIdx * clusterSize + Math.floor(Math.random() * clusterSize);
    } else {
      srcIdx = Math.floor(Math.random() * totalNodes);
      tgtIdx = Math.floor(Math.random() * totalNodes);
    }

    if (srcIdx !== tgtIdx) {
      edges.push({
        id: `bench-edge-${e}`,
        source_path: nodes[srcIdx].source_path,
        target_path: nodes[tgtIdx].source_path,
        relation_type: relationTypes[e % relationTypes.length],
        description: `Relação estrutural automática de alto volume entre componentes cognitivos.`,
        weight: 1.0,
      });
    }
  }

  return { nodes, edges };
}

interface NodePositionData {
  index: number;
  node: KnowledgeNode;
  x: number;
  y: number;
  z: number;
  degree: number;
  colorHex: number;
  scale: number;
  lobeId: string;
}

export function NeuralGraph3D({ data: rawData }: NeuralGraph3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [relationFilter, setRelationFilter] = useState<string>("ALL");
  const [selectedLobeFilter, setSelectedLobeFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [is10kBenchmark, setIs10kBenchmark] = useState(false);
  const [fps, setFps] = useState(60);
  const [layoutMode, setLayoutMode] = useState<"brain" | "sphere">("brain");
  const [showBrainShell, setShowBrainShell] = useState<boolean>(true);
  const [shellOpacity, setShellOpacity] = useState<number>(0.30);
  const brainShellGroupRef = useRef<THREE.Group | null>(null);
  const brainShellMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const brainShellWireframeMatRef = useRef<THREE.LineBasicMaterial | null>(null);

  // Seleção de dados: reais ou benchmark de 10.000 nós
  const data = useMemo(() => {
    if (is10kBenchmark) {
      return generate10kBenchmarkData();
    }
    return rawData;
  }, [is10kBenchmark, rawData]);

  // Resumo de métricas
  const stats = useMemo(() => {
    const totalNodes = data.nodes.length;
    const totalEdges = data.edges.length;
    const relationCounts: Record<string, number> = {};
    data.edges.forEach((e) => {
      relationCounts[e.relation_type] = (relationCounts[e.relation_type] || 0) + 1;
    });
    return { totalNodes, totalEdges, relationCounts };
  }, [data]);

  // Resumo de nós por lobo cerebral anatômico Cyberpunk
  const lobeStats = useMemo(() => {
    const counts: Record<string, number> = {
      frontal: 0,
      parietal: 0,
      occipital: 0,
      temporal: 0,
      cerebellum: 0,
      brainstem: 0,
    };
    data.nodes.forEach((n, idx) => {
      const lobe = getNodeBrainLobe(n, idx);
      counts[lobe.id] = (counts[lobe.id] || 0) + 1;
    });
    return counts;
  }, [data.nodes]);

  // Refs internas de Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Instanced Meshes para 1 Draw Call
  const instancedNodesRef = useRef<THREE.InstancedMesh | null>(null);
  const instancedHalosRef = useRef<THREE.InstancedMesh | null>(null);
  const lineSegmentsRef = useRef<THREE.LineSegments | null>(null);
  const instancedPulsesRef = useRef<THREE.InstancedMesh | null>(null);

  // Mapeamentos rápidos em memória
  const nodePositionsRef = useRef<NodePositionData[]>([]);
  const nodeIndexMapRef = useRef<Map<string, number>>(new Map());
  const labelSpritesGroupRef = useRef<THREE.Group | null>(null);

  // Transição suave de câmera com duração finita e garantia de liberação de controles OrbitControls
  const cameraAnimRef = useRef<{
    startPos: THREE.Vector3;
    targetPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    targetTarget: THREE.Vector3;
    startTime: number;
    duration: number;
  } | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 50, 350));

  const startCameraTransition = useCallback(
    (targetCamPos: THREE.Vector3, targetLookAt: THREE.Vector3, duration = 750) => {
      if (!cameraRef.current || !controlsRef.current) return;
      cameraAnimRef.current = {
        startPos: cameraRef.current.position.clone(),
        targetPos: targetCamPos.clone(),
        startTarget: controlsRef.current.target.clone(),
        targetTarget: targetLookAt.clone(),
        startTime: performance.now(),
        duration,
      };
    },
    []
  );

  // Autocomplete de Busca
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return data.nodes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(term) ||
          n.source_path.toLowerCase().includes(term)
      )
      .slice(0, 6);
  }, [data.nodes, searchTerm]);

  // Foco no nó selecionado
  const focusOnNode = useCallback(
    (sourcePath: string) => {
      const idx = nodeIndexMapRef.current.get(sourcePath);
      if (idx === undefined || !cameraRef.current || !controlsRef.current) return;
      const nodeObj = nodePositionsRef.current[idx];
      if (!nodeObj) return;

      setSelectedNode(nodeObj.node);

      // Câmera transiciona suavemente até próximo do nó sem travar a órbita 360°
      const targetCam = new THREE.Vector3(
        nodeObj.x + 22,
        nodeObj.y + 14,
        nodeObj.z + 42
      );
      const targetLookAt = new THREE.Vector3(nodeObj.x, nodeObj.y, nodeObj.z);
      startCameraTransition(targetCam, targetLookAt, 700);
    },
    [startCameraTransition]
  );

  // Restauração da visão panorâmica com centralização no centróide do cérebro
  const resetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const targetPos = defaultCameraPosRef.current || new THREE.Vector3(0, 60, 400);
    startCameraTransition(targetPos, new THREE.Vector3(0, 0, 0), 750);
    setSelectedNode(null);
  }, [startCameraTransition]);

  // Inicialização e Renderização com InstancedMesh e LineSegments
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 640;
    const isHugeScale = data.nodes.length > 2000;

    // 1. Cena
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x030712); // Deep high-tech space

    // 2. Câmera
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 6000);
    cameraRef.current = camera;

    // 3. Renderizador WebGL de Alto Desempenho
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHugeScale, // Em 10k nós, desativa MSAA pesado para garantir 60fps constantes
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.85;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.8;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // 5. Iluminação Otimizada
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 2.8, 1200);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2.2, 1200);
    scene.add(pointLight2);

    // 7. Cálculo de Graus e Algoritmo de Layout Clusterizado O(E)
    const nodeCount = data.nodes.length;
    const degreeMap = new Map<string, number>();
    const nodeIndexMap = new Map<string, number>();

    data.nodes.forEach((n, idx) => {
      nodeIndexMap.set(n.source_path, idx);
      degreeMap.set(n.source_path, 0);
    });

    data.edges.forEach((e) => {
      degreeMap.set(e.source_path, (degreeMap.get(e.source_path) || 0) + 1);
      degreeMap.set(e.target_path, (degreeMap.get(e.target_path) || 0) + 1);
    });

    nodeIndexMapRef.current = nodeIndexMap;

    // Agrupamento por diretório/cluster para layout hierárquico
    const clusterMap = new Map<string, number[]>();
    data.nodes.forEach((n, i) => {
      const parts = n.source_path.split("/");
      const clusterKey = parts.length > 1 ? parts[0] : "Geral";
      if (!clusterMap.has(clusterKey)) clusterMap.set(clusterKey, []);
      clusterMap.get(clusterKey)!.push(i);
    });

    const clusterKeys = Array.from(clusterMap.keys());
    const clusterCenters = new Map<string, { x: number; y: number; z: number }>();
    const globalRadius = isHugeScale ? 420 : 130;
    const phi = Math.PI * (3 - Math.sqrt(5));

    // Centróides de cada cluster na esfera de Fibonacci
    clusterKeys.forEach((key, cIdx) => {
      if (clusterKeys.length === 1) {
        clusterCenters.set(key, { x: 0, y: 0, z: 0 });
      } else {
        const cy = 1 - (cIdx / (clusterKeys.length - 1)) * 2;
        const cRadius = Math.sqrt(Math.max(0, 1 - cy * cy));
        const cTheta = phi * cIdx;
        clusterCenters.set(key, {
          x: Math.cos(cTheta) * cRadius * globalRadius,
          y: cy * globalRadius * 0.75,
          z: Math.sin(cTheta) * cRadius * globalRadius,
        });
      }
    });

    // Função paramétrica de Cérebro Anatômico 3D Cyberpunk
    // Modela fielmente os 6 setores anatômicos: Frontal, Parietal, Occipital, Temporal, Cerebelo e Tronco
    function calculateBrainNodePosition(
      nodeIdx: number,
      lobe: BrainLobeConfig,
      localIdx: number,
      localCount: number
    ): { x: number; y: number; z: number } {
      const hemSign = localIdx % 2 === 0 ? -1 : 1;
      const subIdx = Math.floor(localIdx / 2);
      const subTotal = Math.max(1, Math.ceil(localCount / 2));
      const latRatio = subTotal <= 1 ? 0.5 : subIdx / (subTotal - 1);

      // Escala anatômica adaptativa uniforme nas 3 dimensões
      const scale = isHugeScale ? 2.85 : 1.35;
      const rx = 76 * scale;  // Largura hemisférica
      const ry = 84 * scale;  // Altura dorso-ventral
      const rz = 100 * scale; // Comprimento antero-posterior

      // Ângulos paramétricos na superfície e volume
      const u = (latRatio - 0.5) * Math.PI * 0.9;
      const v = (subIdx * phi) % (2 * Math.PI);

      // Distribuição volumétrica realista de sinapses iluminando o interior do encéfalo (como na Imagem 2)
      let depth = 0.40 + 0.60 * Math.pow(((subIdx * 17) % 100) / 100, 0.65);

      let bx = 0;
      let by = 0;
      let bz = 0;
      let sagittalGap = (2.5 + 1.2 * Math.cos(u)) * scale; // Fenda sagital anatômica estreita

      switch (lobe.id) {
        case "frontal": {
          // Lobo Frontal: Anterior (+Z), curvatura anterior e polo frontal
          const zFront = 0.18 + (0.5 + 0.5 * Math.sin(u)) * 0.74;
          const yFront = -0.06 + Math.cos(u) * 0.64;
          const xFront = Math.abs(Math.cos(u) * Math.sin(v)) * (1.0 - zFront * 0.18);
          bx = xFront * rx;
          by = yFront * ry;
          bz = zFront * rz;
          sagittalGap = 2.5 * scale;
          break;
        }
        case "parietal": {
          // Lobo Parietal: Cúpula dorsal perfeitamente arredondada e ampla expansão lateral bilateral
          // Respeita o contorno do encéfalo (arredondado no ápice e espalhado pelas laterais da calota craniana)
          const uP = (subIdx * 0.6180339887) % 1;
          const vP = (subIdx * 0.3819660113 + Math.floor(subIdx / 25) * 0.07) % 1;

          // Antero-posterior: Do sulco central (+0.12) até a transição parieto-occipital (-0.36)
          const zNorm = 0.12 - vP * 0.48;

          // Curvatura sagital fronto-caudal (mantém o topo arredondado no eixo longitudinal Z)
          const zSag = (zNorm + 0.12) / 0.40;
          const sagFactor = Math.sqrt(Math.max(0.45, 1.0 - zSag * zSag * 0.22));

          // Ângulo de curvatura lateral coronal (theta):
          // Distribui harmonicamente desde a fenda superior (theta ~ 0.06) até as paredes laterais (theta ~ 1.22 rad / ~70°)
          // Math.sqrt(uP) garante densidade uniforme de nós na superfície convexa
          const s = 0.06 + 0.92 * Math.sqrt(uP);
          const maxRoll = Math.PI * 0.39; // ~70 graus de abertura lateral
          const theta = s * maxRoll;

          // Raios de curvatura da cúpula parietal
          const domeRadiusY = 0.82 * sagFactor;
          const domeRadiusX = 0.94 * sagFactor;

          // Camada do manto cortical/subcortical (78% a 98% da casca, sem colapsar no centro do encéfalo)
          const layer = Math.pow(((subIdx * 31) % 100) / 100, 0.55);
          const mantle = 0.78 + 0.20 * layer;

          // Ondulações orgânicas de giros e sulcos parietais
          const ripple = Math.sin(theta * 7.5 + zNorm * 11.0) * 0.025;

          const yModel = 0.15 + (Math.cos(theta) * domeRadiusY + ripple) * mantle;
          const xModel = (Math.sin(theta) * domeRadiusX + Math.abs(ripple) * 0.4) * mantle;

          const sagittalGap = 2.5 * scale;
          const nx = hemSign * (sagittalGap + xModel * rx) + (Math.random() - 0.5) * 2 * scale;
          const ny = yModel * ry + (Math.random() - 0.5) * 2 * scale;
          const nz = zNorm * rz + (Math.random() - 0.5) * 2 * scale;

          return { x: nx, y: ny, z: nz };
        }
        case "occipital": {
          // Lobo Occipital: Posterior superior (-Z), declive caudal dorsal
          const zOccipital = -0.30 - (0.5 + 0.5 * Math.sin(u)) * 0.62;
          const yOccipital = 0.08 + Math.cos(u) * 0.52;
          const xOccipital = Math.abs(Math.cos(u) * Math.sin(v)) * 0.84;
          bx = xOccipital * rx;
          by = yOccipital * ry;
          bz = zOccipital * rz;
          sagittalGap = 2.5 * scale;
          break;
        }
        case "temporal": {
          // Lobo Temporal: Lateral inferior (-Y moderado, Z intermediário)
          const zTemporal = -0.25 + latRatio * 0.55;
          const yTemporal = -0.15 - (0.5 + 0.5 * Math.sin(u)) * 0.36;
          const xTemporal = 0.36 + Math.abs(Math.sin(v)) * 0.50;
          bx = xTemporal * rx;
          by = yTemporal * ry;
          bz = zTemporal * rz;
          sagittalGap = 4 * scale;
          break;
        }
        case "cerebellum": {
          // Cerebelo Neural: POSTERIOR INFERIOR PROFUNDO (exatamente onde apontam as setas vermelhas)
          // Y desce entre -0.52 e -0.88 de ry, situando-se perfeitamente na cúpula inferior traseira do encéfalo
          const zCereb = -0.30 - latRatio * 0.52;
          const yCereb = -0.52 - (0.5 + 0.5 * Math.cos(u)) * 0.26 - latRatio * 0.14;
          const folia = Math.sin(16.0 * latRatio * Math.PI) * 0.04;
          const xCereb = 0.16 + Math.abs(Math.sin(v)) * 0.38 + folia;
          bx = xCereb * rx;
          by = yCereb * ry;
          bz = zCereb * rz;
          sagittalGap = 3.5 * scale;
          depth = 0.60 + 0.40 * Math.pow(((subIdx * 13) % 100) / 100, 0.7); // Permanece no bojo do cerebelo
          break;
        }
        case "brainstem": {
          // Tronco Encefálico: Haste vertical central descendente conectando ao piso
          const stemAngle = (localIdx * phi) % (2 * Math.PI);
          const stemRadius = (0.08 - latRatio * 0.04) * rx;
          const nx = Math.cos(stemAngle) * stemRadius + (Math.random() - 0.5) * 2 * scale;
          const ny = (-0.42 - latRatio * 0.50) * ry + (Math.random() - 0.5) * 2 * scale;
          const nz = (-0.16 - latRatio * 0.08) * rz + (Math.random() - 0.5) * 2 * scale;
          return { x: nx, y: ny, z: nz };
        }
      }

      const jitter = (Math.random() - 0.5) * 3 * scale;
      const nx = hemSign * (sagittalGap + bx * depth) + jitter;
      const ny = by * depth + jitter;
      const nz = bz * depth + jitter;

      return { x: nx, y: ny, z: nz };
    }

    // Posicionamento de cada nó
    const nodePositions: NodePositionData[] = new Array(nodeCount);

    clusterKeys.forEach((key, cIdx) => {
      const indices = clusterMap.get(key)!;
      const center = clusterCenters.get(key)!;
      const localRadius = Math.min(110, Math.max(25, Math.sqrt(indices.length) * (isHugeScale ? 8 : 14)));

      indices.forEach((nodeIdx, localIdx) => {
        let nx: number, ny: number, nz: number;
        const node = data.nodes[nodeIdx];
        const lobe = getNodeBrainLobe(node, cIdx);

        if (layoutMode === "brain") {
          const brainPos = calculateBrainNodePosition(
            nodeIdx,
            lobe,
            localIdx,
            indices.length
          );
          nx = brainPos.x;
          ny = brainPos.y;
          nz = brainPos.z;
        } else {
          const ly = 1 - (localIdx / Math.max(1, indices.length - 1)) * 2;
          const lr = Math.sqrt(1 - ly * ly);
          const lTheta = phi * localIdx;

          nx = center.x + Math.cos(lTheta) * lr * localRadius + (Math.random() - 0.5) * 6;
          ny = center.y + ly * localRadius * 0.85 + (Math.random() - 0.5) * 6;
          nz = center.z + Math.sin(lTheta) * lr * localRadius + (Math.random() - 0.5) * 6;
        }

        const degree = degreeMap.get(node.source_path) || 1;
        const scale = isHugeScale
          ? Math.min(4.5, Math.max(1.8, 1.8 + Math.log2(1 + degree) * 0.5))
          : Math.min(7.0, Math.max(3.5, 3.2 + degree * 0.4));

        nodePositions[nodeIdx] = {
          index: nodeIdx,
          node,
          x: nx,
          y: ny,
          z: nz,
          degree,
          colorHex: lobe.hex,
          scale,
          lobeId: lobe.id,
        };
      });
    });

    // Relaxamento rápido localizado apenas nas arestas O(E) — executa em < 10ms para 25k arestas
    const springStrength = 0.035;
    const targetDistance = isHugeScale ? 40 : 65;
    for (let it = 0; it < 3; it++) {
      data.edges.forEach((ed) => {
        const uIdx = nodeIndexMap.get(ed.source_path);
        const vIdx = nodeIndexMap.get(ed.target_path);
        if (uIdx === undefined || vIdx === undefined) return;
        const u = nodePositions[uIdx];
        const v = nodePositions[vIdx];
        if (!u || !v) return;

        let dx = v.x - u.x;
        let dy = v.y - u.y;
        let dz = v.z - u.z;
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
        if (dist > targetDistance) {
          let force = (dist - targetDistance) * springStrength * 0.5;
          let fx = (dx / dist) * force;
          let fy = (dy / dist) * force;
          let fz = (dz / dist) * force;
          u.x += fx;
          u.y += fy;
          u.z += fz;
          v.x -= fx;
          v.y -= fy;
          v.z -= fz;
        }

        if (layoutMode === "brain") {
          // Preserva a fenda sagital anatômica natural sem abrir abismo entre os hemisférios
          if (u.x < 0 && u.x > -4) u.x = -4;
          if (u.x > 0 && u.x < 4) u.x = 4;
          if (v.x < 0 && v.x > -4) v.x = -4;
          if (v.x > 0 && v.x < 4) v.x = 4;
        }
      });
    }

    // 8. CÁLCULO DO CENTRÓIDE GEOMÉTRICO E RECENTRALIZAÇÃO ESTRITA EM (0, 0, 0)
    // Encontra o Bounding Box de todos os nós gerados para identificar o centro de massa exato
    const bbox = new THREE.Box3();
    for (let i = 0; i < nodeCount; i++) {
      bbox.expandByPoint(new THREE.Vector3(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z));
    }
    const clusterCenter = new THREE.Vector3();
    bbox.getCenter(clusterCenter);

    // Normalização: subtrai o centróide de todos os nós.
    // Isso garante que o centro geométrico do emaranhado esteja ESTRITAMENTE em (0, 0, 0),
    // eliminando qualquer oscilação excêntrica no eixo de giro 360° em todos os eixos e no auto-giro!
    let maxClusterRadius = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i].x -= clusterCenter.x;
      nodePositions[i].y -= clusterCenter.y;
      nodePositions[i].z -= clusterCenter.z;
      const r = Math.sqrt(
        nodePositions[i].x * nodePositions[i].x +
        nodePositions[i].y * nodePositions[i].y +
        nodePositions[i].z * nodePositions[i].z
      ) + nodePositions[i].scale;
      if (r > maxClusterRadius) maxClusterRadius = r;
    }
    maxClusterRadius = Math.max(maxClusterRadius, 35);
    nodePositionsRef.current = nodePositions;

    // Piso de Circuito Holográfico (Motherboard Ground Plane) estilo Cyberpunk
    if (layoutMode === "brain") {
      let minBrainY = 0;
      for (let i = 0; i < nodeCount; i++) {
        if (nodePositions[i].y < minBrainY) minBrainY = nodePositions[i].y;
      }
      const floorY = minBrainY - (isHugeScale ? 45 : 28);
      const floorSize = Math.max(maxClusterRadius * 2.8, 600);
      const motherboardFloor = createMotherboardCircuitFloor(floorY, floorSize);
      scene.add(motherboardFloor);

      // Casca Holográfica de Vidro Anatômico 3D (Modelo Esculpido Real com Giros e Sulcos - Imagem 2)
      const centeredBbox = new THREE.Box3();
      for (let i = 0; i < nodeCount; i++) {
        centeredBbox.expandByPoint(new THREE.Vector3(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z));
      }
      const centeredSize = new THREE.Vector3();
      centeredBbox.getSize(centeredSize);

      // Proporções ideais do modelo brain.glb (largura X ~1.51, altura Y ~1.67, comprimento Z ~2.00)
      const scale = isHugeScale ? 2.85 : 1.35;
      const scaleX = (centeredSize.x * 1.08) / 1.51;
      const scaleY = (centeredSize.y * 1.08) / 1.67;
      const scaleZ = (centeredSize.z * 1.08) / 2.00;
      const uniformScale = Math.max(scaleX, scaleY, scaleZ);

      const initialRimHex =
        selectedLobeFilter === "ALL"
          ? 0x88f0ff // Ice cyan / crystal pearl glow
          : CYBERPUNK_BRAIN_LOBES[selectedLobeFilter]?.hex || 0x88f0ff;

      const brainShellShaderMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0x021020) }, // Deep smoky obsidian/navy glass
          uRimColor: { value: new THREE.Color(initialRimHex) },
          uOpacity: { value: shellOpacity },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform vec3 uRimColor;
          uniform float uOpacity;
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            // Double-sided view angle
            float cosTheta = abs(dot(viewDir, normal));
            // Power of 2.6 dá um contorno vítreo nos sulcos e giros corticais reais
            float fresnel = pow(1.0 - cosTheta, 2.6);
            float pulse = 0.92 + 0.08 * sin(uTime * 1.4);
            vec3 finalColor = mix(uColor, uRimColor, fresnel * 0.94);
            // Centro altamente translúcido para enxergar todos os nós internos
            float alpha = uOpacity * (0.04 + 0.96 * fresnel) * pulse;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      brainShellMaterialRef.current = brainShellShaderMat;

      // Grupo para a casca do encéfalo
      const brainShellGroup = new THREE.Group();
      brainShellGroup.visible = showBrainShell && layoutMode === "brain";
      scene.add(brainShellGroup);
      brainShellGroupRef.current = brainShellGroup;

      // Carregamento do modelo 3D escaneado/esculpido com giros corticais reais (Sem wireframe grosseiro)
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        "/models/brain.glb",
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.material = brainShellShaderMat;
              mesh.castShadow = false;
              mesh.receiveShadow = false;
            }
          });
          model.scale.set(uniformScale, uniformScale, uniformScale);
          model.position.set(0, 0, 0);
          brainShellGroup.add(model);
        },
        undefined,
        (err) => {
          console.warn("Aviso ao carregar brain.glb, usando casca procedural suave", err);
          const fallback = createSmoothHolographicBrainShell(scale, brainShellShaderMat);
          fallback.position.set(-clusterCenter.x, -clusterCenter.y, -clusterCenter.z);
          brainShellGroup.add(fallback);
        }
      );
    }

    // 9. CÁLCULO DINÂMICO DE ENQUADRAMENTO COM ZOOM MENOR (VISIBILIDADE INTEGRAL E PERFEITA)
    const vFovRad = (camera.fov * Math.PI) / 180;
    const aspect = width / height;
    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect);

    // Distância necessária para enquadrar completamente o raio nas duas dimensões (vertical e horizontal)
    const distV = maxClusterRadius / Math.sin(vFovRad / 2);
    const distH = maxClusterRadius / Math.sin(hFovRad / 2);
    const boundingDist = Math.max(distV, distH);

    // Margem de segurança de 35% (zoom menor) para garantir respiro visual completo, halos e rótulos
    const fitDistance = Math.max(boundingDist * 1.35, 180);

    // Posicionamento inicial da câmera: para o modo cérebro, ângulo 3/4 ligeiramente elevado valoriza os 2 hemisférios
    const initialCamPos = layoutMode === "brain"
      ? new THREE.Vector3(fitDistance * 0.35, fitDistance * 0.42, fitDistance * 0.85)
      : new THREE.Vector3(0, fitDistance * 0.15, fitDistance);
    camera.position.copy(initialCamPos);
    camera.lookAt(0, 0, 0);

    controls.target.set(0, 0, 0);
    controls.minDistance = 15;
    controls.maxDistance = Math.max(fitDistance * 4.0, 3000);
    controls.update();

    defaultCameraPosRef.current = initialCamPos.clone();

    // Névoa linear suave: 0% de névoa no emaranhado (nitidez neon máxima), fade suave apenas no espaço distante
    scene.fog = new THREE.Fog(0x030712, fitDistance * 0.85, fitDistance * 3.5);

    // Ajuste proporcional das luzes e do campo estelar
    pointLight1.position.set(fitDistance * 0.35, fitDistance * 0.4, fitDistance * 0.5);
    pointLight1.distance = fitDistance * 3.0;
    pointLight2.position.set(-fitDistance * 0.35, -fitDistance * 0.3, -fitDistance * 0.35);
    pointLight2.distance = fitDistance * 3.0;

    const starCount = isHugeScale ? 1200 : 500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starRadius = Math.max(fitDistance * 2.2, 1400);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * starRadius;
      starPositions[i + 1] = (Math.random() - 0.5) * starRadius;
      starPositions[i + 2] = (Math.random() - 0.5) * starRadius;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 1.5,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 10. CRIAÇÃO DO THREE.InstancedMesh PARA NÓS (1 ÚNICO DRAW CALL NA GPU - 100% BIOLUMINESCENTE)
    const sphereGeo = new THREE.SphereGeometry(1.0, isHugeScale ? 12 : 24, isHugeScale ? 12 : 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Multiplicado pelo instanceColor (brilho neon puro sem opacidade)
    });
    const instancedNodes = new THREE.InstancedMesh(sphereGeo, sphereMat, nodeCount);
    instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummyMatrix = new THREE.Matrix4();
    const dummyColor = new THREE.Color();

    for (let i = 0; i < nodeCount; i++) {
      const item = nodePositions[i];
      dummyMatrix.makeTranslation(item.x, item.y, item.z);
      dummyMatrix.scale(new THREE.Vector3(item.scale, item.scale, item.scale));
      instancedNodes.setMatrixAt(i, dummyMatrix);

      dummyColor.setHex(item.colorHex);
      instancedNodes.setColorAt(i, dummyColor);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    scene.add(instancedNodes);
    instancedNodesRef.current = instancedNodes;

    // 9. CRIAÇÃO DO InstancedMesh PARA HALOS LUMINESCENTES (1 DRAW CALL)
    // Esferas concêntricas 3D com Additive Blending (perfeitamente esféricas em qualquer rotação)
    const haloGeo = new THREE.SphereGeometry(1.45, isHugeScale ? 10 : 16, isHugeScale ? 10 : 16);
    const haloMat = new THREE.MeshBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.42,
    });
    const instancedHalos = new THREE.InstancedMesh(haloGeo, haloMat, nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      const item = nodePositions[i];
      dummyMatrix.makeTranslation(item.x, item.y, item.z);
      dummyMatrix.scale(new THREE.Vector3(item.scale, item.scale, item.scale));
      instancedHalos.setMatrixAt(i, dummyMatrix);

      dummyColor.setHex(item.colorHex);
      instancedHalos.setColorAt(i, dummyColor);
    }
    instancedHalos.instanceMatrix.needsUpdate = true;
    if (instancedHalos.instanceColor) instancedHalos.instanceColor.needsUpdate = true;
    scene.add(instancedHalos);
    instancedHalosRef.current = instancedHalos;

    // 10. CRIAÇÃO DO THREE.LineSegments PARA TODAS AS SINAPSES (1 ÚNICO DRAW CALL NA GPU)
    const edgeCount = data.edges.length;
    const linePositions = new Float32Array(edgeCount * 6); // 2 vértices * 3 coordenadas
    const lineColors = new Float32Array(edgeCount * 6);    // 2 vértices * 3 RGB

    for (let e = 0; e < edgeCount; e++) {
      const edge = data.edges[e];
      const srcIdx = nodeIndexMap.get(edge.source_path);
      const tgtIdx = nodeIndexMap.get(edge.target_path);
      if (srcIdx === undefined || tgtIdx === undefined) continue;

      const src = nodePositions[srcIdx];
      const tgt = nodePositions[tgtIdx];
      if (!src || !tgt) continue;

      const baseIdx = e * 6;
      // Vértice Origem
      linePositions[baseIdx] = src.x;
      linePositions[baseIdx + 1] = src.y;
      linePositions[baseIdx + 2] = src.z;
      // Vértice Destino
      linePositions[baseIdx + 3] = tgt.x;
      linePositions[baseIdx + 4] = tgt.y;
      linePositions[baseIdx + 5] = tgt.z;

      // Cores por Vértice: gradiente neon dos lobos anatômicos de origem e destino (estilo Cyberpunk)
      const srcLobe = CYBERPUNK_BRAIN_LOBES[src.lobeId] || CYBERPUNK_BRAIN_LOBES.frontal;
      const tgtLobe = CYBERPUNK_BRAIN_LOBES[tgt.lobeId] || CYBERPUNK_BRAIN_LOBES.frontal;
      lineColors[baseIdx] = srcLobe.rgb[0];
      lineColors[baseIdx + 1] = srcLobe.rgb[1];
      lineColors[baseIdx + 2] = srcLobe.rgb[2];
      lineColors[baseIdx + 3] = tgtLobe.rgb[0];
      lineColors[baseIdx + 4] = tgtLobe.rgb[1];
      lineColors[baseIdx + 5] = tgtLobe.rgb[2];
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isHugeScale ? 0.35 : 0.65,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);
    lineSegmentsRef.current = lineSegments;

    // 11. POOL DE PULSOS SINÁPTICOS INSTANCIADOS (1 DRAW CALL)
    const pulseCount = Math.min(250, Math.max(40, Math.floor(edgeCount * 0.1)));
    const pulseGeo = new THREE.SphereGeometry(isHugeScale ? 1.0 : 1.2, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      blending: THREE.AdditiveBlending,
    });
    const instancedPulses = new THREE.InstancedMesh(pulseGeo, pulseMat, pulseCount);
    const pulseStates: { edgeIdx: number; progress: number; speed: number }[] = [];

    for (let p = 0; p < pulseCount; p++) {
      pulseStates.push({
        edgeIdx: Math.floor(Math.random() * edgeCount),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
      dummyMatrix.makeTranslation(0, 0, 0);
      dummyMatrix.scale(new THREE.Vector3(1, 1, 1));
      instancedPulses.setMatrixAt(p, dummyMatrix);
    }
    instancedPulses.instanceMatrix.needsUpdate = true;
    scene.add(instancedPulses);
    instancedPulsesRef.current = instancedPulses;

    // 12. GRUPO DE RÓTULOS EM TEXTO COM LOD (Level of Detail)
    const labelGroup = new THREE.Group();
    scene.add(labelGroup);
    labelSpritesGroupRef.current = labelGroup;

    // Em escalas grandes, exibe rótulos apenas para os maiores hubs (máx 20)
    // Em escalas normais (< 200 nós), exibe rótulos com culling suave
    const hubCandidates = [...nodePositions]
      .sort((a, b) => b.degree - a.degree)
      .slice(0, isHugeScale ? 20 : 35);

    hubCandidates.forEach((item) => {
      const sprite = createTextSprite(item.node.title);
      sprite.position.set(item.x, item.y + item.scale + (isHugeScale ? 3.5 : 5.5), item.z);
      sprite.userData = { sourcePath: item.node.source_path };
      labelGroup.add(sprite);
    });

    // 13. Raycasting O(log N) em InstancedMesh para Hover e Clique
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedNodes);

      if (intersects.length > 0 && intersects[0].instanceId !== undefined) {
        const id = intersects[0].instanceId;
        const targetNode = nodePositions[id];
        if (targetNode) {
          setHoveredNode(targetNode.node);
          renderer.domElement.style.cursor = "pointer";
          return;
        }
      }
      setHoveredNode(null);
      renderer.domElement.style.cursor = "default";
    };

    // Detecção precisa de clique vs rotação por arraste 360°
    let pointerDownCoords = { x: 0, y: 0 };
    const onPointerDownCapture = (e: MouseEvent) => {
      pointerDownCoords = { x: e.clientX, y: e.clientY };
    };

    const onPointerDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Apenas clique esquerdo

      // Se o mouse moveu mais de 6 pixels entre o clique e o release, foi um giro de órbita 360°, NÃO um clique em nó!
      const dist = Math.hypot(e.clientX - pointerDownCoords.x, e.clientY - pointerDownCoords.y);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedNodes);

      if (intersects.length > 0 && intersects[0].instanceId !== undefined) {
        const id = intersects[0].instanceId;
        const targetNode = nodePositions[id];
        if (targetNode) {
          focusOnNode(targetNode.node.source_path);
        }
      }
    };

    // Quando o usuário interage manualmente com a órbita (arraste/scroll), cancela imediatamente qualquer transição programática
    const onControlsStart = () => {
      cameraAnimRef.current = null;
    };
    controls.addEventListener("start", onControlsStart);

    renderer.domElement.addEventListener("mousedown", onPointerDownCapture);
    renderer.domElement.addEventListener("mousemove", onPointerMove);
    renderer.domElement.addEventListener("click", onPointerDown);

    // 14. Redimensionamento
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 640;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 15. Loop de Animação 60 FPS
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Medição de FPS
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Transição suave da câmera com interpolação finita e liberação TOTAL dos controles
      if (cameraAnimRef.current) {
        const anim = cameraAnimRef.current;
        const progress = Math.min(1.0, (now - anim.startTime) / anim.duration);

        // Curva de Easing suave (easeOutCubic)
        const ease = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(anim.startPos, anim.targetPos, ease);
        controls.target.lerpVectors(anim.startTarget, anim.targetTarget, ease);

        // Ao completar o tempo da transição, encerra estritamente e libera a órbita 360° para o usuário
        if (progress >= 1.0) {
          camera.position.copy(anim.targetPos);
          controls.target.copy(anim.targetTarget);
          cameraAnimRef.current = null;
        }
      }

      controls.update();

      // Animação dos fótons sinápticos no InstancedMesh
      if (instancedPulses) {
        const pulseMatrix = new THREE.Matrix4();
        for (let p = 0; p < pulseCount; p++) {
          const state = pulseStates[p];
          state.progress = (state.progress + state.speed) % 1;
          const ed = data.edges[state.edgeIdx];
          if (!ed) continue;

          const uIdx = nodeIndexMap.get(ed.source_path);
          const vIdx = nodeIndexMap.get(ed.target_path);
          if (uIdx === undefined || vIdx === undefined) continue;

          const u = nodePositions[uIdx];
          const v = nodePositions[vIdx];
          if (!u || !v) continue;

          const px = u.x + (v.x - u.x) * state.progress;
          const py = u.y + (v.y - u.y) * state.progress;
          const pz = u.z + (v.z - u.z) * state.progress;

          pulseMatrix.makeTranslation(px, py, pz);
          instancedPulses.setMatrixAt(p, pulseMatrix);
        }
        instancedPulses.instanceMatrix.needsUpdate = true;
      }

      // Rotação suave da poeira estelar
      starField.rotation.y += 0.0003;

      // Pulso holográfico suave do encéfalo
      if (brainShellMaterialRef.current) {
        brainShellMaterialRef.current.uniforms.uTime.value = now * 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Limpeza de Recursos
    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.removeEventListener("start", onControlsStart);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousedown", onPointerDownCapture);
      renderer.domElement.removeEventListener("mousemove", onPointerMove);
      renderer.domElement.removeEventListener("click", onPointerDown);

      controls.dispose();
      renderer.dispose();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, [data, layoutMode, focusOnNode]);

  // Atualização dinâmica de Auto-Giro
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Sincronização dinâmica da casca cerebral holográfica 3D (visibilidade, opacidade e coloração por lobo)
  useEffect(() => {
    if (brainShellGroupRef.current) {
      brainShellGroupRef.current.visible = showBrainShell && layoutMode === "brain";
    }
    if (brainShellMaterialRef.current) {
      brainShellMaterialRef.current.uniforms.uOpacity.value = shellOpacity;
      if (selectedLobeFilter === "ALL") {
        brainShellMaterialRef.current.uniforms.uRimColor.value.setHex(0x00f0ff);
      } else {
        const lobe = CYBERPUNK_BRAIN_LOBES[selectedLobeFilter];
        if (lobe) {
          brainShellMaterialRef.current.uniforms.uRimColor.value.setHex(lobe.hex);
        }
      }
    }
    if (brainShellWireframeMatRef.current) {
      brainShellWireframeMatRef.current.opacity = shellOpacity * 0.55;
      if (selectedLobeFilter === "ALL") {
        brainShellWireframeMatRef.current.color.setHex(0x00f0ff);
      } else {
        const lobe = CYBERPUNK_BRAIN_LOBES[selectedLobeFilter];
        if (lobe) {
          brainShellWireframeMatRef.current.color.setHex(lobe.hex);
        }
      }
    }
  }, [showBrainShell, shellOpacity, layoutMode, selectedLobeFilter]);

  // Aplicação do Filtro de Lobos Cerebrais, Relações e Destaque de Nós
  useEffect(() => {
    const instancedNodes = instancedNodesRef.current;
    const instancedHalos = instancedHalosRef.current;
    const lineSegments = lineSegmentsRef.current;
    if (!instancedNodes || !lineSegments) return;

    const nodePositions = nodePositionsRef.current;
    const dummyColor = new THREE.Color();

    // 1. Destaque e Coloração dos Nós e Halos
    if (selectedNode) {
      const neighborPaths = new Set<string>();
      neighborPaths.add(selectedNode.source_path);

      data.edges.forEach((ed) => {
        if (ed.source_path === selectedNode.source_path) neighborPaths.add(ed.target_path);
        if (ed.target_path === selectedNode.source_path) neighborPaths.add(ed.source_path);
      });

      for (let i = 0; i < nodePositions.length; i++) {
        const item = nodePositions[i];
        if (neighborPaths.has(item.node.source_path)) {
          dummyColor.setHex(item.colorHex);
        } else {
          dummyColor.setHex(0x0f172a); // Atenuação profunda dos nós fora do foco
        }
        instancedNodes.setColorAt(i, dummyColor);
        if (instancedHalos) instancedHalos.setColorAt(i, dummyColor);
      }
    } else if (selectedLobeFilter !== "ALL") {
      for (let i = 0; i < nodePositions.length; i++) {
        const item = nodePositions[i];
        if (item.lobeId === selectedLobeFilter) {
          dummyColor.setHex(item.colorHex);
        } else {
          dummyColor.setHex(0x0a0f1d); // Atenua nós dos demais lobos
        }
        instancedNodes.setColorAt(i, dummyColor);
        if (instancedHalos) instancedHalos.setColorAt(i, dummyColor);
      }
    } else {
      for (let i = 0; i < nodePositions.length; i++) {
        dummyColor.setHex(nodePositions[i].colorHex);
        instancedNodes.setColorAt(i, dummyColor);
        if (instancedHalos) instancedHalos.setColorAt(i, dummyColor);
      }
    }

    if (instancedNodes.instanceColor) {
      instancedNodes.instanceColor.needsUpdate = true;
    }
    if (instancedHalos && instancedHalos.instanceColor) {
      instancedHalos.instanceColor.needsUpdate = true;
    }

    // 2. Filtragem de Sinapses no LineSegments Buffer com Cores de Lobos
    const lineColorsAttr = lineSegments.geometry.getAttribute("color") as THREE.BufferAttribute;
    if (lineColorsAttr) {
      const edgeCount = data.edges.length;
      for (let e = 0; e < edgeCount; e++) {
        const edge = data.edges[e];
        const srcIdx = nodeIndexMapRef.current.get(edge.source_path);
        const tgtIdx = nodeIndexMapRef.current.get(edge.target_path);
        const src = srcIdx !== undefined ? nodePositions[srcIdx] : undefined;
        const tgt = tgtIdx !== undefined ? nodePositions[tgtIdx] : undefined;

        const matchRelation = relationFilter === "ALL" || edge.relation_type === relationFilter;
        let matchLobe = true;
        if (selectedLobeFilter !== "ALL" && src && tgt) {
          matchLobe = src.lobeId === selectedLobeFilter || tgt.lobeId === selectedLobeFilter;
        }

        let isHighlighted = true;
        if (selectedNode) {
          isHighlighted =
            edge.source_path === selectedNode.source_path ||
            edge.target_path === selectedNode.source_path;
        }

        if (matchRelation && matchLobe && isHighlighted && src && tgt) {
          const srcLobe = CYBERPUNK_BRAIN_LOBES[src.lobeId] || CYBERPUNK_BRAIN_LOBES.frontal;
          const tgtLobe = CYBERPUNK_BRAIN_LOBES[tgt.lobeId] || CYBERPUNK_BRAIN_LOBES.frontal;
          const mult = selectedNode ? 1.5 : 1.0;

          lineColorsAttr.setXYZ(e * 2, srcLobe.rgb[0] * mult, srcLobe.rgb[1] * mult, srcLobe.rgb[2] * mult);
          lineColorsAttr.setXYZ(e * 2 + 1, tgtLobe.rgb[0] * mult, tgtLobe.rgb[1] * mult, tgtLobe.rgb[2] * mult);
        } else {
          // Apaga ou atenua a aresta zerando as cores no buffer
          lineColorsAttr.setXYZ(e * 2, 0.02, 0.03, 0.06);
          lineColorsAttr.setXYZ(e * 2 + 1, 0.02, 0.03, 0.06);
        }
      }
      lineColorsAttr.needsUpdate = true;
    }
  }, [relationFilter, selectedLobeFilter, selectedNode, data.edges]);

  // Conexões do nó selecionado
  const selectedNodeEdges = useMemo(() => {
    if (!selectedNode) return [];
    return data.edges.filter(
      (e) =>
        e.source_path === selectedNode.source_path ||
        e.target_path === selectedNode.source_path
    );
  }, [selectedNode, data.edges]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-border/80 bg-slate-950 transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "h-[700px]"
      }`}
    >
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD: Status do Motor de Alto Desempenho e FPS */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-3 p-4">
        {/* Status Badge & Telemetria */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-sky-500/30 bg-slate-900/85 px-3.5 py-2 backdrop-blur-md shadow-lg shadow-sky-950/40">
          <div className="flex h-2.5 w-2.5 items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping absolute" />
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide text-cyan-300 uppercase">
                {is10kBenchmark ? "AXET 10.000 Nós (Stress Test)" : "AXET-NEURALGRAPH-3D"}
              </span>
              <span className="rounded bg-purple-500/20 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                {layoutMode === "brain" ? "🧠 Cérebro 3D" : "🌐 Esférico"}
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-emerald-400">
                {fps} FPS
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {stats.totalNodes.toLocaleString()} nós • {stats.totalEdges.toLocaleString()} sinapses • 3 Draw Calls (GPU)
            </span>
          </div>
        </div>

        {/* Barra de Busca de Nós */}
        <div className="pointer-events-auto relative min-w-[240px] max-w-sm flex-1 sm:max-w-xs">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Localizar nó no espaço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-400 backdrop-blur-md outline-none transition focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-slate-700/80 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-md z-30">
              {searchResults.map((node) => (
                <button
                  key={node.source_path}
                  onClick={() => {
                    focusOnNode(node.source_path);
                    setSearchTerm("");
                  }}
                  className="flex w-full flex-col rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-300 transition hover:bg-cyan-500/20 hover:text-cyan-200"
                >
                  <span className="font-medium truncate">{node.title}</span>
                  <span className="font-mono text-[10px] text-slate-400 truncate">
                    {node.source_path}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Toolbar de Controles e Alternadores */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/85 p-1 backdrop-blur-md shadow-lg">
          {/* Botão Alternador Cérebro vs Esfera */}
          <button
            onClick={() => setLayoutMode(layoutMode === "brain" ? "sphere" : "brain")}
            title={layoutMode === "brain" ? "Alternar para modo esférico clássico" : "Alternar para anatomia de cérebro 3D"}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
              layoutMode === "brain"
                ? "bg-gradient-to-r from-purple-500/25 to-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                : "text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            }`}
          >
            <span className="text-sm leading-none">🧠</span>
            <span className="hidden sm:inline">
              {layoutMode === "brain" ? "Cérebro 3D" : "Esférico"}
            </span>
          </button>

          {/* Botão Casca 3D Translúcida (Encapsulamento do Encéfalo) */}
          {layoutMode === "brain" && (
            <div className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-slate-950/60 p-0.5">
              <button
                onClick={() => setShowBrainShell(!showBrainShell)}
                title={showBrainShell ? "Ocultar casca translúcida 3D" : "Exibir casca translúcida 3D encapsulando o grafo"}
                className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition ${
                  showBrainShell
                    ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Layers className={`h-3.5 w-3.5 ${showBrainShell ? "text-cyan-400 animate-pulse" : "text-slate-400"}`} />
                <span className="hidden sm:inline">Casca 3D</span>
                <span className={`text-[10px] font-mono font-bold px-1 rounded ${showBrainShell ? "bg-cyan-400/25 text-cyan-300" : "bg-slate-800 text-slate-500"}`}>
                  {showBrainShell ? "ON" : "OFF"}
                </span>
              </button>

              {showBrainShell && (
                <div className="flex items-center gap-0.5 border-l border-slate-700/60 pl-1 pr-0.5">
                  {[
                    { label: "Suave", val: 0.18 },
                    { label: "Cristal", val: 0.30 },
                    { label: "Vívido", val: 0.45 },
                  ].map((lvl) => (
                    <button
                      key={lvl.val}
                      onClick={() => setShellOpacity(lvl.val)}
                      title={`Opacidade da casca de vidro: ${lvl.label}`}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-mono transition ${
                        Math.abs(shellOpacity - lvl.val) < 0.05
                          ? "bg-cyan-400 text-slate-950 font-bold shadow-sm"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Botão Benchmark 10.000 Nós */}
          <button
            onClick={() => {
              setIs10kBenchmark(!is10kBenchmark);
              setSelectedNode(null);
            }}
            title={is10kBenchmark ? "Voltar aos dados reais" : "Testar escala máxima com 10.000 nós e 25.000 sinapses"}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
              is10kBenchmark
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                : "text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">
              {is10kBenchmark ? "10.000 Nós Ativo" : "🧪 Testar 10k Nós"}
            </span>
          </button>

          {/* Botão Auto-Rotação */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pausar auto-giro" : "Ativar auto-giro (cérebro vivo)"}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              autoRotate
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Auto-Giro</span>
          </button>

          {/* Recentralizar Câmera */}
          <button
            onClick={resetCamera}
            title="Recentralizar visão panorâmica"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Sair da tela cheia" : "Modo Tela Cheia"}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Controles Flutuantes no Canto Superior Esquerdo: Lobos Cerebrais & Filtros */}
      <div className="pointer-events-none absolute left-4 top-20 flex flex-col gap-2 z-20 max-w-[calc(100vw-32px)]">
        {/* Barra de Lobos Cerebrais Cyberpunk */}
        {layoutMode === "brain" && (
          <div className="pointer-events-auto flex flex-wrap items-center gap-1 rounded-xl border border-slate-800/90 bg-slate-900/90 p-1 backdrop-blur-md shadow-xl">
            <span className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span className="text-cyan-400 animate-pulse">⚡</span>
              Lobos:
            </span>
            <button
              onClick={() => setSelectedLobeFilter("ALL")}
              className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold transition ${
                selectedLobeFilter === "ALL"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              Todos ({stats.totalNodes.toLocaleString()})
            </button>
            {LOBE_KEYS.map((key) => {
              const lobe = CYBERPUNK_BRAIN_LOBES[key];
              const count = lobeStats[key] || 0;
              const isSelected = selectedLobeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLobeFilter(isSelected ? "ALL" : key)}
                  title={`${lobe.name}: ${lobe.description}`}
                  className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-medium transition border ${
                    isSelected
                      ? "text-slate-950 font-bold shadow-lg"
                      : "text-slate-300 hover:text-white border-transparent hover:bg-slate-800/80"
                  }`}
                  style={{
                    backgroundColor: isSelected ? lobe.color : "transparent",
                    borderColor: isSelected ? lobe.color : "transparent",
                    boxShadow: isSelected ? `0 0 12px ${lobe.color}60` : undefined,
                  }}
                >
                  <span className="text-xs">{lobe.icon}</span>
                  <span>{lobe.shortName}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.1 text-[9px] font-mono ${
                      isSelected ? "bg-slate-950/40 text-slate-900 font-bold" : "bg-slate-800/80 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Filtros de Relação Sináptica */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1 rounded-xl border border-slate-800/90 bg-slate-900/90 p-1 backdrop-blur-md shadow-md">
          <span className="px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Filter className="h-2.5 w-2.5" />
            Sinapses:
          </span>
          <button
            onClick={() => setRelationFilter("ALL")}
            className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${
              relationFilter === "ALL"
                ? "bg-cyan-500 text-slate-950 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Todas ({stats.totalEdges.toLocaleString()})
          </button>
          {Object.entries(RELATION_COLORS).map(([key, info]) => {
            const count = stats.relationCounts[key] || 0;
            if (count === 0) return null;
            const isSelected = relationFilter === key;
            return (
              <button
                key={key}
                onClick={() => setRelationFilter(key)}
                className={`flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium transition ${
                  isSelected ? "text-slate-950 font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}
                style={{ backgroundColor: isSelected ? info.color : "transparent" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: info.color }} />
                {info.label} ({count.toLocaleString()})
              </button>
            );
          })}
        </div>

        {/* Card Informativo de Iluminação da Área Anatômica Cyberpunk */}
        {layoutMode === "brain" && selectedLobeFilter !== "ALL" && (() => {
          const activeLobe = CYBERPUNK_BRAIN_LOBES[selectedLobeFilter];
          if (!activeLobe) return null;
          const nodeCount = lobeStats[selectedLobeFilter] || 0;
          const pct = Math.round((nodeCount / Math.max(1, stats.totalNodes)) * 100);

          return (
            <div
              className="pointer-events-auto max-w-sm rounded-2xl border bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
              style={{
                borderColor: `${activeLobe.color}55`,
                boxShadow: `0 0 32px ${activeLobe.color}20`,
              }}
            >
              {/* Header com Insígnia e Ação de Fechar */}
              <div
                className="flex items-start justify-between gap-2 border-b pb-2.5"
                style={{ borderColor: `${activeLobe.color}25` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-base shadow-lg"
                    style={{
                      backgroundColor: `${activeLobe.color}20`,
                      color: activeLobe.color,
                      border: `1px solid ${activeLobe.color}40`,
                    }}
                  >
                    {activeLobe.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
                        {activeLobe.name}
                      </h4>
                      <span
                        className="rounded px-1.5 py-0.2 text-[9px] font-mono font-bold border"
                        style={{
                          backgroundColor: `${activeLobe.color}25`,
                          color: activeLobe.color,
                          borderColor: `${activeLobe.color}60`,
                        }}
                      >
                        ILUMINADO
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {nodeCount} documentos ativos ({pct}% do grafo neural)
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLobeFilter("ALL")}
                  title="Restaurar visualização de todos os lobos"
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Localização Anatômica */}
              <div className="mt-2.5 flex items-start gap-1.5 text-[11px]">
                <span className="font-semibold text-slate-400 shrink-0">📍 Posição 3D:</span>
                <span className="text-slate-200">{activeLobe.anatomicalPosition}</span>
              </div>

              {/* Papel Cognitivo */}
              <div
                className="mt-2.5 rounded-xl p-2.5 text-xs"
                style={{
                  backgroundColor: `${activeLobe.color}0d`,
                  border: `1px solid ${activeLobe.color}30`,
                }}
              >
                <div
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: activeLobe.color }}
                >
                  <span>🧠 Papel Cognitivo:</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-200 font-medium">
                  {activeLobe.cognitiveRole}
                </p>
              </div>

              {/* Critério Semântico no RAG Reef */}
              <div className="mt-2.5 text-[11px]">
                <div className="font-semibold text-slate-400 flex items-center gap-1 mb-1.5">
                  <Tag className="h-3 w-3 text-cyan-400" />
                  <span>Critério Semântico de Indexação:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {activeLobe.semanticCriteria.split(", ").map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-slate-800 bg-slate-900/90 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botão para Restaurar Todos */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Demais setores atenuados
                </span>
                <button
                  onClick={() => setSelectedLobeFilter("ALL")}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
                >
                  Restaurar Todos os Lobos
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Hover Tooltip Flutuante Ultra-Rápido com Identificação de Lobo Cyberpunk */}
      {hoveredNode && !selectedNode && (() => {
        const lobe = getNodeBrainLobe(hoveredNode, 0);
        return (
          <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
            <div
              className="flex items-center gap-3 rounded-xl border bg-slate-900/95 px-4 py-2.5 text-xs text-slate-200 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
              style={{
                borderColor: `${lobe.color}60`,
                boxShadow: `0 0 24px ${lobe.color}30`,
              }}
            >
              <div
                className="flex h-3.5 w-3.5 rounded-full shadow-[0_0_12px_currentColor]"
                style={{ backgroundColor: lobe.color, color: lobe.color }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-100">{hoveredNode.title}</span>
                  <span
                    className="rounded px-1.5 py-0.2 text-[9px] font-bold border"
                    style={{
                      backgroundColor: `${lobe.color}20`,
                      color: lobe.color,
                      borderColor: `${lobe.color}60`,
                    }}
                  >
                    {lobe.icon} {lobe.shortName}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono truncate max-w-sm">
                  {hoveredNode.source_path}
                </div>
              </div>
              <div className="ml-2 border-l border-slate-700/80 pl-3 text-[10px] text-slate-400 font-medium">
                Clique para focar
              </div>
            </div>
          </div>
        );
      })()}

      {/* Bottom HUD: Legenda de Navegação */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800/80 bg-slate-900/85 px-3 py-1.5 backdrop-blur-md">
          <span className="text-cyan-400 font-medium">🖱️ Arrastar Mouse:</span>
          <span>Girar 360° em todos os eixos</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-medium">Scroll:</span>
          <span>Zoom</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-medium">Botão Direito:</span>
          <span>Pan</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium">Arquitetura GPU Instanced:</span>
          <span>Fluido a 60 FPS</span>
        </div>

        {selectedNode && (
          <button
            onClick={resetCamera}
            className="pointer-events-auto rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-slate-300 hover:bg-slate-700 transition"
          >
            Fechar Inspeção (Restaurar Todos)
          </button>
        )}
      </div>

      {/* Inspector Drawer Lateral do Nó Selecionado */}
      {selectedNode && (() => {
        const lobe = getNodeBrainLobe(selectedNode, 0);
        return (
          <div className="pointer-events-auto absolute right-0 top-0 bottom-0 w-full sm:w-[420px] border-l border-slate-800 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl z-40 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-250">
            <div>
              {/* Header do Drawer */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold border"
                      style={{
                        backgroundColor: `${lobe.color}18`,
                        color: lobe.color,
                        borderColor: `${lobe.color}50`,
                      }}
                    >
                      <span>{lobe.icon}</span>
                      <span>{lobe.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {selectedNodeEdges.length} sinapses
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-slate-100 leading-snug">
                    {selectedNode.title}
                  </h3>
                  <code className="mt-1 block font-mono text-[11px] text-slate-400 break-all">
                    {selectedNode.source_path}
                  </code>
                </div>
                <button
                  onClick={resetCamera}
                  title="Fechar e restaurar visão panorâmica"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Setor Cerebral Anatômico Cyberpunk */}
              <div
                className="mt-3.5 rounded-xl border p-3 text-xs"
                style={{
                  backgroundColor: `${lobe.color}0a`,
                  borderColor: `${lobe.color}35`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold" style={{ color: lobe.color }}>
                    <span>{lobe.icon}</span>
                    <span>{lobe.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {lobe.anatomicalPosition.split(" • ")[0]}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-200 leading-relaxed font-medium">
                  {lobe.cognitiveRole}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[10px] text-slate-400">
                  <Tag className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span className="font-mono text-cyan-300/90 truncate">
                    Critério: {lobe.semanticCriteria}
                  </span>
                </div>
              </div>

              {/* Resumo Executivo */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Resumo Executivo (GraphRAG)
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Tópicos Semânticos */}
              {selectedNode.topics && selectedNode.topics.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Tópicos Extraídos
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-slate-800 bg-slate-900/90 px-2.5 py-0.5 text-[11px] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sinapses / Conexões do Nó */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Sinapses Ativas ({selectedNodeEdges.length})
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    Clique no documento para viajar
                  </span>
                </div>

                {selectedNodeEdges.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-800 p-4 text-center text-xs text-slate-500">
                    Nenhuma conexão semântica direta para este documento.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {selectedNodeEdges.map((edge) => {
                      const isSource = edge.source_path === selectedNode.source_path;
                      const neighborPath = isSource ? edge.target_path : edge.source_path;
                      const neighborNode = data.nodes.find((n) => n.source_path === neighborPath);
                      const relInfo = RELATION_COLORS[edge.relation_type] || {
                        color: "#94a3b8",
                        label: edge.relation_type,
                      };

                      return (
                        <div
                          key={edge.id}
                          className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 text-xs transition hover:border-cyan-500/40"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                              style={{
                                backgroundColor: `${relInfo.color}20`,
                                color: relInfo.color,
                              }}
                            >
                              {isSource ? `→ ${relInfo.label}` : `← ${relInfo.label}`}
                            </span>
                            <button
                              onClick={() => focusOnNode(neighborPath)}
                              className="flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300"
                            >
                              Focar <ArrowUpRight className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="mt-1 font-medium text-slate-200">
                            {neighborNode?.title || neighborPath}
                          </div>
                          <p className="mt-1 text-[11px] text-slate-400 italic">
                            {edge.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé do Drawer */}
            <div className="mt-6 border-t border-slate-800 pt-3 flex justify-between items-center text-[11px] text-slate-400">
              <span>GraphRAG Cognitivo</span>
              <button
                onClick={resetCamera}
                className="rounded-lg border border-slate-800 px-2.5 py-1 text-slate-300 hover:bg-slate-800 transition"
              >
                Visão Panorâmica
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
