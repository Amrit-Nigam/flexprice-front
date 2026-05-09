import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Button } from '@/components/ui/button';
import Tooltip from './Tooltip';

const meta = {
	title: 'Design System/Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		delayDuration: { control: 'number', description: 'Milliseconds before the tooltip appears' },
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
			description: 'Side of the trigger to show the tooltip',
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
			description: 'Alignment of the tooltip relative to the trigger',
		},
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
			<Tooltip content='Appears on top' side='top' delayDuration={0}>
				<Button size='sm' variant='secondary'>
					Top / instant
				</Button>
			</Tooltip>
			<Tooltip content='Delayed hint' side='bottom' delayDuration={800}>
				<Button size='sm' variant='ghost'>
					Bottom / slow
				</Button>
			</Tooltip>
			<Tooltip content='Left side' side='left' delayDuration={0}>
				<Button size='sm' variant='outline'>
					Left
				</Button>
			</Tooltip>
			<Tooltip content='Right side' side='right' delayDuration={0}>
				<Button size='sm' variant='outline'>
					Right
				</Button>
			</Tooltip>
		</div>
	),
};

export const Interactions: Story = {
	args: {
		content: 'Tooltip is visible',
		children: 'noop',
		delayDuration: 0,
	},
	render: () => (
		<Tooltip content='Tooltip is visible' delayDuration={0} side='top'>
			<Button variant='outline'>Focus / hover target</Button>
		</Tooltip>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('button', { name: /focus \/ hover target/i });
		await userEvent.tab();
		trigger.focus();
		await expect(trigger).toHaveFocus();
	},
};
