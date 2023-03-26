<template>
  <!-- eslint-disable  -->
  <ul class="pics__list">
    <li class="pics__item" v-for="image in images" :key="image.name">
      <a href="#" @click.prevent="selectImage(image)">
        <img class="pics__gallery" :src="image.gallery ? image.gallery[0].file.url : noPhoto"
          :alt="image.gallery ? image.gallery[0].file.url : noPhoto" :class="{
            'pics__link pics__link--current':
              currentImage === (image.gallery ? image.gallery[0].file.url : noPhoto),
          }" />
      </a>
    </li>
  </ul>
</template>

<script>
import noPhoto from '@/assets/img/noPhoto.png';

export default {
  props: ['images', 'currentImage'],
  data() {
    return {
      noPhoto,
    };
  },
  methods: {
    selectImage(value) {
      this.$emit('update:currentImage', value);
    },
  },
};
</script>
