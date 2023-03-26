<template>
  <!-- eslint-disable  -->
  <div>
    <!-- header -->
    <BaseHeader>
      <slot name="header"></slot>
    </BaseHeader>
    <!-- Основной контент -->
    <slot></slot>
    <!-- footer -->
    <BaseFooter>
      <slot name="footer"></slot>
    </BaseFooter>
  </div>
</template>

<script>
import BaseHeader from '@/components/Base/BaseHeader.vue';
import BaseFooter from '@/components/Base/BaseFooter.vue';

export default {
  components: { BaseHeader, BaseFooter },
};
</script>
