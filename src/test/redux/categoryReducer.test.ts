import {
  addNewCategory,
  deleteAdminCategory,
  fetchAdminCategories,
  updateAdminCategory,
} from "../../redux/reducers/admin/adminCategoryReducer";
import { fetchProductsByCategory } from "../../redux/reducers/categoryReducer";
import store from "../../redux/store";
import categoriesServer from "../../server/categoryServer";
import { categoryData } from "../testData/categoryData";

beforeAll(() => categoriesServer.listen());

afterEach(() => categoriesServer.resetHandlers());

afterAll(() => categoriesServer.close());

describe("test categories reducer", () => {
  test("should fetch all categories", async () => {
    await store.dispatch(fetchAdminCategories());
    expect(store.getState().adminCategories.data.length).toBe(3);
  });
});

describe("Category reducer: DELETE, PUT, POST", () => {
  test("add new categories", async () => {
    const res = await store.dispatch(
      addNewCategory({
        name: "newcat",
        image: "https://i.imgur.com/OLKMwgP.jpeg",
      })
    );
    expect(res.meta.arg).toMatchObject({
      name: "newcat",
      image: "https://i.imgur.com/OLKMwgP.jpeg",
    });
  });

  test("update category by id", async () => {
    const res = store.dispatch(updateAdminCategory(categoryData[0]));
    expect(res.arg).toMatchObject(categoryData[0]);
  });

  test("delete product by id", async () => {
    const res = store.dispatch(deleteAdminCategory({ id: 1 }));
    expect(res.arg.id).toBe(1);
  });
});