<script setup lang="ts">
import FormDemo from '../examples/FormDemo.vue'
</script>

# Form 表单

组合相关字段，统一标签、说明与校验状态

## 基础用法

<DemoExample>

<ClientOnly>
  <FormDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import type { FormInstance, FormRules } from '@codex-proxy/ui'
import { ZButton, ZForm, ZFormItem, ZInput } from '@codex-proxy/ui'
import { reactive, useTemplateRef } from 'vue'

interface RuleForm { name: string }
const emit = defineEmits<{ save: [value: RuleForm] }>()
const form = useTemplateRef<FormInstance>('form')
const model = reactive<RuleForm>({ name: '' })
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请填写名称', trigger: 'blur' },
    { min: 3, max: 12, message: '名称长度为 3 到 12 个字符', trigger: 'blur' },
  ],
})
async function save() {
  const valid = await form.value?.validate().catch(() => false)
  if (!valid)
    return
  emit('save', { ...model })
}
</script>

<template>
  <ZForm ref="form" :model="model" :rules="rules" label-position="right" label-width="100px" scroll-to-error focus-on-error novalidate @submit="save">
    <ZFormItem prop="name" label="名称">
      <ZInput v-model="model.name" />
    </ZFormItem>
    <ZButton native-type="submit">
      保存
    </ZButton>
    <ZButton @click="form?.resetFields()">
      重置
    </ZButton>
  </ZForm>
