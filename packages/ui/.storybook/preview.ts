import type { Preview } from '@storybook/vue3'
import '../src/style.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Primitives', 'Action', 'Surfaces', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
