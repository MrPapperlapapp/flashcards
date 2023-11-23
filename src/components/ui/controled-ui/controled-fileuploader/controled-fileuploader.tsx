import { ChangeEvent, useRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { EditIcon } from '@/assets/icons/edit-icon'
import { Button, ButtonPropsType } from '@/components'

export const ControledFileuploader = <T extends FieldValues>({
  children,
  className,
  control,
  extraActions,
  name,
  ...restProps
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0])
    extraActions?.(name)
  }

  return (
    <>
      <Button
        className={className}
        onClick={() => inputRef?.current?.click()}
        type={'button'}
        variant={'secondary'}
        {...restProps}
      >
        {children ?? <EditIcon />}
      </Button>
      <input
        name={name}
        onChange={changeHandler}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </>
  )
}

type Props<T extends FieldValues> = {
  control: Control<T>
  extraActions?: (inputName: string) => void
  name: FieldPath<T>
} & Omit<ButtonPropsType, 'onClick' | 'type'>
