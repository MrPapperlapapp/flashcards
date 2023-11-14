import { useState } from 'react'

import { Header } from '@/components/layout/header/header'
import { Pagination } from '@/components/ui/paginantion/pagination'

function App() {
  const [page, setPage] = useState(1)

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '65px' }}>
        <Pagination
          countPerPage={10}
          currentPage={page}
          onChangeCurrentPage={page => setPage(page)}
          totalCount={970}
        />
      </main>
    </div>
  )
}
export default App
