import { PrismaClient } from '@prisma/client'

const urls = [
    'postgresql://postgres.jbodeaqxjaezzjwewvrg:diegopenita31@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require',
    'postgresql://postgres.jbodeaqxjaezzjwewvrg:diegopenita31@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require',
    'postgresql://postgres:diegopenita31@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require'
]

async function testConnection() {
    for (const url of urls) {
        console.log(`\n📡 Testing URL: ${url.replace(/:([^@]+)@/, ':****@')}`)
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: url
                }
            }
        })

        try {
            const result = await prisma.$queryRaw`SELECT 1 as result`
            console.log('✅ Connection successful:', result)
            await prisma.$disconnect()
            break; // Stop if one works
        } catch (err) {
            console.error('❌ Connection failed:', err.message)
            await prisma.$disconnect()
        }
    }
}

testConnection()
