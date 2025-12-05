'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Video, Square, Play, Upload, X } from 'lucide-react';

interface VideoRecorderProps {
  onVideoRecorded: (blob: Blob) => void;
  onCancel: () => void;
}

export function VideoRecorder({ onVideoRecorded, onCancel }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      // Cleanup
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [stream, previewUrl]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: true,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      console.error('Camera error:', err);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // Stop camera stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleUseVideo = async () => {
    if (!recordedBlob) return;

    // In a production app, you would compress the video here using ffmpeg.wasm
    // For now, we'll use the recorded blob directly
    // Example compression would look like:
    // const compressedBlob = await compressVideo(recordedBlob);
    // onVideoRecorded(compressedBlob);

    onVideoRecorded(recordedBlob);
  };

  const handleRetake = () => {
    setRecordedBlob(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    startCamera();
  };

  useEffect(() => {
    let mounted = true;
    
    const initCamera = async () => {
      if (mounted) {
        await startCamera();
      }
    };
    
    initCamera();
    
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Record Exercise Video</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Video Preview */}
        <div className="bg-black rounded-xl overflow-hidden mb-6 aspect-video">
          {previewUrl ? (
            <video
              src={previewUrl}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain mirror"
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          {!recordedBlob ? (
            <>
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  size="lg"
                  disabled={!stream}
                  variant="danger"
                >
                  <Video className="mr-2" size={20} />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  size="lg"
                  variant="secondary"
                >
                  <Square className="mr-2" size={20} />
                  Stop Recording
                </Button>
              )}
              <Button onClick={onCancel} variant="outline" size="lg">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleRetake} variant="outline" size="lg">
                <Play className="mr-2" size={20} />
                Retake
              </Button>
              <Button onClick={handleUseVideo} size="lg">
                <Upload className="mr-2" size={20} />
                Use This Video
              </Button>
            </>
          )}
        </div>

        <style jsx>{`
          .mirror {
            transform: scaleX(-1);
          }
        `}</style>
      </div>
    </div>
  );
}
