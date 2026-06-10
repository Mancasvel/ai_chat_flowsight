import { readFileSync } from 'fs'
import { join } from 'path'

export type CoachMode = 'mock-team' | 'individual-pro'

const cache: Partial<Record<CoachMode, string>> = {}

function loadContextFile(filename: string, mode: CoachMode): string {
  if (!cache[mode]) {
    const filePath = join(process.cwd(), 'src/lib/coach', filename)
    cache[mode] = readFileSync(filePath, 'utf-8')
  }
  return cache[mode]!
}

export function loadCoachContext(mode: CoachMode): string {
  if (mode === 'individual-pro') {
    return loadContextFile('individual-context.txt', mode)
  }
  return loadContextFile('team-context.txt', mode)
}
