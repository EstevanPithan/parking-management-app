import { getGarage } from '@/api/requests/garages/get-garage'
import {
	getGaragesPaginatedList,
	GetGaragesPaginatedListVariables,
} from '@/api/requests/garages/get-garages-paginated-list'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

interface UseGaragesListOptions extends GetGaragesPaginatedListVariables {
	enabled?: boolean
}

/**
 * Hook to fetch a paginated list of garages with optional search functionality.
 *
 * @param garageName - Search term to filter garages by name.
 * Note: Since the API is mocked and doesn't handle server-side filtering,
 * we implement client-side filtering here. In a real backend implementation,
 * this filtering should be done on the server using database queries
 * for optimal performance and proper handling of large datasets.
 */
export function useGaragesList({ currentPage = 1, pageSize = 50, garageName, enabled = true }: UseGaragesListOptions) {
	const {
		data: allGarages,
		isLoading,
		...rest
	} = useQuery({
		queryKey: ['garages', 'list', { currentPage, pageSize }],
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

	// Client-side filtering by garage name
	// TODO: Remove this when backend implements proper search functionality
	const filteredData = useMemo(() => {
		if (!allGarages?.data || !garageName?.trim()) {
			return allGarages
		}

		const searchTerm = garageName.toLowerCase().trim()
		const filteredGarages = allGarages.data.filter((garage) => garage.name.toLowerCase().includes(searchTerm))

		return {
			...allGarages,
			data: filteredGarages,
			countRecords: filteredGarages.length,
		}
	}, [allGarages, garageName])

	return {
		data: filteredData,
		isLoading,
		...rest,
	}
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
