import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TagsInput from './TagsInput.vue'

const meta: Meta<typeof TagsInput> = {
  title: 'Forms/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    max: { control: { type: 'number' } },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    duplicate: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { TagsInput },
  setup() {
    const value = ref<string[]>(args.modelValue ?? ['design', 'vue', 'ui'])
    return { args, value }
  },
  template: '<TagsInput v-bind="args" v-model="value" style="width:300px" />',
})

export const Default: Story = { render: template }
export const Empty: Story = {
  args: { modelValue: [] },
  render: () => ({
    components: { TagsInput },
    setup() {
      const value = ref<string[]>([])
      return { value }
    },
    template: '<TagsInput v-model="value" placeholder="Add a tag" style="width:300px" />',
  }),
}
export const MaxThree: Story = { args: { max: 3, modelValue: ['one', 'two'] }, render: template }
export const AllowDuplicates: Story = { args: { duplicate: true }, render: template }
export const Disabled: Story = { args: { disabled: true, modelValue: ['locked', 'tags'] }, render: template }
export const Small: Story = { args: { size: 'small' }, render: template }
export const Large: Story = { args: { size: 'large' }, render: template }
