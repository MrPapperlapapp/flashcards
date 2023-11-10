import { useState } from 'react'

import { Select } from '@/components/ui/select'

const options = [
  { label: '111', value: '1' },
  { label: '222', value: '2' },
  { label: '333', value: '3' },
  { label: '444', value: '4' },
  { label: '555', value: '5' },
  { label: '666', value: '6' },
  { label: '777', value: '7' },
  { label: '888', value: '8' },
]

function App() {
  const [state, setState] = useState('1')

  return (
    <div style={{ padding: '150px' }}>
      <div style={{ height: '400px', width: '200px' }}>
        <Select disabled onValueChange={value => setState(value)} options={options} value={state} />
      </div>
    </div>
  )
}
export default App
