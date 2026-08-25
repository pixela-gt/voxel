<script setup lang="ts">
import { computed, inject, ref, watch, useId } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { Check, Minus } from '@lucide/vue'
import type { CheckboxProps } from './Checkbox.types'
import { Icon } from '../Icon'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

// NOTE: no default for modelValue — its presence/absence decides
// controlled vs uncontrolled mode.
const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'default',
  disabled: false,
  indeterminate: false,
  error: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// FormField integration + label association: FormField's id wins when nested,
// otherwise we generate our own so the label always toggles the checkbox.
const formField = inject(FORM_FIELD_KEY, null)
const ownId = useId()
const effectiveId = computed(() => formField?.id ?? ownId)
const hasError = computed(() => props.error || !!formField?.errorMessage)

type CheckedState = boolean | 'indeterminate'

const isControlled = computed(() => props.modelValue !== undefined)

// Local mirror used ONLY when uncontrolled, so we can always hand Root a
// stable modelValue (reka switches modes on `modelValue === undefined`).
const internalValue = ref<CheckedState>(props.indeterminate ? 'indeterminate' : false)
watch(() => props.indeterminate, (v) => {
  if (!isControlled.value) internalValue.value = v ? 'indeterminate' : false
})

const checked = computed<CheckedState>(() => {
  const base = isControlled.value ? props.modelValue! : internalValue.value
  return props.indeterminate && base === false ? 'indeterminate' : base
})

function onUpdate(v: CheckedState) {
  const next = v === true
  if (!isControlled.value) internalValue.value = next
  emit('update:modelValue', next)
}

const wrapperClass = computed(() => [
  'voxel-checkbox__wrapper',
  hasError.value && 'voxel-checkbox--error',
])

const indicatorClass = computed(() => [
  'voxel-checkbox__indicator',
])
const labelClass = computed(() => [
  'voxel-checkbox__label',
  `voxel-checkbox__label--size-${props.size}`,
  props.class,
])
</script>

<template>
  <div :class="wrapperClass" v-bind="$attrs">
    <CheckboxRoot
      :id="effectiveId"
      :model-value="checked"
      :disabled="props.disabled"
      @update:model-value="onUpdate"
      :class="['voxel-checkbox', `voxel-checkbox--size-${props.size}`]"
    >
      <CheckboxIndicator :class="indicatorClass">
        <!-- Canonical icon pattern (cf. Button/Drawer): wrapper span owns
             size/layout, bare Icon or fallback glyph inside, slot overrides all. -->
        <span
          :class="['voxel-checkbox__icon', `voxel-checkbox__icon--size-${props.size}`]"
          aria-hidden="true"
        >
          <slot name="icon">
            <Icon v-if="props.icon" :icon="props.icon" />
            <Icon v-else-if="checked === 'indeterminate'" :icon="Minus" />
            <Icon v-else :icon="Check" />
          </slot>
        </span>
      </CheckboxIndicator>
    </CheckboxRoot>
    <label v-if="props.label" :for="effectiveId" :class="labelClass">
      {{ props.label }}
    </label>
    <slot />
  </div>
</template>

<style scoped>
.voxel-checkbox__wrapper {
  @apply inline-flex items-center gap-[6px];
}

/* The ROOT carries the box visuals — CheckboxIndicator unmounts when
   unchecked (reka Presence), so indicator-owned styling made unchecked
   checkboxes invisible. State is driven by reka's data-state attribute. */
.voxel-checkbox {
  @apply relative inline-flex items-center justify-center flex-shrink-0 cursor-pointer
    border-[1.5px] border-[var(--color-grey-400)] bg-transparent
    transition-all duration-[var(--transition-fast)]
    hover:border-[var(--color-primary-base)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-checkbox[data-state='checked'],
.voxel-checkbox[data-state='indeterminate'] {
  @apply bg-[var(--color-primary-base)] border-[var(--color-primary-base)];
}

/* Sizes live on the root */
.voxel-checkbox--size-small { @apply size-4 rounded-[4px]; }
.voxel-checkbox--size-default { @apply size-5 rounded-[5px]; }
.voxel-checkbox--size-large { @apply size-6 rounded-[6px]; }

.voxel-checkbox__indicator {
  /* Pure centering layer for the icon — always full-size of the root box */
  @apply flex items-center justify-center w-full h-full text-white;
}

.voxel-checkbox__icon {
  /* Wrapper owns size (canonical pattern) — children stretch to fill */
  @apply flex items-center justify-center text-white;
}
.voxel-checkbox__icon > * {
  @apply size-full;
}
.voxel-checkbox__icon--size-small { @apply size-[10px]; }
.voxel-checkbox__icon--size-default { @apply size-[12px]; }
.voxel-checkbox__icon--size-large { @apply size-[14px]; }

/* Error state */
.voxel-checkbox--error .voxel-checkbox {
  @apply border-[var(--color-error-base)];
}
.voxel-checkbox--error .voxel-checkbox[data-state='checked'],
.voxel-checkbox--error .voxel-checkbox[data-state='indeterminate'] {
  @apply bg-[var(--color-error-base)] border-[var(--color-error-base)];
}

.voxel-checkbox__label {
  @apply font-sans font-normal text-[var(--color-text-primary)];
}
.voxel-checkbox__label--size-small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-checkbox__label--size-default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-checkbox__label--size-large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>
