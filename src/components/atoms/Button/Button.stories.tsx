import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { fn } from '@storybook/test';
import Button from './Button';

const meta = {
	title: 'Design System/Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Save changes',
		onClick: fn(),
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'secondary', 'ghost', 'destructive', 'outline', 'black', 'link'],
			description: 'Maps to product language: default ≈ primary, destructive ≈ danger',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg', 'icon'],
			description: 'Storybook maps assignment sizes: sm → sm, md → default, lg → lg',
		},
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'default',
		size: 'default',
	},
};

export const Variants: Story = {
	args: {},
	render: () => (
		<div className='flex flex-wrap items-center gap-3'>
			<Button variant='default'>Primary</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='destructive'>Danger</Button>
		</div>
	),
};

export const Sizes: Story = {
	args: {},
	render: () => (
		<div className='flex flex-wrap items-center gap-3'>
			<Button size='sm'>Small</Button>
			<Button size='default'>Medium</Button>
			<Button size='lg'>Large</Button>
		</div>
	),
};

export const LoadingAndDisabled: Story = {
	args: {},
	render: () => (
		<div className='flex flex-col gap-3'>
			<Button isLoading>Loading</Button>
			<Button disabled>Disabled</Button>
		</div>
	),
};

export const Interactions: Story = {
	args: {
		children: 'Click me',
		onClick: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const btn = canvas.getByRole('button', { name: /click me/i });
		await userEvent.click(btn);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
