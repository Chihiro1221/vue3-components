import { RequiredTreeNodeOptions, TreeNodeOptions } from './types'
import { cloneDeep } from 'lodash-es'

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

// 拍平数组
function flattenTree(
  list: TreeNodeOptions[],
  level = 0,
  parent: RequiredTreeNodeOptions | null = null
): RequiredTreeNodeOptions[] {
  const result: RequiredTreeNodeOptions[] = []
  list.map(item => {
    const node: RequiredTreeNodeOptions = {
      ...item,
      level,
      loading: false,
      expanded: item.expanded || false,
      disabled: item.disabled || false,
      checked: item.checked || false,
      parentKey: item.parentKey || parent?.nodeKey || null,
      selected: item.selected || false,
      hasChildren: item.hasChildren || false,
      children: item.children || []
    }
    result.push(node)
    if (node.expanded && node.children.length) {
      result.push(...flattenTree(node.children, level + 1, node))
    }
  })
  return result
}


// 渲染子集
const expand = (node: RequiredTreeNodeOptions, tree: RequiredTreeNodeOptions[], children?: TreeNodeOptions[]) => {
  const flatChildrenList = cloneDeep(children ?? node.children).map(item => {
    return {
      ...item,
      level: item.level || node.level + 1,
      loading: false,
      expanded: item.expanded || false,
      disabled: item.disabled || false,
      checked: item.checked || false,
      parentKey: item.parentKey || node.nodeKey,
      selected: item.selected || false,
      hasChildren: item.hasChildren || false,
      children: item.children || []
    }
  })
  node.children = flatChildrenList
  const nodeIndex = tree.findIndex(item => item.nodeKey === node.nodeKey)
  if (nodeIndex > -1) {
    tree.splice(nodeIndex + 1, 0, ...flatChildrenList)
  }
}


// 删除子集
const collapseNode = (node: RequiredTreeNodeOptions) => {
  const removeNodeKeys: (string | number)[] = []

  function recursion(node: RequiredTreeNodeOptions) {
    if (node.children.length) {
      node.children.forEach(currentNode => {
        removeNodeKeys.push(currentNode.nodeKey)
        if (currentNode.children?.length && currentNode.expanded) {
          currentNode.expanded = false
          recursion(currentNode as RequiredTreeNodeOptions)
        }
      })
    }
  }

  recursion(node)
  return removeNodeKeys
}


export { updateDown, updateUp, flattenTree, expand, collapseNode }
