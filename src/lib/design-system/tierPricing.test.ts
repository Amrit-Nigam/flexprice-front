import { describe, expect, it } from 'vitest';
import { computeGraduatedTierTotal } from './tierPricing';

describe('computeGraduatedTierTotal', () => {
	const tiers = [
		{ fromUnits: 0, toUnits: 100, unitPrice: 1 },
		{ fromUnits: 100, toUnits: 200, unitPrice: 0.5 },
	];

	it('returns 0 for non-positive usage', () => {
		expect(computeGraduatedTierTotal(0, tiers)).toBe(0);
		expect(computeGraduatedTierTotal(-5, tiers)).toBe(0);
	});

	it('allocates usage across graduated bands', () => {
		expect(computeGraduatedTierTotal(50, tiers)).toBe(50 * 1);
		expect(computeGraduatedTierTotal(150, tiers)).toBe(100 * 1 + 50 * 0.5);
	});
});
