import { describe, expect, it } from 'vitest';
import { getInvoiceStatusDisplay } from './invoiceStatus';

describe('getInvoiceStatusDisplay', () => {
	it('maps known invoice statuses', () => {
		expect(getInvoiceStatusDisplay('paid')).toEqual({ label: 'Paid', variant: 'success' });
		expect(getInvoiceStatusDisplay('DRAFT')).toEqual({ label: 'Draft', variant: 'default' });
	});

	it('falls back for unknown status', () => {
		expect(getInvoiceStatusDisplay('awaiting_approval')).toEqual({
			label: 'awaiting_approval',
			variant: 'info',
		});
	});
});
