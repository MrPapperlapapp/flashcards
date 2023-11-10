import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

function App() {
  const [state, setState] = useState(true)

  return (
    <div style={{ padding: '15px' }}>
      <Checkbox
        checked={state}
        disabled
        label={'click here'}
        onChangeChecked={() => setState(p => !p)}
      />
    </div>
  )
}
export default App
