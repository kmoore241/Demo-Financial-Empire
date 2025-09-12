import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Headphones,
  Radio,
  CloudRain,
  TreePine,
  Waves,
  Coffee,
  Zap,
  Brain,
  Target,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppearanceSettings } from "@/contexts/SettingsContext";

interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  url: string;
  description: string;
  mood: "focus" | "energize" | "calm" | "creative";
  icon: typeof Music;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  genre: string;
  tracks: Track[];
  icon: typeof Music;
  color: string;
}

const mockTracks: Track[] = [
  {
    id: "focus-1",
    title: "Deep Focus Flow",
    artist: "Ambient Academy",
    genre: "Focus",
    duration: "8:24",
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-5.mp3",
    description: "Steady ambient tones for maximum concentration",
    mood: "focus",
    icon: Brain,
  },
  {
    id: "focus-2",
    title: "Trading Zone",
    artist: "Market Minds",
    genre: "Focus",
    duration: "12:18",
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-4.mp3",
    description: "Rhythmic patterns designed for analytical thinking",
    mood: "focus",
    icon: Target,
  },
  {
    id: "lofi-1",
    title: "Coffee Shop Vibes",
    artist: "LoFi Collective",
    genre: "Lo-Fi",
    duration: "6:42",
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-3.mp3",
    description: "Relaxed beats with coffee shop ambiance",
    mood: "calm",
    icon: Coffee,
  },
  {
    id: "nature-1",
    title: "Forest Rain",
    artist: "Nature Sounds",
    genre: "Nature",
    duration: "15:00",
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-2.mp3",
    description: "Gentle rain and forest sounds for tranquility",
    mood: "calm",
    icon: CloudRain,
  },
  {
    id: "classical-1",
    title: "Baroque Concentration",
    artist: "Classical Focus",
    genre: "Classical",
    duration: "9:36",
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-1.mp3",
    description: "Bach-inspired pieces for cognitive enhancement",
    mood: "focus",
    icon: Music,
  },
  {
    id: "electronic-1",
    title: "Synth Study",
    artist: "Digital Minds",
    genre: "Electronic",
    duration: "7:12",
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-5.mp3",
    description: "Energizing electronic beats for active learning",
    mood: "energize",
    icon: Zap,
  },
];

const playlists: Playlist[] = [
  {
    id: "deep-focus",
    name: "Deep Focus",
    description: "Ambient tracks for intense concentration",
    genre: "Focus",
    tracks: mockTracks.filter((t) => t.mood === "focus"),
    icon: Brain,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "lo-fi-study",
    name: "Lo-Fi Study",
    description: "Chill beats for relaxed learning",
    genre: "Lo-Fi",
    tracks: mockTracks.filter((t) => t.genre === "Lo-Fi"),
    icon: Coffee,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "nature-sounds",
    name: "Nature Sounds",
    description: "Natural ambiance for stress-free studying",
    genre: "Nature",
    tracks: mockTracks.filter((t) => t.genre === "Nature"),
    icon: TreePine,
    color: "from-green-500 to-green-600",
  },
  {
    id: "classical-focus",
    name: "Classical Focus",
    description: "Timeless compositions for mental clarity",
    genre: "Classical",
    tracks: mockTracks.filter((t) => t.genre === "Classical"),
    icon: Music,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "electronic-energy",
    name: "Electronic Energy",
    description: "Upbeat tracks for active learning sessions",
    genre: "Electronic",
    tracks: mockTracks.filter((t) => t.mood === "energize"),
    icon: Zap,
    color: "from-cyan-500 to-cyan-600",
  },
];

interface StudySoundtrackProps {
  isOpen: boolean;
  onClose: () => void;
  compact?: boolean;
}

