import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Timestamp from './Timestamp.vue'

const meta: Meta<typeof Timestamp> = {
  title: 'Content/Timestamp',
  component: Timestamp,
  tags: ['autodocs'],
  argTypes: {
    datetime: { control: 'text' },
    format: { control: 'select', options: ['relative', 'absolute'] },
    locale: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const now = new Date()
const minutesAgo = new Date(now.getTime() - 5 * 60_000)
const hoursAgo = new Date(now.getTime() - 3 * 3600_000)
const daysAgo = new Date(now.getTime() - 2 * 86400_000)
const future = new Date(now.getTime() + 3600_000)

export const JustNow: Story = {
  args: { datetime: '2023-06-12 07:00:00' },
}

export const MinutesAgo: Story = {
  args: { datetime: minutesAgo },
}

export const HoursAgo: Story = {
  args: { datetime: hoursAgo },
}

export const DaysAgo: Story = {
  args: { datetime: daysAgo },
}

export const Future: Story = {
  args: { datetime: future },
}

export const Absolute: Story = {
  args: { datetime: hoursAgo, format: 'absolute' },
}

export const CustomLocale: Story = {
  args: { datetime: hoursAgo, format: 'absolute', locale: 'ja-JP' },
}

export const AllRelative: Story = {
  render: () => ({
    components: { Timestamp },
    setup() {
      const now = new Date()
      return {
        seconds: new Date(now.getTime() - 30_000),
        minutes: new Date(now.getTime() - 5 * 60_000),
        hours: new Date(now.getTime() - 3 * 3600_000),
        days: new Date(now.getTime() - 2 * 86400_000),
      }
    },
    template: `
      <div class="flex flex-col gap-1">
        <div><Timestamp :datetime="seconds" /> (seconds)</div>
        <div><Timestamp :datetime="minutes" /> (minutes)</div>
        <div><Timestamp :datetime="hours" /> (hours)</div>
        <div><Timestamp :datetime="days" /> (days)</div>
      </div>
    `,
  }),
}
