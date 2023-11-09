import { useState } from 'react'

import { TextField } from '@/components/ui/text-field'

function App() {
  const [state, setState] = useState('')

  return (
    <TextField
      errorMessage={'This field is required'}
      label={'Search by name'}
      onClearValue={() => setState('')}
      onValueChange={val => setState(val)}
      placeholder={'Search...'}
      type={'password'}
      value={state}
    />
  )
}
export default App
