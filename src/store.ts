import { atom } from "recoil";
import { User } from "src/types/user";
import { Web } from "src/types/website";
import { Categories } from "src/types/category";

export const userState = atom<User | null>({
  key: 'user',
  default: null,
})

export const uidState = atom<string>({
  key: 'uid',
  default: "",
})

export const websiteState= atom<Web[]>({
  key: 'website',
  default: [],
})

export const dialogState= atom<boolean>({
  key: 'dialog',
  default: false,
})

export const idState= atom<string>({
  key: 'id',
  default: "",
})

export const categoryState= atom<Categories[]>({
  key: 'categories',
  default: [],
})
