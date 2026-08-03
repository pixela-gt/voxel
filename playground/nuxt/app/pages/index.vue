<script setup lang="ts">
const checked = ref(false)
const switched = ref(false)
const tab = ref('one')

const { resolvedTheme, setTheme } = useTheme()

function toggleTheme() {
  setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
}
</script>
<template>
  <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <VxText variant="display-lg" color="primary">Nuxt Playground</VxText>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <VxText variant="body-sm">{{ resolvedTheme }} mode</VxText>
        <VxButton size="small" @click="toggleTheme">
          Toggle Theme
        </VxButton>
      </div>
    </div>
    <VxSeparator style="margin-bottom: 2rem;" />

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div>
        <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Button</VxText>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          <VxButton>Default</VxButton>
          <VxButton variant="outline">Outline</VxButton>
          <VxButton variant="tonal">Tonal</VxButton>
          <VxButton variant="text">Text</VxButton>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          <VxButton color="primary">Primary</VxButton>
          <VxButton color="secondary">Secondary</VxButton>
          <VxButton color="error">Error</VxButton>
          <VxButton color="success">Success</VxButton>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <VxButton size="small">Small</VxButton>
          <VxButton size="default">Default</VxButton>
          <VxButton size="large">Large</VxButton>
        </div>
      </div>

      <div>
        <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Badge</VxText>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          <VxBadge>Default</VxBadge>
          <VxBadge variant="success">Success</VxBadge>
          <VxBadge variant="error">Error</VxBadge>
          <VxBadge variant="warning">Warning</VxBadge>
          <VxBadge variant="info">Info</VxBadge>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <VxBadge variant="outline">Outline</VxBadge>
          <VxBadge variant="subtle">Subtle</VxBadge>
        </div>
      </div>

      <div>
        <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Form Controls</VxText>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <VxCheckbox v-model="checked" label="Accept terms and conditions" />
          <VxSwitch v-model="switched" label="Enable notifications" />
        </div>
      </div>

      <div>
        <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Card</VxText>
        <VxCard elevation="md" style="padding: 1rem;">
          <VxText variant="title-md">Card Title</VxText>
          <VxText variant="body-md" style="margin-top: 0.25rem;">
            This is a card with some content inside.
          </VxText>
        </VxCard>
      </div>

      <div>
        <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Tabs</VxText>
        <VxTabs v-model="tab">
          <VxTabsList>
            <VxTabsTrigger value="one">One</VxTabsTrigger>
            <VxTabsTrigger value="two">Two</VxTabsTrigger>
            <VxTabsTrigger value="three">Three</VxTabsTrigger>
          </VxTabsList>
          <VxTabsContent value="one">
            <VxText>Content for tab one.</VxText>
          </VxTabsContent>
          <VxTabsContent value="two">
            <VxText>Content for tab two.</VxText>
          </VxTabsContent>
          <VxTabsContent value="three">
            <VxText>Content for tab three.</VxText>
          </VxTabsContent>
        </VxTabs>
      </div>

      <div>
        <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Avatar</VxText>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <VxAvatar style="primary" size="sm">JD</VxAvatar>
          <VxAvatar style="secondary" size="md">AB</VxAvatar>
          <VxAvatar style="primary" size="lg">CD</VxAvatar>
        </div>
      </div>
    </div>

    <VxSeparator style="margin: 1.5rem 0;" />

    <VxText variant="headline-base" style="margin-bottom: 0.5rem;">Text Variants</VxText>
    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      <VxText variant="display-lg">Display Large</VxText>
      <VxText variant="headline-base">Headline Medium</VxText>
      <VxText variant="title-lg">Title Large</VxText>
      <VxText variant="title-base">Title Medium</VxText>
      <VxText variant="body-lg">Body Large</VxText>
      <VxText variant="body-base">Body Medium</VxText>
      <VxText variant="body-sm">Body Small</VxText>
    </div>
  </div>
</template>