
export type Platform = 'tiktok' | 'douyin' | 'youtube' | 'facebook' | 'instagram';

export interface VideoItem {
  id: string;
  platform: Platform;
  caption: string;
  likes: number;
  shares: number;
  comments: number;
  views: number;
  status: 'pending' | 'scanning' | 'ready' | 'downloading' | 'downloaded' | 'error';
  url?: string;
  thumbnailUrl?: string;
  dateCreated?: string;
  errorMessage?: string;
}

export interface ScanOptions {
  platform: Platform;
  url: string;
  cookies?: string;
  maxVideos: number;
  sortBy?: 'views' | 'likes' | 'comments' | 'shares';
}

export interface DownloadOptions {
  outputFolder: string;
  selectedVideos: string[];
}
