import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
	label: string
	value: string | number
	icon: LucideIcon
	iconColor?: string
	valueColor?: string
}

export function StatCard({
	label,
	value,
	icon: Icon,
	iconColor = 'text-gray-500',
	valueColor = 'text-gray-900',
}: StatCardProps) {
	return (
		<Card className="px-4 py-6">
			<div className="flex flex-col items-start gap-3">
				<span className="text-sm text-gray-500">{label}</span>
				<div className="flex items-start gap-2">
					<span className="pt-0.5">
						<Icon className={`size-5 ${iconColor}`} />
					</span>
					<span className={`text-xl font-semibold ${valueColor}`}>{value}</span>
				</div>
			</div>
		</Card>
	)
}
