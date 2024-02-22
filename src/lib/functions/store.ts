import { writable } from "svelte/store";

export const currentKey = writable('')
export const secondKey = writable('')
export const clickedKeys = writable([] as string[])