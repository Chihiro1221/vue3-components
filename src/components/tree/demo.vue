<script setup lang='ts'>
import { nodeKey, TreeInstance, TreeNodeOptions } from '@/components/tree/types'
import { h, onMounted, ref, render } from 'vue'
import { CheckboxTuple } from '@/components/types'

// 基本
// function recursion(path = '0', level = 2): TreeNodeOptions[] {
//   const list = []
//   for (let i = 0; i < 5; i += 1) {
//     const nodeKey = `${path}-${i}`
//     const treeNode: TreeNodeOptions = {
//       nodeKey,
//       name: nodeKey,
//       children: [],
//       hasChildren: true,
//       expanded: false
//     }
//     if (level > 0) {
//       treeNode.children = recursion(nodeKey, level - 1)
//     } else {
//       treeNode.hasChildren = false
//     }
//     list.push(treeNode)
//   }
//   return list
// }

// 懒加载
function recursion(path = '0'): TreeNodeOptions[] {
  const list = []
  for (let i = 0; i < 2; i += 1) {
    const nodeKey = `${path}-${i}`
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      selected: i === 0,
      // children: [],
      hasChildren: true
    }
    list.push(treeNode)
  }
  return list
}

// 懒加载初始化
const lazyLoad = (node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => {
  const result: TreeNodeOptions[] = []
  for (let i = 0; i < 2; i += 1) {
    const nodeKey = `${node.nodeKey}-${i}`
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      checked: node.checked,
      // disabled: i % 2 === 0,
      hasChildren: true
    }
    result.push(treeNode)
  }
  setTimeout(() => {
    callback(result)
  }, 1000)
}

const list = ref<TreeNodeOptions[]>([])
const treeRef = ref<TreeInstance>()
onMounted(() => {
  list.value = recursion()
})
const handleSelect = (node: TreeNodeOptions, selectedKey: nodeKey) => {
  // console.log(node, selectedKey)
}
// 自定义渲染节点
const renderNode = (node: TreeNodeOptions) => {
  const render = () => {
    return h('div', { class: 'custom-div' }, node.name)
  }
  return render()
}
const handleCheckboxChange = ([state, node]: CheckboxTuple) => {
  // console.log(state, node)
}
const getSelectedNode = () => {
  console.log(treeRef.value?.getSelectedNode())
}
const getCheckedNodes = () => {
  console.log(treeRef.value?.getCheckedNodes())
}
const getHalfCheckedNodes = () => [
  console.log(treeRef.value?.getHalfCheckedNodes())
]
</script>

<template>
  <div class='operator'>
    <button @click='getSelectedNode'>获取选择节点</button>
    <button @click='getCheckedNodes'>获取所有选中节点</button>
    <button @click='getHalfCheckedNodes'>获取所有半选节点</button>
  </div>
  <Tree
    ref='treeRef'
    :source='list'
    :lazy-load='lazyLoad'
    @select='handleSelect'
    @checkbox-change='handleCheckboxChange'
    show-checkbox
  >
    <template #icon='loading'>
      <i v-if='loading' class='iconfont iconcustom-icon ico-loading'></i>
      <i v-else class='iconfont iconzhankai'></i>
    </template>
  </Tree>
</template>

<style scoped lang='scss'>
.operator {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
