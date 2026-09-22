import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FileInput from './FileInput.vue'

const meta: Meta<typeof FileInput> = {
  title: 'Forms/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
    dragoverText: { control: 'text' },
    browseText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { FileInput },
  setup() {
    const files = ref<FileList | null>(null)
    return { args, files }
  },
  template: `
    <div style="max-width:400px">
      <FileInput v-bind="args" v-model="files" />
      <p v-if="files" style="margin-top:8px;font-size:12px;color:var(--color-text-secondary)">
        Selected: {{ files.length }} file(s)
      </p>
    </div>
  `,
})

export const Default: Story = { args: { browseText: 'Browse files' }, render: template }
export const Multiple: Story = { args: { multiple: true, browseText: 'Choose files' }, render: template }
export const WithAccept: Story = { args: { accept: '.jpg,.png,.gif', browseText: 'Upload images' }, render: template }
export const Disabled: Story = { args: { disabled: true }, render: template }
export const WithError: Story = { args: { errorMessage: 'File is required' }, render: template }
