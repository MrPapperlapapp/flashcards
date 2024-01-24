import { clsx } from 'clsx'

import s from './loaded-img.module.scss'
import { memo, useEffect, useState } from 'react'
export const LoadedImg = memo(({ src, alt, className, lazy = false }: PropsType) => {
  const [loaded, setLoaded] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const onLoad = () => {
    setLoaded(false)
  }

  const classNames = {
    imgWrapper: clsx(s.wrapper, className),
    img: clsx(loaded && s.loading),
  }

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (lazy && !isMounted) return null
  return (
    <div className={classNames.imgWrapper}>
      <img src={src} alt={alt} className={classNames.img} onLoad={onLoad} />
    </div>
  )
})

type PropsType = {
  src?: string
  alt?: string
  className?: string
  lazy?: boolean
}
