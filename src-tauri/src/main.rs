#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod ports;

use ports::{resolve_all_ports, ServicePorts};
use tauri::{
    menu::{AboutMetadata, Menu, MenuItem, PredefinedMenuItem, Submenu},
    tray::TrayIconBuilder,
    AppHandle, Manager,
};
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
async fn pick_onedrive_folder(app: AppHandle) -> Result<String, String> {
    let folder = app
        .dialog()
        .file()
        .set_title("Selecione a pasta do OneDrive com os arquivos .md")
        .blocking_pick_folder();

    match folder {
        Some(path) => Ok(path.to_string()),
        None => Err("Nenhuma pasta selecionada".to_string()),
    }
}

#[tauri::command]
fn get_service_ports() -> ServicePorts {
    resolve_all_ports()
}

#[tauri::command]
fn get_system_environment() -> serde_json::Value {
    serde_json::json!({
        "os": std::env::consts::OS,
        "arch": std::env::consts::ARCH,
        "family": std::env::consts::FAMILY,
        "version": env!("CARGO_PKG_VERSION"),
    })
}

#[tauri::command]
fn open_browser(url: String) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&url)
            .spawn()
            .map_err(|e| e.to_string())?;
        return Ok(());
    }
    #[cfg(target_os = "windows")]
    {
        let escaped_url = url.replace("&", "^&");
        std::process::Command::new("cmd")
            .args(&["/c", "start", "", &escaped_url])
            .spawn()
            .map_err(|e| e.to_string())?;
        return Ok(());
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        std::process::Command::new("xdg-open")
            .arg(&url)
            .spawn()
            .map_err(|e| e.to_string())?;
        return Ok(());
    }
}

#[cfg(target_os = "windows")]
fn ensure_windows_runtime(app: &AppHandle) -> Result<std::path::PathBuf, String> {
    use std::path::PathBuf;

    let local_appdata = std::env::var("LOCALAPPDATA")
        .unwrap_or_else(|_| "C:\\ProgramData".to_string());
    let target_dir = PathBuf::from(local_appdata)
        .join("AXET-NeuralGraph")
        .join("runtime");

    let py_target = target_dir.join("python").join("python.exe");
    let supervisor_target = target_dir.join("scripts").join("supervisor_windows.py");

    if py_target.exists() && supervisor_target.exists() {
        return Ok(target_dir);
    }

    let mut zip_candidates: Vec<PathBuf> = Vec::new();

    if let Ok(res_dir) = app.path().resource_dir() {
        zip_candidates.push(res_dir.join("axet-runtime.zip"));
        zip_candidates.push(res_dir.join("resources").join("axet-runtime.zip"));
    }

    if let Ok(exe_path) = std::env::current_exe() {
        if let Some(parent) = exe_path.parent() {
            zip_candidates.push(parent.join("axet-runtime.zip"));
            zip_candidates.push(parent.join("resources").join("axet-runtime.zip"));
            if let Some(grandparent) = parent.parent() {
                zip_candidates.push(grandparent.join("resources").join("axet-runtime.zip"));
            }
        }
    }

    for zip_path in zip_candidates {
        if zip_path.exists() {
            let _ = std::fs::create_dir_all(&target_dir);

            // Tenta descompactar via tar nativo do Windows (rápido e padrão)
            #[cfg(target_os = "windows")]
            {
                use std::os::windows::process::CommandExt;
                let status = std::process::Command::new("tar.exe")
                    .args(&["-xf", &zip_path.to_string_lossy(), "-C", &target_dir.to_string_lossy()])
                    .creation_flags(0x08000000)
                    .status();

                if let Ok(s) = status {
                    if s.success() && py_target.exists() {
                        return Ok(target_dir);
                    }
                }

                // Fallback com PowerShell
                let ps_cmd = format!(
                    "Expand-Archive -Path '{}' -DestinationPath '{}' -Force",
                    zip_path.to_string_lossy(),
                    target_dir.to_string_lossy()
                );
                let ps_status = std::process::Command::new("powershell")
                    .args(&["-NoProfile", "-NonInteractive", "-Command", &ps_cmd])
                    .creation_flags(0x08000000)
                    .status();

                if let Ok(s) = ps_status {
                    if s.success() && py_target.exists() {
                        return Ok(target_dir);
                    }
                }
            }
        }
    }

    if let Ok(res_dir) = app.path().resource_dir() {
        let uncomp = res_dir.join("runtime");
        if uncomp.join("python").join("python.exe").exists() {
            return Ok(uncomp);
        }
    }

    Err("Runtime embutido não localizado".to_string())
}

