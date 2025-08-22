import SidebarItem from './SidebarItem'
import { Icon } from '@/components/icon/Icon'
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

interface SidebarProps {
	isOpen: boolean
	onToggle: () => void
	isMobile?: boolean
}

export default function Sidebar({ isOpen, onToggle, isMobile = false }: SidebarProps) {
	const navigate = useNavigate()

	return (
		<aside
			className={
				isMobile ?
					'relative h-full w-full bg-neutral-50'
				:	`fixed left-0 top-0 z-50 h-full border-r border-neutral-200 bg-neutral-50 transition-[width] duration-300 ease-out ${
						isOpen ? 'w-[220px]' : 'w-[64px]'
					}`
			}
		>
			<div className="flex h-12 items-center justify-start border-b border-neutral-200 px-0">
				<div
					className={`relative flex h-8 cursor-pointer items-center justify-start overflow-hidden transition-all duration-300 ease-out ${
						isOpen ? 'w-40' : 'w-13'
					}`}
					onClick={() => navigate('/')}
				>
					<Icon
						name="Estapar"
						className="h-8 flex-shrink-0"
					/>
				</div>
			</div>

			{!isMobile && (
				<button
					onClick={onToggle}
					className="absolute -right-3 top-8 z-10 rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500/40"
					aria-expanded={isOpen}
					aria-label={isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'}
				>
					{isOpen ?
						<ChevronLeft className="h-4 w-4 text-neutral-600" />
					:	<ChevronRight className="h-4 w-4 text-neutral-600" />}
				</button>
			)}

			<nav className="mt-6 px-2">
				<ul className="space-y-1">
					<SidebarItem
						icon={Building2}
						label="Garagens"
						isOpen={isOpen}
						isActive={true}
						href="#"
					/>
				</ul>
			</nav>
		</aside>
	)
}
