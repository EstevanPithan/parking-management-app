import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
		<div className="mx-auto flex h-full flex-col gap-4 overflow-hidden p-4">
			<div>
				<div className="flex items-center gap-3">
					<Building2 className="text-lime" />
					<h1 className="text-2xl font-semibold text-gray-900">Garagens</h1>
				</div>
				<p className="text-gray-500">Visualize as garagens habilitadas para mensalistas digitais.</p>
			</div>

			<div className="rounded border border-gray-200 p-4">
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

			<div className="max-h-full overflow-y-auto rounded-lg border border-gray-200">
				<Table>
					<TableHeader className="rounded-t-lg">
						<TableRow>
							<TableHead className="table-header-cell">Código</TableHead>
							<TableHead className="table-header-cell">Nome</TableHead>
							<TableHead className="table-header-cell">Endereço</TableHead>
							<TableHead className="table-header-cell">Cidade/UF</TableHead>
							<TableHead className="table-header-cell">Regional</TableHead>
							<TableHead className="table-header-cell w-20">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="divide-y divide-gray-200 bg-white">
						{isLoading ?
							<TableRow>
								<TableCell
									colSpan={6}
									className="empty-state-cell"
								>
									Carregando...
								</TableCell>
							</TableRow>
						: garages?.data && garages.data.length > 0 ?
							garages.data.map((garage) => (
								<TableRow
									key={garage.code}
									className="hover:bg-gray-50"
								>
									<TableCell className="table-cell-compact">{garage.code}</TableCell>
									<TableCell className="table-cell-compact font-medium">{garage.name}</TableCell>
									<TableCell className="table-cell">{garage.address}</TableCell>
									<TableCell className="table-cell-compact">
										{garage.city}/{garage.state}
									</TableCell>
									<TableCell className="table-cell-compact">{garage.region}</TableCell>
									<TableCell className="table-cell-action">
										<Button
											variant="ghost"
											size="icon"
											className="size-8 text-gray-400 hover:text-gray-600"
											onMouseEnter={() => prefetchGarage(garage.code)}
										>
											<Eye className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						:	<TableRow>
								<TableCell
									colSpan={6}
									className="empty-state-cell"
								>
									Nenhuma garagem encontrada
								</TableCell>
							</TableRow>
						}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
