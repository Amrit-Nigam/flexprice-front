import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface SearchBarProps {
	placeholder?: string;
	/** Debounced callback in ms */
	debounceMs?: number;
	onSearch?: (query: string) => void;
	className?: string;
	disabled?: boolean;
	initialValue?: string;
}

/**
 * Debounced search field with clear affordance; use for filtering large entity lists.
 */
export function SearchBar({ placeholder = 'Search…', debounceMs = 300, onSearch, className, disabled, initialValue = '' }: SearchBarProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (!onSearch) return;
		const id = window.setTimeout(() => onSearch(value), debounceMs);
		return () => window.clearTimeout(id);
	}, [value, debounceMs, onSearch]);

	return (
		<div className={cn('flex items-center gap-2 rounded-md border border-input bg-background px-2', className)}>
			<Search className='size-4 shrink-0 text-muted-foreground' aria-hidden />
			<Input
				type='search'
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				onChange={(e) => setValue(e.target.value)}
				className='border-0 shadow-none focus-visible:ring-0'
			/>
			{value ? (
				<Button
					type='button'
					variant='ghost'
					size='icon'
					className='size-8 shrink-0'
					onClick={() => setValue('')}
					aria-label='Clear search'>
					<X className='size-4' />
				</Button>
			) : null}
		</div>
	);
}

export default SearchBar;
