import { STORES } from "constant";
import { Product, Store } from "./../types/index";
import create from "zustand";
import { combine, persist } from "zustand/middleware";
import produce from "immer";

export const useStore = create(
  combine({ store: STORES[0] }, (set) => ({
    setStore: (store: Store) => set(() => ({ store })),
  }))
);

export const useCartStore = create(
  persist(
    combine({ cart: [] as (Product & { quantity: number })[] }, (set) => ({
      updateCart: (product: Product) =>
        set((state) => {
          const newCart = produce(state.cart, (draft) => {
            const prd = draft.find((item) => item.id === product.id);
            if (prd) {
              prd.quantity += 1;
            } else {
              draft.push({ ...product, quantity: 1 });
            }
          });
          return {
            cart: newCart,
          };
        }),
      deleteCart: (product: Product) =>
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== product.id);
          return {
            cart: newCart,
          };
        }),
    })),
    {
      name: "demo-ablr",
      getStorage: () => localStorage,
    }
  )
);
