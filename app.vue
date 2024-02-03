<template>
  <div class="min-h-screen w-screen bg-slate-300">
    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <div v-if="items && items.length > 0" class="grid lg:grid-cols-2 gap-6">
        <Product
          v-for="item in items"
          :key="item.id"
          :name="item.name ? item.name : '-'"
          :imgSource="
            item.imgSource
              ? item.imgSource
              : '../public/assets/image-placeholder.png'
          "
          :price="
            item.price && item.price?.amount && item.price?.currency
              ? item.price
              : '-'
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getItems } from "./services/api";

const items = ref([]);

onMounted(async () => {
  items.value = await getItems();
});
</script>
