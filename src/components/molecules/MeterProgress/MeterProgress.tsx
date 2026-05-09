import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface MeterProgressProps {
	/** Short title above the bar */
	label: string;
	/** Consumed units in the current period */
	used: number;
	/** Entitlement or cap */
	entitled: number;
	className?: string;
}

/**
 * Usage meter showing consumed vs entitled quantity, backed by the shared `Progress` primitive.
 */
export function MeterProgress({ label, used, entitled, className }: MeterProgressProps) {
	const pct = entitled > 0 ? Math.min(100, Math.round((used / entitled) * 100)) : 0;
	return (
		<div className={cn('space-y-2', className)}>
			<div className='flex justify-between text-sm text-muted-foreground'>
				<span>{label}</span>
				<span className='tabular-nums text-foreground'>
					{used.toLocaleString()} / {entitled.toLocaleString()} ({pct}%)
				</span>
			</div>
			<Progress value={pct} className='h-2' />
		</div>
	);
}

export default MeterProgress;
