import { writable } from "svelte/store";
import { ID, Query } from "appwrite";
import { databases } from "$lib/appwrite";

export const IDEAS_DATABASE_ID = "6508783c5dc784d544dd"; // Replace with your database ID
export const IDEAS_COLLECTION_ID = "65087840ab307cb06883"; // Replace with your collection ID

const store = writable([]);

async function init() {
  const response = await databases.listDocuments(
    IDEAS_DATABASE_ID,
    IDEAS_COLLECTION_ID,
    [Query.orderDesc("$createdAt"), Query.limit(10)]
  );
  store.set(response.documents);
}

async function add(idea) {
  const response = await databases.createDocument(
    IDEAS_DATABASE_ID,
    IDEAS_COLLECTION_ID,
    ID.unique(),
    idea
  );
  store.update((ideas) => [response, ...ideas].slice(0, 10));
}

async function remove(id) {
  await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
  store.update((ideas) => ideas.filter((idea) => idea.$id !== id));
  await init(); // refetch ideas to ensure we have 10 items
}

export const ideas = {
  subscribe: store.subscribe,
  init,
  add,
  remove,
};
