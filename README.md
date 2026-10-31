# K-Foodiary

K-Food diary, calendar, book, and stamp app. GitHub Pages serves the files from the repository root.

## Google account sync

The app keeps a local offline copy and syncs the signed-in account's records, photos, favorites, and profile icon to that user's private Google Drive `appDataFolder`.

In the Google Cloud project used by `config.js`:

1. Enable the Google Drive API.
2. In Google Auth Platform → Data Access, add `https://www.googleapis.com/auth/drive.appdata`.
3. Sign in to K-Foodiary and accept the additional Google Drive permission. The Account menu has a **Connect Google Drive sync** action for reconnecting or syncing again.

The app-data folder is hidden from the regular Drive file list and is accessible only to this app. Each Google account has its own copy.

## Build the React photo gallery

Run `npm install` and `npm run build`. Commit the generated `dist/assets` files along with the source files; the root `index.html` loads the built React gallery from there. A plain JavaScript gallery remains available if the built component is missing.
