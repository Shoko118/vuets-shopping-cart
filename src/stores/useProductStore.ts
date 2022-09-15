import { defineStore } from "pinia";
import type { IProduct, ICart } from "../interface/Interface";
import axios from "axios";

interface RootState {
  products: IProduct[];
  carts: ICart[];
}

export const useProductStore = defineStore({
  id: "ProductStore",

  state: () =>
    ({
      products: [],
      carts: [],
    } as RootState),

  getters: {
    totalPrice(state) {
      return state.carts.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    },
  },

  actions: {
    async getProducts() {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        this.products = response.data;

        console.log(this.products);
      } catch (error) {
        console.log("GET PRODUCTS ERROR", error);
      }
    },

    addToCart(product: IProduct) {
      const newItem = this.carts.find((item) => item.id === product.id);

      //if the newItem id match just increase the quantity
      if (newItem) newItem.quantity++;
      // else just push this cart and add a quantity of 1
      else this.carts = [...this.carts, { ...product, quantity: 1 }];
    },

    increaseProductQuantity(cart: ICart) {
      const newItem = this.carts.find((item) => item.id === cart.id);

      //if the newItem id match just increase the quantity
      if (newItem) newItem.quantity++;

      // else return nothing
      return;
    },

    decreaseProductQuantity(cart: ICart) {
      const newItem = this.carts.find((item) => item.id === cart.id);

      if (newItem?.quantity > 1) cart.quantity--;
      else this.carts = this.carts.filter((item) => item.id !== cart.id);
    },
  },
});
