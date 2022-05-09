import { RequiredTreeNodeOptions } from './types'

// 复选框向下更新
function updateDown(state: boolean, node: RequiredTreeNodeOptions) {
  const update = (children: RequiredTreeNodeOptions[]) => {
    children.forEach(child => {
      if (!child.disabled) {
        child.checked = state
      }
      if (child.children.length) {
        update(child.children as RequiredTreeNodeOptions[])
      }
    })
  }
  update(node.children as RequiredTreeNodeOptions[])
}

// 向上更新
function updateUp(node: RequiredTreeNodeOptions, tree: RequiredTreeNodeOptions[]) {
  const parentKey = node.parentKey
  const parent = tree.find(node => node.nodeKey === parentKey)
  if (parent) {
    const state = parent.children.every(child => child.checked)
    parent.checked = state
    if (parent.parentKey) {
      updateUp(parent, tree)
    }
  }
}

export { updateDown, updateUp }
