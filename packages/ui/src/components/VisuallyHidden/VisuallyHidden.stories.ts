import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VisuallyHidden from './VisuallyHidden.vue'

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Utilities/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const render = (text: string) => (args: any) => ({
  components: { VisuallyHidden },
  setup() { return { args } },
  template: `
    <div>
      <VisuallyHidden v-bind="args">${text}</VisuallyHidden>
      <p>Visible paragraph — inspect DOM to see the hidden span above.</p>
    </div>
  `,
})

export const Default: Story = { render: render('This text is only announced by screen readers') }
