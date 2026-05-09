import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useCallback, useMemo, useRef, type CSSProperties, type ReactNode } from 'react';
import LoadingState from '@/components/atoms/LoadingState/LoadingState';
import { Button } from '@/components/ui/button';

export type SortDirection = 'asc' | 'desc';

export interface DataTableColumn<Row> {
	id: string;
	header: string;
	width?: string;
	sortable?: boolean;
	cell: (row: Row, rowIndex: number) => ReactNode;
}

export interface DataTableProps<Row> {
	columns: Array<DataTableColumn<Row>>;
	data: Row[];
	isLoading?: boolean;
	emptyTitle?: string;
	emptyDescription?: string;
	page?: number;
	pageSize?: number;
	onPageChange?: (page: number) => void;
	sort?: { columnId: string; direction: SortDirection } | null;
	onSortChange?: (next: { columnId: string; direction: SortDirection } | null) => void;
	getRowId?: (row: Row, index: number) => string;
	/** When true, only visible rows (plus overscan) are mounted — use for very large lists */
	virtualized?: boolean;
	/** Fixed row height in px when `virtualized` (required for smooth scroll) */
	estimatedRowHeight?: number;
	overscan?: number;
	className?: string;
}

function SortAffordance({ active, direction }: { active: boolean; direction: SortDirection }) {
	if (!active) return <span className='inline-flex w-4 justify-center text-muted-foreground opacity-40'>↕</span>;
	return direction === 'asc' ? <ArrowUp className='size-4' /> : <ArrowDown className='size-4' />;
}

/**
 * Presentation table with optional client sort, pagination, loading / empty states, and row virtualization.
 */
export function DataTable<Row>({
	columns,
	data,
	isLoading,
	emptyTitle = 'No rows',
	emptyDescription = 'Try adjusting filters or create a new record.',
	page = 1,
	pageSize = 10,
	onPageChange,
	sort,
	onSortChange,
	getRowId = (_row, i) => String(i),
	virtualized = false,
	estimatedRowHeight = 44,
	overscan = 8,
	className,
}: DataTableProps<Row>) {
	const parentRef = useRef<HTMLDivElement>(null);

	const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
	const safePage = Math.min(page, totalPages);
	const pagedRows = useMemo(() => {
		if (virtualized) return data;
		const start = (safePage - 1) * pageSize;
		return data.slice(start, start + pageSize);
	}, [data, pageSize, safePage, virtualized]);

	const rowVirtualizer = useVirtualizer({
		count: virtualized ? data.length : pagedRows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => estimatedRowHeight,
		overscan,
	});

	const toggleSort = useCallback(
		(columnId: string, sortable?: boolean) => {
			if (!sortable || !onSortChange) return;
			if (!sort || sort.columnId !== columnId) {
				onSortChange({ columnId, direction: 'asc' });
				return;
			}
			if (sort.direction === 'asc') {
				onSortChange({ columnId, direction: 'desc' });
				return;
			}
			onSortChange(null);
		},
		[onSortChange, sort],
	);

	if (isLoading) {
		return <LoadingState label='Loading rows…' />;
	}

	if (data.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center' role='status'>
				<p className='text-base font-medium text-foreground'>{emptyTitle}</p>
				<p className='mt-1 max-w-sm text-sm text-muted-foreground'>{emptyDescription}</p>
			</div>
		);
	}

	const renderRow = (row: Row, rowIndex: number, virtualStyle?: CSSProperties) => (
		<div
			key={getRowId(row, rowIndex)}
			className={cn('grid border-b border-border/80 bg-background text-sm', virtualized && 'absolute left-0 top-0 w-full')}
			style={{
				gridTemplateColumns: columns.map((c) => c.width ?? '1fr').join(' '),
				...virtualStyle,
			}}
			role='row'>
			{columns.map((col) => (
				<div key={col.id} className='flex items-center px-3 py-2' role='cell'>
					{col.cell(row, rowIndex)}
				</div>
			))}
		</div>
	);

	return (
		<div className={cn('space-y-4', className)}>
			<div className={cn('overflow-auto rounded-md border', virtualized && 'max-h-[480px]')} ref={virtualized ? parentRef : undefined}>
				<div className='min-w-[640px]'>
					<div
						className='sticky top-0 z-10 grid border-b bg-muted/50 text-left text-xs font-medium uppercase text-muted-foreground'
						style={{ gridTemplateColumns: columns.map((c) => c.width ?? '1fr').join(' ') }}
						role='row'>
						{columns.map((col) => (
							<button
								key={col.id}
								type='button'
								className={cn(
									'flex items-center gap-1 px-3 py-2 text-left',
									col.sortable && 'cursor-pointer select-none hover:text-foreground',
								)}
								onClick={() => toggleSort(col.id, col.sortable)}
								disabled={!col.sortable}>
								<span>{col.header}</span>
								{col.sortable && <SortAffordance active={sort?.columnId === col.id} direction={sort?.direction ?? 'asc'} />}
							</button>
						))}
					</div>

					{virtualized ? (
						<div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
							{rowVirtualizer.getVirtualItems().map((vRow) => {
								const row = data[vRow.index];
								if (!row) return null;
								return renderRow(row, vRow.index, {
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: `${vRow.size}px`,
									transform: `translateY(${vRow.start}px)`,
								});
							})}
						</div>
					) : (
						<div>{pagedRows.map((row, i) => renderRow(row, (safePage - 1) * pageSize + i))}</div>
					)}
				</div>
			</div>

			{!virtualized && onPageChange ? (
				<div className='flex items-center justify-between text-sm text-muted-foreground'>
					<span>
						Page {safePage} of {totalPages}
					</span>
					<div className='flex gap-2'>
						<Button type='button' size='sm' variant='outline' disabled={safePage <= 1} onClick={() => onPageChange(safePage - 1)}>
							Previous
						</Button>
						<Button type='button' size='sm' variant='outline' disabled={safePage >= totalPages} onClick={() => onPageChange(safePage + 1)}>
							Next
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default DataTable;
