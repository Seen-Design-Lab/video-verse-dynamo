
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
}

const VideoControls = ({
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  onTimeUpdate
}: VideoControlsProps) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onPlayPause}
          className="rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        
        <div className="flex-1 flex items-center gap-2">
          <span className="text-sm text-muted-foreground w-12">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.01}
            onValueChange={(values) => onTimeUpdate(values[0])}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-12">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
