<template>
  <div class="relative sm:flex p-4 rounded-lg shadow-neumorphism bg-slate-300">
    <img
      :src="imgSource"
      alt="img"
      class="max-w-28 h-28 object-cover rounded mr-4 mb-4 sm:mb-0"
    />

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

    <div class="absolute right-4 top-4">
      <button
        class="flex items-center justify-center bg-red-500 hover:brightness-110 transition text-white text-2xl rounded h-10 w-10"
        @click="sendDeleteItemRequest"
      >
        <Icon name="material-symbols:delete-outline" />
      </button>
    </div>
  </div>
</template>

<script>
import { deleteItem } from "../services/api";

export default {
  props: {
    id: String,
    name: String,
    imgSource: String,
    price: {
      amount: Number,
      currency: String,
    },
    info: String,
  },
  setup(props) {
    const sendDeleteItemRequest = () => {
      deleteItem(props.id);
    };

    return {
      sendDeleteItemRequest,
    };
  },
};
</script>
