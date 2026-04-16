import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { useSystem } from '../../contexts/SystemContext';
import videoSrc from '../../assets/crowd-fixed.mp4';

function VideoFeed() {
  const { crowdData } = useSystem();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // ✅ must start muted

  // ▶️ Play / Pause control
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // 🔊 Mute / Unmute control
  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-neutral-900 rounded-lg p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Live Video Stream
        </h3>

        <span className="text-xs text-neutral-400">
          1920x1080 • 30 FPS
        </span>
      </div>

      {/* Video Container */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">

        {/* ✅ REAL VIDEO */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* INFO OVERLAY */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-xs">
          <div>Crowd Density: {Math.round(crowdData?.currentDensity || 0)}%</div>
          <div>Detected Areas: {crowdData?.detectedAreas || 0}</div>
          <div>Total People: {crowdData?.totalPeople || 0}</div>
        </div>

        {/* LIVE indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs">LIVE</span>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">

            {/* ▶️ Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            {/* 🔊 Mute */}
            <button
              onClick={toggleMute}
              className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

          </div>

          {/* ⛶ Fullscreen (UI only) */}
          <button className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-neutral-400 flex justify-between">
        <span>Stream Quality: High (1080p)</span>
        <span>Latency: 180ms</span>
      </div>
    </div>
  );
}

export default VideoFeed;


