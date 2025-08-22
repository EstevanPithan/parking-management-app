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
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 2,
		refetchOnWindowFocus: false,
	})
}

export function useCreatePlan() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createPlan,
		onMutate: async (newPlan: CreatePlanVariables) => {
			await queryClient.cancelQueries({ queryKey: ['plans', { garageId: newPlan.garageId }] })

			const previousPlans = queryClient.getQueryData<GetPlansResponse>(['plans', { garageId: newPlan.garageId }])

			queryClient.setQueryData<GetPlansResponse>(['plans', { garageId: newPlan.garageId }], (old) => {
				if (!old) return old

				if (newPlan.id) {
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
							VeichleType: parseInt(newPlan.vehicleType),
							totalVacancies: newPlan.totalVacancies,
						}
						return updatedPlans
					}
				} else {
					const newPlanItem = {
						idPlan: Date.now(), // Temporary ID
						idGarage: parseInt(newPlan.garageId),
						description: newPlan.description,
						startValidity: newPlan.startValidity,
						endValidity: newPlan.endValidity,
						priceInCents: parseInt(newPlan.priceInCents),
						active: newPlan.active === 'true',
						descriptionAvailable: newPlan.descriptionAvailable,
						amountDailyCancellationInCents: parseInt(newPlan.amountDailyCancellationInCents),
						veichleType: parseInt(newPlan.vehicleType),
						VeichleType: parseInt(newPlan.vehicleType),
						totalVacancies: newPlan.totalVacancies,
					}
					return [newPlanItem, ...old]
				}

				return old
			})

			return { previousPlans, garageId: newPlan.garageId }
		},
		onError: (_err, newPlan, context) => {
			if (context?.previousPlans) {
				queryClient.setQueryData(['plans', { garageId: context.garageId }], context.previousPlans)
			}
			queryClient.invalidateQueries({ queryKey: ['plans', { garageId: newPlan.garageId }] })
		},
		onSuccess: () => {
			// On success, keep the optimistic cache
			// Optionally, could update with real response data if needed
			// But since the mock API works, the optimistic cache should already be correct
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
