import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InvoiceStatusBadge } from './InvoiceStatusBadge/InvoiceStatusBadge';

describe('InvoiceStatusBadge', () => {
	it('renders paid state', () => {
		render(<InvoiceStatusBadge status='paid' />);
		expect(screen.getByText('Paid')).toBeInTheDocument();
	});

	it('renders draft state', () => {
		render(<InvoiceStatusBadge status='draft' />);
		expect(screen.getByText('Draft')).toBeInTheDocument();
	});
});
