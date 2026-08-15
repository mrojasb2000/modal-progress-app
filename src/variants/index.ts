import { MODELS } from './models'
import { THEMES } from './themes'
import VariantModal from './VariantModal'
import type { Variant } from './VariantModal'

export const ALL_VARIANTS: Variant[] = MODELS.flatMap((model) =>
  THEMES.map((theme) => ({
    key: `${model.key}-${theme.key}`,
    name: `${theme.name} · ${model.name}`,
    model,
    theme,
  })),
)

export { VariantModal }
