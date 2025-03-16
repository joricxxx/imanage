import { useCookie } from "#app";
import type { Account } from "~/types/account";

export default defineNuxtRouteMiddleware((to, from) => {
  const userState = useState<Account>("account");
  const userCookie = useCookie("account");

  // Rehydrate state if not set and cookie exists.
  if (!userState.value && userCookie.value) {
    try {
      if (typeof userCookie.value === "string") {
        userState.value = JSON.parse(userCookie.value);
      } else {
        userState.value = userCookie.value;
      }
    } catch (error) {
      console.error("Failed to rehydrate user state from cookie", error);
    }
  }

  // If no user logged in, redirect to login.
  if (!userState.value || !userState.value.uid) {
    return navigateTo("/login");
  }
});
