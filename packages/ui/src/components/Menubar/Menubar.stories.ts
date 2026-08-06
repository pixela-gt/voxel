import type { Meta, StoryObj } from '@storybook/vue3'
import Menubar from './Menubar.vue'

const meta: Meta<typeof Menubar> = {
  title: 'Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    loop: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const simpleItems = [
  {
    value: 'file',
    label: 'File',
    items: [
      { value: 'new', label: 'New' },
      { value: 'open', label: 'Open' },
      { value: 'save', label: 'Save' },
    ],
  },
  {
    value: 'edit',
    label: 'Edit',
    items: [
      { value: 'cut', label: 'Cut' },
      { value: 'copy', label: 'Copy' },
      { value: 'paste', label: 'Paste' },
    ],
  },
]

const subItems = [
  {
    value: 'file',
    label: 'File',
    items: [
      { value: 'new', label: 'New' },
      { value: 'open', label: 'Open' },
      {
        value: 'recent',
        label: 'Recent',
        items: [
          { value: 'doc1', label: 'document.txt' },
          { value: 'doc2', label: 'image.png' },
        ],
      },
    ],
  },
  {
    value: 'edit',
    label: 'Edit',
    items: [
      { value: 'cut', label: 'Cut' },
      { value: 'copy', label: 'Copy' },
    ],
  },
]

export const Default: Story = { args: { items: simpleItems }, render: () => sample(simpleItems) }
export const WithSubmenu: Story = { args: { items: subItems }, render: () => sample(subItems) }
export const Looping: Story = { args: { items: simpleItems, loop: true }, render: () => sample(simpleItems) }

function sample(items: any) {
  return {
    components: { Menubar },
    setup() { return { items } },
    template: '<Menubar :items="items" />',
  }
}
