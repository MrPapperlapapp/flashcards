import { useState } from 'react'

import { Header } from '@/components/layout/header/header'
import { Slider } from '@/components/ui/slider/slider'

function App() {
  const [page, setPage] = useState<[number, number]>([1, 33])

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '65px' }}>
        <Slider onValueChange={slidersValue => setPage(slidersValue)} slidersValue={page} />
      </main>
    </div>
  )
}
export default App
