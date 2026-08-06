import type { Meta, StoryObj } from '@storybook/vue3'
import Toast from './Toast.vue'
import { ToastProvider } from './index'
import { useToast } from '../../composables/useToast'

const meta: Meta<typeof ToastProvider> = {
  title: 'Action/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const template = () => ({
  components: { ToastProvider },
  setup() {
    return {}
  },
  template: `
    <ToastProvider>
      <DemoButtons />
    </ToastProvider>
  `,
})

// Inline component using useToast
const DemoButtons = {
  components: { Toast },
  setup() {
    const toast = useToast()
    return { toast }
  },
  template: `
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button @click="toast.success('Saved', 'Your changes were saved')">Success</button>
      <button @click="toast.error('Error', 'Something went wrong')">Error</button>
      <button @click="toast.warning('Warning', 'Check your input')">Warning</button>
      <button @click="toast.info('Info', 'FYI message')">Info</button>
      <button @click="toast.toast({ title: 'Default', description: 'Plain toast' })">Default</button>
    </div>
  `,
}

export const Default: Story = { render: template }
export const WithCustomAction: Story = {
  render: () => ({
    components: { ToastProvider },
    setup() {
      return {}
    },
    template: `
      <ToastProvider>
        <component :is="{
          setup() {
            const toast = useToast()
            const show = () => toast.toast({ title: 'Item archived', description: 'You can restore it later' })
            return { show }
          },
          template: '<button @click="show">Toast with action</button>'
        }" />
      </ToastProvider>
    `,
  }),
}
