import api from '@/config/api'
import { z } from 'zod'

export const createPlanSchema = z.object({
	id: z.string().optional(),
	garageId: z.string(),
	description: z.string(),
	startValidity: z.string(),
	endValidity: z.string(),
	priceInCents: z.string(),
	active: z.string(),
	descriptionAvailable: z.string(),
	amountDailyCancellationInCents: z.string(),
	vehicleType: z.string(),
	totalVacancies: z.number().int(),
})

export type CreatePlanVariables = z.infer<typeof createPlanSchema>

const createPlanResponseSchema = z.object({
	id: z
		.union([z.string(), z.number()])
		.optional()
		.transform((val) => val?.toString()),
	garageId: z.union([z.string(), z.number()]).transform((val) => val.toString()),
	description: z.string(),
	startValidity: z.string(),
	endValidity: z.string(),
	priceInCents: z.union([z.string(), z.number()]).transform((val) => val.toString()),
	active: z.union([z.string(), z.boolean()]).transform((val) => val.toString()),
	descriptionAvailable: z.string(),
	amountDailyCancellationInCents: z.union([z.string(), z.number()]).transform((val) => val.toString()),
	vehicleType: z.union([z.string(), z.number()]).transform((val) => val.toString()),
	totalVacancies: z.number().int(),
})

export type CreatePlanResponse = z.infer<typeof createPlanResponseSchema>

export async function createPlan(data: CreatePlanVariables) {
	const response = await api.post('plan', data)

	const planData = response.data?.data || response.data

	const parseResult = createPlanResponseSchema.safeParse(planData)

	if (!parseResult.success) {
		console.error('Schema parsing error (create-plan):', parseResult.error)
		console.error('Received data:', response.data)
		console.error('Plan data:', planData)
		throw parseResult.error
	}

	return parseResult.data
}
