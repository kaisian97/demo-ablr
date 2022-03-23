import { useMemo } from "react";
import { useCartStore } from "stores";
import { formatPrice } from "utils";
import shallow from "zustand/shallow";
import Image from "components/common/Image";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import Checkout from "pages/Checkout";
import { TrashIcon } from "@heroicons/react/solid";

type Props = {};

const Cart = (props: Props) => {
  const navigate = useNavigate();

  const { deleteCart, cart } = useCartStore(
    (state) => ({
      updateCart: state.updateCart,
      deleteCart: state.deleteCart,
      cart: state.cart,
    }),
    shallow
  );

  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      total += itemPrice * item.quantity;
      return total;
    }, 0);
  }, [cart]);

  return (
    <div>
      <h1 className="text-xl tracking-wider font-bold text-center mb-8">
        Cart
      </h1>
      <div className="mx-10">
        <div className="flex-1 md:ml-8">
          <div>
            {cart.map((item, i) => {
              const isFirstItem = i === 0;
              return (
                <div
                  key={item.id}
                  className={`flex justify-between items-center space-x-4 py-2 border-b ${
                    isFirstItem ? "border-t" : ""
                  }`}
                >
                  <div className="flex justify-between items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16"
                      />
                    </div>
                    <div className="font-semibold">
                      {item.title} ({item.quantity})
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <TrashIcon
                      className="w-5 h-5 cursor-pointer hover:text-red-500 transition"
                      onClick={() => deleteCart(item)}
                    />
                    <div className="text-slate-500 text-sm">
                      {formatPrice(parseFloat(item.price) * item.quantity)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-4 flex space-x-4 items-center">
            <div className="ml-auto font-semibold">
              Total: {formatPrice(totalCartPrice)}
            </div>
            <Button
              onClick={() => navigate(Checkout.path)}
              size="lg"
              className="w-60"
            >
              Continue to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.path = "/cart";

export default Cart;
