import { createPlan, CreatePlanVariables } from '@/api/requests/plans/create-plan'
import { getPlans, GetPlansResponse, GetPlansVariables } from '@/api/requests/plans/get-plans'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface UsePlansOptions extends GetPlansVariables {
	enabled?: boolean
}

export function usePlans({ garageId, enabled = true }: UsePlansOptions = {}) {
	return useQuery({
		queryKey: ['plans', { garageId }],
		queryFn: () => getPlans({ garageId }),
		enabled,
		staleTime: 5 * 60 * 1000, // 5 minutos
		gcTime: 10 * 60 * 1000, // 10 minutos
		retry: 2,
		refetchOnWindowFocus: false,
	})
}

export function useCreatePlan() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createPlan,
		onMutate: async (newPlan: CreatePlanVariables) => {
			await queryClient.cancelQueries({ queryKey: ['plans'] })

			const previousPlans = queryClient.getQueryData(['plans', { garageId: newPlan.garageId }])

			queryClient.setQueryData(['plans', { garageId: newPlan.garageId }], (old: GetPlansResponse) => {
				if (!old) return old

				const existingPlanIndex = old.findIndex((plan) => plan.idPlan?.toString() === newPlan.id)

				if (existingPlanIndex !== -1) {
					const updatedPlans = [...old]
					updatedPlans[existingPlanIndex] = {
						...updatedPlans[existingPlanIndex],
						description: newPlan.description,
						startValidity: newPlan.startValidity,
						endValidity: newPlan.endValidity,
						priceInCents: parseInt(newPlan.priceInCents),
						active: newPlan.active === 'true',
						descriptionAvailable: newPlan.descriptionAvailable,
						amountDailyCancellationInCents: parseInt(newPlan.amountDailyCancellationInCents),
						veichleType: parseInt(newPlan.vehicleType),
						totalVacancies: newPlan.totalVacancies,
					}
					return updatedPlans
				} else {
					const newPlanItem = {
						idPlan: parseInt(newPlan.id),
						idGarage: parseInt(newPlan.garageId),
						description: newPlan.description,
						startValidity: newPlan.startValidity,
						endValidity: newPlan.endValidity,
						priceInCents: parseInt(newPlan.priceInCents),
						active: newPlan.active === 'true',
						descriptionAvailable: newPlan.descriptionAvailable,
						amountDailyCancellationInCents: parseInt(newPlan.amountDailyCancellationInCents),
						veichleType: parseInt(newPlan.vehicleType),
						totalVacancies: newPlan.totalVacancies,
					}
					return [newPlanItem, ...old]
				}
			})

			return { previousPlans, garageId: newPlan.garageId }
		},
		onError: (_err, _newPlan, context) => {
			if (context?.previousPlans) {
				queryClient.setQueryData(['plans', { garageId: context.garageId }], context.previousPlans)
			}
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({ queryKey: ['plans', { garageId: variables.garageId }] })
		},
	})
}

export function useInvalidatePlans() {
	const queryClient = useQueryClient()

	return {
		invalidatePlans: (garageId?: string) => {
			if (garageId) {
				queryClient.invalidateQueries({ queryKey: ['plans', { garageId }] })
			} else {
				queryClient.invalidateQueries({ queryKey: ['plans'] })
			}
		},
		invalidateAllPlans: () => queryClient.invalidateQueries({ queryKey: ['plans'] }),
	}
}
