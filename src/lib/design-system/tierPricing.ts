export interface PricingTier {
	/** Inclusive lower bound of usage for this tier */
	fromUnits: number;
	/** Exclusive upper bound; omit for open-ended last tier */
	toUnits?: number;
	/** Price per unit in this band */
	unitPrice: number;
}

/**
 * Computes total cost for usage-based (graduated) tiers: each band is priced independently.
 *
 * @param usedUnits - Billable quantity consumed
 * @param tiers - Ordered tiers from lowest `fromUnits` to highest
 */
export function computeGraduatedTierTotal(usedUnits: number, tiers: PricingTier[]): number {
	if (usedUnits <= 0 || tiers.length === 0) return 0;

	let total = 0;
	let remaining = usedUnits;

	for (let i = 0; i < tiers.length && remaining > 0; i++) {
		const { fromUnits, toUnits, unitPrice } = tiers[i];
		const cap = toUnits ?? Number.POSITIVE_INFINITY;
		const tierWidth = Math.max(0, cap - fromUnits);
		const applicable = Math.min(remaining, tierWidth);
		total += applicable * unitPrice;
		remaining -= applicable;
	}

	return total;
}
