import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useDebounce, useGaragesList, usePrefetchGarage } from '@/hooks'
import { Search, Eye, Building2 } from 'lucide-react'
import { useState } from 'react'

export default function GarageList() {
	const [searchTerm, setSearchTerm] = useState('')
	const [digitalMonthlyEnabled, setDigitalMonthlyEnabled] = useState(true)

	const debouncedSearchTerm = useDebounce(searchTerm, 300)

	const { data: garages, isLoading } = useGaragesList({
		currentPage: 1,
		pageSize: 50,
		garageName: debouncedSearchTerm || undefined,
	})

	const prefetchGarage = usePrefetchGarage()

	return (
		<div className="h-full bg-white">
			<div className="px-10">
				<div className="mx-auto">
					<div className="mb-6">
						<div className="flex items-center gap-3">
							<Building2 className="text-lime" />
							<h1 className="text-2xl font-semibold text-gray-900">Garagens</h1>
						</div>
						<p className="text-gray-500">Visualize as garagens habilitadas para mensalistas digitais.</p>
					</div>

					<div className="mb-5 rounded border border-gray-200 p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center justify-between gap-3">
								<Switch
									size="lg"
									checked={digitalMonthlyEnabled}
									onCheckedChange={setDigitalMonthlyEnabled}
								/>
								<Label>Mensalista Digital</Label>
							</div>

							<Label className="text-sm text-gray-400">{garages?.countRecords || 0} registros</Label>

							<div className="relative">
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

					<div className="mb-6 rounded-lg border border-gray-200 bg-white">
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
														onMouseEnter={() => prefetchGarage(garage.code)}
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
