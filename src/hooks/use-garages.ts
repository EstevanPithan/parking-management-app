import { getGarage } from '@/api/requests/garages/get-garage'
import {
	getGaragesPaginatedList,
	GetGaragesPaginatedListVariables,
} from '@/api/requests/garages/get-garages-paginated-list'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface UseGaragesListOptions extends GetGaragesPaginatedListVariables {
	enabled?: boolean
}

export function useGaragesList({ currentPage = 1, pageSize = 50, garageName, enabled = true }: UseGaragesListOptions) {
	return useQuery({
		queryKey: ['garages', 'list', { currentPage, pageSize, garageName }],
		queryFn: () =>
			getGaragesPaginatedList({
				currentPage,
				pageSize,
				garageName,
			}),
		enabled,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 2,
		refetchOnWindowFocus: false,
	})
}

export function useGarage(garageId: string, enabled = true) {
	return useQuery({
		queryKey: ['garages', 'detail', garageId],
		queryFn: () => getGarage({ garageId }),
		enabled: enabled && !!garageId,
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 30 * 60 * 1000, // 30 minutes
		retry: 2,
		refetchOnWindowFocus: false,
	})
}

export function useInvalidateGarages() {
	const queryClient = useQueryClient()

	return {
		invalidateGaragesList: () => queryClient.invalidateQueries({ queryKey: ['garages', 'list'] }),
		invalidateGarage: (garageId: string) =>
			queryClient.invalidateQueries({ queryKey: ['garages', 'detail', garageId] }),
		invalidateAllGarages: () => queryClient.invalidateQueries({ queryKey: ['garages'] }),
	}
}

export function usePrefetchGarage() {
	const queryClient = useQueryClient()

	return (garageId: string) => {
		queryClient.prefetchQuery({
			queryKey: ['garages', 'detail', garageId],
			queryFn: () => getGarage({ garageId }),
			staleTime: 10 * 60 * 1000,
			gcTime: 30 * 60 * 1000,
		})
	}
}
