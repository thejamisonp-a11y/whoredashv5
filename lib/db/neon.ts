import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function query<T = any>(text: string, params?: any[]): Promise<{ data: T[] | null; error: any }> {
  try {
    const result = await sql(text, params)
    return { data: result as T[], error: null }
  } catch (error) {
    console.error("[v0] Database query error:", error)
    return { data: null, error }
  }
}

export { sql }
