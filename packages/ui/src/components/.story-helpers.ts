import type { StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

/**
 * Returns a StoryObj whose render wires `args.modelValue` into a local ref
 * bound via `v-model`. Use for any component that exposes `modelValue`.
 *
 * ponytail: single-purpose helper, no slot/sub-component variants.
 */
export function withVModel(
  component: any,
  args: Record<string, unknown>,
  template = '<component :is="Component" v-bind="args" v-model="value" />',
): StoryObj {
  return {
    args,
    render: (a: any) => ({
      components: { Component: component },
      setup() {
        return { args: a, value: ref(a.modelValue) }
      },
      template,
    }),
  }
}
