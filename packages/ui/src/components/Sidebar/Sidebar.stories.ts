import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import { Home, Settings, Users, FileText, Bell, Menu, X, ChevronLeft } from '@lucide/vue'
import Sidebar from './Sidebar.vue'
import SidebarItem from './SidebarItem.vue'
import SidebarItemGroup from './SidebarItemGroup.vue'
import SidebarSection from './SidebarSection.vue'
import SidebarHeading from './SidebarHeading.vue'
import SidebarCollapseButton from './SidebarCollapseButton.vue'

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

export const Default: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() { return { Home, Users, FileText, Bell, Settings } },
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

export const Collapsed: Story = {
  args: { collapsed: true, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() { return { Home, Users, FileText, Bell, Settings } },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar collapsed>
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

export const WithGroups: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem, SidebarItemGroup },
    setup() { return { Home, Users, FileText, Settings } },
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

export const WithSections: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem, SidebarSection, SidebarHeading },
    setup() { return { Home, Users, FileText, Bell, Settings } },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar>
          <SidebarHeading>Main</SidebarHeading>
          <SidebarSection>
            <SidebarItem :icon="Home" label="Home" href="#" active />
            <SidebarItem :icon="Users" label="Users" href="#" />
            <SidebarItem :icon="FileText" label="Documents" href="#" :badge="3" />
          </SidebarSection>
          <SidebarHeading>Settings</SidebarHeading>
          <SidebarSection>
            <SidebarItem :icon="Bell" label="Notifications" href="#" :badge="12" />
            <SidebarItem :icon="Settings" label="Settings" href="#" />
          </SidebarSection>
        </Sidebar>
      </div>
    `,
  }),
}

export const WithCollapseButton: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem, SidebarCollapseButton, ChevronLeft },
    setup() {
      const collapsed = ref(false)
      return { collapsed, Home, Users, FileText, Bell, Settings, ChevronLeft }
    },
    template: `
      <div style="height:500px;background:var(--color-surface-light);display:flex">
        <Sidebar v-model:collapsed="collapsed">
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="FileText" label="Documents" href="#" :badge="3" />
          <SidebarItem :icon="Bell" label="Notifications" href="#" :badge="12" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
          <template #bottom>
            <SidebarCollapseButton :icon="ChevronLeft" />
          </template>
        </Sidebar>
      </div>
    `,
  }),
}

export const WithTitle: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() { return { Home, Users, Settings } },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar>
          <template #title>
            <div style="font-weight:700;color:#fff;font-size:20px">VX</div>
          </template>
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
        </Sidebar>
      </div>
    `,
  }),
}

export const WithBottom: Story = {
  args: { collapsed: false, visible: true },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() { return { Home, Users, Settings } },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar>
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
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
    components: { Sidebar, SidebarItem },
    setup() { return { Home, Users, Settings } },
    template: `
      <div style="height:500px;background:var(--color-surface-light)">
        <Sidebar style="--sidebar-bg:#0f172a;--sidebar-text:#e2e8f0;--sidebar-active-color:#38bdf8;--sidebar-hover-bg:rgba(56,189,248,0.1)">
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
        </Sidebar>
      </div>
    `,
  }),
}

export const MobileOverlay: Story = {
  args: { collapsed: false, visible: true, mobileToggle: true, breakpoint: '1200px' },
  render: () => ({
    components: { Sidebar, SidebarItem },
    setup() { return { Home, Users, Settings } },
    template: `
      <div style="height:500px;background:var(--color-surface-light);position:relative;overflow:hidden">
        <Sidebar v-model:visible="visible" mobileToggle breakpoint="1200px">
          <SidebarItem :icon="Home" label="Home" href="#" active />
          <SidebarItem :icon="Users" label="Users" href="#" />
          <SidebarItem :icon="Settings" label="Settings" href="#" />
        </Sidebar>
      </div>
    `,
  }),
}
