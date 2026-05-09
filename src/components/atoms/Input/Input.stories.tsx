import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState, type ComponentProps } from 'react';
import Input from './Input';
import { DollarSign } from 'lucide-react';

const meta = {
	title: 'Design System/Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'number', 'formatted-number', 'integer'],
		},
		disabled: { control: 'boolean' },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function StatefulInput(props: ComponentProps<typeof Input>) {
	const [v, setV] = useState(props.value?.toString() ?? '');
	return <Input {...props} value={v} onChange={setV} />;
}

export const Default: Story = {
	render: (args) => <StatefulInput {...args} placeholder='Type here' />,
	args: {
		label: 'Name',
		placeholder: 'Acme Corp',
	},
};

export const NumberField: Story = {
	render: (args) => <StatefulInput {...args} variant='number' />,
	args: {
		label: 'Seats',
		placeholder: '10',
		variant: 'number',
	},
};

export const WithError: Story = {
	render: (args) => <StatefulInput {...args} />,
	args: {
		label: 'Amount',
		error: 'Must be greater than zero',
		variant: 'number',
		placeholder: '0',
	},
};

export const CurrencyPrefix: Story = {
	render: (args) => (
		<StatefulInput
			{...args}
			variant='formatted-number'
			inputPrefix={
				<span className='text-muted-foreground' aria-hidden>
					<DollarSign className='size-4' />
				</span>
			}
		/>
	),
	args: {
		label: 'Unit price',
		placeholder: '0.00',
	},
};

function InputInteractionsStory() {
	const [v, setV] = useState('');
	return <Input id='story-input' label='Search' value={v} onChange={setV} placeholder='customer@example.com' />;
}

export const Interactions: Story = {
	render: () => <InputInteractionsStory />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const field = canvas.getByPlaceholderText('customer@example.com');
		await userEvent.type(field, 'hello@flexprice.io');
		await expect(field).toHaveValue('hello@flexprice.io');
	},
};
