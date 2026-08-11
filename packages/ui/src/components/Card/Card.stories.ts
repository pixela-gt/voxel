import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: { control: 'select', options: ['flat', 'sm', 'md', 'lg', 'xl', '2xl'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const slot = (text: string) => (args: any) => ({
  components: { Card },
  setup() { return { args } },
  template: `<Card v-bind="args" style="width:240px">${text}</Card>`,
})

export const Default: Story = { render: slot('Card content') }
export const Flat: Story = { args: { elevation: 'flat' }, render: slot('Flat card') }
export const Sm: Story = { args: { elevation: 'sm' }, render: slot('Sm shadow') }
export const Md: Story = { args: { elevation: 'md' }, render: slot('Md shadow') }
export const Lg: Story = { args: { elevation: 'lg' }, render: slot('Lg shadow') }
export const Xl: Story = { args: { elevation: 'xl' }, render: slot('Xl shadow') }
export const TwoXl: Story = { args: { elevation: '2xl' }, render: slot('2xl shadow') }
export const RichContent: Story = {
  args: { elevation: 'md' },
  render: () => ({
    components: { Card },
    template: `
      <Card elevation="md" style="width:280px;display:flex;flex-direction:column;gap:8px">
        <strong style="font-size:14px">Card title</strong>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:0">A short description of the card content goes here.</p>
        <button style="align-self:flex-start;margin-top:8px;padding:6px 12px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;font-size:12px;cursor:pointer">Action</button>
      </Card>
    `,
  }),
}
