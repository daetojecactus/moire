<template>
  <!-- eslint-disable  -->
  <BaseLayout>
    <div>
      <main class="content container" v-if="!product">
        <div style="text-align:center;">
          <h2>
            Не удалось загрузить товар.
          </h2>
        </div>
      </main>
      <main class="content container" v-else>
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
                Каталог
              </router-link>
            </li>
            <!-- <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
                {{ product.category.title }}
              </router-link>
            </li> -->
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">
                {{ product.title }}
              </a>
            </li>
          </ul>
        </div>

        <section class="item">
          <div class="item__pics pics">
            <div class="pics__wrapper">
              <img :src="currentImage" :alt="currentImage" />
            </div>
            <ProductImage :images="product.colors" :currentImage.sync="currentImage" />
          </div>

          <div class="item__info">
            <span class="item__code">Артикул: {{ product.id }}</span>
            <h2 class="item__title">
              {{ product.title }}
            </h2>
            <div class="item__form">
              <form class="form" action="#" method="POST" @submit.prevent="addToCart">
                <div class="item__row item__row--center">
                  <!-- dda -->
                  <ProductCounter :quantity.sync="quantity" :productId="this.product.id" />

                  <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>
                </div>

                <div class="item__row">
                  <fieldset class="form__block">
                    <legend class="form__legend">Цвет</legend>

                    <ProductColorList :colors="product.colors" :currentColor.sync="currentColor" />
                  </fieldset>

                  <fieldset class="form__block">
                    <legend class="form__legend">Размер</legend>
                    <label class="form__label form__label--small form__label--select">
                      <select class="form__select" type="text" name="size" v-model.number="currentSizeId">
                        <option value="0">Выберите размер</option>
                        <option :value="size.id" v-for="size in sizes" :key="size.id">
                          {{ size.title }}
                        </option>
                      </select>
                    </label>
                  </fieldset>
                </div>

                <button class="button button--primery" type="submit" :disabled="quantity === 0">
                  В корзину
                </button>

                <vue-modaltor :visible="open" @hide="closeModal" :show-close-button="false">
                  <div class="cart__error form__error-block" style="text-align:center;">
                    <h4 v-if="incorrectSize">
                      Выберите размер
                    </h4>
                    <h4 v-if="productAddSending">
                      Товар добавляется в корзину...
                    </h4>
                    <h4 v-if="productAdded">
                      Товар добавлен в корзину
                    </h4>
                    <h4 v-if="cartAddingFailed">
                      Ошибка!
                    </h4>
                    <p v-if="cartAddingFailed">
                      {{ cartErrorMessage }}
                    </p>
                  </div>
                </vue-modaltor>
              </form>
            </div>
          </div>

          <div class="item__desc">
            <ul class="tabs">
              <li class="tabs__item">
                <a class="tabs__link tabs__link--current">
                  Информация о товаре
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Доставка и возврат
                </a>
              </li>
            </ul>

            <div class="item__content">
              <h3>Состав:</h3>

              <p>
                60% хлопок<br />
                30% полиэстер<br />
              </p>

              <h3>Уход:</h3>

              <p>
                Машинная стирка при макс. 30ºC короткий отжим<br />
                Гладить при макс. 110ºC<br />
                Не использовать машинную сушку<br />
                Отбеливать запрещено<br />
                Не подвергать химчистке<br />
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </BaseLayout>
</template>

<script>
/*eslint-disable*/
import BaseLayout from '@/layouts/BaseLayout.vue';
import ProductColorList from '@/components/Product/ProductColorList.vue';
import ProductImage from '@/components/Product/ProductImage.vue';
import noPhoto from '@/assets/img/noPhoto.png';
import numberFormat from '@/helpers/numberFormat';
import { mapState, mapActions } from 'vuex';
import ProductCounter from '@/components/Product/ProductCounter.vue';

export default {
  components: { BaseLayout, ProductCounter, ProductColorList, ProductImage },
  filters: {
    numberFormat,
  },
  data() {
    return {
      currentSizeId: 0,
      currentColor: null,
      currentImage: null,
      quantity: 1,
      incorrectSize: false,
    };
  },
  computed: {
    ...mapState('products', [
      'product',
    ]),
    ...mapState('cart', [
      'productAddSending',
      'cartAddingFailed',
      'productAdded',
      'open',
      'cartError',
      'cartErrorMessage',
    ]),
    sizes() {
      return this.product ? this.product.sizes : [];
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct({ id: this.$route.params.id }).catch(() => {
          this.$router.replace('/notFound');
        });
      },
      immediate: true,
    },
    currentSizeId: {
      handler() {
        return this.currentSizeId <= 0;
      },
    },
    product: {
      handler() {
        this.currentColor = this.product.colors[0].color;
        this.currentImage = this.product.colors[0].gallery
          ? this.product.colors[0].gallery[0].file.url
          : noPhoto;
      },
    },
    currentColor: {
      handler(value) {
        if (value.color) this.currentColor = value.color;
        if (typeof value.gallery !== 'undefined') {
          if (value.gallery) {
            this.currentImage = value.gallery[0].file.url;
          } else {
            this.currentImage = noPhoto;
          }
        }
      },
    },
    currentImage: {
      handler(value) {
        if (typeof value.gallery !== 'undefined') {
          if (value.gallery) {
            this.currentImage = value.gallery[0].file.url;
          } else {
            this.currentImage = noPhoto;
          }
        }
        if (value.color) this.currentColor = value.color;
      },
    },
  },
  methods: {
    ...mapActions('products', ['loadProduct']),
    ...mapActions('cart', [
      'addProductToCart',
      'closeModal',
      'openModal',
    ]),
    addToCart() {
      this.incorrectSize = false;
      if (this.currentSizeId > 0) {
        this.addProductToCart({
          productId: this.product.id,
          colorId: this.currentColor,
          sizeId: this.currentSizeId,
          quantity: this.quantity,
        });
      } else {
        this.incorrectSize = true;
      }
      this.openModal();
    },
  },
};
</script>
