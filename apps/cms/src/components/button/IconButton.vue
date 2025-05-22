<script lang="ts" setup>
defineProps<{
  icon?: string
  title?: string
}>()

const slots = useSlots()
</script>

<template>
  <div class="IconButton flex flex-col h-[64px] w-[64px] items-center justify-center">
    <div class="IconButton-Icon flex items-center justify-center">
      <slot name="icon">
        <div :class="icon" />
      </slot>
    </div>
    <div class="IconButton-Label text-sm">
      <slot v-if="slots.default">
        {{ title }}
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.IconButton {
  &-Icon {
    width: 36px;
    height: 36px;

    border-radius: 50%;
    background-color: var(--color-neutral-1);
  }

  &-Label {
    font-size: 12px;
  }

  &:hover {
    .IconButton-Icon {
      border: 1px solid var(--color-neutral-3);
    }

    .IconButton-Label {
      color: rgb(var(--arcoblue-8));
    }
  }

  cursor: pointer;
}
</style>
