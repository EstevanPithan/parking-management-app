import { Icon } from '@/components/icon/Icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/contexts/AuthContext'
import { Building2, Car, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
	const { logout } = useAuth()
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="min-h-screen bg-white">
			{/* Sidebar Sheet */}
			<Sheet
				open={sidebarOpen}
				onOpenChange={setSidebarOpen}
			>
				<SheetContent
					side="left"
					className="w-64 bg-gray-50 p-0"
				>
					{/* Header with logo */}
					<div className="flex h-16 items-center border-b border-gray-200 px-6">
						<Icon
							name="Estapar"
							className="h-8 w-8"
						/>
					</div>

					{/* Navigation */}
					<nav className="mt-8 px-4">
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900"
								>
									<Building2 className="mr-3 h-5 w-5" />
									Garagens
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900"
								>
									<Car className="mr-3 h-5 w-5" />
									Mensalistas
								</a>
							</li>
						</ul>
					</nav>
				</SheetContent>

				{/* Main content */}
				<div className="min-h-screen">
					{/* Top header */}
					<header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
						<div className="flex items-center space-x-4">
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="rounded-lg p-2 text-gray-600 hover:text-gray-900"
								>
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<h1 className="text-lg font-medium text-gray-900">Bem-vindo ao Portal Estapar B2B</h1>
						</div>
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<User className="h-5 w-5 text-gray-500" />
								<span className="text-sm text-gray-700">Roberto Freitas</span>
							</div>
							<Button
								onClick={logout}
								variant="ghost"
								size="sm"
								className="rounded-lg text-gray-600 hover:text-gray-900"
							>
								Sair
							</Button>
						</div>
					</header>

					{/* Content */}
					<main className="p-6">
						<div className="mb-6">
							<p className="text-gray-600">
								Gerencie seus serviços de estacionamento, acesse relatórios, configure credenciados e contrate planos de
								mensalidade em um só lugar.
							</p>
						</div>

						{/* Cards grid */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* Garagens Card */}
							<Card className="cursor-pointer rounded-xl border-0 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
								<div className="flex items-start space-x-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100">
										<Building2 className="h-6 w-6 text-lime-600" />
									</div>
									<div className="flex-1">
										<h3 className="mb-1 text-lg font-semibold text-gray-900">Garagens</h3>
										<p className="mb-4 text-sm text-gray-600">
											Veja a lista de garagens disponíveis e suas configurações.
										</p>
									</div>
								</div>
							</Card>

							{/* Mensalistas Card */}
							<Card className="cursor-pointer rounded-xl border-0 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
								<div className="flex items-start space-x-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100">
										<Car className="h-6 w-6 text-lime-600" />
									</div>
									<div className="flex-1">
										<h3 className="mb-1 text-lg font-semibold text-gray-900">Mensalistas</h3>
										<p className="mb-4 text-sm text-gray-600">
											Contrate vagas adicionais para seus funcionários ou visitantes.
										</p>
									</div>
								</div>
							</Card>
						</div>
					</main>
				</div>
			</Sheet>
		</div>
	)
}
