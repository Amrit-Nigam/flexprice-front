import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import Tooltip from './Tooltip';

const meta = {
	title: 'Design System/Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		delayDuration: { control: 'number', description: 'Milliseconds before open' },
		side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
	},
	parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		content: 'Metered usage rolls up to the parent subscription.',
		children: 'noop',
		delayDuration: 200,
		side: 'top' as const,
	},
	render: () => (
		<Tooltip content='Metered usage rolls up to the parent subscription.' delayDuration={200} side='top'>
			<Button variant='outline'>Hover me</Button>
		</Tooltip>
	),
};

export const Variants: Story = {
	args: {
		content: 'Hint',
		children: 'noop',
	},
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Tooltip content='Top' side='top' delayDuration={0}>
				<Button size='sm' variant='secondary'>
					Top / instant
				</Button>
			</Tooltip>
			<Tooltip content='Delayed hint' side='bottom' delayDuration={800}>
				<Button size='sm' variant='ghost'>
					Slow delay
				</Button>
			</Tooltip>
		</div>
	),
};
