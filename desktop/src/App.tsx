import { DataProvider } from '@/providers/DataProvider'
import { Shell } from '@/components/layout/Shell'
import { TimelineView } from '@/views/TimelineView'

export default function App() {
  return (
    <DataProvider>
      <Shell>
        <TimelineView />
      </Shell>
    </DataProvider>
  )
}
