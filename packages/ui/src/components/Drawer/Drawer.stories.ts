import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { X } from '@lucide/vue'
import Drawer from './Drawer.vue'

const meta: Meta<typeof Drawer> = {
  title: 'Surfaces/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    side: { control: 'select', options: ['left', 'right'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const body = `
  <template #content>
    <p style="margin:0 0 8px;font-size:14px">Drawer body content.</p>
    <p style="margin:0 0 8px;font-size:13px;color:var(--color-text-secondary)">Use slots for custom body content.</p>
  </template>
`

export const DefaultOpen: Story = {
  // Canvas-only: auto-opens on mount, which reads oddly inline on the docs page.
  tags: ['!autodocs'],
  args: { defaultOpen: true, title: 'Settings' },
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args }
    },
    template: `<Drawer v-bind="args">${body}</Drawer>`,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { Drawer },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <button @click="open = true" style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:#fff;border:none;cursor:pointer">Open drawer</button>
        <Drawer v-model:open="open" title="Controlled drawer">
          ${body}
          <template #footer>
            <button @click="open = false" style="padding:6px 12px;border-radius:6px;background:transparent;border:1px solid var(--color-grey-200);cursor:pointer">Close</button>
          </template>
        </Drawer>
      </div>
    `,
  }),
}

export const LeftSide: Story = {
  args: { defaultOpen: false, side: 'left', title: 'Navigation' },
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args }
    },
    template: `<Drawer v-bind="args">${body}</Drawer>`,
  }),
}

export const WithFooter: Story = {
  args: { defaultOpen: false, title: 'Confirm action' },
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args }
    },
    template: `
      <Drawer v-bind="args">
        ${body}
        <template #footer>
          <button style="padding:6px 12px;border-radius:6px;background:transparent;border:1px solid var(--color-grey-200);cursor:pointer">Cancel</button>
        </template>
      </Drawer>
    `,
  }),
}

export const WithDescription: Story = {
  args: { defaultOpen: false, title: 'Settings', description: 'Panel options' },
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args }
    },
    template: `<Drawer v-bind="args">${body}</Drawer>`,
  }),
}

export const WithCloseIcon: Story = {
  args: { defaultOpen: false, title: 'With close' },
  render: (args: any) => ({
    components: { Drawer, X },
    setup() {
      return { args, X }
    },
    template: `
      <Drawer v-bind="args" :close-icon="X">
        ${body}
      </Drawer>
    `,
  }),
}

export const LongContent: Story = {
  args: { defaultOpen: false, title: 'Scrollable' },
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args }
    },
    template: `
      <Drawer v-bind="args">
        <template #content>
          <div style="display:flex;flex-direction:column;gap:8px">
            <p v-for="i in 40" :key="i" style="margin:0;font-size:13px">Paragraph {{ i }}</p>
          </div>
        </template>
      </Drawer>
    `,
  }),
}

const inputStyle =
  'padding:8px;border:1px solid var(--color-grey-200);border-radius:6px;font-size:13px'
const labelStyle =
  'display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--color-text-secondary)'

export const SideForm: Story = {
  // Wide drawer hosting a form — demonstrates the `width` prop.
  args: { defaultOpen: false, title: 'Invite member', width: 420 },
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args, inputStyle, labelStyle }
    },
    template: `
      <Drawer v-bind="args">
        <template #content>
          <div style="display:flex;flex-direction:column;gap:14px">
            <label :style="labelStyle">
              Full name
              <input placeholder="Jane Doe" :style="inputStyle" />
            </label>
            <label :style="labelStyle">
              Email
              <input type="email" placeholder="jane@company.com" :style="inputStyle" />
            </label>
            <label :style="labelStyle">
              Role
              <select :style="inputStyle">
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </label>
          </div>
        </template>
        <template #footer>
          <button style="padding:8px 16px;border-radius:6px;background:transparent;border:1px solid var(--color-grey-200);cursor:pointer;margin-right:8px">Cancel</button>
          <button style="padding:8px 16px;border-radius:6px;background:var(--color-primary-base);color:#fff;border:none;cursor:pointer">Send invite</button>
        </template>
      </Drawer>
    `,
  }),
}
