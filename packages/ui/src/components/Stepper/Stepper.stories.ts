import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Stepper from './Stepper.vue'
import { StepperItem } from './index'

const meta: Meta<typeof Stepper> = {
  title: 'Surfaces/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 1 } },
    defaultValue: { control: { type: 'number', min: 1 } },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    linear: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Stepper, StepperItem },
  setup() {
    const value = ref(args.modelValue ?? args.defaultValue ?? 1)
    return { args, value }
  },
  template: `
    <Stepper v-bind="args" v-model="value" style="width:100%;max-width:500px">
      <StepperItem :step="1" title="Account" description="Create your account" />
      <StepperItem :step="2" title="Profile" description="Set up your profile" />
      <StepperItem :step="3" title="Confirm" description="Review and confirm" />
    </Stepper>
  `,
})

export const Default: Story = { args: { defaultValue: 1 }, render: template }
export const Step2: Story = { args: { defaultValue: 2 }, render: template }
export const Step3: Story = { args: { defaultValue: 3 }, render: template }
export const Vertical: Story = { args: { defaultValue: 2, orientation: 'vertical' }, render: template }
export const NonLinear: Story = { args: { defaultValue: 1, linear: false }, render: template }
export const Small: Story = { args: { defaultValue: 2, size: 'small' }, render: template }
export const Large: Story = { args: { defaultValue: 2, size: 'large' }, render: template }
