import { defineComponent, VNode, VNodeArrayChildren } from 'vue'
import './index.scss'

interface SlotChildren extends VNodeArrayChildren {
  title: () => VNode
}

export default defineComponent({
  name: 'Tabs',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'tab-click'],
  setup(props, { slots, emit }) {
    const handleClick = (pane: VNode) => {
      emit('update:modelValue', pane.props?.name)
      emit('tab-click', {
        label: pane.props?.label,
        name: pane.props?.name
      } as { label: string; name: string })
    }
    const renderNavs = () => {
      return slots.default?.().map((pane) => {
        return <div
          onClick={() => handleClick(pane)}
          class={['ant-tab-pane', pane.props?.name === props.modelValue ? 'active' : null]}>{(pane.children as SlotChildren)?.title?.() ?? pane.props?.label}</div>
      })
    }
    const renderContent = () => {
      return slots.default?.().find(pane => pane.props?.name === props.modelValue)
    }
    return () => (<div class='ant-tabs'>
      <div class='navs'>
        {renderNavs()}
      </div>
      {renderContent()}
    </div>)
  }
})