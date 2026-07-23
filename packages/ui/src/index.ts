// @pixela-gt/voxel-ui - Component Library

// Shared types
export type { ComponentSize, AccentColor, Density, ButtonStyle, ClassValue } from './types/shared'

// Component types (VX-prefixed)
export type { ButtonProps as VXButtonProps } from './components/Button/Button.types'
export type { IconButtonProps as VXIconButtonProps } from './components/IconButton/IconButton.types'
export type {
  LinkProps as VXLinkProps,
  LinkStyle as VXLinkStyle,
} from './components/Link/Link.types'
export type {
  ToggleButtonProps as VXToggleButtonProps,
  ToggleButtonGroupProps as VXToggleButtonGroupProps,
} from './components/ToggleButton/ToggleButton.types'
export type {
  TooltipProps as VXTooltipProps,
  TooltipPosition as VXTooltipPosition,
} from './components/Tooltip/Tooltip.types'
export type { CheckboxProps as VXCheckboxProps } from './components/Checkbox/Checkbox.types'
export type {
  RadioGroupProps as VXRadioGroupProps,
  RadioItemProps as VXRadioItemProps,
} from './components/Radio/Radio.types'
export type { SwitchProps as VXSwitchProps } from './components/Switch/Switch.types'
export type {
  CardProps as VXCardProps,
  CardElevation as VXCardElevation,
} from './components/Card/Card.types'
export type {
  SeparatorProps as VXSeparatorProps,
  SeparatorOrientation as VXSeparatorOrientation,
} from './components/Separator/Separator.types'
export type { DropdownMenuProps as VXDropdownMenuProps } from './components/DropdownMenu/DropdownMenu.types'
export type {
  DrawerProps as VXDrawerProps,
  DrawerState as VXDrawerState,
} from './components/Drawer/Drawer.types'
export type {
  AvatarProps as VXAvatarProps,
  AvatarStyle as VXAvatarStyle,
} from './components/Avatar/Avatar.types'
export type { DialogProps as VXDialogProps } from './components/Dialog/Dialog.types'
export type {
  BadgeProps as VXBadgeProps,
  BadgeVariant as VXBadgeVariant,
} from './components/Badge/Badge.types'
export type { TabsProps as VXTabsProps } from './components/Tabs/Tabs.types'
export type { AccordionProps as VXAccordionProps } from './components/Accordion/Accordion.types'
export type { LabelProps as VXLabelProps } from './components/Label/Label.types'
export type { SliderProps as VXSliderProps } from './components/Slider/Slider.types'
export type { ToggleProps as VXToggleProps } from './components/Toggle/Toggle.types'
export type {
  ToggleGroupProps as VXToggleGroupProps,
  ToggleGroupItemProps as VXToggleGroupItemProps,
} from './components/ToggleGroup/ToggleGroup.types'
export type { PinInputProps as VXPinInputProps } from './components/PinInput/PinInput.types'
export type { NumberFieldProps as VXNumberFieldProps } from './components/NumberField/NumberField.types'
export type {
  TextProps as VXTextProps,
  TextCategory as VXTextCategory,
  TextSize as VXTextSize,
  TextVariant as VXTextVariant,
  TextWeight as VXTextWeight,
  TextAlign as VXTextAlign,
  TextColor as VXTextColor,
} from './components/Text/Text.types'

// Components (VX-prefixed)
export { Button as VXButton } from './components/Button'
export { IconButton as VXIconButton } from './components/IconButton'
export { Link as VXLink } from './components/Link'
export {
  ToggleButton as VXToggleButton,
  ToggleButtonGroup as VXToggleButtonGroup,
} from './components/ToggleButton'
export { Tooltip as VXTooltip } from './components/Tooltip'
export { Checkbox as VXCheckbox } from './components/Checkbox'
export { RadioGroup as VXRadioGroup, RadioItem as VXRadioItem } from './components/Radio'
export { Switch as VXSwitch } from './components/Switch'
export { Card as VXCard } from './components/Card'
export { Separator as VXSeparator } from './components/Separator'
export { DropdownMenu as VXDropdownMenu } from './components/DropdownMenu'
export { Drawer as VXDrawer } from './components/Drawer'
export { Avatar as VXAvatar } from './components/Avatar'
export { Dialog as VXDialog } from './components/Dialog'
export { Badge as VXBadge } from './components/Badge'
export {
  Tabs as VXTabs,
  TabsList as VXTabsList,
  TabsTrigger as VXTabsTrigger,
  TabsContent as VXTabsContent,
} from './components/Tabs'
export {
  Accordion as VXAccordion,
  AccordionItem as VXAccordionItem,
  AccordionHeader as VXAccordionHeader,
  AccordionTrigger as VXAccordionTrigger,
  AccordionContent as VXAccordionContent,
} from './components/Accordion'
export { Text as VXText } from './components/Text'
export { Label as VXLabel } from './components/Label'
export { Slider as VXSlider } from './components/Slider'
export { Toggle as VXToggle } from './components/Toggle'
export {
  ToggleGroup as VXToggleGroup,
  ToggleGroupItem as VXToggleGroupItem,
} from './components/ToggleGroup'
export { PinInput as VXPinInput } from './components/PinInput'
export { NumberField as VXNumberField } from './components/NumberField'

// Composables
export { useTheme, type ThemeMode } from './composables/useTheme'
export { useThemeConfig, type ThemeColors, type ThemeConfig } from './composables/useThemeConfig'
