import type { Meta, StoryObj } from '@storybook/react';
import MeterProgress from './MeterProgress/MeterProgress';

const meta = {
	title: 'Design System/Molecules/MeterProgress',
	component: MeterProgress,
	tags: ['autodocs'],
	argTypes: {
		used: { control: 'number' },
		entitled: { control: 'number' },
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
			<MeterProgress label='Within limits' used={40} entitled={100} />
			<MeterProgress label='At cap' used={100} entitled={100} />
			<MeterProgress label='No entitlement configured' used={50} entitled={0} />
		</div>
	),
};
