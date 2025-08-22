import api from '@/config/api'
import { z } from 'zod'

export const getGarageSchema = z.object({
	garageId: z.string(),
})

export type GetGarageVariables = z.infer<typeof getGarageSchema>

const getGarageResponseSchema = z.object({
	code: z.string(),
	name: z.string(),
	address: z.string(),
	city: z.string(),
	state: z.string(),
	region: z.string(),
	subsidiary: z.string().optional(),
	countSpaces: z.number().int(),
	occupiedSpaces: z.number().int(),
	maxDiscountPercent: z.number().int(),
})

export type GetGarageResponse = z.infer<typeof getGarageResponseSchema>

export async function getGarage(params: GetGarageVariables) {
	const response = await api.get('garage', { params })

	const parseResult = getGarageResponseSchema.safeParse(response.data)

	if (!parseResult.success) {
		console.error('Schema parsing error (get-garage):', parseResult.error)
		console.error('Received data:', response.data)
		throw parseResult.error
	}

	return parseResult.data
}
