import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import ColorArea from './ColorArea.vue'

function colorToString(v: unknown) {
  return typeof v === 'string' ? v : String(v ?? '')
}

const renderArea = (args: Record<string, unknown>) => ({
  components: { ColorArea },
  setup() {
    const value = ref(args.modelValue ?? '#3450e8')
    const label = computed(() => colorToString(value.value))
    return { args, value, label }
  },
  template: `
    <div style="display:flex; flex-direction:column; gap:8px; width:300px;">
      <ColorArea v-bind="args" v-model="value" style="width:100%; height:200px;" />
      <code style="font-size:12px; color:#666;">{{ label }}</code>
    </div>
  `,
})

const meta: Meta<typeof ColorArea> = {
  title: 'Color/ColorArea',
  component: ColorArea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    colorSpace: { control: 'select', options: ['rgb', 'hsl', 'hsb'] },
    xChannel: { control: 'select', options: ['red', 'green', 'blue', 'hue', 'saturation', 'brightness', 'lightness'] },
    yChannel: { control: 'select', options: ['red', 'green', 'blue', 'hue', 'saturation', 'brightness', 'lightness'] },
    disabled: { control: 'boolean' },
  },
  render: renderArea,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { modelValue: '#3450e8' },
}
export const Rgb: Story = {
  name: 'RGB (red/green)',
  args: { colorSpace: 'rgb', xChannel: 'red', yChannel: 'green', modelValue: '#3450e8' },
}
export const Hsb: Story = {
  name: 'HSB (hue/brightness)',
  args: { colorSpace: 'hsb', xChannel: 'hue', yChannel: 'brightness', modelValue: '#3450e8' },
}
export const Disabled: Story = {
  args: { modelValue: '#3450e8', disabled: true },
}