import { cn } from '../../lib/utils'
import { Icon } from '../icon/Icon'
import { HTMLAttributes } from 'react'

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'Blocks' | 'Tadpole'
}

export function Loading({ variant = 'Blocks', className, ...props }: LoadingProps) {
	return (
		<div
			className={cn(className)}
			{...props}
		>
			<Icon
				name={'Loading' + variant}
				className="animate-spin"
			/>
		</div>
	)
}
