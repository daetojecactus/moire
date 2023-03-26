<template>
  <!-- eslint-disable  -->
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="currentImage" :alt="currentImage" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }}₽ </span>

    <!-- Список цветов -->
    <ProductColorList :colors="product.colors" :currentColor.sync="currentColor" />
  </li>
</template>

<script>
import noPhoto from '@/assets/img/noPhoto.png';
import numberFormat from '@/helpers/numberFormat';
import ProductColorList from './ProductColorList.vue';

export default {
  components: { ProductColorList },
  filters: {
    numberFormat,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      currentColor: null,
      currentImage: this.product.colors[0].gallery
        ? this.product.colors[0].gallery[0].file.url
        : noPhoto,
    };
  },
  watch: {
    currentColor: {
      handler(value) {
        if (typeof value.color !== 'undefined') this.currentColor = value.color;
        if (typeof value.gallery !== 'undefined') {
          if (value.gallery !== null) {
            this.currentImage = value.gallery[0].file.url;
          } else {
            this.currentImage = noPhoto;
          }
        }
      },
    },
  },
};
</script>
