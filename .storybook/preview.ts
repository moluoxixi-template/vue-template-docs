import '../src/assets/main.css'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3'
import { computed } from 'vue'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => ({
      components: { Story },
      template: `
        <el-config-provider :locale="zhCn" :empty-values="[undefined]">
          <div
            class="flex flex-col overflow-hidden w-full h-full"
          >
            <story />
          </div>
        </el-config-provider>
      `,
      setup() {
        return {}
      },
    }),
  ],
}

setup((app) => {
  app.use(elementPlus, {
    locale: zhCn,
  })

  app.use(VxeUI)
  app.use(VxeUITable)
})

export default preview
