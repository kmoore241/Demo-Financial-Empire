import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  ExternalLink,
  Clock,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { type YouTubeVideo } from "@/lib/youtubeAPI";

interface VideoPlayerProps {
  video: YouTubeVideo;
  onVideoComplete?: (videoId: string) => void;
  onProgress?: (videoId: string, progress: number) => void;
  autoplay?: boolean;
  showControls?: boolean;
}

interface VideoProgress {
  currentTime: number;
  duration: number;
  percentage: number;
  isCompleted: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onVideoComplete,
  onProgress,
  autoplay = false,
  showControls = true,
}) => {
  const [progress, setProgress] = useState<VideoProgress>({
    currentTime: 0,
    duration: 0,
    percentage: 0,
    isCompleted: false,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [showVideo, setShowVideo] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for video progress updates (if YouTube API is available)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      if (event.data.type === "video-progress") {
        const newProgress = {
          currentTime: event.data.currentTime,
          duration: event.data.duration,
          percentage: (event.data.currentTime / event.data.duration) * 100,
          isCompleted: event.data.currentTime >= event.data.duration * 0.9, // 90% completion
        };

        setProgress(newProgress);
        onProgress?.(video.id, newProgress.percentage);

        if (newProgress.isCompleted && !progress.isCompleted) {
          onVideoComplete?.(video.id);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [video.id, onVideoComplete, onProgress, progress.isCompleted]);

  const formatDuration = (duration: string | number): string => {
    if (typeof duration === "string") return duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  const addNote = () => {
    if (currentNote.trim()) {
      const noteWithTime = `[${formatDuration(progress.currentTime)}] ${currentNote}`;
      setNotes((prev) => [...prev, noteWithTime]);
      setCurrentNote("");
    }
  };

  const openInYouTube = () => {
    window.open(video.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      {/* Video Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{video.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </span>
                <span>{video.channelName}</span>
                <span>{video.viewCount.toLocaleString()} views</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {progress.isCompleted && (
                <Badge className="bg-green-500/20 text-green-400">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={openInYouTube}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          {!showVideo ? (
            <div className="relative">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                <Button
                  size="lg"
                  onClick={handlePlayVideo}
                  className="bg-empire-emerald-500 hover:bg-empire-emerald-600 rounded-full w-16 h-16"
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-black/70 text-white">
                  {video.duration}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="relative">
              <iframe
                ref={iframeRef}
                src={`${video.embedUrl}?autoplay=${autoplay ? 1 : 0}&controls=${showControls ? 1 : 0}&enablejsapi=1&origin=${window.location.origin}`}
                title={video.title}
                className="w-full h-64 rounded-t-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {progress.percentage > 0 && (
                <div className="absolute bottom-0 left-0 right-0">
                  <Progress
                    value={progress.percentage}
                    className="w-full h-1 rounded-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Video Description */}
          <div className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {video.description.length > 300
                ? `${video.description.substring(0, 300)}...`
                : video.description}
            </p>

            {video.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {video.tags.slice(0, 5).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Learning Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Learning Notes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Note */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add a note about this video..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addNote()}
              className="flex-1 px-3 py-2 border border-border rounded-md text-sm"
            />
            <Button onClick={addNote} size="sm" disabled={!currentNote.trim()}>
              Add Note
            </Button>
          </div>

          {/* Notes List */}
          {notes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Your Notes</h4>
              <div className="space-y-1">
                {notes.map((note, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs p-2 bg-muted rounded border-l-2 border-empire-emerald-500"
                  >
                    {note}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {notes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                Add notes while watching to enhance your learning
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => setShowVideo(!showVideo)}
          className="flex items-center space-x-2"
        >
          {showVideo ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>{showVideo ? "Hide Video" : "Show Video"}</span>
        </Button>

        <Button
          variant="outline"
          onClick={openInYouTube}
          className="flex items-center space-x-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open in YouTube</span>
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
