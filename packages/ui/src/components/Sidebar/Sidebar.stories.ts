import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Home, Settings, Users, FileText, Bell, Menu, ChevronLeft } from '@lucide/vue'
import Sidebar from './Sidebar.vue'
import SidebarItem from './SidebarItem.vue'
import SidebarItemGroup from './SidebarItemGroup.vue'

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    visible: { control: 'boolean' },
    breakpoint: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { icon: Home, label: 'Home', href: '#', active: true },
  { icon: Users, label: 'Users', href: '#' },
  { icon: FileText, label: 'Documents', href: '#', badge: 3 },
  { icon: Bell, label: 'Notifications', href: '#', badge: 12 },
  { icon: Settings, label: 'Settings', href: '#' },
]

const itemsWithGroups = [
  { icon: Home, label: 'Home', href: '#', active: true },
  {
    icon: Users,
    label: 'Workspace',
    defaultOpen: true,
    items: [
      { icon: Users, label: 'Team', href: '#' },
      { icon: FileText, label: 'Projects', href: '#' },
    ],
  },
  { icon: Settings, label: 'Settings', href: '#' },
]

const template = (args: any) => ({
  components: { Sidebar },
  setup() {
    return { args, items }
  },
  template: `
    <div style="height:500px;background:var(--color-surface-light)">
      <Sidebar v-bind="args" :items="items" />
    </div>
  `,
})

export const Default: Story = {
  args: { collapsed: false, visible: true },
  render: template,
}

export const Collapsed: Story = {
  args: { collapsed: true, visible: true },
  render: template,
}

export const WithGroups: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar },
    setup() {
      return { items: itemsWithGroups }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar :items="items" />
      </div>
    `,
  }),
}

export const WithTitle: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar },
    setup() {
      return { items }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar :items="items">
          <template #title>
            <div style="font-weight:700;color:#fff;font-size:20px">VX</div>
          </template>
        </Sidebar>
      </div>
    `,
  }),
}

export const WithBottom: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar },
    setup() {
      return { items }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar :items="items">
          <template #bottom>
            <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:12px;opacity:0.8">
              <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2)" />
              <span>User</span>
            </div>
          </template>
        </Sidebar>
      </div>
    `,
  }),
}

export const CustomColors: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar },
    setup() {
      return { items }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar
          :items="items"
          style="--sidebar-bg:#0f172a;--sidebar-text:#e2e8f0;--sidebar-active-color:#38bdf8;--sidebar-hover-bg:rgba(56,189,248,0.1)"
        />
      </div>
    `,
  }),
}

export const MobileOverlay: Story = {
  args: { collapsed: false, visible: true, breakpoint: '1200px' },
  render: () => ({
    components: { Sidebar, Menu },
    setup() {
      const visible = ref(true)
      return { items, visible }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light);position:relative;overflow:hidden">
        <button
          @click="visible = !visible"
          style="position:absolute;top:16px;left:16px;z-index:60;padding:8px;background:var(--color-surface-base);border:1px solid var(--color-grey-200);border-radius:6px;cursor:pointer"
        >
          <Menu :size="20" />
        </button>
        <Sidebar v-model:visible="visible" :items="items" breakpoint="1200px" />
      </div>
    `,
  }),
}

export const Collapsible: Story = {
  args: { collapsed: true, visible: true },
  render: () => ({
    components: { Sidebar, ChevronLeft },
    setup() {
      const collapsed = ref(false)
      return { items, collapsed }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light);display:flex">
        <Sidebar v-model:collapsed="collapsed" :items="items">
          <template #bottom>
            <button
              @click="collapsed = !collapsed"
              style="display:flex;align-items:center;justify-content:center;width:100%;height:36px;border-radius:8px;background:rgba(255,255,255,0.1);color:#fff;border:none;cursor:pointer"
            >
              <ChevronLeft :size="16" :style="{ transform: collapsed ? 'rotate(180deg)' : 'none' }" />
            </button>
          </template>
        </Sidebar>
      </div>
    `,
  }),
}

export const SlotItems: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() {
      return { Home, Users, FileText, Bell, Settings }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar>
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="FileText" label="Documents" href="#" :badge="3" />
          <SidebarItem :icon="Bell" label="Notifications" href="#" :badge="12" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
        </Sidebar>
      </div>
    `,
  }),
}

export const SlotItemsWithGroups: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem, SidebarItemGroup },
    setup() {
      return { Home, Users, FileText, Settings }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar>
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItemGroup :icon="Users" label="Workspace" :defaultOpen="true">
            <SidebarItem :icon="Users" label="Team" href="#" sub />
            <SidebarItem :icon="FileText" label="Projects" href="#" sub />
          </SidebarItemGroup>
          <SidebarItem :icon="Settings" label="Settings" href="#" />
        </Sidebar>
      </div>
    `,
  }),
}

export const SlotItemsCollapsed: Story = {
  args: { collapsed: true, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() {
      return { Home, Users, FileText, Bell, Settings }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar>
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="FileText" label="Documents" href="#" :badge="3" />
          <SidebarItem :icon="Bell" label="Notifications" href="#" :badge="12" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
        </Sidebar>
      </div>
    `,
  }),
}
