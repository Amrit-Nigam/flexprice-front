import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import StatusChip from './StatusChip';

const meta = {
	title: 'Design System/Atoms/StatusChip',
	component: StatusChip,
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
	argTypes: {
		kind: {
			control: 'select',
			options: ['plan', 'subscription', 'invoice', 'custom'],
			description: 'Entity domain — drives the color mapping logic',
		},
		status: {
			control: 'select',
			options: ['active', 'archived', 'trialing', 'canceled', 'past_due', 'paused', 'paid', 'draft', 'void', 'pending', 'overdue'],
			description: 'Raw status string from the API',
		},
		onClick: { action: 'clicked' },
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
			<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Plan</p>
			<div className='flex flex-wrap gap-2'>
				<StatusChip kind='plan' status='active' />
				<StatusChip kind='plan' status='archived' />
			</div>
			<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Subscription</p>
			<div className='flex flex-wrap gap-2'>
				<StatusChip kind='subscription' status='active' />
				<StatusChip kind='subscription' status='trialing' />
				<StatusChip kind='subscription' status='canceled' />
				<StatusChip kind='subscription' status='past_due' />
				<StatusChip kind='subscription' status='paused' />
			</div>
			<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Invoice</p>
			<div className='flex flex-wrap gap-2'>
				<StatusChip kind='invoice' status='paid' />
				<StatusChip kind='invoice' status='draft' />
				<StatusChip kind='invoice' status='void' />
				<StatusChip kind='invoice' status='pending' />
				<StatusChip kind='invoice' status='overdue' />
			</div>
		</div>
	),
};

export const Clickable: Story = {
	args: {
		kind: 'subscription',
		status: 'active',
		onClick: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const chip = canvas.getByText(/active/i);
		await userEvent.click(chip);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
