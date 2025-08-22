import PlanModal from '@/components/PlanModal'
import { Button } from '@/components/ui/button'
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from '@/components/ui/custom-tabs'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { StatCard } from '@/components/ui/stat-card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGarage, useIsMobile, usePlans } from '@/hooks'
import { formatCurrency } from '@/lib/utils'
import {
	Building,
	Building2,
	CircleDollarSignIcon,
	Edit,
	MapPin,
	Plus,
	QrCode,
	UserCheck,
	UserMinus,
	Users,
} from 'lucide-react'
import { useState } from 'react'

interface GarageDetailDrawerProps {
	garageId: string | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function GarageDetailDrawer({ garageId, open, onOpenChange }: GarageDetailDrawerProps) {
	const isMobile = useIsMobile()
	const [planModalOpen, setPlanModalOpen] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null)

	const { data: garage, isLoading } = useGarage(garageId || '', !!garageId && open)
	const { data: plans = [], isLoading: plansLoading } = usePlans({
		garageId: garageId || '',
		enabled: !!garageId && open,
	})

	const availableSpaces = garage ? garage.countSpaces - garage.occupiedSpaces : 0

	function handleNewPlan() {
		setSelectedPlan(null)
		setPlanModalOpen(true)
	}

	function handleEditPlan(plan: (typeof plans)[0]) {
		setSelectedPlan(plan)
		setPlanModalOpen(true)
	}

