export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarItem } from './SidebarItem.vue'
export { default as SidebarItemGroup } from './SidebarItemGroup.vue'
export { default as SidebarSection } from './SidebarSection.vue'
export { default as SidebarHeading } from './SidebarHeading.vue'
export { default as SidebarCollapseButton } from './SidebarCollapseButton.vue'
export type {
  SidebarProps,
  SidebarItemProps,
  SidebarItemGroupProps,
  SidebarSectionProps,
  SidebarHeadingProps,
  SidebarCollapseButtonProps,
  SidebarContext,
} from './Sidebar.types'
// ponytail: items-array types kept temporarily for backward compat during migration
export type {
  SidebarItemData,
  SidebarGroupData,
  SidebarNavItem,
} from './Sidebar.types'
