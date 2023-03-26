<template>
  <!-- eslint-disable  -->
  <EmptyLayout>
    <div class="notFoundPage__container container">
      <img class="notFoundPage__img" src="../assets/img/notFound.png" alt="Ничего не найдено">
      <div class="notFoundPage__info">
        <h1 class="notFoundPage__title">
          Страница не найдена
        </h1>
        <p class="notFoundPage__descr">
          Попробуйте найти на <router-link class="notFoundPage__link" :to="{ name: 'main' }">главной
            странице</router-link>.
        </p>
      </div>
    </div>
  </EmptyLayout>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';

export default {
  components: {
    EmptyLayout,
  },
};
</script>
