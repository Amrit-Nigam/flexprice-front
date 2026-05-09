import type { Meta, StoryObj } from '@storybook/react';
import MeterProgress from './MeterProgress/MeterProgress';

const meta = {
	title: 'Design System/Molecules/MeterProgress',
	component: MeterProgress,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text', description: 'Short title displayed above the progress bar' },
		used: { control: 'number', description: 'Consumed units in the current billing period' },
		entitled: { control: 'number', description: 'Entitlement cap (0 means uncapped / not configured)' },
		className: { control: 'text' },
	},
	parameters: { layout: 'padded' },
} satisfies Meta<typeof MeterProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'API calls this period',
		used: 720_000,
		entitled: 1_000_000,
	},
};

export const Variants: Story = {
	args: {
		label: 'API calls',
		used: 40,
		entitled: 100,
	},
	render: () => (
		<div className='max-w-lg space-y-6'>
			<MeterProgress label='Within limits (72%)' used={720_000} entitled={1_000_000} />
			<MeterProgress label='At cap (100%)' used={100} entitled={100} />
			<MeterProgress label='No entitlement configured' used={50} entitled={0} />
		</div>
	),
};

export const OverCapacity: Story = {
	args: {
		label: 'Storage used',
		used: 1_200,
		entitled: 1_000,
	},
	render: () => (
		<div className='max-w-lg space-y-2'>
			<p className='text-xs text-muted-foreground'>Usage exceeds entitlement — bar clamps at 100%.</p>
			<MeterProgress label='Storage used (overage)' used={1_200} entitled={1_000} />
		</div>
	),
};
