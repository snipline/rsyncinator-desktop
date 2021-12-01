# Rsyncinator Desktop

This is the open source desktop and web app for Rsyncinator, the GUI tool for generating rsync commands.

![Rsyncinator Preview on MacOS and Windows 10](/rsyncinator-preview.jpg)

⚠️ This tool is currently in early development so please be mindful of bugs and lack of features.

**Like this app?**

Please consider donating via the [Gumroad product page](https://snipline.gumroad.com/l/rsyncinator-desktop) which helps me to maintain and add new features!

## Installation

Please see the releases directory for downloading the executables.

## Developing

This app uses Svelte for the web side of things and Tauri for the application. You will need Node and Rust installed.

```
npm install

# The web app - available on port 5000
npm run dev 

# Run the desktop app in another terminal
npm run tauri dev
```

## Build From Source

To build your own production version of the app first make sure [the Tauri prequisites are installed](https://tauri.studio/en/docs/getting-started/intro), generate the web assets and then build the Tauri application.

```
npm run build && npm run tauri build
```
