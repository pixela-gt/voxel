import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AttributePresenter from './AttributePresenter.vue'

const meta: Meta<typeof AttributePresenter> = {
  title: 'Patterns/AttributePresenter',
  component: AttributePresenter,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    missingBehavior: { control: 'select', options: ['dash', 'hide', 'custom'] },
    elevation: { control: 'select', options: ['flat', 'sm', 'md', 'lg', 'xl', '2xl'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'Admin',
  status: 'active',
  address: {
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
  },
}

export const Default: Story = {
  args: {
    item: sampleUser,
  },
}

export const WithFields: Story = {
  args: {
    item: sampleUser,
    fields: [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'role', label: 'Role' },
    ],
  },
}

export const Loading: Story = {
  args: {
    item: sampleUser,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    item: null,
    emptyText: 'No user data',
  },
}

export const WithSlots: Story = {
  args: {
    item: sampleUser,
    fields: [
      { key: 'firstName', label: 'First Name' },
      { key: 'status', label: 'Status' },
    ],
  },
  render: (args) => ({
    components: { AttributePresenter },
    setup() {
      return { args }
    },
    template: `
      <AttributePresenter v-bind="args">
        <template #status="{ value }">
          <span :style="{ color: value === 'active' ? 'green' : 'red' }">
            {{ value }}
          </span>
        </template>
      </AttributePresenter>
    `,
  }),
}

export const WithTitle: Story = {
  args: {
    item: sampleUser,
    fields: [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'role', label: 'Role' },
    ],
  },
  render: (args) => ({
    components: { AttributePresenter },
    setup() {
      return { args }
    },
    template: `
      <AttributePresenter v-bind="args">
        <template #title>
          <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">User Profile</h3>
        </template>
      </AttributePresenter>
    `,
  }),
}

export const WithTitleAndShadow: Story = {
  args: {
    item: sampleUser,
    shadow: 'md',
    fields: [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'role', label: 'Role' },
    ],
  },
  render: (args) => ({
    components: { AttributePresenter },
    setup() {
      return { args }
    },
    template: `
      <AttributePresenter v-bind="args">
        <template #title>
          <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">User Profile</h3>
        </template>
      </AttributePresenter>
    `,
  }),
}

export const MissingValues: Story = {
  args: {
    item: { name: 'John', email: null, phone: undefined },
    missingBehavior: 'dash',
  },
}

export const HideMissing: Story = {
  args: {
    item: { name: 'John', email: null, phone: undefined },
    missingBehavior: 'hide',
  },
}

export const CustomMissing: Story = {
  args: {
    item: { name: 'John', email: null, phone: undefined },
    missingBehavior: 'custom',
    missingFallback: 'N/A',
  },
}
