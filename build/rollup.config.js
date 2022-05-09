import { join } from 'path'

import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs' // commonjs转es6, 前端代码不需要
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import del from 'rollup-plugin-delete'

const baseOutput = (format) => ({
  format,
  file: `lib/${format}/index.js`
})
const umdOutput = (format) => ({
  ...baseOutput(format),
  name: 'vue3-components-lib',
  exports: 'named',
  globals: {
    vue: 'Vue'
  }
})
export default ({ format }) => {
  console.log('format->', format)
  return {
    input: join(__dirname, '../src/components/index.ts'),
    output: format === 'umd' ? umdOutput(format) : baseOutput(format),
    plugins: [
      // 在打包之前将上一次打包结果删除
      del({ targets: 'lib/' + format }),
      terser(),
      nodeResolve(),
      scss({
        exclude: ['node_modules'],
        outputStyle: 'compressed',
        prefix: `@import "src/styles/_variable.scss";`
      }),
      css(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false
      }),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        babelHelpers: 'runtime'
      })
    ],
    // 将vue文件排出rollup打包，因为用户下载我们的库时，肯定已经安装过vue
    external (id) {
      return /^vue/.test(id)
    }
  }
}