</template>
```

</template>

</DemoExample>

## 标签与错误反馈

`label-position` 支持 `left`、`right`、`top`，分别表示左对齐、右对齐和顶部标签。FormItem 可独立设置，空值继承 Form；Form 默认 `top`

横向布局通过 `label-width` 设置标签列宽度，数字按 px 处理，`auto` 按同一表单中标签的最大宽度对齐。FormItem 可覆盖列宽；窄屏可由调用方切换为 `top`

单控件自动关联标签和控件 ID；多控件使用组标签，各控件需要自己的可访问名称。`for` 可显式指定标签关联的控件，辅助按钮放在 `label-extra` 或 `extra`

顶部标签与控件间距为 8px。错误提示绝对定位在控件下方，不改变字段和表单高度，使用公共 `z-zoom-in-top` 过渡。字段之间保留至少 18px 间距，ZForm 默认提供此间距；长错误单行省略，完整内容通过 `title` 和 `aria-describedby` 提供

## 校验规则

`FormRules<T>` 按模型字段路径声明规则，支持单条规则或数组，使用 `@rc-component/async-validator` 执行校验

规则支持 `required`、`type`、`min / max / len`、`pattern`、`enum`、`whitespace`、`transform`、`fields / defaultField`、`message`、`validator / asyncValidator`。具体取值与校验语义参见 [规则说明](https://github.com/react-component/async-validator#rules)

`trigger` 为事件名或事件数组，控件提供 `blur`、`change`；未设置时两者都执行。主动调用 `validate / validateField` 会检查全部规则

自定义校验接收 `(rule, value, callback, source, options)`，可通过 `callback(new Error(message))` 报错；`asyncValidator` 也可返回 Promise。跨字段校验从业务模型读取关联值，`source` 是当前字段的校验输入

## Form API {#api}

### 属性 {#zform}

| 属性                       | 说明                             | 类型                               | 默认值                 |
| -------------------------- | -------------------------------- | ---------------------------------- | ---------------------- |
| `model`                    | 校验与重置操作的业务模型         | `object`                           | —                      |
| `rules`                    | 按字段路径配置的规则             | `FormRules<T>`                     | —                      |
| `label-position`           | 标签位置                         | `'left' \| 'right' \| 'top'`       | `'top'`                |
| `label-width`              | 横向标签列宽度                   | `string \| number`                 | `'auto'`               |
| `show-message`             | 显示字段错误信息                 | `boolean`                          | `true`                 |
| `validate-on-rule-change`  | 规则变化时重新校验               | `boolean`                          | `true`                 |
| `scroll-to-error`          | 提交校验失败时滚动到首个错误字段 | `boolean`                          | `false`                |
| `scroll-into-view-options` | 滚动选项                         | `boolean \| ScrollIntoViewOptions` | `{ block: 'nearest' }` |
| `focus-on-error`           | 提交校验失败时聚焦首个错误字段   | `boolean`                          | `false`                |

原生 form 属性透传，submit 阻止浏览器默认提交。使用组件校验时设置 `novalidate`，避免原生校验先拦截提交；保存操作由调用方执行

### 事件

| 事件       | 说明               | 参数                     |
| ---------- | ------------------ | ------------------------ |
| `validate` | 字段完成校验后触发 | `prop, isValid, message` |

### 插槽

| 插槽      | 说明             |
| --------- | ---------------- |
| `default` | 表单字段与操作区 |

### 实例

| 方法或属性                         | 合同                                     |
| ---------------------------------- | ---------------------------------------- |
| `validate(callback?)`              | 校验全部字段，返回 `Promise<boolean>`    |
| `validateField(props?, callback?)` | 校验全部或指定字段                       |
| `resetFields(props?)`              | 恢复字段初值并清空组件校验状态           |
| `clearValidate(props?)`            | 清空全部或指定字段的组件错误，不修改模型 |
| `scrollToField(prop)`              | 滚动到字段                               |
| `focusField(prop)`                 | 聚焦实际控件                             |
| `fields / getField(prop)`          | 已登记字段列表 / 指定字段上下文          |
| `setInitialValues(model)`          | 更新重置基准，不修改当前模型             |

未传 callback 时，校验通过 resolve `true`，失败 reject 按字段组织的错误对象；传入 callback 时调用 `(isValid, invalidFields?)`，失败 resolve `false`。后一次校验、清空或卸载使旧的异步结果失效，被取代的校验返回 `false`

`props` 支持字段名、字段名列表或嵌套路径列表，如 `['name', 'user.email']`、`[['user', 'email']]`；省略或空数组表示全部字段

初值在字段首次挂载时记录，临时卸载后继续保留。异步加载模型后可调用 `setInitialValues(model)` 更新基准；重置直接修改传入模型，模型需可写

`clearValidate` 不修改调用方提供的 `error / validate-status`

## FormItem API

### 属性 {#zformitem}

| 属性                          | 说明                                               | 类型                                         | 默认值     |
| ----------------------------- | -------------------------------------------------- | -------------------------------------------- | ---------- |
| `prop`                        | 模型字段路径，如 `user.name` 或 `['user', 'name']` | `string \| string[]`                         | —          |
| `rules`                       | 与表单规则合并的字段规则                           | `FormRule \| FormRule[]`                     | —          |
| `label-position`              | 标签位置                                           | `'' \| 'left' \| 'right' \| 'top'`           | 继承 Form  |
| `label-width`                 | 标签列宽度                                         | `string \| number`                           | 继承 Form  |
| `for`                         | 标签关联的控件 ID                                  | `string`                                     | 自动关联   |
| `label / description / error` | 标签、帮助与外部错误；外部错误优先                 | `string`                                     | —          |
| `required`                    | 覆盖必填规则与标记                                 | `boolean`                                    | 由规则推导 |
| `show-message`                | 显示错误信息                                       | `boolean`                                    | 继承 Form  |
| `validate-status`             | 外部校验状态                                       | `'' \| 'validating' \| 'success' \| 'error'` | 自动       |

### 插槽

| 插槽          | 说明             |
| ------------- | ---------------- |
| `default`     | 字段控件         |
| `label`       | 自定义标签       |
| `label-extra` | 标签旁的辅助内容 |
| `extra`       | 字段辅助内容     |

### 实例

| 方法或属性                                     | 说明                       |
| ---------------------------------------------- | -------------------------- |
| `validate(trigger?, callback?)`                | 校验当前字段               |
| `resetField()`                                 | 恢复字段初值并清空校验状态 |
| `clearValidate()`                              | 清空组件维护的校验状态     |
| `setInitialValue(value)` / `getInitialValue()` | 设置或读取重置基准         |
| `focus()`                                      | 聚焦字段控件               |
| `scrollIntoView(options?)`                     | 滚动到当前字段             |
| `validateState` / `validateMessage`            | 当前校验状态与提示         |
| `fieldValue`                                   | 当前字段值                 |