export const StudySoundtrack: React.FC<StudySoundtrackProps> = ({
  isOpen,
  onClose,
  compact = false,
}) => {
  const { appearance } = useAppearanceSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [remainingTime, setRemainingTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulate audio playback for demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            handleNext();
            return 0;
          }
          return newProgress;
        });
        setCurrentTime(`${Math.floor(progress / 4)}:${(progress % 4) * 15}`);
        setRemainingTime(
          `${Math.floor((100 - progress) / 4)}:${((100 - progress) % 4) * 15}`,
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, progress]);

  const handlePlayPause = () => {
    if (!currentTrack) {
      // Start with first track of first playlist
      setCurrentPlaylist(playlists[0]);
      setCurrentTrack(playlists[0].tracks[0]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentPlaylist || !currentTrack) return;

    const currentIndex = currentPlaylist.tracks.findIndex(
      (t) => t.id === currentTrack.id,
    );
    const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    setCurrentTrack(currentPlaylist.tracks[nextIndex]);
    setProgress(0);
  };

  const handlePrevious = () => {
    if (!currentPlaylist || !currentTrack) return;

    const currentIndex = currentPlaylist.tracks.findIndex(
      (t) => t.id === currentTrack.id,
    );
    const prevIndex =
      currentIndex === 0 ? currentPlaylist.tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(currentPlaylist.tracks[prevIndex]);
    setProgress(0);
  };

  const handlePlaylistSelect = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentTrack(playlist.tracks[0]);
    setProgress(0);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setProgress(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "focus":
        return "bg-purple-500/20 text-purple-400";
      case "energize":
        return "bg-cyan-500/20 text-cyan-400";
      case "calm":
        return "bg-green-500/20 text-green-400";
      case "creative":
        return "bg-amber-500/20 text-amber-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (compact) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="w-80 border-border/50 bg-card/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Headphones className="w-4 h-4" />
                    <span>Study Soundtrack</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={onClose}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentTrack && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <currentTrack.icon className="w-4 h-4 text-empire-emerald-400" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {currentTrack.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentTrack.artist}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getMoodColor(currentTrack.mood)}`}
                      >
                        {currentTrack.mood}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-empire-emerald-400 h-1 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{currentTime}</span>
                      <span>{remainingTime}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={!currentTrack}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlayPause}
                    className="h-8 w-8 p-0"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={!currentTrack}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVolumeToggle}
                    className="h-6 w-6 p-0"
                  >
                    {isMuted || volume[0] === 0 ? (
                      <VolumeX className="w-3 h-3" />
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                  </Button>
                  <Slider
                    value={isMuted ? [0] : volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background border border-border rounded-lg w-full max-w-4xl h-[600px] overflow-hidden"
          >
            <div className="flex h-full">
              {/* Sidebar - Playlists */}
              <div className="w-80 border-r border-border p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center space-x-2">
                    <Music className="w-5 h-5" />
                    <span>Study Playlists</span>
                  </h2>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {playlists.map((playlist) => (
                    <motion.div
                      key={playlist.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${
                          currentPlaylist?.id === playlist.id
                            ? "border-empire-emerald-400 bg-empire-emerald-500/10"
                            : "border-border/50 hover:border-empire-emerald-400/50"
                        }`}
                        onClick={() => handlePlaylistSelect(playlist)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${playlist.color} flex items-center justify-center`}
                            >
                              <playlist.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium truncate">
                                {playlist.name}
                              </h3>
                              <p className="text-sm text-muted-foreground truncate">
                                {playlist.tracks.length} tracks
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Now Playing */}
                <div className="p-6 border-b border-border">
                  {currentTrack ? (
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-lg flex items-center justify-center">
                        <currentTrack.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {currentTrack.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {currentTrack.artist} • {currentTrack.genre}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentTrack.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getMoodColor(currentTrack.mood)}
                      >
                        {currentTrack.mood}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Headphones className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-semibold mb-2">
                        Select a playlist to start
                      </h3>
                      <p className="text-muted-foreground">
                        Choose from our curated study soundtracks
                      </p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handlePrevious}
                      disabled={!currentTrack}
                    >
                      <SkipBack className="w-6 h-6" />
                    </Button>
                    <Button
                      size="lg"
                      onClick={handlePlayPause}
                      className="h-12 w-12 rounded-full bg-empire-emerald-500 hover:bg-empire-emerald-600"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleNext}
                      disabled={!currentTrack}
                    >
                      <SkipForward className="w-6 h-6" />
                    </Button>
                  </div>

                  {currentTrack && (
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-empire-emerald-400 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{currentTime}</span>
                        <span>{remainingTime}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVolumeToggle}
                    >
                      {isMuted || volume[0] === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <div className="w-32">
                      <Slider
                        value={isMuted ? [0] : volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                {/* Track List */}
                <div className="flex-1 overflow-y-auto p-6">
                  {currentPlaylist ? (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold mb-4">
                        {currentPlaylist.name} Tracks
                      </h3>
                      {currentPlaylist.tracks.map((track, index) => (
                        <motion.div
                          key={track.id}
                          whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            currentTrack?.id === track.id
                              ? "bg-empire-emerald-500/10 border border-empire-emerald-400/30"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleTrackSelect(track)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                              <track.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">
                                {track.title}
                              </h4>
                              <p className="text-sm text-muted-foreground truncate">
                                {track.artist} • {track.duration}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getMoodColor(track.mood)}`}
                            >
                              {track.mood}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No playlist selected
                      </h3>
                      <p className="text-muted-foreground">
                        Choose a playlist from the sidebar to see tracks
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing soundtrack state globally
export const useStudySoundtrack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const openFull = () => {
    setIsCompact(false);
    setIsOpen(true);
  };

  const openCompact = () => {
    setIsCompact(true);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    isCompact,
    openFull,
    openCompact,
    close,
    toggle,
  };
};
