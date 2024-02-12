import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./stores/default-store";

export const useGlobalDispatch:()=>AppDispatch = useDispatch;
export const useGlobalSelector:TypedUseSelectorHook<RootState> = useSelector