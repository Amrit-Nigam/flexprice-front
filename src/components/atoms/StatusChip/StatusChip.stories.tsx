import type { Meta, StoryObj } from '@storybook/react';
import StatusChip from './StatusChip';

const meta = {
	title: 'Design System/Atoms/StatusChip',
	component: StatusChip,
	tags: ['autodocs'],
	argTypes: {
		kind: { control: 'select', options: ['plan', 'subscription', 'invoice', 'custom'] },
		status: { control: 'text' },
	},
	parameters: { layout: 'centered' },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		kind: 'plan',
		status: 'active',
	},
};

export const Variants: Story = {
	args: {
		kind: 'plan',
		status: 'active',
	},
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-wrap gap-2'>
				<StatusChip kind='plan' status='active' />
				<StatusChip kind='plan' status='archived' />
			</div>
			<div className='flex flex-wrap gap-2'>
				<StatusChip kind='subscription' status='active' />
				<StatusChip kind='subscription' status='trialing' />
				<StatusChip kind='subscription' status='canceled' />
				<StatusChip kind='subscription' status='past_due' />
			</div>
			<div className='flex flex-wrap gap-2'>
				<StatusChip kind='invoice' status='paid' />
				<StatusChip kind='invoice' status='draft' />
				<StatusChip kind='invoice' status='void' />
			</div>
		</div>
	),
};
