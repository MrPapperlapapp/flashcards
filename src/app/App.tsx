import { useState } from 'react'

import { TextField } from '@/components/ui/text-field'

function App() {
  const [state, setState] = useState('')

  return (
    <TextField
      label={'Search by name'}
      onClearValue={() => setState('')}
      onValueChange={val => setState(val)}
      placeholder={'Search...'}
      value={state}
      variant={'search'}
    />
  )
}
export default App
