import { get, post, put, del } from "./api.js";

const endpoints = {
  allItems: "/data/products?sortBy=_createdOn%20desc",
  itemById: '/data/products/',
  create: '/data/products',
  edit: '/data/products/',
  delete: '/data/products/',
  buy: '/data/bought'
};

export function getAllItems() {
  return get(endpoints.allItems);
}
export function getItemById(id) {
  return get(`${endpoints.itemById}${id}`);
}
export function createItem(data) {
  return post(`${endpoints.create}`, data);
}
export function editItemById(id, data) {
  return put(`${endpoints.edit}${id}`, data);
}
export function delteItemById(id) {
  return del(`${endpoints.delete}${id}`)
}
export function buyItem(data) {
  return post(`${endpoints.buy}`, data);
}
export function getTotalBuys(productId) {
  return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}
export function userBoughtItem(productId, userId) {
  return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}