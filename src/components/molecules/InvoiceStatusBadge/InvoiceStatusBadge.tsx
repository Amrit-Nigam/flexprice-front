import Chip from '@/components/atoms/Chip/Chip';
import { getInvoiceStatusDisplay, type InvoiceStatus } from '@/lib/design-system/invoiceStatus';
import { CheckCircle2, FileWarning, FileX2, Clock3, Ban } from 'lucide-react';

function statusIcon(status: string) {
	const key = status.toLowerCase() as InvoiceStatus;
	switch (key) {
		case 'paid':
			return <CheckCircle2 className='size-4' aria-hidden />;
		case 'draft':
			return <FileWarning className='size-4' aria-hidden />;
		case 'void':
			return <Ban className='size-4' aria-hidden />;
		case 'overdue':
			return <FileX2 className='size-4' aria-hidden />;
		default:
			return <Clock3 className='size-4' aria-hidden />;
	}
}

export interface InvoiceStatusBadgeProps {
	status: string;
	onClick?: () => void;
	className?: string;
}

/**
 * Maps raw invoice status strings to colored {@link Chip} treatment plus a semantic icon.
 */
export function InvoiceStatusBadge({ status, onClick, className }: InvoiceStatusBadgeProps) {
	const { label, variant } = getInvoiceStatusDisplay(status);
	return <Chip icon={statusIcon(status)} label={label} variant={variant} onClick={onClick} className={className} />;
}

export default InvoiceStatusBadge;
