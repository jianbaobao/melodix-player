import {Howl,Howler} from "howler"
import {MusicTrack,PlayerState} from "../types"
type CB={onTimeUpdate?:(t:number,d:number)=>void;onStateChange?:(s:PlayerState)=>void;onTrackEnd?:()=>void;onError?:(e:string)=>void;onLoad?:(d:number)=>void}
class PlayerEngine{private howl:Howl|null=null;private ct:MusicTrack|null=null;private state:PlayerState="stopped";private vol=0.8;private muted=false;private cbs:CB={};private interval:any=null;getCurrentTime():number{return this.howl?this.howl.seek()as number:0}getDuration():number{return this.howl?this.howl.duration():0}getState():PlayerState{return this.state}getVolume():number{return this.muted?0:this.vol}setCallbacks(c:CB){this.cbs=c}
async loadTrack(track:MusicTrack,start=0){this.stop();this.ct=track;this.state="loading";this.cbs.onStateChange?.("loading");try{let url=track.url||"";await this.createHowl(url,start)}catch(e){this.state="stopped";this.cbs.onError?.(String(e));this.cbs.onStateChange?.("stopped")}}
private createHowl(url:string,start:number):Promise<void>{return new Promise((res,rej)=>{this.howl=new Howl({src:[url],html5:true,volume:this.muted?0:this.vol,onload:()=>{this.cbs.onLoad?.(this.howl!.duration());if(start>0)this.howl!.seek(start);this.play();res()},onplay:()=>{this.state="playing";this.cbs.onStateChange?.("playing");this.startTick()},onpause:()=>{this.state="paused";this.cbs.onStateChange?.("paused");this.stopTick()},onstop:()=>{this.state="stopped";this.cbs.onStateChange?.("stopped");this.stopTick()},onend:()=>{this.state="stopped";this.stopTick();this.cbs.onTrackEnd?.()},onloaderror:(_i:any,e:any)=>rej(new Error("Load: "+e)),onplayerror:(_i:any,e:any)=>rej(new Error("Play: "+e))})})}
play(){if(!this.howl)return;if(this.state==="paused"){this.howl.play();this.state="playing";this.cbs.onStateChange?.("playing");this.startTick()}}
pause(){this.howl?.pause()}
stop(){this.stopTick();this.howl?.unload();this.howl=null;this.state="stopped";this.cbs.onStateChange?.("stopped")}
seek(t:number){this.howl?.seek(t)}
setVolume(v:number){this.vol=Math.max(0,Math.min(1,v));if(!this.muted&&this.howl)this.howl.volume(this.vol);this.cbs.onVolumeChange?.(this.vol)}
toggleMute(){this.muted=!this.muted;if(this.howl)this.howl.volume(this.muted?0:this.vol)}
private startTick(){this.stopTick();this.interval=setInterval(()=>{if(this.state==="playing"&&this.howl){this.cbs.onTimeUpdate?.(this.getCurrentTime(),this.getDuration())}},250)}
private stopTick(){if(this.interval){clearInterval(this.interval);this.interval=null}}
destroy(){this.stop();Howler.unload()}}
export const playerEngine=new PlayerEngine()