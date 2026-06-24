export interface MusicTrack { id:string; title:string; artist:string; artistId?:string; album:string; albumId?:string; cover:string; duration:number; url?:string; lyrics?:string; platform:MusicPlatform; quality?:AudioQuality; isLiked?:boolean; playCount?:number }
export type MusicPlatform = "netease"|"qq"|"kuwo"|"kugou"|"local"
export type AudioQuality = "low"|"standard"|"high"|"lossless"
export interface Playlist { id:string; name:string; cover:string; description?:string; tracks:MusicTrack[]; trackCount:number; platform:MusicPlatform; playCount?:number }
export interface Album { id:string; name:string; artist:string; cover:string; tracks:MusicTrack[]; trackCount:number; platform:MusicPlatform }
export interface Artist { id:string; name:string; avatar:string; platform:MusicPlatform }
export interface Leaderboard { id:string; name:string; cover:string; description?:string; platform:MusicPlatform; tracks:MusicTrack[]; type:LeaderboardType }
export type LeaderboardType = "hot"|"new"|"trending"|"genre"|"regional"
export type RepeatMode = "none"|"one"|"all"
export type PlayerState = "playing"|"paused"|"stopped"|"loading"
export interface SearchResult { tracks:MusicTrack[]; albums:Album[]; artists:Artist[]; playlists:Playlist[]; total:number }
export interface SearchParams { keyword:string; platform?:MusicPlatform; type?:"track"|"album"|"artist"|"playlist"; page?:number; pageSize?:number }
export type EncryptedFormat = "ncm"|"qmc"|"kgm"|"kwm"
export interface DecryptResult { success:boolean; data?:ArrayBuffer; metadata?:any; error?:string }
export interface AppSettings { theme:"light"|"dark"|"system"; language:"zh-CN"|"en-US"; audioQuality:AudioQuality; autoUpdate:boolean; minimizeToTray:boolean; showLyrics:boolean }