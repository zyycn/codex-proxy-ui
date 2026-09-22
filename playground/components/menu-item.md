<script setup lang="ts">
import MenuItemDemo from '../examples/MenuItemDemo.vue'
</script>

# MenuItem 菜单项

用于操作列表，可组合图标、禁用、加载与危险操作

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <MenuItemDemo />
  </div>
</ClientOnly>

## 使用要点

默认插槽提供操作文字，`icon` 插槽放置图标，`tone="destructive"` 标识危险操作

`disabled` 与 `loading` 阻止点击，组件是按钮，不负责菜单容器的定位与开关

## 示例源码

<<< ../examples/MenuItemDemo.vue
