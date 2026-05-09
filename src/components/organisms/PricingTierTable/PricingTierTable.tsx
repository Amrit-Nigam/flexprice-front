import { formatCurrency } from '@/lib/design-system/formatCurrency';
import { cn } from '@/lib/utils';
import type { PricingTier } from '@/lib/design-system/tierPricing';

export interface PricingTierTableProps {
	tiers: PricingTier[];
	currency?: string;
	/** Optional usage to show computed total for the graduated model */
	usageUnits?: number;
	className?: string;
}

function formatRange(tier: PricingTier): string {
	const upper = tier.toUnits !== undefined ? tier.toUnits.toLocaleString() : '∞';
	return `${tier.fromUnits.toLocaleString()} – ${upper}`;
}

/**
 * Read-only table describing graduated usage tiers for plan setup and review screens.
 */
export function PricingTierTable({ tiers, currency = 'USD', usageUnits, className }: PricingTierTableProps) {
	return (
		<div className={cn('overflow-hidden rounded-lg border', className)}>
			<table className='w-full border-collapse text-sm'>
				<thead className='bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground'>
					<tr>
						<th className='px-4 py-3 font-medium'>Tier (units)</th>
						<th className='px-4 py-3 font-medium'>Unit price</th>
					</tr>
				</thead>
				<tbody>
					{tiers.map((tier, i) => (
						<tr key={i} className='border-t'>
							<td className='px-4 py-3 tabular-nums'>{formatRange(tier)}</td>
							<td className='px-4 py-3 tabular-nums'>{formatCurrency(tier.unitPrice, currency)}</td>
						</tr>
					))}
				</tbody>
				{usageUnits !== undefined ? (
					<tfoot className='bg-muted/30 text-sm'>
						<tr>
							<td colSpan={2} className='px-4 py-3 text-muted-foreground'>
								Example at {usageUnits.toLocaleString()} units — open the Storybook story to compare against computed totals in tests /
								utils.
							</td>
						</tr>
					</tfoot>
				) : null}
			</table>
		</div>
	);
}

export default PricingTierTable;
