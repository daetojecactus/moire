<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions('cart', ['loadCart']),
    ...mapMutations('cart', ['updateUserAccessKey']),
  },
};
</script>
