import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

const meta = {
	title: 'Design System/Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		value: { control: 'number' },
		currency: { control: 'text' },
		isPercent: { control: 'boolean' },
		showChangeIndicator: { control: 'boolean' },
		isNegative: { control: 'boolean' },
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
