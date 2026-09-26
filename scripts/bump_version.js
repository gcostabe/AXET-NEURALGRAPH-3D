#!/usr/bin/env node

/**
 * Script de Auto-Evolução de Versão e Governança de Autoria (AXET-NeuralGraph)
 * Criadores: Gustavo Costa Berbert & Marcio Miguel (NTT DATA / MAPFRE)
 *
 * Atualiza sincronizadamente:
 *  - src-tauri/tauri.conf.json
 *  - src-tauri/Cargo.toml
 *  - frontend/package.json
 *  - package.json (root)
 */

const fs = require('fs');
const path = require('path');

function findProjectRoot() {
  let cur = __dirname;
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(cur, 'src-tauri', 'tauri.conf.json'))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return process.cwd();
}

const rootDir = findProjectRoot();
const tauriConfPath = path.join(rootDir, 'src-tauri', 'tauri.conf.json');
const cargoTomlPath = path.join(rootDir, 'src-tauri', 'Cargo.toml');
const frontendPkgPath = path.join(rootDir, 'frontend', 'package.json');
const rootPkgPath = path.join(rootDir, 'package.json');
const lockPath = path.join(rootDir, '.build_bump_lock');

if (!fs.existsSync(tauriConfPath)) {
  console.error('❌ tauri.conf.json não encontrado em:', tauriConfPath);
  process.exit(1);
}

// 1. Ler versão atual
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
const currentVersion = tauriConf.version || '1.0.1';
const explicitVersion = process.argv[2];

// Debounce: evita double-bump se o script for invocado pelo wrapper e pelo beforeBuildCommand na mesma compilação
if (fs.existsSync(lockPath) && !explicitVersion) {
  try {
    const mtime = fs.statSync(lockPath).mtimeMs;
    if (Date.now() - mtime < 20000) {
      console.log(`ℹ️ Ciclo de compilação em andamento. Mantendo versão v${currentVersion}.`);
      process.exit(0);
    }
  } catch {}
}

// 2. Determinar nova versão
let newVersion = '';

if (explicitVersion && /^\d+\.\d+\.\d+/.test(explicitVersion)) {
  newVersion = explicitVersion.replace(/^v/, '');
} else {
  const parts = currentVersion.split('.').map(n => parseInt(n, 10) || 0);
  while (parts.length < 3) parts.push(0);
  parts[2] += 1; // Incrementa patch a cada compilação
  newVersion = parts.join('.');
}

try {
  fs.writeFileSync(lockPath, String(Date.now()), 'utf8');
} catch {}

console.log(`\n======================================================`);
console.log(`🚀 AUTO-EVOLUÇÃO DE VERSÃO DE COMPILAÇÃO`);
console.log(`   Versão Anterior: v${currentVersion}`);
console.log(`   Nova Versão:     v${newVersion}`);
console.log(`   Criadores:       Gustavo Costa Berbert & Marcio Miguel`);
console.log(`======================================================\n`);

// 3. Atualizar tauri.conf.json
tauriConf.version = newVersion;
if (!tauriConf.bundle) tauriConf.bundle = {};
tauriConf.bundle.copyright = "Criadores: Gustavo Costa Berbert & Marcio Miguel\\n© 2026 NTT DATA / MAPFRE";
if (!tauriConf.bundle.macOS) tauriConf.bundle.macOS = {};
tauriConf.bundle.macOS.infoPlist = "Info.plist";

fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n', 'utf8');
console.log(`✓ Atualizado: src-tauri/tauri.conf.json -> v${newVersion}`);

// 4. Atualizar Cargo.toml
if (fs.existsSync(cargoTomlPath)) {
  let cargoContent = fs.readFileSync(cargoTomlPath, 'utf8');
  cargoContent = cargoContent.replace(
    /(\[package\][\s\S]*?version\s*=\s*")[^"]+(")/,
    `$1${newVersion}$2`
  );
  if (!cargoContent.includes('Gustavo Costa Berbert')) {
    cargoContent = cargoContent.replace(
      /(\[package\][\s\S]*?authors\s*=\s*)\[[^\]]+\]/,
      `$1["Gustavo Costa Berbert <gcostabe@emeal.nttdata.com>", "Marcio Miguel"]`
    );
  }
  fs.writeFileSync(cargoTomlPath, cargoContent, 'utf8');
  console.log(`✓ Atualizado: src-tauri/Cargo.toml -> v${newVersion}`);
}

// 5. Atualizar frontend/package.json
if (fs.existsSync(frontendPkgPath)) {
  const frontPkg = JSON.parse(fs.readFileSync(frontendPkgPath, 'utf8'));
  frontPkg.version = newVersion;
  fs.writeFileSync(frontendPkgPath, JSON.stringify(frontPkg, null, 2) + '\n', 'utf8');
  console.log(`✓ Atualizado: frontend/package.json -> v${newVersion}`);
}

// 6. Atualizar package.json na raiz se existir
if (fs.existsSync(rootPkgPath)) {
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
  rootPkg.version = newVersion;
  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n', 'utf8');
  console.log(`✓ Atualizado: package.json (root) -> v${newVersion}`);
}

console.log(`\n🎉 Sincronização de versão v${newVersion} concluída com sucesso!\n`);
