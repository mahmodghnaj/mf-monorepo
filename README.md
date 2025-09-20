# Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/mahmodghnaj/mf-monorepo
   cd mf-monorepo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

   > You can use yarn or npm instead of pnpm if you prefer.

3. **Run the entire project**

   > If you want to run all apps at once:

   ```bash
   pnpm run dev
   ```

4. **Run Remote App (passport-form)**

   ```bash
   pnpm dev --filter passport-form
   ```

   It will open at: [http://localhost:3001](http://localhost:3001)

5. **Run Host App (host-app)**

   ```bash
   pnpm dev --filter host-app
   ```

   It will open at: [http://localhost:3000](http://localhost:3000)
