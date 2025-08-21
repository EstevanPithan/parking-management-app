import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User } from 'lucide-react'

export default function Header() {
	const { logout } = useAuth()

	return (
		<header className="sticky top-0 z-40 h-16 bg-white">
			<div className="mx-auto flex h-full max-w-[1200px] items-center justify-end px-6 md:px-10">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<User className="size-5 text-neutral-600" />
						<span className="text-sm font-medium text-neutral-900">Roberto Freitas</span>
					</div>
					<button
						onClick={logout}
						className="flex items-center justify-center rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-lime-500/40"
						title="Sair"
					>
						<LogOut className="size-5" />
					</button>
				</div>
			</div>
		</header>
	)
}
