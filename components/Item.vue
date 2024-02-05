<template>
  <div
    class="relative sm:flex p-4 rounded-lg shadow-neumorphism bg-transparent"
  >
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
        class="flex items-center justify-center bg-gray-600 hover:brightness-110 transition text-white text-2xl rounded h-10 w-10 mb-8"
        @click="toggleInfoPopup"
      >
        <Icon name="material-symbols:info-outline" />
      </button>

      <button
        class="flex items-center justify-center bg-red-500 hover:brightness-110 transition text-white text-2xl rounded h-10 w-10"
        @click="sendDeleteItemRequest"
      >
        <Icon name="material-symbols:delete-outline" />
      </button>
    </div>
  </div>

  <div
    :class="`${
      showInfoPopup ? 'fixed' : 'hidden'
    } inset-0 z-10 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`"
    @click.self="toggleInfoPopup"
  >
    <div
      class="w-[600px] max-w-[95%] bg-white p-6 mx-auto mt-20 mb-12 rounded-xl relative"
    >
      <button
        className="absolute right-2 top-1 text-primary text-2xl transition hover:scale-125"
        @click="toggleInfoPopup"
      >
        <Icon name="material-symbols:close-rounded" />
      </button>

      <h2 class="text-primary font-bold -mt-3">Item Info</h2>

      <p class="break-words mt-6">{{ info }}</p>
    </div>
  </div>
</template>

<script>
import { deleteItem } from "../services/api";
import { ref } from "vue";

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
    const showInfoPopup = ref(false);

    const sendDeleteItemRequest = () => {
      deleteItem(props.id);
    };

    const toggleInfoPopup = () => {
      if (showInfoPopup.value === false) {
        showInfoPopup.value = true;
      } else {
        showInfoPopup.value = false;
      }
    };

    return {
      sendDeleteItemRequest,
      showInfoPopup,
      toggleInfoPopup,
    };
  },
};
</script>
