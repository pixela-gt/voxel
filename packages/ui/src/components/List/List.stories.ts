import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { User, Star, ChevronRight, Mail, Phone, Settings, Bell, Shield } from '@lucide/vue'
import { List } from './index'
import { ListItem } from '../ListItem'

const meta: Meta<typeof List> = {
  title: 'Content/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    density: {
      control: 'select',
      options: ['compact', 'default', 'comfortable'],
    },
    separated: { control: 'boolean' },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
    },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <List>
        <ListItem value="1">Dashboard</ListItem>
        <ListItem value="2">Settings</ListItem>
        <ListItem value="3">Profile</ListItem>
        <ListItem value="4">Notifications</ListItem>
      </List>
    `,
  }),
}

export const Compact: Story = {
  args: { density: 'compact' },
  render: (args: any) => ({
    components: { List, ListItem },
    setup() { return { args } },
    template: `
      <List v-bind="args">
        <ListItem value="1">Compact item</ListItem>
        <ListItem value="2">Compact item</ListItem>
        <ListItem value="3">Compact item</ListItem>
      </List>
    `,
  }),
}

export const Comfortable: Story = {
  args: { density: 'comfortable' },
  render: (args: any) => ({
    components: { List, ListItem },
    setup() { return { args } },
    template: `
      <List v-bind="args">
        <ListItem value="1">Comfortable item</ListItem>
        <ListItem value="2">Comfortable item</ListItem>
        <ListItem value="3">Comfortable item</ListItem>
      </List>
    `,
  }),
}

export const Separated: Story = {
  args: { separated: true },
  render: (args: any) => ({
    components: { List, ListItem },
    setup() { return { args } },
    template: `
      <List v-bind="args">
        <ListItem value="1">First item</ListItem>
        <ListItem value="2">Second item</ListItem>
        <ListItem value="3">Third item</ListItem>
      </List>
    `,
  }),
}

export const SingleSelection: Story = {
  render: () => ({
    components: { List, ListItem },
    setup() {
      const selected = ref('2')
      return { selected }
    },
    template: `
      <List selectionMode="single" v-model:selected="selected">
        <ListItem value="1">Dashboard</ListItem>
        <ListItem value="2">Settings</ListItem>
        <ListItem value="3">Profile</ListItem>
      </List>
    `,
  }),
}

export const MultipleSelection: Story = {
  render: () => ({
    components: { List, ListItem },
    setup() {
      const selected = ref(['1', '3'])
      return { selected }
    },
    template: `
      <List selectionMode="multiple" v-model:selected="selected">
        <ListItem value="1">Email</ListItem>
        <ListItem value="2">SMS</ListItem>
        <ListItem value="3">Push</ListItem>
        <ListItem value="4">In-app</ListItem>
      </List>
    `,
  }),
}

export const DisabledItem: Story = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <List selectionMode="single">
        <ListItem value="1">Active item</ListItem>
        <ListItem value="2" disabled>Disabled item</ListItem>
        <ListItem value="3">Active item</ListItem>
      </List>
    `,
  }),
}

export const WithPrependSlot: Story = {
  render: () => ({
    components: { List, ListItem, User, Star },
    template: `
      <List>
        <ListItem value="1">
          <template #prepend><User :size="18" /></template>
          User Profile
        </ListItem>
        <ListItem value="2">
          <template #prepend><Star :size="18" /></template>
          Favorites
        </ListItem>
      </List>
    `,
  }),
}

export const WithAppendSlot: Story = {
  render: () => ({
    components: { List, ListItem, ChevronRight },
    template: `
      <List>
        <ListItem value="1">
          Settings
          <template #append><ChevronRight :size="16" /></template>
        </ListItem>
        <ListItem value="2">
          Profile
          <template #append><ChevronRight :size="16" /></template>
        </ListItem>
      </List>
    `,
  }),
}

export const WithSecondaryText: Story = {
  render: () => ({
    components: { List, ListItem, Mail, Phone },
    template: `
      <List separated>
        <ListItem value="1">
          <template #prepend><Mail :size="18" /></template>
          john@example.com
          <template #secondary>Email address</template>
        </ListItem>
        <ListItem value="2">
          <template #prepend><Phone :size="18" /></template>
          +1 (555) 123-4567
          <template #secondary>Phone number</template>
        </ListItem>
      </List>
    `,
  }),
}

export const RichContent: Story = {
  render: () => ({
    components: { List, ListItem, Badge, Avatar },
    setup() {
      const BadgeComp = Badge
      const AvatarComp = Avatar
      return { BadgeComp, AvatarComp }
    },
    template: `
      <List separated selectionMode="single">
        <ListItem value="1">
          <template #prepend><Avatar size="small" alt="JD" /></template>
          <div>
            <div>John Doe</div>
            <div style="font-size: 12px; color: var(--color-text-muted);">john@example.com</div>
          </div>
          <template #append><Badge variant="success">Active</Badge></template>
        </ListItem>
        <ListItem value="2">
          <template #prepend><Avatar size="small" alt="AS" /></template>
          <div>
            <div>Alice Smith</div>
            <div style="font-size: 12px; color: var(--color-text-muted);">alice@example.com</div>
          </div>
          <template #append><Badge variant="warning">Pending</Badge></template>
        </ListItem>
      </List>
    `,
  }),
}

export const EmptyState: Story = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <List>
        <template #empty>
          <div style="padding: 24px; text-align: center; color: var(--color-text-muted);">
            No items to display
          </div>
        </template>
      </List>
    `,
  }),
}

export const Loading: Story = {
  args: { loading: true },
  render: (args: any) => ({
    components: { List, ListItem },
    setup() { return { args } },
    template: `
      <List v-bind="args">
        <ListItem value="1">Loading item</ListItem>
        <ListItem value="2">Loading item</ListItem>
        <ListItem value="3">Loading item</ListItem>
      </List>
    `,
  }),
}

export const SettingsList: Story = {
  render: () => ({
    components: { List, ListItem, Settings, Bell, Shield },
    template: `
      <List separated density="comfortable">
        <ListItem value="settings">
          <template #prepend><Settings :size="18" /></template>
          Settings
          <template #append><span style="color: var(--color-text-muted)">→</span></template>
        </ListItem>
        <ListItem value="notifications">
          <template #prepend><Bell :size="18" /></template>
          Notifications
          <template #append><span style="color: var(--color-text-muted)">→</span></template>
        </ListItem>
        <ListItem value="security">
          <template #prepend><Shield :size="18" /></template>
          Security
          <template #append><span style="color: var(--color-text-muted)">→</span></template>
        </ListItem>
      </List>
    `,
  }),
}
