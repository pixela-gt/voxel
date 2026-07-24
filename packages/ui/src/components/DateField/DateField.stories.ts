import type { Meta, StoryObj } from '@storybook/vue3'
import DateField from './DateField.vue'

// ponytail: component is a placeholder until reka-ui date API stabilizes.
// Story exists to keep the sidebar inventory complete; visual output is the
// upstream `<div>TODO</div>` until the SFC is implemented.
const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '**Placeholder** — reka-ui date API is alpha. Component renders `TODO` until implemented.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
