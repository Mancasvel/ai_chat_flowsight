import { readFileSync } from 'fs'
import { join } from 'path'

let cachedContext: string | null = null

export function loadTeamContext(): string {
  if (!cachedContext) {
    const filePath = join(process.cwd(), 'src/lib/coach/team-context.txt')
    cachedContext = readFileSync(filePath, 'utf-8')
  }
  return cachedContext
}
