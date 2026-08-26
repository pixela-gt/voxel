import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Text from './Text.vue'

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'] },
    variant: {
      control: 'select',
      options: [
        'display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm',
        'headline-lg', 'headline-md', 'headline-sm',
        'title-lg', 'title-md', 'title-sm',
        'body-lg', 'body-md', 'body-sm',
        'label-lg', 'label-md', 'label-sm',
      ],
    },
    weight: { control: 'select', options: ['normal', 'medium', 'bold'] },
    color: { control: 'select', options: ['primary', 'secondary', 'inverse', 'muted'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const text = (t: string) => (args: any) => ({
  components: { Text },
  setup() { return { args } },
  template: `<Text v-bind="args">${t}</Text>`,
})

export const Default: Story = { render: text('The quick brown fox') }
export const DisplayLg: Story = { args: { variant: 'display-lg' }, render: text('Display Large') }
export const HeadlineMd: Story = { args: { tag: 'h2', variant: 'headline-md' }, render: text('Headline Medium') }
export const TitleSm: Story = { args: { tag: 'h3', variant: 'title-sm' }, render: text('Title Small') }
export const BodyMd: Story = { args: { tag: 'p', variant: 'body-md' }, render: text('Body medium text used for paragraphs and descriptions.') }
export const LabelSm: Story = { args: { variant: 'label-sm' }, render: text('Label') }
export const Bold: Story = { args: { variant: 'body-md', weight: 'bold' }, render: text('Bold body') }
export const Muted: Story = { args: { variant: 'body-md', color: 'muted' }, render: text('Muted text') }
