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
            open_browser
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao inicializar o aplicativo desktop AXET");
}
