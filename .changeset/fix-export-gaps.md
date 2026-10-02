---
"@pixela/voxel-ui": patch
"@pixela/voxel-ui-nuxt": patch
---

Fix missing exports across barrel, Nuxt module, and patterns subpath:

- **Barrel**: export `DateRangeField` + `DateRangeFieldProps` (component existed but was never exported from `@pixela/voxel-ui`)
- **`@pixela/voxel-ui/patterns`**: re-export `DataTable`, `DataTableServer`, `AttributePresenter` and their types (subpath previously only exposed PageHeader/EmptyState)
- **Nuxt module**: register `VxDateField`, `VxDateRangeField`, `VxTimeField`, `VxTimeRangeField` (missing from auto-import list)
- Barrel now imports all patterns uniformly from `./patterns` instead of direct subfolder paths
