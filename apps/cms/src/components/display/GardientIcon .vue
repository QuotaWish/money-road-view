<script lang="ts" setup>
const props = defineProps<{
  icon: string
  color: string
}>()

const colors = computed(() => {
  const mainColor = props.color

  return {
    color: mainColor,
    primary: `${mainColor}E0`,
    secondary: `${mainColor}80`,
    tertiary: `${mainColor}40`,
  }
})

const style = computed(() => {
  const { color, primary, secondary, tertiary } = colors.value

  return {
    '--color': color,
    '--primary': primary,
    '--secondary': secondary,
    '--tertiary': tertiary,
    '--image': 'linear-gradient(to right, var(--primary), var(--secondary), var(--tertiary))',
  }
})
</script>

<template>
  <div :style="style" class="GardientIcon transition-cubic flex flex-col h-[64px] w-[64px] items-center justify-center">
    <div class="GardientIcon-Icon flex items-center justify-center">
      <slot name="icon">
        <div :class="icon" />
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.GardientIcon {
  &-Icon {
    color: var(--color-text-1);
    font-size: 2em;

    font-weight: 600;
    color: var(--color);

    filter: drop-shadow(0 0 0.5rem var(--color));
  }

  width: 64px;
  height: 64px;

  border-radius: 50%;
  background-color: var(--color-neutral-1);
  border: 1px solid var(--color-neutral-3);

  &:hover {
    transform: scale(0.95);
    filter: drop-shadow(0 0 0.5rem var(--tertiary));
  }
}
</style>
