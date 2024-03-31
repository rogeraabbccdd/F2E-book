<template>
  <figure class="image-figure">
    <template v-if="!link">
      <img :src="realSrc" :alt="alt" :title="title">
      <figcaption>
        <slot></slot>
      </figcaption>
    </template>
    <template v-else>
      <a :href="link" target="_blank">
        <img :src="realSrc" :alt="alt" :title="title">
      </a>
      <a :href="link" target="_blank">
        <figcaption>
          <slot></slot>
        </figcaption>
      </a>
    </template>
  </figure>
</template>

<script setup>
import { withBase } from 'vitepress'
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String
  }
})

const realSrc = computed(() => withBase(props.src))
</script>
