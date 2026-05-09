import type { DefaultOptions } from '@tanstack/react-query';

const FIVE_MIN = 5 * 60 * 1000;
const TEN_MIN = 10 * 60 * 1000;
const THIRTY_MIN = 30 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

/** Default TanStack Query timings for FlexPrice-style server state */
export const QUERY_DEFAULTS: DefaultOptions = {
	queries: {
		staleTime: FIVE_MIN,
		gcTime: TEN_MIN,
	},
};

export const QUERY_PRESETS = {
	REALTIME: { staleTime: 0, gcTime: TEN_MIN },
	DEFAULT: { staleTime: FIVE_MIN, gcTime: TEN_MIN },
	STATIC: { staleTime: THIRTY_MIN, gcTime: ONE_HOUR },
} as const;

export type QueryPreset = keyof typeof QUERY_PRESETS;

export type QueryTimingOverrides = { staleTime?: number; gcTime?: number };

/**
 * Merges a preset with per-call `useQuery` overrides (later wins).
 *
 * @example
 * useQuery({
 *   queryKey: ['invoices'],
 *   queryFn: fetchInvoices,
 *   ...mergeQueryOptions('DEFAULT', { staleTime: 0 }),
 * });
 */
export function mergeQueryOptions(
	preset: QueryPreset,
	overrides?: QueryTimingOverrides,
): (typeof QUERY_PRESETS)[QueryPreset] & QueryTimingOverrides {
	return {
		...QUERY_PRESETS[preset],
		...overrides,
	};
}
