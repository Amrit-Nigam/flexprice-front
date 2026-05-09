import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useFilterStore } from '@/hooks/useFilterStore';
import type { DataTableProps } from './DataTable/DataTable';
import { DataTable, type DataTableColumn } from './DataTable/DataTable';
import { MemoryRouter, useSearchParams } from 'react-router';
import { useMemo, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';

interface InvoiceRow {
	id: string;
	customer: string;
	amount: number;
	status: string;
}

const columns: Array<DataTableColumn<InvoiceRow>> = [
	{ id: 'customer', header: 'Customer', width: '2fr', sortable: true, cell: (r) => r.customer },
	{
		id: 'amount',
		header: 'Amount',
		width: '1fr',
		sortable: true,
		cell: (r) =>
			r.amount.toLocaleString(undefined, {
				style: 'currency',
				currency: 'USD',
			}),
	},
	{ id: 'status', header: 'Status', width: '1fr', cell: (r) => r.status },
];

function buildInvoices(count: number): InvoiceRow[] {
	return Array.from({ length: count }, (_, i) => {
		const id = i + 1;
		return {
			id: `inv_${id}`,
			customer: `Customer ${id.toString().padStart(4, '0')}`,
			amount: 25 + (i % 97),
			status: ['paid', 'draft', 'pending'][i % 3]!,
		};
	});
}

const MOCK_INVOICES = buildInvoices(48);
const BIG_SET = buildInvoices(10_000);

function InvoiceDataTable(props: DataTableProps<InvoiceRow>) {
	return <DataTable {...props} />;
}

const meta = {
	title: 'Design System/Molecules/DataTable',
	component: InvoiceDataTable,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
} satisfies Meta<typeof InvoiceDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

function sortRows(rows: InvoiceRow[], sort: { columnId: string; direction: 'asc' | 'desc' } | null) {
	if (!sort) return rows;
	const mul = sort.direction === 'asc' ? 1 : -1;
	return [...rows].sort((a, b) => {
		if (sort.columnId === 'customer') return a.customer.localeCompare(b.customer) * mul;
		if (sort.columnId === 'amount') return (a.amount - b.amount) * mul;
		return 0;
	});
}

function BasicTable() {
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>({ columnId: 'customer', direction: 'asc' });
	const sorted = useMemo(() => sortRows(MOCK_INVOICES, sort), [sort]);
	return (
		<DataTable<InvoiceRow>
			columns={columns}
			data={sorted}
			page={page}
			pageSize={8}
			onPageChange={setPage}
			sort={sort}
			onSortChange={setSort}
			getRowId={(r) => r.id}
		/>
	);
}

const noopPage = () => undefined;

const baseTableArgs = {
	columns,
	data: MOCK_INVOICES,
	page: 1,
	pageSize: 8,
	onPageChange: noopPage,
	getRowId: (r: InvoiceRow) => r.id,
} as const;

export const Default: Story = {
	args: {
		...baseTableArgs,
	},
	render: () => <BasicTable />,
};

export const Loading: Story = {
	args: {
		columns,
		data: [] as InvoiceRow[],
		isLoading: true,
		page: 1,
		pageSize: 8,
		onPageChange: noopPage,
		getRowId: (r: InvoiceRow) => r.id,
	},
	render: () => (
		<DataTable<InvoiceRow>
			columns={columns}
			data={[]}
			isLoading
			page={1}
			pageSize={8}
			onPageChange={() => undefined}
			getRowId={(r) => r.id}
		/>
	),
};

export const Empty: Story = {
	args: {
		columns,
		data: [] as InvoiceRow[],
		emptyTitle: 'No invoices yet',
		emptyDescription: 'Connect usage or create a manual invoice to populate this list.',
		page: 1,
		pageSize: 8,
		onPageChange: noopPage,
		getRowId: (r: InvoiceRow) => r.id,
	},
	render: () => (
		<DataTable<InvoiceRow>
			columns={columns}
			data={[]}
			emptyTitle='No invoices yet'
			emptyDescription='Connect usage or create a manual invoice to populate this list.'
			page={1}
			pageSize={8}
			onPageChange={() => undefined}
			getRowId={(r) => r.id}
		/>
	),
};

export const VirtualizedTenThousandRows: Story = {
	args: {
		columns,
		data: BIG_SET,
		virtualized: true,
		estimatedRowHeight: 44,
		getRowId: (r: InvoiceRow) => r.id,
	},
	render: () => (
		<div className='space-y-2'>
			<p className='text-xs text-muted-foreground'>Scroll the grid — only visible rows are mounted (overscan 8, row height 44px).</p>
			<DataTable<InvoiceRow> columns={columns} data={BIG_SET} virtualized estimatedRowHeight={44} getRowId={(r) => r.id} />
		</div>
	),
};

function TableWithFiltersInner() {
	const { filters, setFilter, resetFilters, fingerprint } = useFilterStore('story-invoices');
	const [sort, setSort] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(null);
	const q = String(filters.q ?? '');
	const filtered = useMemo(() => MOCK_INVOICES.filter((r) => r.customer.toLowerCase().includes(q.toLowerCase())), [q]);
	const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);
	const [searchParams] = useSearchParams();

	return (
		<div className='space-y-4'>
			<div className='flex flex-wrap items-end gap-4'>
				<div className='min-w-[240px] flex-1'>
					<SearchBar placeholder='Filter customers…' onSearch={(query) => setFilter('q', query)} initialValue={q} />
				</div>
				<button type='button' className='rounded-md border px-3 py-2 text-sm' onClick={() => resetFilters()}>
					Reset filters
				</button>
			</div>
			<p className='text-xs text-muted-foreground'>
				Store fingerprint: <code className='rounded bg-muted px-1'>{fingerprint}</code> · URL{' '}
				<code className='rounded bg-muted px-1'>fp={searchParams.get('fp')}</code>
			</p>
			<DataTable<InvoiceRow>
				columns={columns}
				data={sorted}
				page={1}
				pageSize={50}
				onPageChange={() => undefined}
				sort={sort}
				onSortChange={setSort}
				getRowId={(r) => r.id}
			/>
		</div>
	);
}

export const WithFilterPersistence: Story = {
	args: {
		columns,
		data: MOCK_INVOICES,
		page: 1,
		pageSize: 50,
		onPageChange: noopPage,
		getRowId: (r: InvoiceRow) => r.id,
	},
	render: () => (
		<MemoryRouter initialEntries={['/story']}>
			<TableWithFiltersInner />
		</MemoryRouter>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText(/filter customers/i);
		await userEvent.type(input, '0007');
		await expect(input).toHaveValue('0007');
	},
};
