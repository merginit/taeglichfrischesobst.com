import { writable } from 'svelte/store';
import { getCookie } from '$script/utility';

const cookie = JSON.parse(getCookie("cc_cookie") || "{}");
const initialAllowFunctionality = cookie?.categories?.includes('functionality') ?? false;

export const allowFunctionality = writable(initialAllowFunctionality);