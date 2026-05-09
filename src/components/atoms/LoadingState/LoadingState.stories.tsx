import type { Meta, StoryObj } from '@storybook/react';
import LoadingState from './LoadingState';

const meta = {
	title: 'Design System/Atoms/LoadingState',
	component: LoadingState,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		spinnerSize: { control: 'number' },
	},
	parameters: { layout: 'centered' },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Fetching invoices…',
	},
};

export const Variants: Story = {
	args: {},
	render: () => (
		<div className='w-full max-w-md space-y-6 border p-6'>
			<LoadingState label='Loading dashboard…' />
			<LoadingState label='Compact' spinnerSize={20} />
		</div>
	),
};
