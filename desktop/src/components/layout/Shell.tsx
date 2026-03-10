import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-ax-base">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
