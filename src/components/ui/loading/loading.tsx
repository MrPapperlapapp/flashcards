import s from './loading.module.scss'

export const Loading = () => {
  return (
    <div className={s.loading_container}>
      <span>Loading...</span>
    </div>
  )
}
