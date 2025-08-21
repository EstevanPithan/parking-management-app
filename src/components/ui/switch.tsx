import { cn } from '@/lib/utils'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

type SwitchSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<SwitchSize, { root: string; thumb: string }> = {
	sm: { root: 'h-4 w-6', thumb: 'size-3' },
	md: { root: 'h-[1.15rem] w-8', thumb: 'size-4' },
	lg: { root: 'h-7 w-12', thumb: 'size-6' },
}

interface Props extends React.ComponentProps<typeof SwitchPrimitive.Root> {
	size?: SwitchSize
	thumbClassName?: string
}

function Switch({ className, size = 'md', thumbClassName, ...props }: Props) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				'shadow-xs peer inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all',
				'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
				'dark:data-[state=unchecked]:bg-input/80',
				'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px]',
				sizeMap[size].root,
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					'pointer-events-none block rounded-full ring-0 transition-transform',
					'bg-background',
					'dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground',

					'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
					sizeMap[size].thumb,
					thumbClassName,
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
