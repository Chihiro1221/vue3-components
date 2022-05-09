import { defineComponent, ref, watch } from 'vue'
import './index.scss'
import { PropType } from '@vue/runtime-core'
import {
  nodeKey,
  renderFunc,
  RequiredTreeNodeOptions,
  TreeInstance,
  TreeNodeInstance,
  TreeNodeOptions
} from '@/components/tree/types'
import TreeNode from './node'
import { CheckboxTuple } from '@/components/types'
import { collapseNode, expand, flattenTree, updateDown, updateUp } from './utils'

export default defineComponent({
  name: 'Tree',
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      required: true
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    lazyLoad: Function as PropType<(node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void>,
    render: Function as PropType<renderFunc>,
    showCheckbox: Boolean as PropType<boolean>
  },
  emits: ['select', 'checkbox-change'],
  setup(props, { emit, slots, expose }) {
    const tree = ref<RequiredTreeNodeOptions[]>([])
    const selectedKey = ref<nodeKey>()
    const loading = ref(false)
    watch(
      () => props.source,
      newVal => {
        tree.value = flattenTree(newVal!)
      },
      { immediate: true }
    )

    const handleExpand = (node: RequiredTreeNodeOptions) => {
      if (loading.value) return
      node.expanded = !node.expanded
      if (node.expanded) {
        if (node.children.length) {
          expand(node, tree.value)
        } else if (node.hasChildren && props.lazyLoad) {
          // 防止重复点击
          loading.value = true
          // 控制图标
          node.loading = true
          props.lazyLoad?.(node, (children: TreeNodeOptions[]) => {
            if (children.length) {
              expand(node, tree.value, children)
            }
            node.loading = false
            loading.value = false
          })
        }
      } else {
        const removeNodeKeys = collapseNode(node)
        tree.value = tree.value.filter(node => !removeNodeKeys.includes(node.nodeKey))
      }
    }

    const handleSelect = (node: RequiredTreeNodeOptions, event?: Event) => {
      event?.stopPropagation()
      if (!node.disabled) {
        const selectNode = tree.value.find(item => item.selected)
        const key = ref<nodeKey>()
        node.selected = !node.selected
        if (node.selected) {
          key.value = node.nodeKey
          selectNode ? (selectNode.selected = false) : null
        }
        selectedKey.value = key.value
        emit('select', node, selectedKey.value)
      }
    }
    const handleCheckboxChange = ([state, node]: CheckboxTuple) => {
      emit('checkbox-change', [state, node])
      if (!props.checkStrictly) {
        updateDown(state, node)
        updateUp(node, tree.value)
      }
    }
    const halfNodeRefs = ref<TreeNodeInstance[]>([])
    const getNodeRefs = (index: number, node: TreeNodeInstance) => {
      if (node) {
        halfNodeRefs.value[index] = node
      }
    }
    expose({
      getSelectedNode() {
        return tree.value.find(node => node.selected)
      },
      getCheckedNodes() {
        return tree.value.filter(node => node.checked)
      },
      getHalfCheckedNodes() {
        return halfNodeRefs.value.filter(node => node.halfChecked()).map(node => node.node)
      }
    } as TreeInstance)
    return () => {
      return (
        <div class='ant-tree-wrap'>
          <div class='ant-tree'>
            {tree.value.map((node, index) => {
              return (
                <TreeNode
                  render={props.render}
                  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                  // @ts-ignore
                  ref={getNodeRefs.bind(null, index)}
                  showCheckbox={props.showCheckbox}
                  renderSlot={slots.icon}
                  node={node}
                  key={node.nodeKey}
                  onExpandClick={handleExpand}
                  onSelectClick={handleSelect}
                  onCheckboxChange={handleCheckboxChange}
                />
              )
            })}
          </div>
        </div>
      )
    }
  }
})
