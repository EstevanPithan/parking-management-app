import {
	GetGaragesPaginatedListResponse,
	getGaragesPaginatedList,
} from '@/api/requests/garages/get-garages-paginated-list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EstaparIcon } from '@/icons/EstaparIcon'
import { Search, Eye, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function GarageList() {
	const navigate = useNavigate()
	const [garages, setGarages] = useState<GetGaragesPaginatedListResponse | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [digitalMonthlyEnabled, setDigitalMonthlyEnabled] = useState(true)

	useEffect(() => {
		const fetchGarages = async () => {
			try {
				setIsLoading(true)
				const response = await getGaragesPaginatedList({
					currentPage: 1,
					pageSize: 50,
					garageName: searchTerm || undefined,
				})
				setGarages(response)
			} catch {
				// Erro ao carregar garagens
			} finally {
				setIsLoading(false)
			}
		}

		const debounceTimeout = setTimeout(fetchGarages, 300)
		return () => clearTimeout(debounceTimeout)
	}, [searchTerm])

	const handleToggleMensalista = () => {
		setDigitalMonthlyEnabled(!digitalMonthlyEnabled)
	}

	const handleGoBack = () => {
		navigate(-1)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="border-b border-gray-200 bg-white">
				<div className="px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="icon"
								onClick={handleGoBack}
								className="h-8 w-8"
							>
								<ArrowLeft className="h-4 w-4" />
							</Button>
							<div className="flex items-center gap-3">
								<EstaparIcon className="h-8 w-auto text-lime-500" />
								<span className="text-sm text-gray-600">Roberto Freitas</span>
							</div>
						</div>
						<Button
							variant="outline"
							className="text-sm"
						>
							Sair
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="px-6 py-8">
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="mb-8">
						<div className="mb-2 flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-100">
								<div className="h-4 w-4 rounded bg-lime-500"></div>
							</div>
							<h1 className="text-2xl font-semibold text-gray-900">Garagens</h1>
						</div>
						<p className="text-gray-600">Visualize as garagens habilitadas para mensalistas digitais.</p>
					</div>

					{/* Controls */}
					<div className="mb-6 rounded-lg border border-gray-200 bg-white">
						<div className="border-b border-gray-200 p-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div
										className={`h-6 w-12 cursor-pointer rounded-full p-1 transition-colors ${
											digitalMonthlyEnabled ? 'bg-lime-500' : 'bg-gray-300'
										}`}
										onClick={handleToggleMensalista}
									>
										<div
											className={`h-4 w-4 rounded-full bg-white transition-transform ${
												digitalMonthlyEnabled ? 'translate-x-6' : 'translate-x-0'
											}`}
										></div>
									</div>
									<span className="text-sm font-medium text-gray-900">Mensalista Digital</span>
									<span className="text-sm text-gray-500">{garages?.countRecords || 0} registros</span>
								</div>

								<div className="relative w-80">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
									<Input
										placeholder="Buscar por nome"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Código
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Nome
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Endereço
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Cidade/UF
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Regional
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Ações
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{isLoading ?
										<tr>
											<td
												colSpan={6}
												className="px-6 py-12 text-center text-gray-500"
											>
												Carregando...
											</td>
										</tr>
									: garages?.data && garages.data.length > 0 ?
										garages.data.map((garage) => (
											<tr
												key={garage.code}
												className="hover:bg-gray-50"
											>
												<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{garage.code}</td>
												<td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{garage.name}</td>
												<td className="px-6 py-4 text-sm text-gray-900">{garage.address}</td>
												<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
													{garage.city}/{garage.state}
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{garage.region}</td>
												<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-gray-400 hover:text-gray-600"
													>
														<Eye className="h-4 w-4" />
													</Button>
												</td>
											</tr>
										))
									:	<tr>
											<td
												colSpan={6}
												className="px-6 py-12 text-center text-gray-500"
											>
												Nenhuma garagem encontrada
											</td>
										</tr>
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
