<template>
  <!-- eslint-disable  -->
  <BaseLayout>
    <main class="content container">
      <div class="content__top">

        <div class="content__row">
          <h1 class="content__title">
            Каталог
          </h1>
          <!-- Меняем кол-во товаров на странице -->
          <span class="content__info"> Кол-во товаров: {{ countProducts }} </span>
          <span class="content__info">
            Показывать:
            <label>
              <select type="text" name="productsPerPage" v-model="productsPerPage">
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </select>
            </label>
          </span>
        </div>
      </div>

      <div class="content__catalog">

        <!-- Фильтрация товаров -->
        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
          :category-id.sync="filterCategoryId" :color-ids.sync="filterColorIds" :material-ids.sync="filterMaterialIds"
          :season-ids.sync="filterSeasonIds" />

        <section class="catalog">
          <!-- Список товаров -->
          <ProductList :products="products" />

          <svg v-if="productsLoading" class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>

          <!-- Пагинация -->
          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />

          <!-- Модальное окно -->
          <vue-modaltor :visible="open" @hide="closeModal" :show-close-button="false">
            <div v-if="productsLoading" class="cart__error form__error-block" style="text-align:center;">
              <h4 v-if="productLoadingFailed">Ошибка при загрузке!</h4>
              <p v-if="productErrorMessage">
                {{ productErrorMessage }}
              </p>
            </div>
          </vue-modaltor>
        </section>
      </div>
    </main>
  </BaseLayout>
</template>

<script>
/*eslint-disable*/
import ProductList from '@/components/Product/ProductList.vue';
import ProductFilter from '@/components/Product/ProductFilter.vue';
import BasePagination from '@/components/Base/BasePagination.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  components: { BasePagination, ProductList, ProductFilter, BaseLayout },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorIds: [],
      filterMaterialIds: [],
      filterSeasonIds: [],
      page: 1,
      productsPerPage: '12',

      productsLoading: false,
    };
  },
  computed: {
    ...mapState('products', [
      'productLoadingFailed',
      'open',
      'productError',
      'productErrorMessage',
    ]),
    ...mapGetters('products', [
      'products',
      'countProducts',
    ]),
  },
  watch: {
    page: 'loadProducts',
    productsPerPage: 'loadProducts',
    filterCategoryId: 'loadProducts',
    filterPriceFrom: 'loadProducts',
    filterPriceTo: 'loadProducts',
    filterColorIds: 'loadProducts',
    filterMaterialIds: 'loadProducts',
    filterSeasonIds: 'loadProducts',
  },
  created() {
    this.loadProducts();
  },
  methods: {
    ...mapActions('products', [
      'loadProductsData',
      'closeModal',
      'openModal',
    ]),
    loadProducts() {
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        this.loadProductsData({
          page: this.page,
          limit: this.productsPerPage,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          categoryId: this.filterCategoryId,
          colorIds: this.filterColorIds,
          materialIds: this.filterMaterialIds,
          seasonIds: this.filterSeasonIds,
        })
          .then(() => this.productsLoading = false);
      }, 300);
    },
  },
};
</script>
