import {useEffect} from "react"
import {usePlayerStore} from "../store/player-store"
declare global{interface Window{electronAPI?:{[key:string]:any}}}
export function useElectronEvents(){const{next,previous,togglePlay}=usePlayerStore();useEffect(()=>{if(!window.electronAPI)return;window.electronAPI.onMediaPlayPause?.(()=>togglePlay());window.electronAPI.onMediaNext?.(()=>next());window.electronAPI.onMediaPrevious?.(()=>previous())},[])}