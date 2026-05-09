import { describe, expect, it } from 'vitest';
import { QUERY_DEFAULTS, QUERY_PRESETS, mergeQueryOptions } from './createQueryConfig';

describe('createQueryConfig', () => {
	it('exposes global defaults for stale and gc time', () => {
		expect(QUERY_DEFAULTS.queries?.staleTime).toBe(5 * 60 * 1000);
		expect(QUERY_DEFAULTS.queries?.gcTime).toBe(10 * 60 * 1000);
	});

	it('defines presets with expected ordering', () => {
		expect(QUERY_PRESETS.REALTIME.staleTime).toBe(0);
		expect(QUERY_PRESETS.STATIC.staleTime).toBeGreaterThan(QUERY_PRESETS.DEFAULT.staleTime ?? 0);
	});

	it('mergeQueryOptions allows call-site overrides', () => {
		const merged = mergeQueryOptions('DEFAULT', { staleTime: 0 });
		expect(merged.staleTime).toBe(0);
		expect(merged.gcTime).toBe(QUERY_PRESETS.DEFAULT.gcTime);
	});
});
