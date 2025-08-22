import GarageDetailDrawer from '@/components/GarageDetailDrawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loading } from '@/components/ui/loading'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDebounce, useGaragesList, usePrefetchGarage, useIsMobile } from '@/hooks'
import { Search, Eye, Building2 } from 'lucide-react'
import { useState } from 'react'

export default function GarageList() {
	const [searchTerm, setSearchTerm] = useState('')
	const [digitalMonthlyEnabled, setDigitalMonthlyEnabled] = useState(true)
	const [selectedGarageId, setSelectedGarageId] = useState<string | null>(null)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const isMobile = useIsMobile()
	const prefetchGarage = usePrefetchGarage()

	const debouncedSearchTerm = useDebounce(searchTerm, 300)

	// Note: Currently implementing client-side search filtering since the API is mocked
	// and doesn't handle server-side filtering. In a real backend implementation,
	// search filtering should be done on the server using database queries
	// for better performance and to handle large datasets efficiently.
	const { data: garages, isLoading } = useGaragesList({
		currentPage: 1,
		pageSize: 50,
		garageName: debouncedSearchTerm || undefined,
	})

	function handleGarageClick(garageCode: string) {
		setSelectedGarageId(garageCode)
		setDrawerOpen(true)
	}

	return (
		<div className="mx-auto flex h-full flex-col gap-4 overflow-hidden p-4 md:p-6">
			<div className={isMobile ? 'px-1' : ''}>
				<div className="flex items-center gap-3">
					<Building2 className="text-lime" />
					<h1 className="text-xl font-semibold text-gray-900 md:text-2xl">Garagens</h1>
				</div>
				<p className="text-sm text-gray-500 md:text-base">
					Visualize as garagens habilitadas para mensalistas digitais.
				</p>
			</div>

			<div className="rounded border border-gray-200 p-3 md:p-4">
				<div className={`flex items-center gap-3 ${isMobile ? 'flex-col space-y-3' : 'justify-between'}`}>
					<div className="flex items-center gap-3">
						<Switch
							size={isMobile ? 'md' : 'lg'}
							checked={digitalMonthlyEnabled}
							onCheckedChange={setDigitalMonthlyEnabled}
						/>
						<Label className={isMobile ? 'text-sm' : ''}>Mensalista Digital</Label>
					</div>

					{!isMobile && <Label className="text-sm text-gray-400">{garages?.countRecords || 0} registros</Label>}

					<div className={`relative ${isMobile ? 'w-full' : ''}`}>
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						<Input
							placeholder="Buscar por nome"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>

					{isMobile && (
						<Label className="self-start text-xs text-gray-400">{garages?.countRecords || 0} registros</Label>
					)}
				</div>
			</div>

			{!isMobile && (
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
										<Loading
											size={32}
											text="Carregando garagens..."
										/>
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
												onClick={() => handleGarageClick(garage.code)}
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
			)}

			{isMobile && (
				<div className="flex-1 space-y-3 overflow-y-auto">
					{isLoading ?
						<div className="flex items-center justify-center py-8">
							<Loading
								size={28}
								text="Carregando..."
							/>
						</div>
					: garages?.data && garages.data.length > 0 ?
						garages.data.map((garage) => (
							<div
								key={garage.code}
								className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
							>
								<div className="mb-3 flex items-start justify-between">
									<div className="flex-1">
										<h3 className="text-sm font-medium leading-tight text-gray-900">{garage.name}</h3>
										<p className="mt-1 text-xs text-gray-500">Código: {garage.code}</p>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="size-8 flex-shrink-0 text-gray-400 hover:text-gray-600"
										onMouseEnter={() => prefetchGarage(garage.code)}
										onClick={() => handleGarageClick(garage.code)}
									>
										<Eye className="h-4 w-4" />
									</Button>
								</div>

								<div className="space-y-2 text-xs">
									<div>
										<span className="text-gray-500">Endereço:</span>
										<p className="text-gray-900">{garage.address}</p>
									</div>
									<div className="flex justify-between">
										<div>
											<span className="text-gray-500">Cidade/UF:</span>
											<p className="text-gray-900">
												{garage.city}/{garage.state}
											</p>
										</div>
										<div>
											<span className="text-gray-500">Regional:</span>
											<p className="text-gray-900">{garage.region}</p>
										</div>
									</div>
								</div>
							</div>
						))
					:	<div className="flex items-center justify-center py-8">
							<span className="text-sm text-gray-500">Nenhuma garagem encontrada</span>
						</div>
					}
				</div>
			)}

			<GarageDetailDrawer
				garageId={selectedGarageId}
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
			/>
		</div>
	)
}
