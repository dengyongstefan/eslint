import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import eslintJsPlugin from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const compat = new FlatCompat({
  baseDirectory: dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: dirname // optional
})

export default [
  eslintPluginPrettierRecommended,
  eslintJsPlugin.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'),
  {
    // 全局配置
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      ecmaVersion: 'latest', // 匹配的js版本
      globals: {
        // 配置全局变量
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@tsPlugin': tsPlugin // 指定ts插件
    },
    languageOptions: {
      parser: tsParser, // 指定ts解析器
      parserOptions: {
        project: './tsconfig.eslint.json'
      }
    }
  },
  {
    files: ['**/*.vue'],
    plugins: {
      '@vuePlugin': vuePlugin // 指定vue插件
    },
    languageOptions: {
      parser: vueParser, // 指定vue解析器
      parserOptions: {
        parser: tsParser // 指定vue中的script解析器
      }
    }
  }
]
