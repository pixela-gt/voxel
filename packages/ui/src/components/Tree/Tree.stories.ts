import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Tree from './Tree.vue'
import type { TreeNode } from './Tree.types'

const meta: Meta<typeof Tree> = {
  title: 'Surfaces/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    expanded: { control: 'object' },
    defaultExpanded: { control: 'object' },
    selectionBehavior: { control: 'select', options: ['toggle', 'replace'] },
    propagateSelect: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
  parameters: {
    docs: {
      description: {
        component: '**Alpha** — reka-ui Tree API is still shifting. Component works but expect minor prop tweaks.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const items: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'src/components', label: 'components' },
      { id: 'src/composables', label: 'composables' },
      { id: 'src/index.ts', label: 'index.ts' },
    ],
  },
  {
    id: 'docs',
    label: 'docs',
    children: [
      { id: 'docs/getting-started', label: 'getting-started.md' },
      { id: 'docs/api', label: 'api.md' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'README.md', label: 'README.md' },
]

const template = (args: any) => ({
  components: { Tree },
  setup() {
    const value = ref<string[]>(args.modelValue ?? [])
    const expanded = ref<string[]>(args.defaultExpanded ?? ['src'])
    return { args, value, expanded, items }
  },
  template: '<Tree v-bind="args" v-model="value" v-model:expanded="expanded" :items="items" style="width:300px" />',
})

export const Default: Story = { render: template }
export const Expanded: Story = {
  args: { defaultExpanded: ['src', 'docs'] },
  render: template,
}
export const Single: Story = {
  args: { selectionBehavior: 'replace' },
  render: template,
}
export const NoPropagate: Story = {
  args: { propagateSelect: false },
  render: template,
}
export const Disabled: Story = { args: { disabled: true }, render: template }
export const Small: Story = { args: { size: 'small' }, render: template }
export const Large: Story = { args: { size: 'large' }, render: template }
