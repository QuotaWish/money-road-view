<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import { ContainerLayout } from '~/modules/core'
</script>

<template>
  <ContainerLayout>
    <RouterView />
    <Toaster
      position="top-right"
      :toast-options="{
        class: 'Toast',
      }" rich-colors
    />
  </ContainerLayout>
</template>
