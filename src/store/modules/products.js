/* eslint-disable */
import axios from 'axios';
import { API_BASE_URL } from '@/config';

const state = () => ({
  productsData: null,
  product: null,

  productLoadingFailed: false,
  open: false,
  productError: {},
  productErrorMessage: '',

  colorRu: '',

  categories: null,
  colors: null,
  materials: null,
  seasons: null,
});

const getters = {
  products(state) {
    return state.productsData
      ? state.productsData.items.filter((product, index, items) => {
        if (items.indexOf(product) === index) {
          return {
            ...product,
          };
        }
        return null;
      })
      : [];
  },
  countProducts(state) {
    return state.productsData ? state.productsData.pagination.total : 0;
  },
};

const actions = {
  loadProductsData(
    context,
    {
      page, limit, minPrice, maxPrice, categoryId, colorIds, materialIds, seasonIds,
    },
  ) {
    return axios
      .get(`${API_BASE_URL}/api/products`, {
        params: {
          page,
          limit,
          minPrice,
          maxPrice,
          categoryId,
          colorIds,
          materialIds,
          seasonIds,
        },
      })
      .then((response) => {
        context.commit('updateProductsData', response.data);
      })
      .catch((error) => {
        context.commit('updateProductLoadingFailed', true);
        context.commit('updateProductError', error.response.data.error);
        if (error.response.status === 500) {
          context.commit('updateProductErrorMessage', error.response.data.error.message);
          console.log('Ошибка загрузки списка продуктов');
        }
        context.commit('updateOpen', true);
      });
  },
  loadCategories(context) {
    return axios.get(`${API_BASE_URL}/api/productCategories`)
    .then((response) => {
      context.commit('updateCategories', response.data.items);
    })
    .catch((error) => {
      if (error.response.status === 500) {
        context.commit('updateProductErrorMessage', error.response.data.error.message);
        console.log('Ошибка загрузки списка категорий');
      }
      context.commit('updateOpen', true);
    });
  },
  loadColors(context) {
    return axios.get(`${API_BASE_URL}/api/colors`)
    .then((response) => {
      context.commit('updateColors', response.data.items);
    })
    .catch((error) => {
      if (error.response.status === 500) {
        context.commit('updateProductErrorMessage', error.response.data.error.message);
        console.log('Ошибка загрузки списка цветов');
      }
      context.commit('updateOpen', true);
    });
  },
  loadMaterials(context) {
    return axios.get(`${API_BASE_URL}/api/materials`)
    .then((response) => {
      context.commit('updateMaterials', response.data.items);
    })
    .catch((error) => {
      if (error.response.status === 500) {
        context.commit('updateProductErrorMessage', error.response.data.error.message);
        console.log('Ошибка загрузки списка материалов');
      }
      context.commit('updateOpen', true);
    });
  },
  loadSeasons(context) {
    return axios.get(`${API_BASE_URL}/api/seasons`)
    .then((response) => {
      context.commit('updateSeasons', response.data.items);
    })
    .catch((error) => {
      if (error.response.status === 500) {
        context.commit('updateProductErrorMessage', error.response.data.error.message);
        console.log('Ошибка загрузки списка коллекий');
      }
      context.commit('updateOpen', true);
    });
  },
  loadProduct(context, { id }) {
    return axios
      .get(`${API_BASE_URL}/api/products/${id}`)
      .then((response) => {
        context.commit('updateProduct', response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) throw error;
      });
  },
  openModal(context) {
    context.commit('updateOpen', true);
  },
  closeModal(context) {
    context.commit('updateOpen', false);
  },
};

const mutations = {
  updateProductsData(state, productsData) {
    state.productsData = productsData;
  },
  updateCategories(state, categories) {
    state.categories = categories;
  },
  updateColors(state, colors) {
    state.colors = colors;
  },
  updateMaterials(state, materials) {
    state.materials = materials;
  },
  updateSeasons(state, seasons) {
    state.seasons = seasons;
  },
  updateProduct(state, product) {
    state.product = product;
  },
  updateProductLoadingFailed(state, productLoadingFailed) {
    state.productLoadingFailed = productLoadingFailed;
  },
  updateOpen(state, open) {
    state.open = open;
  },
  updateProductError(state, productError) {
    state.productError = productError;
  },
  updateProductErrorMessage(state, productErrorMessage) {
    state.productErrorMessage = productErrorMessage;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
