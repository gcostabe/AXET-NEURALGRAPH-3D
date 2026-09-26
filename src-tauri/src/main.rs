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

#[tauri::command]
async fn start_local_backend() -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        let user_profile = std::env::var("USERPROFILE").unwrap_or_default();
        let mut candidates = vec![
            format!("{}\\Desktop\\Iniciar AXET-NEURALGRAPH-3D.bat", user_profile),
            format!("{}\\OneDrive\\Desktop\\Iniciar AXET-NEURALGRAPH-3D.bat", user_profile),
            "iniciar_windows.bat".to_string(),
            format!("{}\\dev\\RAG-LOCAL-REEF\\iniciar_windows.bat", user_profile),
            format!("{}\\dev\\ACDC\\iniciar_windows.bat", user_profile),
            "C:\\dev\\RAG-LOCAL-REEF\\iniciar_windows.bat".to_string(),
            "C:\\dev\\ACDC\\iniciar_windows.bat".to_string(),
        ];

        // Se houver subpastas em %USERPROFILE%\dev, adiciona
        let dev_dir = format!("{}\\dev", user_profile);
        if let Ok(entries) = std::fs::read_dir(&dev_dir) {
            for entry in entries.flatten() {
                let sub_bat = entry.path().join("iniciar_windows.bat");
                if sub_bat.exists() {
                    candidates.push(sub_bat.to_string_lossy().to_string());
                }
            }
        }

        for candidate in &candidates {
            if std::path::Path::new(candidate).exists() {
                let res = std::process::Command::new("cmd")
                    .args(&["/c", "start", "/min", candidate])
                    .spawn();
                if res.is_ok() {
                    return Ok(format!("Inicializando serviços via: {}", candidate));
                }
            }
        }

        // Tentar invocar wsl docker compose localizando o repositorio caso o bat nao esteja estatico
        let wsl_cmd = "for d in /mnt/c/Users/*/dev/* /mnt/c/dev/* ~/dev/*; do if [ -f \"$d/docker-compose.yml\" ]; then cd \"$d\" && service docker start && docker compose up -d && exit 0; fi; done; service docker start && docker compose up -d";
        let wsl_res = std::process::Command::new("wsl")
            .args(&["-d", "Ubuntu", "-u", "root", "--", "bash", "-c", wsl_cmd])
            .spawn();

        if wsl_res.is_ok() {
            return Ok("Iniciando containers do Docker via WSL2 em segundo plano...".to_string());
        }

        // Tentar docker compose diretamente no Windows
        let docker_res = std::process::Command::new("cmd")
            .args(&["/c", "docker", "compose", "up", "-d"])
            .spawn();

        if docker_res.is_ok() {
            return Ok("Iniciando containers via Docker Desktop...".to_string());
        }

        Err("Não foi possível localizar o Docker ou o script iniciar_windows.bat na máquina.".to_string())
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
