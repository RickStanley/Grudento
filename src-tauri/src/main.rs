#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;

use crate::cmd::create_window;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![create_window])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
