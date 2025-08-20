import { CircleXIcon } from '../../icons/CircleXIcon'
import { IconName } from '@/types/icons-type.ts'

const modules = import.meta.glob('/src/icons/*.tsx', { eager: true })

const icons = Object.fromEntries(
	Object.entries(modules).map(([path, module]) => {
		const name = path.split('/').pop()?.replace('.tsx', '') as string
		return [name, (module as any)[name]]
	}),
)

interface IconProps {
	name: IconName
	className?: string
}

export function Icon({ name, className }: IconProps) {
	const IconComponent = icons[`${name}Icon`]

	if (!IconComponent) {
		// eslint-disable-next-line no-console
		console.warn(`Icon "${name}Icon" not found`)
		return <CircleXIcon className="bg-red-500" />
	}

	return <IconComponent className={className} />
}
