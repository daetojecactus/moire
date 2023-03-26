<template>
  <!-- eslint-disable  -->
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button class="pagination__link pagination__link--arrow" :disabled="page === 1"
        :class="{ 'pagination__link--disabled': page === 1 }" aria-label="Предыдущая страница"
        @click.prevent="prevPage(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </button>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link" :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)" style="cursor: pointer;">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <button class="pagination__link pagination__link--arrow" href="#" :disabled="page >= pages"
        :class="{ 'pagination__link--disabled': page >= pages }" aria-label="Следующая страница"
        @click.prevent="nextPage(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
/*eslint-disable*/
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage); //вычислям количество страниц
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page); // страница
    },
    nextPage(page) {
      this.$emit('paginate', page + 1); // переключить на следующую страницу
    },
    prevPage(page) {
      this.$emit('paginate', page - 1); // переключить на предыдущую страницу
    },
  },
};

</script>
