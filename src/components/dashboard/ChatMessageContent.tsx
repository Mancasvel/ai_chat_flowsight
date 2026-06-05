import type { ReactNode } from 'react'

function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|')
}

function isTableSeparator(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim())
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .slice(1, -1)
    .split('|')
    .map((cell) => cell.trim())
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-zinc-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

type Block =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'list'; items: string[] }

function parseBlocks(content: string): Block[] {
  const lines = content.split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (isTableRow(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const rows: string[][] = [parseTableRow(line)]
      i += 2
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(parseTableRow(lines[i]))
        i++
      }
      blocks.push({ type: 'table', rows })
      continue
    }

    if (line.trim().startsWith('•') || /^\d+\.\s/.test(line.trim())) {
      const items: string[] = []
      while (i < lines.length) {
        const current = lines[i].trim()
        if (current.startsWith('•') || /^\d+\.\s/.test(current)) {
          items.push(current.replace(/^•\s*/, '').replace(/^\d+\.\s*/, ''))
          i++
        } else if (current === '') {
          i++
          break
        } else {
          break
        }
      }
      blocks.push({ type: 'list', items })
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    const paragraphLines: string[] = []
    while (i < lines.length && lines[i].trim() !== '' && !isTableRow(lines[i])) {
      const current = lines[i].trim()
      if (current.startsWith('•') || /^\d+\.\s/.test(current)) break
      paragraphLines.push(lines[i])
      i++
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', lines: paragraphLines })
    }
  }

  return blocks
}

type Props = {
  content: string
}

export default function ChatMessageContent({ content }: Props) {
  const blocks = parseBlocks(content)

  return (
    <div className="space-y-3">
      {blocks.map((block, blockIndex) => {
        if (block.type === 'table') {
          const [header, ...body] = block.rows
          return (
            <div key={blockIndex} className="overflow-x-auto rounded-lg border border-zinc-200/80">
              <table className="w-full min-w-[240px] text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-100/80">
                    {header.map((cell, ci) => (
                      <th key={ci} className="px-3 py-2 font-semibold text-zinc-800">
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, ri) => (
                    <tr key={ri} className="border-b border-zinc-100 last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 text-zinc-600">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={blockIndex} className="space-y-1.5 pl-1">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-2">
                  <span className="shrink-0 text-zinc-400">•</span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={blockIndex} className="leading-relaxed">
            {block.lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {lineIndex > 0 && <br />}
                {renderInline(line)}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}
