import api from '@/config/api'
import { z } from 'zod'

export const getGaragesPaginatedListSchema = z.object({
	currentPage: z.number().int(),
	pageSize: z.number().int(),
	garageName: z.string().optional(),
})

export type GetGaragesPaginatedListVariables = z.infer<typeof getGaragesPaginatedListSchema>

const garageItemSchema = z.object({
	code: z.string(),
	name: z.string(),
	address: z.string(),
	city: z.string(),
	state: z.string(),
	region: z.string(),
	subsidiary: z.string().optional(),
})

const getGaragesPaginatedListResponseSchema = z.object({
	countRecords: z.number().int(),
	currentPage: z.number().int(),
	pageSize: z.number().int(),
	hasNextPage: z.number(),
	hasPreviousPage: z.number(),
	data: z.array(garageItemSchema),
})

export type GetGaragesPaginatedListResponse = z.infer<typeof getGaragesPaginatedListResponseSchema>

export async function getGaragesPaginatedList(params: GetGaragesPaginatedListVariables) {
	const response = await api.get('GetGaragesPaginatedList', { params })

	const parseResult = getGaragesPaginatedListResponseSchema.safeParse(response.data)

	if (!parseResult.success) {
		console.error('Erro on parsing schema:', parseResult.error)
		console.error('Received data:', response.data)
		throw parseResult.error
	}

	return parseResult.data
}
