import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge/InvoiceStatusBadge';

const meta = {
	title: 'Design System/Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	argTypes: {
		status: { control: 'text' },
	},
	parameters: { layout: 'centered' },
} satisfies Meta<typeof InvoiceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { status: 'paid' },
};

export const Variants: Story = {
	args: {
		status: 'paid',
	},
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<InvoiceStatusBadge status='paid' />
			<InvoiceStatusBadge status='draft' />
			<InvoiceStatusBadge status='void' />
			<InvoiceStatusBadge status='pending' />
			<InvoiceStatusBadge status='overdue' />
			<InvoiceStatusBadge status='custom_status' />
		</div>
	),
};
