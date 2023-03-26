<template>
  <!-- eslint-disable  -->
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="computedSrc" width="120" height="120" :alt="item.product.title" />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <div class="product__info product__info--color">
      <div class="product__info-color">
        Цвет:
        <span>
          <i style="border: 1px solid #222;" :style="{ 'background-color': item.color.color.code }"></i>
        </span>
      </div>
      <div class="product__info-size">
        Размер:
        <span>
          {{ item.size.title }}
        </span>
      </div>
    </div>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <!-- Счетчик продуктов -->
    <ProductCounter :quantity.sync="quantity" />

    <b class="product__price">
      {{ (item.quantity * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
/* eslint-disable */
import noPhoto from '@/assets/img/noPhoto.png';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductCounter from '@/components/Product/ProductCounter.vue';

export default {
  components: { ProductCounter },
  filters: { numberFormat },
  props: {
    item: Object,
  },
  data() {
    return {
      noPhoto,
    };
  },
  computed: {
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        this.$store.dispatch('cart/updateCartProductQuantity', {
          basketItemId: this.item.basketItemId,
          quantity: value,
        });
      },
    },
    computedSrc: {
      get() {
        return this.item.color.gallery ? this.item.color.gallery[0].file.url : noPhoto;
      },
    },
  },
  methods: {
    ...mapActions('cart', ['deleteCartProduct']),
    deleteProduct() {
      this.deleteCartProduct({ basketItemId: this.item.basketItemId });
    },
  },
};
</script>
<style>
/* .product__info-color {
  margin-bottom: 10px;
} */
</style>
