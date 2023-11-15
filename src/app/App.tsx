import { useState } from 'react'

import { Header } from '@/components/layout/header/header'
import { TabContent, Tabs } from '@/components/ui/tabs/tabs'

function App() {
  const [page, setPage] = useState('tab2')

  console.log(page)

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '65px' }}>
        <Tabs
          onValueChange={(value: string) => setPage(value)}
          tabs={[
            { title: 'Account', value: 'tab1' },
            { title: 'Profile', value: 'tab2' },
          ]}
          value={page}
        >
          <TabContent value={'tab1'}>Hallo its me!</TabContent>
          <TabContent value={'tab2'}>Hallo, i see you!</TabContent>
        </Tabs>
      </main>
    </div>
  )
}
export default App
