import { computed, defineComponent, Slot } from 'vue'
import { PropType } from '@vue/runtime-core'
import { renderFunc, RequiredTreeNodeOptions, TreeNodeInstance } from '@/components/tree/types'
import Checkbox from '@/components/checkbox'
import { CustomFunction } from '@/components/types'

export default defineComponent({
  name: 'TreeNode',
  props: {
    node: Object as PropType<RequiredTreeNodeOptions>,
    onExpandClick: Function as CustomFunction<RequiredTreeNodeOptions>,
    onSelectClick: Function as CustomFunction<RequiredTreeNodeOptions>,
    render: Function as PropType<renderFunc>,
    renderSlot: Function as PropType<Slot>,
    showCheckbox: Boolean as PropType<boolean>,
    onCheckboxChange: Function as CustomFunction<[boolean, RequiredTreeNodeOptions]>
  },
  emits: ['expand-click', 'select-click', 'checkbox-change'],
  setup(props, { emit, expose }) {
    // 控制半选
    const halfChecked = computed(() => {
      const { children, hasChildren } = props.node!
      if (hasChildren) {
        const checkChildren = children.filter(child => child.checked)
        if (checkChildren.length > 0 && checkChildren.length < children.length) {
          return true
        }
      }
      return false
    })
    expose({
      halfChecked: () => halfChecked.value,
      node: props.node
    } as TreeNodeInstance)
    const renderArrow = () => {
      return (
        <div class={['node-arrow', props.node?.expanded ? 'expanded' : '']}>
          {props.renderSlot?.(props.node?.loading) ??
            (props.node?.hasChildren && props.node.loading ? (
              <i class='iconfont iconloading ico-loading'></i>
            ) : (
              <i class='iconfont iconExpand'></i>
            ))}
        </div>
      )
    }

    const renderContent = () => {
      return (
        props.render?.(props.node!) ?? (
          <div class='node-content node-text'>
            <span
              onClick={handleSelect}
              class={[
                'node-title',
                {
                  disabled: props.node?.disabled,
                  selected: props.node?.selected
                }
              ]}
            >
              {props.node?.name}
            </span>
          </div>
        )
      )
    }

    const handleSelect = (e: Event) => {
      e.stopPropagation()
      emit('select-click', props.node)
    }

    const handleCheckboxChange = (state: boolean) => {
      emit('checkbox-change', [state, props.node])
    }

    const handleNodeClick = (e: Event) => {
      e.stopPropagation()
      emit('expand-click', props.node)
    }

    const renderCheckbox = () => {
      return props.showCheckbox ? (
        <Checkbox
          v-model={props.node!.checked}
          disabled={props.node?.disabled}
          halfChecked={halfChecked.value}
          onChange={handleCheckboxChange}
        >
          {renderArrow()}
          {renderContent()}
        </Checkbox>
      ) : (
        <div>
          {renderArrow()}
          {renderContent()}
        </div>
      )
    }

    return () => {
      return (
        <div onClick={handleNodeClick} class='ant-tree-node' style={{ paddingLeft: props.node!.level * 18 + 'px' }}>
          {renderCheckbox()}
        </div>
      )
    }
  }
})
