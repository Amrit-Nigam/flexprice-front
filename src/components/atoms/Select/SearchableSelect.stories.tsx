import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { useState, type ComponentProps } from 'react';
import SearchableSelect, { type SelectOption } from './SearchableSelect';

const options: SelectOption[] = [
	{ value: 'starter', label: 'Starter', description: 'Up to 1M events / mo' },
	{ value: 'growth', label: 'Growth', description: 'Up to 10M events / mo' },
	{ value: 'enterprise', label: 'Enterprise', description: 'Custom metering' },
];

const meta = {
	title: 'Design System/Atoms/SearchableSelect',
	component: SearchableSelect,
	tags: ['autodocs'],
	args: {
		options,
	},
	parameters: { layout: 'padded' },
	argTypes: {
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
} satisfies Meta<typeof SearchableSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchableSelectDefaultStory(args: ComponentProps<typeof SearchableSelect>) {
	const [value, setValue] = useState<string | undefined>();
	return <SearchableSelect {...args} options={options} value={value} onChange={setValue} label='Plan' />;
}

export const Default: Story = {
	render: (args) => <SearchableSelectDefaultStory {...args} />,
	args: {
		placeholder: 'Choose a plan',
	},
};

function SearchableSelectVariantsStory() {
	const [v1, setV1] = useState<string | undefined>('growth');
	const [v2, setV2] = useState<string | undefined>();
	return (
		<div className='flex max-w-md flex-col gap-8'>
			<SearchableSelect options={options} value={v1} onChange={setV1} label='With selection' />
			<SearchableSelect options={options} value={v2} onChange={setV2} label='With error' error='Required' />
			<SearchableSelect options={options} value={v2} onChange={setV2} label='Disabled' disabled placeholder='Locked' />
		</div>
	);
}

export const Variants: Story = {
	args: {
		options,
	},
	render: () => <SearchableSelectVariantsStory />,
};

function SearchableSelectSearchInteractionStory() {
	const [value, setValue] = useState<string | undefined>();
	return <SearchableSelect options={options} value={value} onChange={setValue} label='Plan' defaultOpen />;
}

export const SearchInteraction: Story = {
	args: {
		options,
		label: 'Plan',
	},
	render: () => <SearchableSelectSearchInteractionStory />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const search = canvas.getByPlaceholderText(/search options/i);
		await userEvent.type(search, 'growth');
		const option = await canvas.findByText('Growth');
		await userEvent.click(option);
	},
};
