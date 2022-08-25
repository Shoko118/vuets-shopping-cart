<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductStore } from "../stores/useProductStore";

const store = useProductStore();

const { carts } = storeToRefs(store);
</script>

<template>
  <div>
    <h1>Cart</h1>

    <div v-if="carts.length === 0">
      <h1>Your cart is empty</h1>
    </div>

    <div v-else>
      <div v-for="cart in carts" :key="cart.quantity">
        <div>
          <img :src="cart.image" :alt="cart.title" class="w-28 h-28 rounded-md" />
          <h1>{{ cart.title }}</h1>
          <p>${{ cart.price }}</p>
          <h1>Quantity: {{ cart.quantity }}</h1>
        </div>

        <div>
          <button @click.prevent="store.removeCart(cart)">-</button>
          <button @click.prevent="store.addingCart(cart)">+</button>
        </div>
      </div>
      <h1>Total: ${{ store.totalPrice }}</h1>
    </div>
  </div>
</template>
