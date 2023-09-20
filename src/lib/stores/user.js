import { writable } from "svelte/store";
import { ID } from "appwrite";
import { goto } from "$app/navigation";
import { account } from "$lib/appwrite";

const store = writable(null);

async function init() {
  try {
    store.set(await account.get());
  } catch (e) {
    store.set(null);
  }
}

async function register(email, password) {
  await account.create(ID.unique(), email, password);
  await login(email, password);
}

async function login(email, password) {
  await account.createEmailSession(email, password);
  await init();
  goto("/"); // Redirect to home page after login
}

async function logout() {
  await account.deleteSession("current");
  store.set(null);
}

export const user = {
  subscribe: store.subscribe,
  register,
  login,
  logout,
  init,
};
