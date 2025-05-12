
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { VideoData } from '@/types';

export interface UseVideoDownloader {
  downloadVideo: (videoId: string) => Promise<void>;
  downloadStatus: Record<string, 'idle' | 'downloading' | 'complete' | 'error'>;
  downloadProgress: Record<string, number>;
}

export const useVideoDownloader = (): UseVideoDownloader => {
  const [downloadStatus, setDownloadStatus] = useState<Record<string, 'idle' | 'downloading' | 'complete' | 'error'>>({});
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const toast = useToast();

  const downloadVideo = async (videoId: string): Promise<void> => {
    if (downloadStatus[videoId] === 'downloading') {
      toast.error({
        title: 'Download already in progress',
        description: 'This video is already being downloaded.'
      });
      return;
    }

    // Set initial status
    setDownloadStatus(prev => ({
      ...prev,
      [videoId]: 'downloading'
    }));
    
    setDownloadProgress(prev => ({
      ...prev,
      [videoId]: 0
    }));

    try {
      // Simulate a download with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setDownloadProgress(prev => ({
          ...prev,
          [videoId]: i
        }));
      }

      // Complete the download
      setDownloadStatus(prev => ({
        ...prev,
        [videoId]: 'complete'
      }));
      
      toast.success({
        title: 'Download complete',
        description: 'Your video has been downloaded successfully.'
      });

      // Reset after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[videoId];
          return newStatus;
        });
        
        setDownloadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[videoId];
          return newProgress;
        });
      }, 3000);
      
    } catch (error) {
      setDownloadStatus(prev => ({
        ...prev,
        [videoId]: 'error'
      }));
      
      toast.error({
        title: 'Download failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };

  const simulateVideoInfo = async (url: string): Promise<VideoData> => {
    if (!url || !url.trim()) {
      toast.error({
        title: 'Invalid URL',
        description: 'Please enter a valid URL'
      });
      throw new Error('Invalid URL');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 10% chance of error for simulation purposes
    if (Math.random() < 0.1) {
      toast.error({
        title: 'Failed to fetch video info',
        description: 'Could not retrieve video information'
      });
      throw new Error('Failed to fetch video info');
    }
    
    // Generate mock video data
    const mockVideoId = Math.random().toString(36).substring(2, 12);
    
    toast.success({
      title: 'Video found',
      description: 'Video information retrieved successfully'
    });
    
    return {
      id: mockVideoId,
      title: `Sample Video ${mockVideoId.substring(0, 5)}`,
      thumbnail: `https://picsum.photos/seed/${mockVideoId}/640/360`,
      duration: Math.floor(Math.random() * 3600), // Random duration up to 1 hour
      resolution: ['480p', '720p', '1080p'][Math.floor(Math.random() * 3)],
      created_at: new Date().toISOString()
    };
  };

  return {
    downloadVideo,
    downloadStatus,
    downloadProgress
  };
};
