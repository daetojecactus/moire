<template>
  <!-- eslint-disable  -->
  <BaseLayout>
    <main class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Корзина
            </a>
          </li>
        </ul>

        <div class="content__row">
          <h1 class="content__title">
            Корзина
          </h1>
          <span class="content__info">
            Кол-во товаров:
            {{ totalQuantity }}
          </span>
        </div>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
              <CartItem v-for="item in products" :key="item.basketItemId" :item="item" />
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки при&nbsp; переходе к следующему этапу
            </p>
            <p class="cart__price">
              Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
            </p>

            <router-link v-if="products.length" tag="button" :to="{ name: 'order' }"
              class="cart__button button button--primery" type="submit">
              Оформить заказ
            </router-link>
          </div>
          <vue-modaltor :visible="open" @hide="closeModal" :show-close-button="false">
            <div class="cart__error form__error-block" style="text-align:center;">
              <h4>Ошибка!</h4>
              <p v-if="cartErrors">
                {{ cartErrorMessage }}
              </p>
            </div>
          </vue-modaltor>
        </form>
      </section>
    </main>
  </BaseLayout>
</template>

<script>
import CartItem from '@/components/Cart/CartItem.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  components: { BaseLayout, CartItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState('cart', [
      'open',
      'cartErrors',
      'cartError',
      'cartErrorMessage',
    ]),
    ...mapGetters('cart', {
      products: 'cartDetailproducts',
      cartTotalPrice: 'cartTotalPrice',
      totalQuantity: 'cartTotalQuantity',
    }),
  },
  methods: {
    ...mapActions('cart', [
      'closeModal',
    ]),
  },
};
</script>
