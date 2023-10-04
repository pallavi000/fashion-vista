import cartReducer, {
  addToCart,
  removeFromCart,
} from "../../redux/reducers/cartReducer";
import store from "../../redux/store";
import { productsData } from "../testData/productData";

describe("cart reducer testings", () => {
  // init test
  test("cart init test", () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      shippingId: null,
      isLoading: false,
      error: null,
    });
  });
  test("add to cart", () => {
    store.dispatch(addToCart(productsData[0]));
    expect(store.getState().cart.items[0]).toMatchObject({
      quantity: 1,
      product: productsData[0],
    });
  });

  test("remove item from cart", () => {
    store.dispatch(removeFromCart(productsData[0]));
    expect(store.getState().cart.totalQuantity).toBe(0);
  });
});
