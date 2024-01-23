import { useEffect, useRef, useState } from 'react'

export const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(true)
  const ref = useRef<HTMLImageElement>(null)

  const onLoad = () => {
    setLoaded(false)
  }

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad()
    }
    return () => setLoaded(true)
  })

  return { ref, loaded, onLoad }
}
