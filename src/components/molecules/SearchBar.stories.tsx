import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState, type ComponentProps } from 'react';
import SearchBar from './SearchBar/SearchBar';

const meta = {
	title: 'Design System/Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	args: {
		debounceMs: 300,
	},
	argTypes: {
		debounceMs: { control: 'number' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
	},
	parameters: { layout: 'padded' },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchBarDefaultStory(args: ComponentProps<typeof SearchBar>) {
	const [q, setQ] = useState('');
	return (
		<div className='max-w-md space-y-2'>
			<SearchBar {...args} onSearch={(query) => setQ(query)} />
			<p className='text-xs text-muted-foreground'>Last query: {q || '—'}</p>
		</div>
	);
}

export const Default: Story = {
	render: (args) => <SearchBarDefaultStory {...args} />,
};

export const Variants: Story = {
	args: {
		placeholder: 'Search',
		onSearch: () => undefined,
	},
	render: () => (
		<div className='max-w-md space-y-4'>
			<SearchBar placeholder='Search customers…' onSearch={() => undefined} />
			<SearchBar placeholder='Disabled' disabled onSearch={() => undefined} />
		</div>
	),
};

function SearchBarDebouncedStory() {
	const [, setLast] = useState('');
	return <SearchBar placeholder='Type to filter…' onSearch={setLast} debounceMs={200} initialValue='acme' />;
}

export const DebouncedSearch: Story = {
	args: {
		placeholder: 'Type to filter…',
		onSearch: () => undefined,
		debounceMs: 200,
		initialValue: 'acme',
	},
	render: () => <SearchBarDebouncedStory />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const field = canvas.getByPlaceholderText('Type to filter…');
		await userEvent.clear(field);
		await userEvent.type(field, 'flex');
		await expect(field).toHaveValue('flex');
		const clear = canvas.getByRole('button', { name: /clear search/i });
		await userEvent.click(clear);
		await expect(field).toHaveValue('');
	},
};
