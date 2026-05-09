import Chip from '@/components/atoms/Chip/Chip';
import type { ChipVariant } from '@/lib/design-system/invoiceStatus.types';
import type { ReactNode } from 'react';

export type PlanLikeStatus = 'active' | 'archived';
export type SubscriptionLikeStatus = 'active' | 'trialing' | 'canceled' | 'past_due' | 'paused';

export interface StatusChipProps {
	/** Domain label shown in billing UI */
	kind: 'plan' | 'subscription' | 'invoice' | 'custom';
	/** Raw status from API */
	status: string;
	/** Optional click handler */
	onClick?: () => void;
	className?: string;
}

const PLAN_MAP: Record<PlanLikeStatus, ChipVariant> = {
	active: 'success',
	archived: 'default',
};

const SUB_MAP: Record<SubscriptionLikeStatus, ChipVariant> = {
	active: 'success',
	trialing: 'info',
	canceled: 'failed',
	past_due: 'warning',
	paused: 'warning',
};

function mapPlan(status: string): ChipVariant {
	const k = status.toLowerCase() as PlanLikeStatus;
	return k in PLAN_MAP ? PLAN_MAP[k] : 'info';
}

function mapSub(status: string): ChipVariant {
	const k = status.toLowerCase() as SubscriptionLikeStatus;
	return k in SUB_MAP ? SUB_MAP[k] : 'info';
}

function titleCase(s: string): string {
	return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Compact status pill for plan, subscription, or invoice entities; wraps the shared {@link Chip}
 * with domain-appropriate colors.
 */
export function StatusChip({ kind, status, onClick, className }: StatusChipProps) {
	const normalized = status.toLowerCase();
	let variant: ChipVariant = 'default';
	if (kind === 'plan') variant = mapPlan(normalized);
	else if (kind === 'subscription') variant = mapSub(normalized);
	else if (kind === 'invoice') {
		/* invoice uses richer mapping in InvoiceStatusBadge; keep simple here */
		if (normalized === 'paid') variant = 'success';
		else if (normalized === 'void' || normalized === 'uncollectible') variant = 'failed';
		else if (normalized === 'draft') variant = 'default';
		else variant = 'warning';
	} else variant = 'info';

	const label: ReactNode = titleCase(status);

	return <Chip label={label} variant={variant} onClick={onClick} className={className} />;
}

export default StatusChip;
