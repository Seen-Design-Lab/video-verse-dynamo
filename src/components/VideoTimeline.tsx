
import { Slider } from "@/components/ui/slider";

interface VideoTimelineProps {
  duration: number;
  currentTime: number;
  startTime: number;
  endTime: number;
  onTrimChange: (values: number[]) => void;
}

const VideoTimeline = ({
  duration,
  currentTime,
  startTime,
  endTime,
  onTrimChange
}: VideoTimelineProps) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="mt-4 p-4 border rounded-lg bg-card">
      <h3 className="font-medium mb-2">Trim Video</h3>
      <div className="mb-2">
        <Slider
          value={[startTime, endTime]}
          min={0}
          max={duration}
          step={0.01}
          onValueChange={onTrimChange}
          className="my-4"
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <div>Start: {formatTime(startTime)}</div>
        <div>End: {formatTime(endTime)}</div>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        Duration: {formatTime(endTime - startTime)}
      </div>
    </div>
  );
};

export default VideoTimeline;
