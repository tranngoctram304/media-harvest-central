
import { useState } from "react";
import { Platform, VideoItem, ScanOptions } from "../types/video";
import { useToast } from "@/components/ui/use-toast";

export const useVideoDownloader = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [downloadFolder, setDownloadFolder] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock scan function - in a real app, this would call an API
  const scanVideos = async (options: ScanOptions) => {
    try {
      setIsScanning(true);
      toast({
        title: "Scanning started",
        description: `Scanning for videos from ${options.platform}...`,
      });

      // This is a mock implementation
      // In a real app, this would call an API to get videos
      const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await mockDelay(2000);

      // Generate mock data based on the platform
      const mockData: VideoItem[] = Array.from({ length: options.maxVideos }).map((_, i) => ({
        id: `${options.platform}-${Date.now()}-${i}`,
        platform: options.platform,
        caption: `${options.platform} video ${i + 1}`,
        likes: Math.floor(Math.random() * 10000),
        shares: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 3000),
        views: Math.floor(Math.random() * 100000),
        status: 'ready',
        url: options.url,
        thumbnailUrl: `https://picsum.photos/200/300?random=${i}`,
        dateCreated: new Date().toISOString(),
      }));

      // Sort based on the sortBy option
      if (options.sortBy) {
        mockData.sort((a, b) => b[options.sortBy!] - a[options.sortBy!]);
      }

      setVideos(mockData);
      toast({
        title: "Scan completed",
        description: `Found ${mockData.length} videos from ${options.platform}`,
      });
    } catch (error) {
      console.error("Error scanning videos:", error);
      toast({
        title: "Scan failed",
        description: "An error occurred while scanning for videos.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (isScanning) {
      setIsScanning(false);
      toast({
        title: "Scanning stopped",
        description: "Video scanning has been stopped.",
      });
    }
  };

  const toggleVideoSelection = (videoId: string) => {
    setSelectedVideos((prev) => 
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedVideos(videos.map(video => video.id));
    } else {
      setSelectedVideos([]);
    }
  };

  const downloadVideos = async () => {
    try {
      if (selectedVideos.length === 0) {
        toast({
          title: "No videos selected",
          description: "Please select videos to download.",
          variant: "destructive",
        });
        return;
      }

      if (!downloadFolder) {
        toast({
          title: "No folder selected",
          description: "Please select a folder to save the videos.",
          variant: "destructive",
        });
        return;
      }

      setIsDownloading(true);
      toast({
        title: "Download started",
        description: `Downloading ${selectedVideos.length} videos to ${downloadFolder}...`,
      });

      // Update status for selected videos
      setVideos(prev => 
        prev.map(video => 
          selectedVideos.includes(video.id) 
            ? { ...video, status: 'downloading' } 
            : video
        )
      );

      // Mock download delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update status to downloaded
      setVideos(prev => 
        prev.map(video => 
          selectedVideos.includes(video.id) 
            ? { ...video, status: 'downloaded' } 
            : video
        )
      );

      toast({
        title: "Download completed",
        description: `Successfully downloaded ${selectedVideos.length} videos to ${downloadFolder}`,
      });
    } catch (error) {
      console.error("Error downloading videos:", error);
      toast({
        title: "Download failed",
        description: "An error occurred while downloading videos.",
        variant: "destructive",
      });

      // Update status to error for selected videos
      setVideos(prev => 
        prev.map(video => 
          selectedVideos.includes(video.id) 
            ? { ...video, status: 'error', errorMessage: 'Download failed' } 
            : video
        )
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    videos,
    isScanning,
    isDownloading,
    selectedVideos,
    downloadFolder,
    scanVideos,
    stopScanning,
    toggleVideoSelection,
    toggleSelectAll,
    setDownloadFolder,
    downloadVideos,
  };
};
