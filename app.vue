<template>
  <div class="min-h-screen w-screen bg-slate-200">
    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <button
        v-if="!showAddForm"
        class="bg-primary text-white flex items-center mb-6 mx-auto p-2 rounded-lg border-2 border-transparent hover:border-secondary hover:text-secondary transition"
        @click="showAddForm = true"
      >
        <Icon name="ph:plus-bold" class="mr-2" /> Add New Item
      </button>

      <!-- Item Adding Section -->
      <div v-if="showAddForm" class="w-1/2 min-w-[280px] mb-6 mx-auto">
        <h1 class="text-primary text-xl font-bold mb-4">Add New Item</h1>

        <div className="mb-4">
          <p className="text-primary text-sm font-bold">Photo (Optional):</p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="block w-full text-sm text-primary file:mr-2 file:p-2 file:text-sm file:text-white file:bg-primary file:border-2 file:border-secondary file:rounded-md hover:file:brightness-110 file:cursor-pointer"
            @change="handleUploadedImg"
          />
        </div>

        <input
          type="text"
          placeholder="Name"
          class="w-full p-2 mb-4 rounded-lg outline-none"
          v-model="nameInput"
        />

        <div class="flex items-center mb-4">
          <div class="flex items-center">
            <input
              type="radio"
              name="currencyOption"
              id="usd"
              value="USD"
              class="accent-secondary"
              @click="priceCurrencyInput = 'USD'"
            />
            <label for="usd" class="ml-1" @click="priceCurrencyInput = 'USD'"
              >$</label
            >
          </div>

          <div class="flex items-center mx-4">
            <input
              type="radio"
              name="currencyOption"
              id="euro"
              value="EURO"
              class="accent-secondary"
              @click="priceCurrencyInput = 'EURO'"
            />
            <label for="euro" class="ml-1" @click="priceCurrencyInput = 'EURO'"
              >€</label
            >
          </div>

          <input
            type="Number"
            placeholder="Price"
            class="w-full p-2 rounded-lg outline-none"
            v-model="priceAmountInput"
          />
        </div>

        <textarea
          name="info"
          id="info"
          placeholder="Info (Optional)"
          rows="4"
          maxlength="150"
          class="w-full p-2 rounded-lg outline-none"
          v-model="infoInput"
        ></textarea>

        <p class="mb-6 text-sm">
          {{ 150 - infoInput.length + " characters remaining" }}
        </p>

        <div class="flex gap-4">
          <button
            class="bg-red-500 text-white flex items-center justify-center w-full mb-6 p-2 rounded-lg border-2 border-transparent hover:brightness-110 transition"
            @click="showAddForm = false"
          >
            Cancel
          </button>
          <button
            class="bg-primary text-white flex items-center justify-center w-full mb-6 p-2 rounded-lg border-2 border-transparent hover:border-secondary hover:text-secondary transition disabled:cursor-not-allowed disabled:brightness-75"
            @click="sendAddItemRequest"
            :disabled="!nameInput || !priceCurrencyInput || !priceAmountInput"
          >
            Submit
          </button>
        </div>
      </div>

      <!-- Custom Section Separator -->
      <div
        class="h-1 w-full mx-auto my-8 bg-primary border border-secondary rounded-full"
      ></div>

      <!-- Skeleton Loading For Item Listing Section -->
      <div v-if="isLoading">
        <div class="grid lg:grid-cols-2 gap-6">
          <div
            v-for="index in 4"
            :key="index"
            class="h-[212px] sm:h-[144px] bg-slate-300 rounded-lg animate-pulse"
          ></div>
        </div>
      </div>

      <!-- Item Listing Section -->
      <div
        v-if="items.items && items.items?.length > 0 && !isLoading"
        class="grid lg:grid-cols-2 gap-6"
      >
        <Item
          v-for="item in items.items"
          :key="item._id ? item._id : null"
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
      </div>

      <!-- Pagination Section -->
      <div
        v-if="
          items.items &&
          items.items?.length > 0 &&
          items.currentPage &&
          items.totalPages &&
          !isLoading
        "
        class="flex items-center justify-between max-w-[90%] w-96 mx-auto mt-12 mb-12 text-primary"
      >
        <button
          title="First Page"
          class="hover:scale-125 transition disabled:cursor-not-allowed"
          :disabled="items.currentPage > 1 ? false : true"
          @click="changePage(1)"
        >
          <Icon name="ph:arrow-fat-lines-left-fill" class="text-xl" />
        </button>

        <button
          title="Previous Page"
          class="hover:scale-125 transition disabled:cursor-not-allowed"
          :disabled="items.currentPage > 1 ? false : true"
          @click="changePage(items.currentPage - 1)"
        >
          <Icon name="ph:arrow-fat-left-fill" class="text-xl" />
        </button>

        <div class="flex flex-col items-center">
          <span class="text-sm">Page</span>

          <span class="font-bold">{{ items.currentPage }}</span>
        </div>

        <button
          title="Next Page"
          class="hover:scale-125 transition disabled:cursor-not-allowed"
          :disabled="items.currentPage < items.totalPages ? false : true"
          @click="changePage(items.currentPage + 1)"
        >
          <Icon name="ph:arrow-fat-right-fill" class="text-xl" />
        </button>

        <button
          title="Last Page"
          class="hover:scale-125 transition disabled:cursor-not-allowed"
          :disabled="items.currentPage < items.totalPages ? false : true"
          @click="changePage(items.totalPages)"
        >
          <Icon name="ph:arrow-fat-lines-right-fill" class="text-xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getItems, createItem } from "./services/api";

const items = ref([]);
const isLoading = ref(true);
const showAddForm = ref(false);
const uploadedImg = ref(null);
const uploadedImgBase64 = ref("");
const nameInput = ref("");
const priceAmountInput = ref(null);
const priceCurrencyInput = ref("");
const infoInput = ref("");

onMounted(async () => {
  items.value = await getItems();

  isLoading.value = false;
});

watch(uploadedImg, () => {
  if (uploadedImg.value) {
    let reader = new FileReader();

    reader.readAsDataURL(uploadedImg.value);

    reader.onload = () => {
      uploadedImgBase64.value = reader.result;
    };
  }
});

const handleUploadedImg = (e) => {
  uploadedImg.value = e.target.files[0];
};

const changePage = async (page) => {
  isLoading.value = true;

  items.value = await getItems(page);

  isLoading.value = false;
};

const sendAddItemRequest = () => {
  createItem({
    name: nameInput.value,
    imgSource: uploadedImgBase64.value ? uploadedImgBase64.value : "",
    price: {
      amount: Number(priceAmountInput.value),
      currency: priceCurrencyInput.value,
    },
    info: infoInput.value ? infoInput.value : "",
  });
};
</script>
