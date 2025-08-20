import { ChevronRight, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface CardLinkProps {
	icon: LucideIcon
	title: string
	description: string
	href: string
	children?: ReactNode
}

export default function CardLink({ icon: Icon, title, description, href }: CardLinkProps) {
	return (
		<a
			href={href}
			className="group block rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500/40 md:p-8"
		>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="inline-flex items-center justify-center rounded-xl p-3">
						<Icon className="size-6 text-lime-500" />
					</div>

					<h3 className="mt-4 text-2xl font-semibold text-neutral-900">{title}</h3>

					<p className="mt-2 max-w-[65ch] text-neutral-600">{description}</p>
				</div>

				<div className="ml-4 flex-shrink-0">
					<ChevronRight className="size-6 text-neutral-400 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-70" />
				</div>
			</div>
		</a>
	)
}
