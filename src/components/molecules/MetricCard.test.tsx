import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MetricCard from './MetricCard';

describe('MetricCard', () => {
	it('renders the title and value', () => {
		render(<MetricCard title='MRR' value={128_400} currency='USD' />);
		expect(screen.getByText('MRR')).toBeInTheDocument();
		expect(screen.getByText(/128,400/)).toBeInTheDocument();
	});

	it('shows percentage suffix when isPercent is true', () => {
		render(<MetricCard title='Churn' value={3.1} isPercent />);
		expect(screen.getByText(/3\.10%/)).toBeInTheDocument();
	});

	it('renders trend indicator when showChangeIndicator is true', () => {
		const { container } = render(<MetricCard title='ARR' value={500_000} showChangeIndicator />);
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	it('does not render trend indicator when showChangeIndicator is false', () => {
		const { container } = render(<MetricCard title='ARR' value={500_000} showChangeIndicator={false} />);
		const svg = container.querySelector('svg');
		expect(svg).toBeNull();
	});
});
