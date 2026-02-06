import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const rawUrl = process.env.DATABASE_URL ?? ''
// Use pgbouncer mode when connecting through Supabase pooler (port 6543) to avoid
// "prepared statement already exists" in serverless (Prisma skips prepared statements).
const needsPgbouncer = rawUrl.includes('6543') && !rawUrl.includes('pgbouncer=true')
const url = needsPgbouncer
  ? rawUrl + (rawUrl.includes('?') ? '&' : '?') + 'pgbouncer=true'
  : undefined

/**
 * Prisma Client Singleton
 * Prevents multiple instances in development and production.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  ...(url ? { datasources: { db: { url } } } : {}),
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

// Prevent multiple instances in all environments
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Ensure proper cleanup on process termination
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
}
