import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

const meta = {
	title: 'Design System/Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text', description: 'Metric label displayed above the value' },
		value: { control: 'number', description: 'Numeric value to display' },
		currency: {
			control: 'select',
			options: [undefined, 'USD', 'EUR', 'GBP', 'INR'],
			description: 'ISO 4217 currency code — when set, prefixes the value with the currency symbol',
		},
		isPercent: { control: 'boolean', description: 'Appends a % sign to the value' },
		showChangeIndicator: { control: 'boolean', description: 'Shows a trending up/down arrow' },
		isNegative: { control: 'boolean', description: 'Renders arrow in red (down) when true' },
	},
	parameters: { layout: 'padded' },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'MRR',
		value: 128_400,
		currency: 'USD',
		showChangeIndicator: true,
		isNegative: false,
	},
};

export const Variants: Story = {
	args: {
		title: 'Sample',
		value: 1,
	},
	render: () => (
		<div className='grid gap-4 md:grid-cols-3'>
			<MetricCard title='Active subscriptions' value={1840} showChangeIndicator />
			<MetricCard title='Gross margin' value={42.5} isPercent showChangeIndicator />
			<MetricCard title='Churn (rolling)' value={3.1} isPercent showChangeIndicator isNegative />
		</div>
	),
};

export const CurrencyFormats: Story = {
	args: {
		title: 'Revenue',
		value: 49_999,
	},
	render: () => (
		<div className='grid gap-4 md:grid-cols-3'>
			<MetricCard title='USD' value={49_999} currency='USD' showChangeIndicator />
			<MetricCard title='EUR' value={49_999} currency='EUR' showChangeIndicator />
			<MetricCard title='INR' value={4_999_000} currency='INR' showChangeIndicator />
		</div>
	),
};
