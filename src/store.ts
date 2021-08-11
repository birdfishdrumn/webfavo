import { atom } from "recoil";
import { User } from "src/types/user";
import { Web } from "src/types/website";

export const userState = atom<User>({
  key: 'user',
  default: null,
})

export const uidState = atom<string>({
  key: 'uid',
  default: "",
})

export const websiteState= atom<Web[]>({
  key: 'website',
  default: null,
})

export const dialogState= atom<boolean>({
  key: 'dialog',
  default: false,
})

export const idState= atom<string>({
  key: 'idi',
  default: "",
})
