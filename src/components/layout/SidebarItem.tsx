import { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
	icon: LucideIcon
	label: string
	isOpen: boolean
	isActive: boolean
	href: string
}

export default function SidebarItem({ icon: Icon, label, isOpen, isActive, href }: SidebarItemProps) {
	return (
		<li>
			<a
				href={href}
				className={`group flex items-center rounded-xl px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500/40 ${
					isActive ? 'bg-lime-50 text-lime-600' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
				}`}
				aria-current={isActive ? 'page' : undefined}
				title={!isOpen ? label : undefined}
			>
				<Icon className="h-5 w-5 flex-shrink-0" />
				{isOpen && <span className="ml-3 truncate text-sm font-medium">{label}</span>}
			</a>
		</li>
	)
}
