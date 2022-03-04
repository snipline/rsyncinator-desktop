#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate clipboard;

use clipboard::ClipboardContext;
use clipboard::ClipboardProvider;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![copy_to_clipboard])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
#[tauri::command]
fn copy_to_clipboard(copy_string: String) -> Result<String, String> {
  let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
  // println!("{:?}", ctx.get_contents());
  match ctx.set_contents(copy_string.to_owned()) {
    Ok(_) => Ok(copy_string.into()),
    Err(_) => Err(copy_string),
  }
  // .unwrap();

  // If something fails
  // Err("This failed!".into())
  // If it worked
  // Ok("This worked!".into())
}
