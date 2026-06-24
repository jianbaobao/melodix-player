import {MusicApiBase} from "./base"
import {NeteaseApi} from "./netease"
class ApiRegistry{private m=new Map<string,MusicApiBase>();private l:MusicApiBase[]=[];register(a:MusicApiBase){this.m.set(a.name,a);this.l.push(a)}get(n:string){return this.m.get(n)}getAllEnabled(){return this.l}}
export const apiRegistry=new ApiRegistry()
apiRegistry.register(new NeteaseApi())