import { cn } from '@/lib/utils';
import Spinner from '@/components/atoms/Spinner/Spinner';

export interface LoadingStateProps {
	/** Accessible name for the status region */
	label?: string;
	/** Spinner pixel size */
	spinnerSize?: number;
	className?: string;
}

/**
 * Centered spinner + label for tables, cards, and full-width placeholders while server state resolves.
 */
export function LoadingState({ label = 'Loading…', spinnerSize = 32, className }: LoadingStateProps) {
	return (
		<div
			className={cn('flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground', className)}
			role='status'
			aria-live='polite'>
			<Spinner size={spinnerSize} />
			{label && <span className='text-sm'>{label}</span>}
		</div>
	);
}

export default LoadingState;
