import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormGrid from './FormGrid.vue'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import { FormField } from '../FormField'

const meta: Meta<typeof FormGrid> = {
  title: 'Layout/FormGrid',
  component: FormGrid,
  tags: ['autodocs'],
  argTypes: {
    labelWidth: { control: 'text' },
    gap: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { FormGrid },
    template: `
      <FormGrid style="max-width:600px">
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Name</label>
        <Input placeholder="Enter your name..." />
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Email</label>
        <Input placeholder="Enter your email..." type="email" />
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Bio</label>
        <Textarea placeholder="Tell us about yourself..." rows="3" />
      </FormGrid>
    `,
  }),
}

export const CustomLabelWidth: Story = {
  render: () => ({
    components: { FormGrid },
    template: `
      <FormGrid labelWidth="200px" style="max-width:600px">
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Organization Name</label>
        <Input placeholder="Enter organization name..." />
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Department</label>
        <Input placeholder="Enter department..." />
      </FormGrid>
    `,
  }),
}

export const WithFormField: Story = {
  render: () => ({
    components: { FormGrid, FormField, Input },
    template: `
      <FormGrid labelWidth="120px" style="max-width:600px">
        <div class="pt-2">
          <FormField label="Username" required>
            <Input placeholder="Choose a username..." />
          </FormField>
        </div>
        <div class="pt-2">
          <FormField label="Email" hint="We'll never share your email">
            <Input placeholder="Enter email..." type="email" />
          </FormField>
        </div>
        <div class="pt-2">
          <FormField label="Password" errorMessage="Password must be at least 8 characters">
            <Input placeholder="Enter password..." type="password" />
          </FormField>
        </div>
      </FormGrid>
    `,
  }),
}

export const CustomGap: Story = {
  render: () => ({
    components: { FormGrid },
    template: `
      <FormGrid gap="24px" style="max-width:600px">
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Field 1</label>
        <Input placeholder="Value 1..." />
        <label class="text-sm font-medium text-[var(--color-text-primary)] pt-2">Field 2</label>
        <Input placeholder="Value 2..." />
      </FormGrid>
    `,
  }),
}
