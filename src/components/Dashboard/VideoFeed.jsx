import React, { useState } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { useSystem } from '../../contexts/SystemContext';
import videoSrc from '../../assets/crowd-fixed.mp4';

function VideoFeed() {
  const { crowdData } = useSystem();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  // Simulate detection areas
  const detectionAreas = Array.from(
    { length: crowdData.detectedAreas || 5 },
    (_, i) => ({
      id: i,
      x: Math.random() * 70 + 10,
      y: Math.random() * 60 + 15,
      width: Math.random() * 15 + 5,
      height: Math.random() * 12 + 5,
      intensity: Math.random(),
    })
  );

  return (
    <div className="bg-neutral-900 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Live Video Stream
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOverlayVisible(!overlayVisible)}
            className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
          >
            {overlayVisible ? 'Hide' : 'Show'} Detection
          </button>

          <span className="text-xs text-neutral-400">
            1920x1080 • 30 FPS
          </span>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        {/* ✅ REAL VIDEO */}
        <video
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          className="w-full h-full object-cover"
        />

        {/* Detection Overlay */}
        {overlayVisible && (
          <div className="absolute inset-0">
            {detectionAreas.map((area) => (
              <div
                key={area.id}
                className={`absolute border-2 ${
                  area.intensity > 0.7
                    ? 'border-red-500 bg-red-500/20'
                    : area.intensity > 0.4
                    ? 'border-yellow-500 bg-yellow-500/20'
                    : 'border-green-500 bg-green-500/20'
                }`}
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.width}%`,
                  height: `${area.height}%`,
                }}
              >
                <div className="absolute -top-6 left-0 text-xs text-white bg-black/50 px-1 rounded">
                  {Math.round(area.intensity * 100)}%
                </div>
              </div>
            ))}

            {/* Info Box */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-xs">
              <div>
                Crowd Density: {Math.round(crowdData?.currentDensity || 0)}%
              </div>
              <div>
                Detected Areas: {crowdData?.detectedAreas || 0}
              </div>
              <div>
                Total People: {crowdData?.totalPeople || 0}
              </div>
            </div>

            {/* LIVE indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs">LIVE</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>

          <button className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 text-xs text-neutral-400 flex justify-between">
        <span>Stream Quality: High (1080p)</span>
        <span>Latency: 180ms</span>
      </div>
    </div>
  );
}

export default VideoFeed;
