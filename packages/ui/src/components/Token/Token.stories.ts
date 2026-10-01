import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Star } from '@lucide/vue'
import Token from './Token.vue'

const meta: Meta<typeof Token> = {
  title: 'Content/Token',
  component: Token,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['default', 'selected', 'error'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Token' },
}

export const Selected: Story = {
  args: { label: 'Selected', variant: 'selected' },
}

export const Error: Story = {
  args: { label: 'Delete', variant: 'error' },
}

export const WithIcon: Story = {
  args: { label: 'Favourite', icon: Star },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const Removable: Story = {
  args: { label: 'Removable' },
  render: (args) => ({
    components: { Token },
    setup() {
      const tokens = ['Vue', 'Vite', 'TypeScript', 'Tailwind']
      function removeToken(label: string) {
        const idx = tokens.indexOf(label)
        if (idx > -1) tokens.splice(idx, 1)
      }
      return { args, tokens, removeToken }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <Token
          v-for="t in tokens"
          :key="t"
          :label="t"
          @remove="removeToken(t)"
        />
      </div>
    `,
  }),
}

export const MixedVariants: Story = {
  render: () => ({
    components: { Token },
    template: `
      <div class="flex flex-wrap gap-2">
        <Token label="Default" />
        <Token label="Selected" variant="selected" />
        <Token label="Error" variant="error" />
        <Token label="With Icon" :icon="icon" />
      </div>
    `,
    setup() {
      return { icon: Star }
    },
  }),
}
