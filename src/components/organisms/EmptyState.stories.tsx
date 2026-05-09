import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { expect, userEvent, within } from '@storybook/test';
import EmptyState from './EmptyState/EmptyState';

const meta = {
	title: 'Design System/Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	args: {
		onAction: fn(),
	},
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		actionLabel: { control: 'text' },
	},
	parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'No subscriptions yet',
		description: 'Create a plan and enroll a customer to see active subscriptions in this workspace.',
		actionLabel: 'New subscription',
		onAction: fn(),
	},
};

export const Variants: Story = {
	args: {
		title: 'Placeholder',
		onAction: fn(),
	},
	render: () => (
		<div className='space-y-6'>
			<EmptyState title='No data' description='Filters returned zero rows — broaden the date range or reset filters.' />
			<EmptyState
				title='With CTA'
				description='Provision a wallet to start issuing credits.'
				actionLabel='Add wallet'
				onAction={() => undefined}
			/>
		</div>
	),
};

export const CtaInteraction: Story = {
	args: {
		title: 'Ready when you are',
		description: 'Click below to fire the Storybook action handler.',
		actionLabel: 'Continue',
		onAction: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /continue/i }));
		await expect(args.onAction).toHaveBeenCalled();
	},
};
