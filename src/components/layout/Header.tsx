import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User, Menu } from 'lucide-react'

interface HeaderProps {
	onMenuClick?: () => void
	showMenuButton?: boolean
}

export default function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
	const { logout } = useAuth()

	return (
		<header className="sticky top-0 z-40 h-12">
			<div className="mx-auto flex h-full items-center justify-between px-4 md:px-4">
				<div className="flex items-center">
					{showMenuButton && (
						<Button
							onClick={onMenuClick}
							variant="ghost"
							size="icon"
							className="mr-4 text-neutral-600 hover:bg-neutral-100 focus:ring-2 focus:ring-lime-500/40"
							title="Abrir menu"
						>
							<Menu className="size-5" />
						</Button>
					)}
				</div>

				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<User className="size-5 text-neutral-500" />
						<span className="text-sm font-medium text-neutral-500">Roberto Freitas</span>
					</div>
					<Button
						onClick={logout}
						variant="ghost"
						size="icon"
						className="text-neutral-500 hover:bg-neutral-100 hover:text-neutral-500 focus:ring-2 focus:ring-lime-500/40"
						title="Sair"
					>
						<LogOut className="size-5" />
					</Button>
				</div>
			</div>
		</header>
	)
}
