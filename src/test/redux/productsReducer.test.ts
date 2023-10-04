import { rest } from "msw";
import { fetchAllProducts } from "../../redux/reducers/productsReducer";
import store from "../../redux/store";
import { productsData } from "../testData/productData";
import { setupServer } from "msw/node";
import { fetchProductById } from "../../redux/reducers/productReducer";
import { TProduct } from "../../@types/product";
import productsServer from "../../server/productServer";
import {
  addNewProduct,
  deleteAdminProduct,
  updateAdminProduct,
} from "../../redux/reducers/admin/adminProductReducer";

beforeAll(() => productsServer.listen());

afterEach(() => productsServer.resetHandlers());

afterAll(() => productsServer.close());

describe("test product reducers", () => {
  test("test fetchAllProducts", async () => {
    await store.dispatch(fetchAllProducts({ offset: 0, limit: 10 }));
    expect(store.getState().products.data.length).toBe(3);
  });

  test("fetch single product", async () => {
    await store.dispatch(fetchProductById({ id: 9 }));
    expect(store.getState().product.data).toMatchObject({
      id: 9,
      title: "Bespoke Wooden Shirt",
      price: 551,
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      category: {
        id: 5,
        name: "Others",
        image: "https://placeimg.com/640/480/any?r=0.591926261873231",
      },
      images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767",
        "https://placeimg.com/640/480/any?r=0.9300320592588625",
        "https://placeimg.com/640/480/any?r=0.8807778235430017",
      ],
    });
  });

  test("add new product", async () => {
    let data = {
      id: 100,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    };
    const res = await store.dispatch(addNewProduct(data));
    expect(res.meta.arg).toMatchObject({
      id: 100,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    });
  });

  test("update product data", async () => {
    let data = {
      id: 100,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    };

    const res = store.dispatch(updateAdminProduct(data));
    expect(res.arg).toMatchObject({
      id: 100,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    });
  });

  //   test("delete product by id", async () => {
  //     const res = store.dispatch(deleteAdminProduct({ id: 9 }));
  //     expect((await res).meta.arg).toBe(9);
  //   });
});
