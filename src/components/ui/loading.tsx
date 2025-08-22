import { cn } from '../../lib/utils'
import { LoaderPinwheel } from 'lucide-react'
import { HTMLAttributes } from 'react'

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
	size?: number
	text?: string
}

export function Loading({ size = 24, text, className, ...props }: LoadingProps) {
	return (
		<div
			className={cn('flex flex-col items-center justify-center gap-2', className)}
			{...props}
		>
			<LoaderPinwheel
				size={size}
				className="animate-spin text-lime-600"
			/>
			{text && <span className="animate-pulse text-sm text-gray-600">{text}</span>}
		</div>
	)
}
