import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InvoiceStatusBadge from './InvoiceStatusBadge/InvoiceStatusBadge';

const meta = {
	title: 'Design System/Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
	argTypes: {
		status: {
			control: 'select',
			options: ['paid', 'draft', 'void', 'pending', 'overdue', 'unknown_status'],
			description: 'Raw invoice status from the API; unmapped values fall back to an info chip',
		},
		onClick: { action: 'clicked' },
	},
	parameters: { layout: 'centered' },
} satisfies Meta<typeof InvoiceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { status: 'paid' },
};

export const Variants: Story = {
	args: { status: 'paid' },
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<InvoiceStatusBadge status='paid' />
			<InvoiceStatusBadge status='draft' />
			<InvoiceStatusBadge status='void' />
			<InvoiceStatusBadge status='pending' />
			<InvoiceStatusBadge status='overdue' />
			<InvoiceStatusBadge status='unknown_status' />
		</div>
	),
};
