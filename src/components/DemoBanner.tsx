import Link from 'next/link'

export function DemoBanner() {
  return (
    <div className="border-b border-indigo-100 bg-indigo-50/90 px-4 py-2.5 text-center text-sm text-indigo-900">
      <span className="font-medium">Interactive demo</span>
      <span className="text-indigo-700/80"> — sample team data · no account required · </span>
      <Link
        href="https://flowsight.site"
        className="font-medium text-indigo-600 underline-offset-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get FlowSight
      </Link>
    </div>
  )
}
