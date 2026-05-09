import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { BarChart3, CreditCard, FileText, LayoutGrid, Settings, Users } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import SidebarNav from './SidebarNav/SidebarNav';

const meta = {
	title: 'Design System/Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
	argTypes: {
		activeId: {
			control: 'select',
			options: ['dash', 'plans', 'customers', 'invoices', 'reports', 'settings'],
			description: 'ID of the currently active nav item',
		},
		onNavigate: { action: 'navigated' },
	},
	parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
	{ id: 'dash', label: 'Dashboard', icon: LayoutGrid },
	{ id: 'plans', label: 'Plans', icon: BarChart3 },
	{ id: 'customers', label: 'Customers', icon: Users },
	{ id: 'invoices', label: 'Invoices', icon: CreditCard },
	{ id: 'reports', label: 'Reports', icon: FileText },
	{ id: 'settings', label: 'Settings', icon: Settings },
];

function SidebarNavDefaultStory(args: ComponentProps<typeof SidebarNav>) {
	const [active, setActive] = useState(args.activeId);
	return (
		<div className='flex h-[480px] border bg-background'>
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

function SidebarNavCollapsedStory() {
	const [active, setActive] = useState('dash');
	const [collapsed, setCollapsed] = useState(false);
	return (
		<div className='flex h-[480px] border bg-background'>
			<SidebarNav items={items} activeId={active} onNavigate={setActive} />
			<main className='flex flex-col flex-1 gap-4 p-6'>
				<p className='text-sm text-muted-foreground'>Use the chevron button inside the sidebar to toggle collapse.</p>
				<button type='button' className='self-start rounded-md border px-3 py-1.5 text-xs' onClick={() => setCollapsed((c) => !c)}>
					{collapsed ? 'Show labels' : 'Hide labels (icon-only)'}
				</button>
			</main>
		</div>
	);
}

export const Collapsed: Story = {
	args: {
		items,
		activeId: 'plans',
	},
	render: () => <SidebarNavCollapsedStory />,
};

function SidebarNavInteractionsStory() {
	const [active, setActive] = useState('dash');
	return (
		<div className='flex h-[480px] border bg-background'>
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
		await userEvent.click(canvas.getByRole('button', { name: /collapse sidebar/i }));
		await expect(canvas.queryByText('Customers')).toBeNull();
		await userEvent.click(canvas.getByRole('button', { name: /expand sidebar/i }));
		await expect(canvas.getByText('Customers')).toBeInTheDocument();
	},
};
