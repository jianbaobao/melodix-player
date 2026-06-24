import {create} from "zustand"
import {AppSettings} from "../../types"
import {loadSettings,saveSettings} from "../../utils/storage"
interface UiStore{sidebarCollapsed:boolean;showSearch:boolean;currentView:string;theme:"light"|"dark"|"system";settings:AppSettings;toggleSidebar:()=>void;toggleSearch:()=>void;setCurrentView:(v:string)=>void;updateSettings:(p:Partial<AppSettings>)=>void}
export const useUiStore=create<UiStore>((set)=>({sidebarCollapsed:false,showSearch:false,currentView:"home",theme:"dark",settings:loadSettings(),toggleSidebar:()=>set(s=>({sidebarCollapsed:!s.sidebarCollapsed})),toggleSearch:()=>set(s=>({showSearch:!s.showSearch})),setCurrentView:(v)=>set({currentView:v}),updateSettings:(p)=>set(s=>{const ns={...s.settings,...p};saveSettings(ns);return{settings:ns}})}))