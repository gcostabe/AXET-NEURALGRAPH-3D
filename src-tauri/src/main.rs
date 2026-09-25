#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod ports;

use ports::{resolve_all_ports, ServicePorts};
use tauri::{
    menu::{Menu, MenuItem},
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

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let quit_i = MenuItem::with_id(app, "quit", "Encerrar AXET", true, None::<&str>)?;
            let show_i = MenuItem::with_id(app, "show", "Abrir Dashboard", true, None::<&str>)?;
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
            get_system_environment
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao inicializar o aplicativo desktop AXET");
}
