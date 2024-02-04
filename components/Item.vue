<template>
  <div class="flex p-4 rounded-lg shadow-neumorphism bg-slate-300">
    <img :src="imgSource" alt="img" class="max-w-28 mr-4 rounded" />

    <div>
      <p
        class="text-black font-bold truncate w-52 md:w-72 lg:w-60"
        :title="name"
      >
        {{ name }}
      </p>

      <p class="text-primary text-lg font-bold">
        {{ price.amount.toLocaleString() + " " + price.currency }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    imgSource: String,
    price: {
      amount: Number,
      currency: String,
    },
  },
  setup() {},
};
</script>