#[tauri::command]
async fn start_local_backend(app: AppHandle) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        const CREATE_NO_WINDOW: u32 = 0x08000000;

        // 1. PRIMEIRA PRIORIDADE: Runtime embutido nativo do MSI (Zero-Touch)
        if let Ok(runtime_dir) = ensure_windows_runtime(&app) {
            let py_exe = runtime_dir.join("python").join("python.exe");
            let supervisor = runtime_dir.join("scripts").join("supervisor_windows.py");

            if py_exe.exists() && supervisor.exists() {
                let res = std::process::Command::new(&py_exe)
                    .arg(&supervisor)
                    .current_dir(&runtime_dir)
                    .creation_flags(CREATE_NO_WINDOW)
                    .spawn();

                if res.is_ok() {
                    return Ok("Iniciando serviços nativos AXET (Runtime Embutido MSI) em segundo plano...".to_string());
                }
            }
        }

        // 2. SEGUNDA PRIORIDADE: Scripts de inicialização do repositório/desenvolvimento
        let user_profile = std::env::var("USERPROFILE").unwrap_or_default();
        let mut candidates = vec![
            "iniciar_windows_nativo.bat".to_string(),
            "iniciar_windows.bat".to_string(),
            format!("{}\\OneDrive\\Área de Trabalho\\AXET-NEURALGRAPH-3D\\iniciar_windows_nativo.bat", user_profile),
            format!("{}\\OneDrive\\Área de Trabalho\\AXET-NEURALGRAPH-3D\\iniciar_windows.bat", user_profile),
            format!("{}\\OneDrive\\Área de Trabalho\\Iniciar AXET-NEURALGRAPH-3D.bat", user_profile),
            format!("{}\\Área de Trabalho\\AXET-NEURALGRAPH-3D\\iniciar_windows_nativo.bat", user_profile),
            format!("{}\\Área de Trabalho\\AXET-NEURALGRAPH-3D\\iniciar_windows.bat", user_profile),
            format!("{}\\Área de Trabalho\\Iniciar AXET-NEURALGRAPH-3D.bat", user_profile),
            format!("{}\\Desktop\\AXET-NEURALGRAPH-3D\\iniciar_windows_nativo.bat", user_profile),
            format!("{}\\Desktop\\AXET-NEURALGRAPH-3D\\iniciar_windows.bat", user_profile),
            format!("{}\\Desktop\\Iniciar AXET-NEURALGRAPH-3D.bat", user_profile),
            format!("{}\\OneDrive\\Desktop\\Iniciar AXET-NEURALGRAPH-3D.bat", user_profile),
            format!("{}\\dev\\RAG-LOCAL-REEF\\iniciar_windows.bat", user_profile),
            format!("{}\\dev\\ACDC\\iniciar_windows.bat", user_profile),
            "C:\\dev\\RAG-LOCAL-REEF\\iniciar_windows.bat".to_string(),
            "C:\\dev\\ACDC\\iniciar_windows.bat".to_string(),
        ];

        // Se houver diretório do executável atual, busca nas pastas pai
        if let Ok(exe_path) = std::env::current_exe() {
            let mut cur = exe_path.parent();
            for _ in 0..4 {
                if let Some(p) = cur {
                    let nativo = p.join("iniciar_windows_nativo.bat");
                    if nativo.exists() {
                        candidates.insert(0, nativo.to_string_lossy().to_string());
                    }
                    let normal = p.join("iniciar_windows.bat");
                    if normal.exists() {
                        candidates.push(normal.to_string_lossy().to_string());
                    }
                    cur = p.parent();
                } else {
                    break;
                }
            }
        }

        // Se houver subpastas em %USERPROFILE%\dev, adiciona
        let dev_dir = format!("{}\\dev", user_profile);
        if let Ok(entries) = std::fs::read_dir(&dev_dir) {
            for entry in entries.flatten() {
                let sub_nativo = entry.path().join("iniciar_windows_nativo.bat");
                if sub_nativo.exists() {
                    candidates.push(sub_nativo.to_string_lossy().to_string());
                }
                let sub_bat = entry.path().join("iniciar_windows.bat");
                if sub_bat.exists() {
                    candidates.push(sub_bat.to_string_lossy().to_string());
                }
            }
        }

        // Se houver script .bat local, executa 100% invisível sem janela e em modo não-interativo
        for candidate in &candidates {
            if std::path::Path::new(candidate).exists() {
                let parent_dir = std::path::Path::new(candidate).parent().unwrap_or(std::path::Path::new("."));
                let res = std::process::Command::new("cmd")
                    .args(&["/c", candidate, "--non-interactive"])
                    .current_dir(parent_dir)
                    .env("NON_INTERACTIVE", "1")
                    .creation_flags(CREATE_NO_WINDOW)
                    .spawn();
                if res.is_ok() {
                    return Ok(format!("Inicializando serviços em segundo plano via: {}", candidate));
                }
            }
        }

        // 3. Fallbacks opcionais com Docker se instalado
        for dev_path in &[
            format!("{}\\dev\\RAG-LOCAL-REEF", user_profile),
            format!("{}\\dev\\ACDC", user_profile),
            "C:\\dev\\RAG-LOCAL-REEF".to_string(),
            "C:\\dev\\ACDC".to_string(),
        ] {
            let dc_path = format!("{}\\docker-compose.yml", dev_path);
            if std::path::Path::new(&dc_path).exists() {
                let docker_res = std::process::Command::new("cmd")
                    .args(&["/c", "docker", "compose", "up", "-d"])
                    .current_dir(dev_path)
                    .creation_flags(CREATE_NO_WINDOW)
                    .spawn();
                if docker_res.is_ok() {
                    return Ok("Iniciando containers via Docker Desktop no Windows em segundo plano...".to_string());
                }
            }
        }

        // 4. Tentar docker compose global no Windows sem janela
        let docker_res = std::process::Command::new("cmd")
            .args(&["/c", "docker", "compose", "up", "-d"])
            .creation_flags(CREATE_NO_WINDOW)
            .spawn();

        if docker_res.is_ok() {
            return Ok("Iniciando containers via Docker Desktop em segundo plano...".to_string());
        }

        Err("Não foi possível localizar o runtime embutido ou Docker para iniciar os serviços.".to_string())
    }

    #[cfg(target_os = "macos")]
    {
        let _ = std::process::Command::new("sh")
            .args(&["-c", "docker compose up -d"])
            .spawn();
        Ok("Iniciando containers via Docker Compose no macOS...".to_string())
    }

    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    {
        Err("Sistema operacional não suportado para inicialização automática.".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                let about_metadata = AboutMetadata {
                    name: Some("AXET-NeuralGraph".into()),
                    version: Some(env!("CARGO_PKG_VERSION").into()),
                    short_version: Some(env!("CARGO_PKG_VERSION").into()),
                    authors: None,
                    comments: None,
                    credits: Some("Gustavo Costa Berbert: Solution Architect & Cognitive Intelligence\nMarcio Miguel: Executive Leadership & Business Architecture\n\nApplication Services - MAPPS".into()),
                    copyright: Some("© 2026 NTT DATA. All rights reserved.".into()),
                    website: Some("https://github.com/gcostabe/AXET-NEURALGRAPH-3D".into()),
                    website_label: Some("Official Repository".into()),
                    ..Default::default()
                };

                let app_submenu = Submenu::with_items(
                    app,
                    "AXET-NeuralGraph",
                    true,
                    &[
                        &PredefinedMenuItem::about(app, Some("About AXET-NeuralGraph"), Some(about_metadata))?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::services(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::hide(app, None)?,
                        &PredefinedMenuItem::hide_others(app, None)?,
                        &PredefinedMenuItem::show_all(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::quit(app, None)?,
                    ],
                )?;

                let edit_submenu = Submenu::with_items(
                    app,
                    "Edit",
                    true,
                    &[
                        &PredefinedMenuItem::undo(app, None)?,
                        &PredefinedMenuItem::redo(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::cut(app, None)?,
                        &PredefinedMenuItem::copy(app, None)?,
                        &PredefinedMenuItem::paste(app, None)?,
                        &PredefinedMenuItem::select_all(app, None)?,
                    ],
                )?;

                let window_submenu = Submenu::with_items(
                    app,
                    "Window",
                    true,
                    &[
                        &PredefinedMenuItem::minimize(app, None)?,
                        &PredefinedMenuItem::maximize(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::close_window(app, None)?,
                    ],
                )?;

                let app_menu = Menu::with_items(
                    app,
                    &[&app_submenu, &edit_submenu, &window_submenu],
                )?;
                app.set_menu(app_menu)?;
            }

            let quit_i = MenuItem::with_id(app, "quit", "Quit AXET", true, None::<&str>)?;
            let show_i = MenuItem::with_id(app, "show", "Open Dashboard", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .tooltip("AXET NeuralGraph 3D - Enterprise Knowledge Assistant")
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    _ => {}
                })
                .build(app)?;

            #[cfg(target_os = "windows")]
            {
                let app_handle = app.handle().clone();
                tauri::async_runtime::spawn(async move {
                    let _ = start_local_backend(app_handle).await;
                });
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            pick_onedrive_folder,
            get_service_ports,
            get_system_environment,
            open_browser,
            start_local_backend
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao inicializar o aplicativo desktop AXET");
}
