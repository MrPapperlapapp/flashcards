import { Provider } from 'react-redux'

import { Router } from '@/app/router'
import { store } from '@/app/store'

import '@/i18n/i18n'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
