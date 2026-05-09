import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { useState } from 'react';

export interface SidebarNavItem {
	id: string;
	label: string;
	icon?: LucideIcon;
	href?: string;
}

export interface SidebarNavProps {
	items: SidebarNavItem[];
	/** Currently active item id */
	activeId: string;
	onNavigate?: (id: string) => void;
	className?: string;
}

/**
 * Collapsible sidebar navigation with icon + label rows and an active highlight ring.
 */
export function SidebarNav({ items, activeId, onNavigate, className }: SidebarNavProps) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<aside className={cn('flex h-full flex-col border-r bg-card py-3 transition-[width]', collapsed ? 'w-[72px]' : 'w-[220px]', className)}>
			<div className='flex items-center justify-end px-2'>
				<button
					type='button'
					className='rounded-md border border-border p-1 text-muted-foreground hover:bg-accent'
					onClick={() => setCollapsed((c) => !c)}
					aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
					{collapsed ? <ChevronRight className='size-4' /> : <ChevronLeft className='size-4' />}
				</button>
			</div>
			<nav className='mt-4 flex flex-1 flex-col gap-1 px-2' aria-label='Primary'>
				{items.map((item) => {
					const Icon = item.icon;
					const active = item.id === activeId;
					return (
						<button
							key={item.id}
							type='button'
							className={cn(
								'flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors',
								active ? 'bg-[#092E44]/10 ring-1 ring-[#092E44]/30' : 'hover:bg-muted',
								collapsed && 'justify-center',
							)}
							onClick={() => onNavigate?.(item.id)}
							title={item.label}>
							{Icon ? <Icon className='size-4 shrink-0' aria-hidden /> : <span className='size-4 rounded-full bg-muted' />}
							{!collapsed && <span className='truncate'>{item.label}</span>}
						</button>
					);
				})}
			</nav>
		</aside>
	);
}

export default SidebarNav;
