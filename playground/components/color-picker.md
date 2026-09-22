<script setup lang="ts">
import ColorPickerDemo from '../examples/ColorPickerDemo.vue'
</script>

# ColorPicker 颜色选择

通过色板、预设色或颜色输入选择颜色，确认后更新绑定值

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <ColorPickerDemo />
  </div>
</ClientOnly>

## 使用要点

`v-model` 绑定颜色字符串，`presets` 配置快捷色板，`label` 提供可访问名称

`allowAlpha` 默认为 `true`，不需要透明度时设为 `false`，`disabled` 禁用交互

## 示例源码

<<< ../examples/ColorPickerDemo.vue
