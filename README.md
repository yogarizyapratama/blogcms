# Simple Blog CMS API

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` ke `.env` dan sesuaikan value-nya.
3. Jalankan MongoDB (local atau remote).
4. (Opsional, jika database masih kosong) Buat super user pertama:
   ```bash
   node scripts/createSuperUser.js
   ```
   Super user default:
   - username: `superadmin`
   - password: `superpassword`

5. Start API (local):
   ```bash
   node app.js
   ```
   
## Penjelasan Auth dan Akses API

- Endpoint GET /article dan GET /article/:id menggunakan middleware `authOptional`:
  - Jika request tanpa token, hanya artikel berstatus published yang bisa diakses.
  - Jika request dengan token user login, user bisa melihat draft miliknya sendiri selain artikel published.
- Endpoint POST, PATCH, DELETE pada /article hanya bisa diakses user login (menggunakan middleware `auth`).

## Cara Penggunaan API

1. Jalankan API:
   - `npm install`
   - Copy `.env.example` ke `.env` dan sesuaikan
   - Jalankan MongoDB
   - `node app.js`
2. (Opsional) Buat super user:
   - `node scripts/createSuperUser.js`
3. Login:
   - `POST /auth/login` dengan body `{ "username": "superadmin", "password": "superpassword" }`
   - Simpan token dari response
4. Gunakan token untuk endpoint yang butuh autentikasi:
   - Tambahkan header: `Authorization: Bearer <token>`
5. Contoh endpoint:
   - Buat user baru: `POST /user` (dengan token)
   - Buat article: `POST /article` (dengan token)
   - Lihat semua article published: `GET /article` (tanpa token)
   - Lihat draft milik sendiri: `GET /article` (dengan token)
   - Logout: `POST /auth/logout` (dengan token)

Import file `postman_collection.json` ke Postman untuk dokumentasi endpoint lengkap dan contoh request.

## Struktur Folder
- models: Schema mongoose
- routes: Routing endpoint
- controllers: Logic endpoint
- middlewares: Auth, validation, dll
- utils: Helper, JWT, dll
- scripts: Script utilitas (misal: createSuperUser)

## Environment Variable
Lihat `.env`.
