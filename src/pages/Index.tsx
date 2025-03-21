
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Player, PlayerRef } from "@remotion/player";
import { toast } from "sonner";
import VideoUploader from "@/components/VideoUploader";
import VideoControls from "@/components/VideoControls";
import VideoTimeline from "@/components/VideoTimeline";

const Index = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const playerRef = useRef<PlayerRef>(null);
  
  const handleVideoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    
    // Reset trimming points when a new video is uploaded
    setStartTime(0);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Create a temporary video element to get the duration
    const video = document.createElement("video");
    video.src = url;
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      setEndTime(video.duration);
    };
  };
  
  const handleTimeUpdate = (newTime: number) => {
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime * 1000);
    }
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (playerRef.current) {
      if (!isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  };
  
  const handleTrimChange = (values: number[]) => {
    setStartTime(values[0]);
    setEndTime(values[1]);
  };
  
  const handleExport = () => {
    if (!videoSrc) return;
    
    // In a real application, you would send the video to a server for processing
    // This is a simplified example that just shows a success toast
    toast.success(`Video trimmed from ${startTime.toFixed(2)}s to ${endTime.toFixed(2)}s`);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Video Editor</h1>
        <p className="text-muted-foreground">Upload, trim, and export your videos</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <div className="flex-1 flex flex-col gap-4">
          {videoSrc ? (
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <Player
                ref={playerRef}
                durationInFrames={Math.floor(videoDuration * 30)} // Assuming 30fps
                compositionWidth={1920}
                compositionHeight={1080}
                fps={30}
                style={{ width: '100%', height: '100%' }}
                autoPlay={isPlaying}
                loop={false}
              >
                <video 
                  src={videoSrc} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  muted
                />
              </Player>
            </div>
          ) : (
            <VideoUploader onUpload={handleVideoUpload} />
          )}
          
          {videoSrc && (
            <>
              <VideoControls 
                isPlaying={isPlaying} 
                onPlayPause={handlePlayPause}
                currentTime={currentTime}
                duration={videoDuration}
                onTimeUpdate={handleTimeUpdate}
              />
              
              <VideoTimeline 
                duration={videoDuration}
                currentTime={currentTime}
                startTime={startTime}
                endTime={endTime}
                onTrimChange={handleTrimChange}
              />
              
              <div className="mt-4">
                <Button onClick={handleExport} disabled={!videoSrc}>
                  Export Trimmed Video
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
