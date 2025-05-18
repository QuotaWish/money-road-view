<script setup lang="ts">

</script>

<template>
  <keep-alive>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </keep-alive>
</template>
