import type { ChipVariant } from './invoiceStatus.types';

export type InvoiceStatus = 'paid' | 'draft' | 'void' | 'pending' | 'overdue';

export interface InvoiceStatusDisplay {
	/** Human-readable label */
	label: string;
	/** Maps to {@link Chip} / status chip visual variant */
	variant: ChipVariant;
}

const INVOICE_STATUS_MAP: Record<InvoiceStatus, InvoiceStatusDisplay> = {
	paid: { label: 'Paid', variant: 'success' },
	draft: { label: 'Draft', variant: 'default' },
	void: { label: 'Void', variant: 'failed' },
	pending: { label: 'Pending', variant: 'warning' },
	overdue: { label: 'Overdue', variant: 'failed' },
};

/**
 * Returns display metadata for a normalized invoice status string.
 */
export function getInvoiceStatusDisplay(status: string): InvoiceStatusDisplay {
	const key = status.toLowerCase() as InvoiceStatus;
	if (key in INVOICE_STATUS_MAP) {
		return INVOICE_STATUS_MAP[key];
	}
	return { label: status, variant: 'info' };
}
