import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'
export const DropdownMenu = () => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={s.iconButton}>
          Click
        </button>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content className={s.DropdownMenuContent} sideOffset={8}>
          <RadixDropdownMenu.Arrow asChild className={s.DropdownMenuArrow}>
            <i className={s.arrowUp} />
          </RadixDropdownMenu.Arrow>
          <div className={s.Items}>
            <RadixDropdownMenu.Item className={s.DropdownMenuItem}>New Tab</RadixDropdownMenu.Item>
            <RadixDropdownMenu.Item className={s.DropdownMenuItem}>
              New Window
            </RadixDropdownMenu.Item>
            <RadixDropdownMenu.Item className={s.DropdownMenuItem}>
              New Private Window
            </RadixDropdownMenu.Item>
          </div>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}
