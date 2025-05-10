import { defineComponent } from 'vue'
import { ElDrawer } from 'element-plus'

export function withModifiedProps(OriginalComponent, propName, modifier = (v) => v) {
  return defineComponent({
    name: OriginalComponent.name,
    setup(props, { attrs, slots }) {
      const modifiedProps = computed(() => ({
        ...attrs,
        [propName]: modifier(attrs[propName])
      }))
      return () => <OriginalComponent {...modifiedProps.value} v-slots={slots} />
    }
  })
}

export function modifyComponents(app, components, propName, modifier) {
  components.forEach((component) => {
    const newComponent = withModifiedProps(component, propName, modifier)
    app.component(newComponent.name, newComponent)
  })
}
