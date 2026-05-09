import type { Meta, StoryObj } from '@storybook/react';
import { computeGraduatedTierTotal } from '@/lib/design-system/tierPricing';
import PricingTierTable from './PricingTierTable/PricingTierTable';

const tiers = [
	{ fromUnits: 0, toUnits: 1000, unitPrice: 0.012 },
	{ fromUnits: 1000, toUnits: 50_000, unitPrice: 0.009 },
	{ fromUnits: 50_000, unitPrice: 0.006 },
];

const meta = {
	title: 'Design System/Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	argTypes: {
		currency: { control: 'text' },
		usageUnits: { control: 'number' },
	},
	parameters: { layout: 'padded' },
} satisfies Meta<typeof PricingTierTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		tiers,
		currency: 'USD',
		usageUnits: 25_000,
	},
};

export const Variants: Story = {
	args: {
		tiers,
	},
	render: () => (
		<div className='space-y-6'>
			<PricingTierTable tiers={tiers} />
			<PricingTierTable tiers={[{ fromUnits: 0, toUnits: 500, unitPrice: 5 }]} currency='USD' usageUnits={120} />
		</div>
	),
};

export const WithComputedFootnote: Story = {
	args: {
		tiers,
		usageUnits: 25_000,
	},
	render: () => {
		const usage = 25_000;
		const total = computeGraduatedTierTotal(usage, tiers);
		return (
			<div className='space-y-3'>
				<PricingTierTable tiers={tiers} usageUnits={usage} />
				<p className='text-xs text-muted-foreground'>
					Graduated total for {usage.toLocaleString()} units:{' '}
					<strong>{total.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</strong>
				</p>
			</div>
		);
	},
};
