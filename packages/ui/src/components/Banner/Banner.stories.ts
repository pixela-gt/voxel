import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BannerProvider from './BannerProvider.vue'
import { useBanner } from '../../composables/useBanner'

const meta: Meta<typeof BannerProvider> = {
  title: 'Feedback/Banner',
  component: BannerProvider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => ({
    components: { BannerProvider },
    setup() {
      const { success, error, warning, info } = useBanner()
      return {
        showSuccess: () => success('Changes saved', 'Your changes have been saved successfully.'),
        showError: () => error('Error', 'Something went wrong. Please try again.'),
        showWarning: () => warning('Warning', 'Your session will expire in 5 minutes.'),
        showInfo: () => info('Info', 'A new version is available.'),
      }
    },
    template: `
      <BannerProvider>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button @click="showSuccess" style="padding:8px 16px;border-radius:8px;background:var(--color-success-base);color:white;border:none;cursor:pointer">Success</button>
          <button @click="showError" style="padding:8px 16px;border-radius:8px;background:var(--color-error-base);color:white;border:none;cursor:pointer">Error</button>
          <button @click="showWarning" style="padding:8px 16px;border-radius:8px;background:var(--color-warning-base);color:white;border:none;cursor:pointer">Warning</button>
          <button @click="showInfo" style="padding:8px 16px;border-radius:8px;background:var(--color-info-base);color:white;border:none;cursor:pointer">Info</button>
        </div>
      </BannerProvider>
    `,
  }),
}

export const Success: Story = {
  render: () => ({
    components: { BannerProvider },
    setup() {
      const { success } = useBanner()
      return {
        show: () => success('Changes saved', 'Your changes have been saved successfully.'),
      }
    },
    template: `
      <BannerProvider>
        <button @click="show" style="padding:8px 16px;border-radius:8px;background:var(--color-success-base);color:white;border:none;cursor:pointer">Show Success Banner</button>
      </BannerProvider>
    `,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { BannerProvider },
    setup() {
      const { error } = useBanner()
      return {
        show: () => error('Error', 'Something went wrong. Please try again.'),
      }
    },
    template: `
      <BannerProvider>
        <button @click="show" style="padding:8px 16px;border-radius:8px;background:var(--color-error-base);color:white;border:none;cursor:pointer">Show Error Banner</button>
      </BannerProvider>
    `,
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { BannerProvider },
    setup() {
      const { warning } = useBanner()
      return {
        show: () => warning('Warning', 'Your session will expire in 5 minutes.'),
      }
    },
    template: `
      <BannerProvider>
        <button @click="show" style="padding:8px 16px;border-radius:8px;background:var(--color-warning-base);color:white;border:none;cursor:pointer">Show Warning Banner</button>
      </BannerProvider>
    `,
  }),
}

export const Info: Story = {
  render: () => ({
    components: { BannerProvider },
    setup() {
      const { info } = useBanner()
      return {
        show: () => info('Info', 'A new version is available.'),
      }
    },
    template: `
      <BannerProvider>
        <button @click="show" style="padding:8px 16px;border-radius:8px;background:var(--color-info-base);color:white;border:none;cursor:pointer">Show Info Banner</button>
      </BannerProvider>
    `,
  }),
}

export const MultipleBanners: Story = {
  render: () => ({
    components: { BannerProvider },
    setup() {
      const { info, success, warning } = useBanner()
      return {
        showAll: () => {
          info('First banner', 'This is the first notification.')
          success('Second banner', 'This one appears after the first.')
          warning('Third banner', 'And a third one stacks below.')
        },
      }
    },
    template: `
      <BannerProvider>
        <button @click="showAll" style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Show 3 Banners</button>
      </BannerProvider>
    `,
  }),
}
