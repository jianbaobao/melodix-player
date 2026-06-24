import {AppSettings} from "../types"
const SK="melodix_settings"
export const defaultSettings:AppSettings={theme:"dark",language:"zh-CN",audioQuality:"high",autoUpdate:true,minimizeToTray:true,showLyrics:true}
export function loadSettings():AppSettings{try{const r=localStorage.getItem(SK);return r?{...defaultSettings,...JSON.parse(r)}:defaultSettings}catch{return defaultSettings}}
export function saveSettings(s:AppSettings):void{localStorage.setItem(SK,JSON.stringify(s))}