	if (!garageId) return null

	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetContent
				side="right"
				className="h-screen max-h-full w-full max-w-3xl overflow-hidden p-2 sm:max-w-xl md:max-w-6xl"
			>
				{isLoading ?
					<div className="flex h-full items-center justify-center">
						<span className="text-sm text-gray-500">Carregando...</span>
					</div>
				: garage ?
					<div className="flex h-full flex-col gap-4 overflow-hidden">
						<div className="flex-shrink-0">
							<SheetHeader>
								<div className="flex flex-col items-start justify-center gap-2">
									<div className="flex items-center justify-center gap-4">
										<Building2 className="size-8" />
										<SheetTitle className="text-3xl font-semibold text-gray-900">{garage.name}</SheetTitle>
									</div>
									<span className="text-xs text-gray-500">Código: {garage.code}</span>
								</div>
							</SheetHeader>

							<div className="flex flex-col items-start gap-3 px-4">
								<div className="flex gap-2">
									<MapPin className="size-5 text-gray-500" />
									<span className="text-sm text-gray-500">{garage.address.toUpperCase()}</span>
								</div>

								<div className="flex gap-2">
									<Building className="size-5 text-gray-500" />
									<span className="text-sm text-gray-500">
										{garage.subsidiary ? `Filial: ${garage.subsidiary.toUpperCase()} • ` : ''}
										Regional: {garage.region.toUpperCase()}
									</span>
								</div>
							</div>
						</div>

						<CustomTabs
							defaultValue="digital"
							className="flex flex-1 flex-col overflow-hidden px-4"
							orientation="horizontal"
						>
							<CustomTabsList orientation="horizontal">
								<CustomTabsTrigger
									value="digital"
									orientation="horizontal"
								>
									Mensalista digital
								</CustomTabsTrigger>
							</CustomTabsList>

							<CustomTabsContent
								value="digital"
								className="flex flex-1 flex-col space-y-4 overflow-hidden px-4"
							>
								<div className="flex w-full flex-shrink-0 items-center gap-2">
									<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
										<StatCard
											label="Total de Vagas"
											value={garage.countSpaces}
											icon={Users}
											iconColor="text-gray-500"
											valueColor="text-gray-900"
										/>
										<StatCard
											label="Ocupadas"
											value={garage.occupiedSpaces}
											icon={UserCheck}
											iconColor="text-orange-500"
											valueColor="text-orange-600"
										/>
										<StatCard
											label="Disponíveis"
											value={availableSpaces}
											icon={UserMinus}
											iconColor="text-lime-600"
											valueColor="text-lime-600"
										/>
									</div>
									<QrCode className="size-20 text-gray-400" />
								</div>

								{!isMobile ?
									<div className="flex flex-1 overflow-hidden rounded-lg border border-gray-200">
										<CustomTabs
											defaultValue="plans"
											className="flex max-h-full flex-1 overflow-hidden"
											orientation="vertical"
										>
											<CustomTabsList
												orientation="vertical"
												className="h-full w-40"
											>
												<CustomTabsTrigger
													value="plans"
													orientation="vertical"
												>
													<CircleDollarSignIcon />
													<span>Planos</span>
												</CustomTabsTrigger>
											</CustomTabsList>

											<CustomTabsContent
												value="plans"
												className="flex flex-1 flex-col overflow-hidden p-4"
											>
												<>
													<div className="mb-4 flex flex-shrink-0 items-center justify-between text-sm text-gray-600">
														<h4 className="font-medium">Planos Disponíveis</h4>
														<Button
															size="sm"
															variant="outline"
															className="text-lime hover:text-lime-500"
															onClick={handleNewPlan}
														>
															<Plus className="mr-2 size-4" />
															Novo Plano
														</Button>
													</div>
													<div className="flex-1 overflow-auto">
														<Table>
															<TableHeader>
																<TableRow>
																	<TableHead className="table-header-cell">Descrição</TableHead>
																	<TableHead className="table-header-cell">Valor</TableHead>
																	<TableHead className="table-header-cell">Vagas</TableHead>
																	<TableHead className="table-header-cell">Status</TableHead>
																	<TableHead className="table-header-cell w-16">Ações</TableHead>
																</TableRow>
															</TableHeader>
															<TableBody className="divide-y divide-gray-200 bg-white">
																{plansLoading ?
																	<TableRow>
																		<TableCell
																			colSpan={5}
																			className="empty-state-cell"
																		>
																			Carregando planos...
																		</TableCell>
																	</TableRow>
																: plans.length > 0 ?
																	plans.map((plan) => (
																		<TableRow
																			key={plan.idPlan}
																			className="hover:bg-gray-50"
																		>
																			<TableCell className="table-cell-compact font-medium">
																				{plan.description}
																			</TableCell>
																			<TableCell className="table-cell-compact">
																				{formatCurrency(plan.priceInCents / 100)}
																			</TableCell>
																			<TableCell className="table-cell-compact">{plan.totalVacancies}</TableCell>
																			<TableCell className="table-cell-compact">
																				<span
																					className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
																						plan.active ? 'bg-lime-100 text-lime-800' : 'bg-gray-100 text-gray-600'
																					}`}
																				>
																					{plan.active ? 'Ativo' : 'Inativo'}
																				</span>
																			</TableCell>
																			<TableCell className="table-cell-action">
																				<div className="flex items-center gap-1">
																					<Button
																						variant="ghost"
																						size="icon"
																						className="size-6 text-gray-400 hover:text-gray-600"
																						onClick={() => handleEditPlan(plan)}
																					>
																						<Edit className="size-4" />
																					</Button>
																				</div>
																			</TableCell>
																		</TableRow>
																	))
																:	<TableRow>
																		<TableCell
																			colSpan={5}
																			className="empty-state-cell"
																		>
																			Nenhum plano encontrado
																		</TableCell>
																	</TableRow>
																}
															</TableBody>
														</Table>
													</div>
												</>
											</CustomTabsContent>
										</CustomTabs>
									</div>
								:	<div className="flex-1 space-y-3 overflow-y-auto">
										{plansLoading ?
											<div className="flex items-center justify-center py-8">
												<span className="text-sm text-gray-500">Carregando planos...</span>
											</div>
										: plans.length > 0 ?
											plans.map((plan) => (
												<div
													key={plan.idPlan}
													className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
												>
													<div className="mb-2 flex items-start justify-between">
														<div className="flex-1">
															<h4 className="text-sm font-medium leading-tight text-gray-900">{plan.description}</h4>
															<p className="mt-1 text-xs text-gray-500">{formatCurrency(plan.priceInCents / 100)}</p>
														</div>
														<div className="flex items-center gap-2">
															<span
																className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
																	plan.active ? 'bg-lime-100 text-lime-800' : 'bg-gray-100 text-gray-600'
																}`}
															>
																{plan.active ? 'Ativo' : 'Inativo'}
															</span>
															<Button
																variant="ghost"
																size="icon"
																className="size-6 flex-shrink-0 text-gray-400 hover:text-gray-600"
																onClick={() => handleEditPlan(plan)}
															>
																<Edit className="h-3 w-3" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="size-6 flex-shrink-0 text-gray-400 hover:text-gray-600"
															>
																<QrCode className="h-3 w-3" />
															</Button>
														</div>
													</div>

													<div className="grid grid-cols-2 gap-2 text-xs">
														<div>
															<span className="text-gray-500">Vagas:</span>
															<p className="text-gray-900">{plan.totalVacancies}</p>
														</div>
														<div>
															<span className="text-gray-500">Disponíveis:</span>
															<p className="text-gray-900">{plan.totalVacancies}</p>
														</div>
													</div>
												</div>
											))
										:	<div className="flex items-center justify-center py-8">
												<span className="text-sm text-gray-500">Nenhum plano encontrado</span>
											</div>
										}
									</div>
								}
							</CustomTabsContent>
						</CustomTabs>
					</div>
				:	<div className="flex h-full items-center justify-center">
						<span className="text-sm text-gray-500">Garagem não encontrada</span>
					</div>
				}
			</SheetContent>

			<PlanModal
				open={planModalOpen}
				onOpenChange={setPlanModalOpen}
				plan={selectedPlan}
				garageId={garageId}
			/>
		</Sheet>
	)
}
