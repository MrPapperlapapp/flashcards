import { Logout } from '@/assets/icons/log-out-icon.tsx'
import { Button } from '@/components/ui/button/button'

function App() {
  return (
    <div style={{ padding: '15px' }}>
      <Button icon={<Logout />} variant={'link'}>
        Button secondary
      </Button>
    </div>
  )
}
export default App
