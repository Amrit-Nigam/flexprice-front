import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
	title: 'Design System/Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'number' },
	},
	parameters: { layout: 'centered' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { size: 32 },
};

export const Variants: Story = {
	args: {},
	render: () => (
		<div className='flex items-center gap-6 text-[#092E44]'>
			<Spinner size={16} />
			<Spinner size={24} />
			<Spinner size={40} />
		</div>
	),
};
