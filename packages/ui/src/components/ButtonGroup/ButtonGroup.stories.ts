import type { Meta, StoryObj } from '@storybook/vue3'
import { Plus, Minus, Trash } from '@lucide/vue'
import { ButtonGroup } from './index'
import { Button } from '../Button'
import { IconButton } from '../IconButton'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Action/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'tonal', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    density: {
      control: 'select',
      options: ['default', 'dense'],
    },
    disabled: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    separators: { control: 'boolean' },
    flat: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultTemplate = (args: any) => ({
  components: { ButtonGroup, Button },
  setup() {
    return { args }
  },
  template: `
    <ButtonGroup v-bind="args">
      <Button>Years</Button>
      <Button>Months</Button>
      <Button>Days</Button>
    </ButtonGroup>
  `,
})

export const Default: Story = {
  args: {
    variant: 'text',
  },

  render: defaultTemplate,
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    separators: true,
    variant: 'text',
  },
  render: (args: any) => ({
    components: { ButtonGroup, Button },
    setup() {
      return { args }
    },
    template: `
      <ButtonGroup v-bind="args">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    `,
  }),
}

export const MixedWithIconButtons: Story = {
  render: (args: any) => ({
    components: { ButtonGroup, Button, IconButton },
    setup() {
      return { args, Plus, Minus, Trash }
    },
    template: `
      <ButtonGroup v-bind="args">
        <IconButton :icon="Plus" aria-label="Add" />
        <Button>Edit</Button>
        <IconButton :icon="Minus" aria-label="Remove" />
        <IconButton :icon="Trash" aria-label="Delete" color="secondary" />
      </ButtonGroup>
    `,
  }),
}

export const ChildOverrides: Story = {
  render: (args: any) => ({
    components: { ButtonGroup, Button },
    setup() {
      return { args }
    },
    template: `
      <ButtonGroup v-bind="args" size="small" variant="text" color="primary">
        <Button>Inherited Small Text</Button>
        <Button size="large" variant="outline">Explicit Large Outline</Button>
        <Button>Inherited Small Text</Button>
      </ButtonGroup>
    `,
  }),
}

export const WithoutSeparators: Story = {
  args: {
    separators: false,
  },
  render: defaultTemplate,
}

export const Flat: Story = {
  args: {
    flat: true,
  },
  render: defaultTemplate,
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: defaultTemplate,
}
