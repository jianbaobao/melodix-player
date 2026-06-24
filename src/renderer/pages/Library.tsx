import React from "react"
import {Music} from "lucide-react"
import {useMusicStore} from "../store/music-store"
import {usePlayerStore} from "../store/player-store"
import {TrackList} from "../components/common/TrackList"
export function Library(){const{localTracks}=useMusicStore();const{likedTracks,recentPlays,queue}=usePlayerStore();return(<div className="p-6"><h1 className="text-2xl font-bold text-surface-100 mb-6">\u97F3\u4E50\u5E93</h1><div className="bg-surface-800/20 rounded-xl border border-surface-700/30"><TrackList tracks={localTracks}/></div></div>)}