import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState, type ComponentProps } from 'react';
import DateRangePicker from './DateRangePicker';

const meta = {
	title: 'Design System/Atoms/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	argTypes: {
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
		title: { control: 'text' },
	},
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function DateRangePickerDefaultStory(args: ComponentProps<typeof DateRangePicker>) {
	const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});
	return (
		<DateRangePicker
			{...args}
			startDate={range.startDate}
			endDate={range.endDate}
			onChange={(next) => {
				setRange(next);
				args.onChange(next);
			}}
		/>
	);
}

export const Default: Story = {
	render: (args) => <DateRangePickerDefaultStory {...args} />,
	args: {
		title: 'Billing period',
		placeholder: 'Last 30 days',
		onChange: fn(),
	},
};

function DateRangePickerVariantsStory() {
	const [a, setA] = useState<{ startDate?: Date; endDate?: Date }>({});
	const preset: { startDate?: Date; endDate?: Date } = { startDate: new Date(2026, 0, 1), endDate: new Date(2026, 0, 31) };
	const [b, setB] = useState(preset);
	return (
		<div className='flex flex-col gap-10'>
			<DateRangePicker title='Empty' placeholder='Pick a window' startDate={a.startDate} endDate={a.endDate} onChange={setA} />
			<DateRangePicker title='Prefilled' placeholder='Locked' startDate={b.startDate} endDate={b.endDate} onChange={setB} disabled />
		</div>
	);
}

export const Variants: Story = {
	args: {
		onChange: fn(),
	},
	render: () => <DateRangePickerVariantsStory />,
};
