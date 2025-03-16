import type { Account } from "~/types/account";

export default defineNuxtRouteMiddleware((to, from) => {
  const userState = useState<Account>("account");
  const userCookie = useCookie("account");
  if (userState.value || userCookie.value) {
    return navigateTo("/");
  }
});
