export function hasActiveInputElement(
  options: {
    includeContentEditable?: boolean
    includeSelect?: boolean
    checkDisabled?: boolean
    checkReadOnly?: boolean
  } = {},
) {
  const {
    includeContentEditable = true,
    includeSelect = true,
    checkDisabled = true,
    checkReadOnly = true,
  } = options

  const focusedElement = document.activeElement

  if (!focusedElement || focusedElement === document.body) {
    return false
  }

  // 基本输入元素检查
  let isInputElement = focusedElement instanceof HTMLInputElement
    || focusedElement instanceof HTMLTextAreaElement

  // 可选检查项
  if (includeSelect) {
    isInputElement = isInputElement || focusedElement instanceof HTMLSelectElement
  }

  if (includeContentEditable) {
    isInputElement = isInputElement || (focusedElement as HTMLElement).isContentEditable
  }

  // 状态检查
  if (checkDisabled && (focusedElement as HTMLInputElement).disabled) {
    return false
  }

  if (checkReadOnly && (focusedElement as HTMLInputElement).readOnly) {
    return false
  }

  return isInputElement
}
