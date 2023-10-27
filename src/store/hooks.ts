import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { AppDispach, RootState} from "../store/sliceStore";

export const useAppDispatch = ()=>useDispatch<AppDispach>
export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector;