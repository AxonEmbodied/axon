import type { ReactNode } from 'react'

export function renderInlineFormatting(text: string): ReactNode {
  // Split on bold, italic, code, and links
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/)
  return parts.map((part, i) => {
    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-ax-text-primary font-medium">{part.slice(2, -2)}</strong>
    }
    // Italic
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    // Inline code
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="font-mono text-small bg-ax-sunken px-1.5 py-0.5 rounded">{part.slice(1, -1)}</code>
    }
    // Links [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-ax-brand underline underline-offset-2 hover:text-ax-brand-hover transition-colors">{linkMatch[1]}</a>
    }
    // Emoji risk flags
    if (part.includes('⚠️')) {
      return <span key={i}>{part}</span>
    }
    return <span key={i}>{part}</span>
  })
}
