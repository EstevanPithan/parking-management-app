import { deauthenticateMock } from '@/api/mocks/auth/deauthenticate.mock'
import { z } from 'zod'

const logoutResponseSchema = z.object({
	data: z.string().nullable(),
	message: z.string().nullable(),
})

export type LogoutResponse = z.infer<typeof logoutResponseSchema>

export async function deauthenticate() {
	// const response = await api.get('/auth/logout')

	const response = deauthenticateMock

	const parseResult = logoutResponseSchema.safeParse(response)

	if (!parseResult.success) {
		console.error('Erro no parsing do schema (deauthenticate):', parseResult.error)
		console.error('Dados recebidos:', response)
		throw parseResult.error
	}

	return parseResult.data
}
