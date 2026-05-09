import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import SortDropdown from './SortDropdown';
import { SortOption, SortDirection } from '@/types/common/QueryBuilder';

const meta: Meta<typeof SortDropdown> = {
	title: 'Design System/Molecules/SortDropdown',
	component: SortDropdown,
	tags: ['autodocs'],
	argTypes: {
		maxSorts: { control: 'number', description: 'Maximum number of concurrent sort conditions' },
		disabled: { control: 'boolean' },
		onChange: { action: 'changed' },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof SortDropdown>;

const options: SortOption[] = [
	{ field: 'name', label: 'Name' },
	{ field: 'created_at', label: 'Created At' },
	{ field: 'updated_at', label: 'Updated At' },
	{ field: 'status', label: 'Status' },
	{ field: 'priority', label: 'Priority' },
	{ field: 'est_hours', label: 'Est. Hours' },
	{ field: 'assigned_to', label: 'Assigned To' },
	{ field: 'due_date', label: 'Due Date' },
];

const DefaultStory = () => {
	const [sorts, setSorts] = useState<SortOption[]>([]);

	return (
		<div className='p-10'>
			<SortDropdown options={options} value={sorts} onChange={setSorts} />
		</div>
	);
};

const WithInitialSortsStory = () => {
	const [sorts, setSorts] = useState<SortOption[]>([
		{ field: 'created_at', label: 'Created At', direction: SortDirection.DESC },
		{ field: 'priority', label: 'Priority', direction: SortDirection.ASC },
	]);

	return (
		<div className='p-10'>
			<SortDropdown options={options} value={sorts} onChange={setSorts} />
		</div>
	);
};

export const Default: Story = {
	render: () => <DefaultStory />,
};

export const WithInitialSorts: Story = {
	render: () => <WithInitialSortsStory />,
};

export const Interactions: Story = {
	render: () => <DefaultStory />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const sortBtn = canvas.getByRole('button', { name: /sort/i });
		await userEvent.click(sortBtn);
		const addSort = await canvas.findByRole('button', { name: /add sort/i });
		await expect(addSort).toBeInTheDocument();
	},
};
