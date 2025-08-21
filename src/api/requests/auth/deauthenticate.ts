import api from '@/config/api'
import { z } from 'zod'

const logoutResponseSchema = z.object({
	data: z.string().nullable(),
	message: z.string().nullable(),
})

export type LogoutResponse = z.infer<typeof logoutResponseSchema>

export async function deauthenticate() {
	const response = await api.get('/auth/logout')

	const parseResult = logoutResponseSchema.safeParse(response.data)

	if (!parseResult.success) {
		console.error('Erro no parsing do schema (deauthenticate):', parseResult.error)
		console.error('Dados recebidos:', response.data)
		throw parseResult.error
	}

	return parseResult.data
}
