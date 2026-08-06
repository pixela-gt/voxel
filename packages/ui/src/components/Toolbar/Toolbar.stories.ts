import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Toolbar, ToolbarButton, ToolbarLink, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from './index'

const meta: Meta<typeof Toolbar> = {
  title: 'Navigation/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton },
    template: `
      <Toolbar>
        <ToolbarButton>One</ToolbarButton>
        <ToolbarButton>Two</ToolbarButton>
        <ToolbarButton>Three</ToolbarButton>
      </Toolbar>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton },
    template: `
      <Toolbar orientation="vertical">
        <ToolbarButton>One</ToolbarButton>
        <ToolbarButton>Two</ToolbarButton>
        <ToolbarButton>Three</ToolbarButton>
      </Toolbar>
    `,
  }),
}

export const WithToggleGroup: Story = {
  render: () => ({
    components: { Toolbar, ToolbarToggleGroup, ToolbarToggleItem },
    setup() {
      const value = ref('bold')
      return { value }
    },
    template: `
      <Toolbar>
        <ToolbarToggleGroup v-model="value" type="single">
          <ToolbarToggleItem value="bold">B</ToolbarToggleItem>
          <ToolbarToggleItem value="italic">I</ToolbarToggleItem>
          <ToolbarToggleItem value="underline">U</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    `,
  }),
}

export const WithSeparator: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton, ToolbarSeparator },
    template: `
      <Toolbar>
        <ToolbarButton>Left</ToolbarButton>
        <ToolbarButton>Center</ToolbarButton>
        <ToolbarButton>Right</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Action</ToolbarButton>
      </Toolbar>
    `,
  }),
}

export const WithLink: Story = {
  render: () => ({
    components: { Toolbar, ToolbarLink },
    template: `
      <Toolbar>
        <ToolbarLink label="Home" />
        <ToolbarLink label="Docs" />
        <ToolbarLink label="GitHub" />
      </Toolbar>
    `,
  }),
}

export const MixedContent: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem, ToolbarLink },
    setup() {
      const format = ref('bold')
      return { format }
    },
    template: `
      <Toolbar>
        <ToolbarToggleGroup v-model="format" type="single">
          <ToolbarToggleItem value="bold">B</ToolbarToggleItem>
          <ToolbarToggleItem value="italic">I</ToolbarToggleItem>
          <ToolbarToggleItem value="underline">U</ToolbarToggleItem>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarButton>Save</ToolbarButton>
        <ToolbarButton variant="outline">Cancel</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarLink label="Help" />
      </Toolbar>
    `,
  }),
}

export const ButtonVariants: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton },
    template: `
      <Toolbar>
        <ToolbarButton variant="default">Default</ToolbarButton>
        <ToolbarButton variant="outline">Outline</ToolbarButton>
        <ToolbarButton variant="tonal">Tonal</ToolbarButton>
        <ToolbarButton variant="text">Text</ToolbarButton>
      </Toolbar>
    `,
  }),
}

export const ButtonColors: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton },
    template: `
      <Toolbar>
        <ToolbarButton color="primary">Primary</ToolbarButton>
        <ToolbarButton color="secondary">Secondary</ToolbarButton>
        <ToolbarButton color="success">Success</ToolbarButton>
        <ToolbarButton color="info">Info</ToolbarButton>
        <ToolbarButton color="error">Error</ToolbarButton>
        <ToolbarButton color="warning">Warning</ToolbarButton>
      </Toolbar>
    `,
  }),
}

export const ButtonSizes: Story = {
  render: () => ({
    components: { Toolbar, ToolbarButton },
    template: `
      <Toolbar>
        <ToolbarButton size="small">Small</ToolbarButton>
        <ToolbarButton size="default">Default</ToolbarButton>
        <ToolbarButton size="large">Large</ToolbarButton>
      </Toolbar>
    `,
  }),
}
