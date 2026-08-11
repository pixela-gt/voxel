import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import ColorField from './ColorField.vue'

const meta: Meta<typeof ColorField> = {
  title: 'Color/ColorField',
  component: ColorField,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
  render: (args) => ({
    components: { ColorField },
    setup() {
      const color = ref((args.modelValue as string) ?? '#3450e8')
      const bindArgs = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { args: bindArgs, color }
    },
    template: '<ColorField v-model="color" v-bind="args" />',
  }),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { modelValue: '#3450e8' },
}
export const Disabled: Story = {
  args: { modelValue: '#3450e8', disabled: true },
}