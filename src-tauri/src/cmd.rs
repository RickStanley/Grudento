#[tauri::command]
pub fn create_window() {
  println!("I was called from js!");
  tauri::Builder::default().create_window(
    "Note",
    tauri::WindowUrl::App("note/index.html?p=1".into()),
    move |window_builder, webview_atrributes| (window_builder, webview_atrributes),
  );

  // tauri::Builder::default()
  //   .setup(|app| {
  //     app.create_window(
  //       "window2".to_string(),
  //       tauri::WindowUrl::App("note/index.html?p=1".into()),
  //       |WinAttrs, WebviewAttrs| {
  //         let WinAttrs = WinAttrs
  //           .title("Main 2")
  //           .resizable(true)
  //           .transparent(false)
  //           .decorations(true)
  //           .always_on_top(false)
  //           .inner_size(800.0, 600.0)
  //           .min_inner_size(300.0, 150.0)
  //           .fullscreen(false);
  //         (WinAttrs, WebviewAttrs)
  //       },
  //     );
  //   })
  //   .run();
}
