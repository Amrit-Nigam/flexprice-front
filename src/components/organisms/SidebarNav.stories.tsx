import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { BarChart3, CreditCard, LayoutGrid, Users } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import SidebarNav from './SidebarNav/SidebarNav';

const meta = {
	title: 'Design System/Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
	{ id: 'dash', label: 'Dashboard', icon: LayoutGrid },
	{ id: 'plans', label: 'Plans', icon: BarChart3 },
	{ id: 'customers', label: 'Customers', icon: Users },
	{ id: 'invoices', label: 'Invoices', icon: CreditCard },
];

function SidebarNavDefaultStory(args: ComponentProps<typeof SidebarNav>) {
	const [active, setActive] = useState(args.activeId);
	return (
		<div className='flex h-[420px] border bg-background'>
			<SidebarNav items={args.items} activeId={active} onNavigate={setActive} className={args.className} />
			<main className='flex-1 p-6 text-sm text-muted-foreground'>Active route: {active}</main>
		</div>
	);
}

export const Default: Story = {
	args: {
		items,
		activeId: 'dash',
	},
	render: (args) => <SidebarNavDefaultStory {...args} />,
};

function SidebarNavInteractionsStory() {
	const [active, setActive] = useState('dash');
	return (
		<div className='flex h-[420px] border bg-background'>
			<SidebarNav items={items} activeId={active} onNavigate={setActive} />
			<main className='flex-1 p-6'>Content for {active}</main>
		</div>
	);
}

export const Interactions: Story = {
	args: {
		items,
		activeId: 'dash',
	},
	render: () => <SidebarNavInteractionsStory />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /customers/i }));
		await expect(canvas.getByText(/content for customers/i)).toBeInTheDocument();
	},
};
