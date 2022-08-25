<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "./stores/useProductStore";
import Cart from "./components/Cart.vue";

const store = useProductStore();

const { products } = storeToRefs(store);

watchEffect(() => {
  store.getProducts();
});
</script>

<template>
  <div class="flex items-start">
    <div class="w-[50%]">
      <h1>Products</h1>

      <ul class="mt-7 grid grid-cols-4 gap-4">
        <li class="" v-for="product in products" :key="product.id">
          <div>
            <img class="w-[90%] h-52 object-contain" :src="product.image" :alt="product.category" />
            <h1>{{ product.category }}</h1>
            <p>${{ product.price }}</p>
            <button @click.prevent="store.addToCart(product)" class="bg-orange-300 px-2.5 py-1.5 rounded-md">
              Add
            </button>
          </div>
        </li>
      </ul>
    </div>

    <Cart />
  </div>
</template>
