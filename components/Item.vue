<template>
  <div
    class="relative sm:flex p-4 border border-white rounded-lg shadow-neumorphism bg-transparent"
  >
    <img
      :src="imgSource ? imgSource : '/image-placeholder.png'"
      alt="img"
      class="max-w-28 h-28 object-cover rounded mr-4 mb-4 sm:mb-0"
    />

    <div>
      <p
        class="text-black font-bold truncate w-52 md:w-72 lg:w-60"
        :title="name ? name : '-'"
      >
        {{ name ? name : "-" }}
      </p>

      <p
        class="text-primary text-lg font-bold truncate w-52"
        :title="
          price.amount && price.currency
            ? price.amount.toLocaleString() + ' ' + price.currency
            : '-'
        "
      >
        {{
          price.amount && price.currency
            ? price.amount.toLocaleString() + " " + price.currency
            : "-"
        }}
      </p>
    </div>

    <div v-if="route.path === '/'" class="absolute right-4 top-4">
      <button
        class="flex items-center justify-center bg-gray-600 hover:brightness-110 transition text-white text-2xl rounded h-8 w-8 mb-2"
        @click="goToItemDetail"
      >
        <Icon name="ph:arrow-bend-up-right-bold" />
      </button>

      <button
        class="flex items-center justify-center bg-gray-600 hover:brightness-110 transition text-white text-2xl rounded h-8 w-8 mb-2"
        @click="toggleInfoPopup"
      >
        <Icon name="ph:info-bold" />
      </button>

      <button
        class="flex items-center justify-center bg-red-500 hover:brightness-110 transition text-white text-2xl rounded h-8 w-8"
        @click="sendDeleteItemRequest"
      >
        <Icon name="ph:trash-bold" />
      </button>
    </div>
  </div>

  <!-- Info Popup -->
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
        <Icon name="ph:x-bold" />
      </button>

      <h2 class="text-primary font-bold -mt-3">Item Info</h2>

      <p v-if="!isEditActive" class="break-words my-6">
        {{ info ? info : "-" }}
      </p>

      <div v-if="isEditActive">
        <textarea
          name="info"
          id="info"
          placeholder="Info"
          rows="4"
          maxlength="150"
          class="w-full p-2 mt-4 rounded-lg outline-none border-2 border-secondary"
          v-model="infoInput"
        ></textarea>

        <p class="mb-6 text-sm">
          {{ 150 - infoInput.length + " characters remaining" }}
        </p>

        <div class="flex gap-4">
          <button
            class="bg-red-500 text-white flex items-center justify-center w-full p-2 rounded-lg border-2 border-transparent hover:brightness-110 transition"
            @click="isEditActive = false"
          >
            Cancel
          </button>
          <button
            class="bg-primary text-white flex items-center justify-center w-full p-2 rounded-lg border-2 border-transparent hover:border-secondary hover:text-secondary transition disabled:cursor-not-allowed disabled:brightness-75"
            @click="handleEdit"
          >
            Save
          </button>
        </div>
      </div>

      <button
        v-if="!isEditActive"
        class="bg-primary text-white flex items-center mx-auto p-2 rounded-lg border-2 border-transparent hover:border-secondary hover:text-secondary transition"
        @click="handleEdit"
      >
        <Icon name="ph:note-pencil" class="mr-2" /> Edit
      </button>
    </div>
  </div>
</template>

<script>
import { deleteItem, updateItem } from "../services/api";

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
    const router = useRouter();
    const route = useRoute();
    const showInfoPopup = ref(false);
    const isEditActive = ref(false);
    const infoInput = ref("");

    const sendDeleteItemRequest = () => {
      deleteItem(props.id);
    };

    const toggleInfoPopup = () => {
      if (showInfoPopup.value === false) {
        showInfoPopup.value = true;
      } else {
        isEditActive.value = false;
        infoInput.value = "";
        showInfoPopup.value = false;
      }
    };

    const handleEdit = () => {
      if (!isEditActive.value) {
        if (props.info) {
          infoInput.value = props.info;
        }

        isEditActive.value = true;

        return;
      }

      updateItem(props.id, {
        name: props.name,
        imgSource: props.imgSource,
        price: {
          amount: props.price.amount,
          currency: props.price.currency,
        },
        info: infoInput.value ? infoInput.value : "",
      });
    };

    const goToItemDetail = () => {
      router.push({ path: `/item/${props.id}` });
    };

    return {
      sendDeleteItemRequest,
      showInfoPopup,
      toggleInfoPopup,
      isEditActive,
      handleEdit,
      infoInput,
      goToItemDetail,
      route,
    };
  },
};
</script>
