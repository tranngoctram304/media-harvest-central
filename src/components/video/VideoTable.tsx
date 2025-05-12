import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VideoItem, Platform } from "@/types/video";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect } from "react";

interface VideoTableProps {
  videos: VideoItem[];
  selectedVideos: string[];
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: (selected: boolean) => void;
  isLoading?: boolean;
}

const VideoTable = ({
  videos,
  selectedVideos,
  onToggleSelection,
  onToggleSelectAll,
  isLoading = false,
}: VideoTableProps) => {
  const allSelected = videos.length > 0 && selectedVideos.length === videos.length;
  const someSelected = selectedVideos.length > 0 && selectedVideos.length < videos.length;
  // Change the type to use HTMLElement instead of HTMLButtonElement
  const checkboxRef = useRef<HTMLElement>(null);

  // Use useEffect to set the indeterminate property on the checkbox DOM element
  useEffect(() => {
    if (checkboxRef.current) {
      // Use type assertion to set the indeterminate property
      (checkboxRef.current as any).indeterminate = someSelected;
    }
  }, [someSelected]);

  const getPlatformBadge = (platform: Platform) => {
    switch (platform) {
      case 'youtube':
        return <span className="platform-badge youtube">YouTube</span>;
      case 'tiktok':
        return <span className="platform-badge tiktok">TikTok</span>;
      case 'douyin':
        return <span className="platform-badge tiktok">Douyin</span>;
      case 'facebook':
        return <span className="platform-badge facebook">Facebook</span>;
      case 'instagram':
        return <span className="platform-badge instagram">Instagram</span>;
      default:
        return <span className="platform-badge">{platform}</span>;
    }
  };

  const getStatusBadge = (status: VideoItem['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'scanning':
        return <Badge variant="secondary" className="animate-pulse-light">Scanning</Badge>;
      case 'ready':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ready</Badge>;
      case 'downloading':
        return <Badge variant="secondary" className="animate-pulse-light">Downloading</Badge>;
      case 'downloaded':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Downloaded</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                ref={checkboxRef}
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead>ID / Platform</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead className="text-right">Likes</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Comments</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                  <span className="text-muted-foreground">Scanning videos...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : videos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10">
                <span className="text-muted-foreground">No videos found. Start by scanning videos from any platform.</span>
              </TableCell>
            </TableRow>
          ) : (
            videos.map((video, index) => (
              <TableRow key={video.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedVideos.includes(video.id)}
                    onCheckedChange={() => onToggleSelection(video.id)}
                    aria-label={`Select video ${index + 1}`}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{video.id.substring(0, 10)}...</span>
                    <span className="mt-1">{getPlatformBadge(video.platform)}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  <span className="text-sm">{video.caption}</span>
                </TableCell>
                <TableCell className="text-right">{video.likes.toLocaleString()}</TableCell>
                <TableCell className="text-right">{video.shares.toLocaleString()}</TableCell>
                <TableCell className="text-right">{video.comments.toLocaleString()}</TableCell>
                <TableCell className="text-right">{video.views.toLocaleString()}</TableCell>
                <TableCell className="text-center">{getStatusBadge(video.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VideoTable;
