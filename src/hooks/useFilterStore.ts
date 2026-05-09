import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

function canonicalStringify(value: unknown): string {
	if (value === null || typeof value !== 'object') {
		return JSON.stringify(value);
	}
	if (Array.isArray(value)) {
		return `[${value.map(canonicalStringify).join(',')}]`;
	}
	const entries = Object.keys(value as Record<string, unknown>)
		.sort()
		.map((key) => `${JSON.stringify(key)}:${canonicalStringify((value as Record<string, unknown>)[key])}`);
	return `{${entries.join(',')}}`;
}

/** Small stable fingerprint for bookmarking filter state without serializing the full object into the URL */
export function hashFilterState(value: unknown): string {
	let hash = 5381;
	const str = canonicalStringify(value);
	for (let i = 0; i < str.length; i++) {
		hash = (hash * 33) ^ str.charCodeAt(i);
	}
	return (hash >>> 0).toString(16);
}

type RouteFilters = Record<string, unknown>;

interface FilterRootState {
	routes: Record<string, RouteFilters>;
	setFilter: (routeKey: string, key: string, next: unknown) => void;
	resetFilters: (routeKey: string) => void;
	getFilters: (routeKey: string) => RouteFilters;
}

export const filterStore = create<FilterRootState>()(
	persist(
		(set, get) => ({
			routes: {},
			setFilter: (routeKey, key, next) =>
				set((s) => {
					const prev = s.routes[routeKey] ?? {};
					return { routes: { ...s.routes, [routeKey]: { ...prev, [key]: next } } };
				}),
			resetFilters: (routeKey) =>
				set((s) => {
					const nextRoutes = { ...s.routes };
					delete nextRoutes[routeKey];
					return { routes: nextRoutes };
				}),
			getFilters: (routeKey) => get().routes[routeKey] ?? {},
		}),
		{
			name: 'flexprice-filters',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({ routes: state.routes }),
		},
	),
);

/**
 * Page-scoped filters persisted in `sessionStorage`, with only a hash (`fp`) synced to the URL
 * for lightweight bookmarking. Must be used under a React Router `Router` (for `useSearchParams`).
 *
 * @param routeKey - Stable id for the page, e.g. `invoices` or `customers`
 */
export function useFilterStore(routeKey: string) {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = filterStore((s) => s.routes[routeKey] ?? {});

	const setFilter = useCallback(
		(key: string, value: unknown) => {
			filterStore.getState().setFilter(routeKey, key, value);
		},
		[routeKey],
	);

	const resetFilters = useCallback(() => {
		filterStore.getState().resetFilters(routeKey);
	}, [routeKey]);

	const getFilters = useCallback(() => filterStore.getState().getFilters(routeKey), [routeKey]);

	const fingerprint = useMemo(() => hashFilterState(filters), [filters]);

	useEffect(() => {
		const fpParam = searchParams.get('fp');
		if (fpParam !== fingerprint) {
			const next = new URLSearchParams(searchParams);
			next.set('fp', fingerprint);
			setSearchParams(next, { replace: true });
		}
	}, [fingerprint, searchParams, setSearchParams]);

	return {
		filters,
		fingerprint,
		setFilter,
		resetFilters,
		getFilters,
	};
}
