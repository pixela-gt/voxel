import type { Meta, StoryObj } from '@storybook/vue3'
import Pagination from './Pagination.vue'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    defaultPage: { control: { type: 'number', min: 1 } },
    total: { control: { type: 'number', min: 1 } },
    itemsPerPage: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 5 } },
    showEdges: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { total: 100, itemsPerPage: 10 } }
export const ManyPages: Story = { args: { total: 500, itemsPerPage: 10 } }
export const WithEdges: Story = { args: { total: 200, itemsPerPage: 10, showEdges: true } }
export const Small: Story = { args: { total: 100, itemsPerPage: 10, size: 'small' } }
export const Large: Story = { args: { total: 100, itemsPerPage: 10, size: 'large' } }
export const Disabled: Story = { args: { total: 100, itemsPerPage: 10, disabled: true } }
export const FewSiblings: Story = { args: { total: 100, itemsPerPage: 10, siblingCount: 1 } }
