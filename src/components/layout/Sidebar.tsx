import SidebarItem from './SidebarItem'
import { Icon } from '@/components/icon/Icon'
import { Building2, Car, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
	isOpen: boolean
	onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
	return (
		<aside
			className={`fixed left-0 top-0 z-50 h-full border-r border-neutral-200 bg-neutral-50 transition-[width] duration-300 ease-out ${
				isOpen ? 'w-[264px]' : 'w-[64px]'
			}`}
		>
			<div className="flex h-16 items-center justify-center border-b border-neutral-200 px-0">
				<div
					className={`relative flex h-8 items-center justify-start overflow-hidden transition-all duration-300 ease-out ${
						isOpen ? 'w-40' : 'w-13'
					}`}
				>
					<Icon
						name="Estapar"
						className="h-8 flex-shrink-0"
					/>
				</div>
			</div>

			<button
				onClick={onToggle}
				className="absolute -right-3 top-12 z-10 rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500/40"
				aria-expanded={isOpen}
				aria-label={isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'}
			>
				{isOpen ?
					<ChevronLeft className="h-4 w-4 text-neutral-600" />
				:	<ChevronRight className="h-4 w-4 text-neutral-600" />}
			</button>

			<nav className="mt-6 px-2">
				<ul className="space-y-1">
					<SidebarItem
						icon={Building2}
						label="Garagens"
						isOpen={isOpen}
						isActive={true}
						href="#"
					/>
					<SidebarItem
						icon={Car}
						label="Mensalistas"
						isOpen={isOpen}
						isActive={false}
						href="#"
					/>
				</ul>
			</nav>
		</aside>
	)
}
