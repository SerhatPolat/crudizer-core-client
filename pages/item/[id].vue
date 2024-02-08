<template>
  <div v-if="item" class="mx-auto">
    <Item
      :id="item._id ? item._id : null"
      :name="item.name ? item.name : null"
      :imgSource="item.imgSource ? item.imgSource : null"
      :price="
        item.price && item.price?.amount && item.price?.currency
          ? item.price
          : {
              amount: null,
              currency: null,
            }
      "
      :info="item.info ? item.info : null"
    />

    <h2 class="text-primary font-bold mt-12 mb-4">Item Info</h2>

    <p>{{ item.info ? item.info : "-" }}</p>
  </div>

  <div v-if="isLoading">
    <div
      class="h-[212px] sm:h-[144px] bg-slate-300 rounded-lg animate-pulse"
    ></div>

    <div
      class="h-[20px] w-36 bg-slate-300 rounded-full animate-pulse mt-12 mb-5"
    ></div>

    <div class="h-[20px] w-[80%] bg-slate-300 rounded-full animate-pulse"></div>
  </div>
</template>

<script setup>
import { getItem } from "../../services/api";

const route = useRoute();
const item = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  item.value = await getItem(route.params.id);

  isLoading.value = false;
});
</script>
