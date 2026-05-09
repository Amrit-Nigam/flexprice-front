import { describe, expect, it } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
	it('formats USD with two decimals', () => {
		expect(formatCurrency(1234.5)).toBe('$1,234.50');
	});

	it('respects locale and currency code', () => {
		expect(formatCurrency(99, 'EUR', 'de-DE')).toMatch(/99,00/);
	});
});
