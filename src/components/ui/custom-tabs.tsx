import { cn } from '@/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

type CustomTabsOrientation = 'horizontal' | 'vertical'

interface CustomTabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
	orientation?: CustomTabsOrientation
}

function CustomTabs({ className, orientation = 'horizontal', ...props }: CustomTabsProps) {
	return (
		<TabsPrimitive.Root
			data-slot="custom-tabs"
			orientation={orientation}
			className={cn('flex gap-2 overflow-hidden', orientation === 'horizontal' ? 'flex-col' : 'flex-row', className)}
			{...props}
		/>
	)
}

interface CustomTabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
	orientation?: CustomTabsOrientation
}

function CustomTabsList({ className, orientation = 'horizontal', ...props }: CustomTabsListProps) {
	const baseClasses =
		orientation === 'horizontal' ?
			'text-muted-foreground inline-flex h-9 items-start justify-start bg-gray-100 rounded-xs  w-full p-[1px]'
		:	'flex flex-col items-start justify-start gap-0.5 p-0 h-full bg-gray-100 rounded-xs'

	return (
		<TabsPrimitive.List
			data-slot="custom-tabs-list"
			className={cn(baseClasses, className)}
			{...props}
		/>
	)
}

interface CustomTabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
	orientation?: CustomTabsOrientation
}

function CustomTabsTrigger({ className, orientation = 'horizontal', ...props }: CustomTabsTriggerProps) {
	const baseClasses =
		'data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex items-center justify-center gap-1.5 whitespace-nowrap  border-transparent px-2 py-1 text-sm font-medium transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm border-0 [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0'

	const orientationClasses =
		orientation === 'horizontal' ?
			'h-[calc(100%-1px)] flex-1 rounded-xs max-w-60  data-[state=active]:border-b-4 data-[state=active]:border-lime-500'
		:	'flex max-h-10 w-full justify-start rounded-xs rounded-r-none data-[state=active]:border-l-4 data-[state=active]:border-lime-500'

	return (
		<TabsPrimitive.Trigger
			data-slot="custom-tabs-trigger"
			className={cn(baseClasses, orientationClasses, className)}
			{...props}
		/>
	)
}

function CustomTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="custom-tabs-content"
			className={cn('flex-1 outline-none', className)}
			{...props}
		/>
	)
}

export { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent }
