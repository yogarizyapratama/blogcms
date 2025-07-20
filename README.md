
# 📝 Simple Blog CMS API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D4.0-brightgreen?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)
![Vercel](https://img.shields.io/badge/Vercel-deployable-black?logo=vercel)

---

## 🚀 Setup Cepat

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Copy & edit env**
   ```bash
   cp .env.example .env
   # Edit value sesuai kebutuhan
   ```
3. **Jalankan MongoDB** (local/remote)
4. **(Opsional) Buat super user**
   ```bash
   node scripts/createSuperUser.js
   ```
   <details>
   <summary>Super user default</summary>
   <ul>
   <li>username: <code>superadmin</code></li>
   <li>password: <code>superpassword</code></li>
   </ul>
   </details>
5. **Start API (local)**
   ```bash
   node app.js
   ```


## Jalankan dengan Docker Compose

1. Pastikan Docker Desktop sudah berjalan.
2. Pastikan file `.env` sudah ada dan terisi.
3. Jalankan perintah berikut di folder project:
   ```bash
   docker compose up --build
   ```
   Ini akan menjalankan API dan MongoDB sekaligus.
4. API dapat diakses di `http://localhost:3000`.
5. Untuk menghentikan semua service:
   ```bash
   docker compose down
   ```
6. (Opsional) Jalankan perintah di dalam container API, misal membuat super user:
   ```bash
   docker compose exec api node scripts/createSuperUser.js
   ```


---

## 🌐 Domain Development (Vercel)

API versi development juga dapat diakses di:
👉 **[https://blogcms-beryl.vercel.app/](https://blogcms-beryl.vercel.app/)**

File `vercel.json` sudah disiapkan agar API berjalan di Vercel Serverless Functions.

### 🚀 Cara Deploy ke Vercel (Opsional, untuk Development)

1. Daftar/login ke [Vercel](https://vercel.com/)
2. Push project ke repository GitHub/GitLab/Bitbucket
3. Di dashboard Vercel, klik **Add New Project** dan pilih repo Anda
4. Pada pengaturan build & output:
   - Framework preset: **Other**
   - Output directory: *(kosongkan)*
   - Build command: *(kosongkan)*
   - Install command: `npm install`
   - Entry point: `app.js`
5. Tambahkan environment variable (`MONGODB_URI`, `JWT_SECRET`, dll) di dashboard Vercel sesuai `.env.example`
6. Deploy


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

## 📁 Struktur Folder
- **models**: Schema mongoose
- **routes**: Routing endpoint
- **controllers**: Logic endpoint
- **middlewares**: Auth, validation, dll
- **utils**: Helper, JWT, dll
- **scripts**: Script utilitas (misal: createSuperUser)

## Environment Variable
Lihat `.env`.
