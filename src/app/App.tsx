import { useState } from 'react'

import { Header } from '@/components/layout/header/header'
import { Table } from '@/components/ui/table'

function App() {
  const [page, setPage] = useState<[number, number]>([1, 33])

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '65px' }}>
        <Table />
      </main>
    </div>
  )
}
export default App
