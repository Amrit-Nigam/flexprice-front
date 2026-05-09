import Button from '@/components/atoms/Button/Button';
import { cn } from '@/lib/utils';
import { FileQuestion } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
	icon?: LucideIcon;
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	className?: string;
}

/**
 * Full-width empty state for list pages: icon, headline, supporting copy, and optional primary action.
 */
export function EmptyState({
	icon: Icon = FileQuestion,
	title,
	description,
	actionLabel = 'Create',
	onAction,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				'flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-card px-8 py-16 text-center',
				className,
			)}>
			<div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted'>
				<Icon className='size-7 text-muted-foreground' aria-hidden />
			</div>
			<h2 className='text-lg font-semibold text-foreground'>{title}</h2>
			{description ? <p className='mt-2 max-w-md text-sm text-muted-foreground'>{description}</p> : null}
			{onAction ? (
				<Button className='mt-6' onClick={onAction}>
					{actionLabel}
				</Button>
			) : null}
		</div>
	);
}

export default EmptyState;
