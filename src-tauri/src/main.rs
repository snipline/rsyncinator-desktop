#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate clipboard;

use crate::menu::AddDefaultSubmenus;
use clipboard::ClipboardContext;
use clipboard::ClipboardProvider;
use tauri::{CustomMenuItem, Manager, Menu, Submenu};
mod menu;
use tauri::api::shell;

fn custom_item(name: &str) -> CustomMenuItem {
  let c = CustomMenuItem::new(name.to_string(), name);
  return c;
}
fn main() {
  let ctx = tauri::generate_context!();
  tauri::Builder::default()
    .menu(
      Menu::new()
        .add_default_app_submenu_if_macos(&ctx.package_info().name)
        .add_default_file_submenu()
        .add_default_edit_submenu()
        .add_submenu(Submenu::new(
          "Help",
          Menu::new().add_item(custom_item("Github Issues")),
        )),
    )
    .on_menu_event(|event| {
      let event_name = event.menu_item_id();
      let event_scope = &event.window().shell_scope();
      match event_name {
        "Github Issues" => {
          shell::open(
            event_scope,
            "https://github.com/snipline/rsyncinator-desktop/issues".to_string(),
            None,
          )
          .unwrap();
        }
        _ => {}
      }
    })
    .invoke_handler(tauri::generate_handler![copy_to_clipboard])
    .run(ctx)
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
