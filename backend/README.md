# Backend of AI Code Reviewer

This is the backend service for the AI Code Reviewer project. It provides APIs and database access for code review automation.

## Prerequisites

- [Node.js] (v16 or higher recommended)
- [npm]
- [SQLite] (or your preferred database, as configured in `prisma/schema.prisma`)

## Setup and Running

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   - Copy `.env.example` to `.env` and update the values as needed.

3. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **Open Prisma Studio (optional, for DB inspection):**
   ```bash
   npx prisma studio
   ```

## Additional Notes

- Make sure your database is running and accessible before running migrations or starting the server.
- For more details, see the project documentation or contact the maintainers.
