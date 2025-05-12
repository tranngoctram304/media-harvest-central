
import { useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Badge } from "primereact/badge";
import { VideoItem, Platform } from "@/types/video";

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
        return <Badge value="Pending" severity="info" />;
      case 'scanning':
        return <Badge value="Scanning" severity="info" className="animate-pulse-light" />;
      case 'ready':
        return <Badge value="Ready" severity="info" />;
      case 'downloading':
        return <Badge value="Downloading" severity="warning" className="animate-pulse-light" />;
      case 'downloaded':
        return <Badge value="Downloaded" severity="success" />;
      case 'error':
        return <Badge value="Error" severity="danger" />;
      default:
        return <Badge value={status} severity="info" />;
    }
  };

  const checkboxHeader = (
    <Checkbox
      checked={allSelected}
      indeterminate={someSelected}
      onChange={(e) => onToggleSelectAll(e.checked || false)}
      aria-label="Select all"
    />
  );

  const checkboxBodyTemplate = (rowData: VideoItem) => {
    return (
      <Checkbox
        checked={selectedVideos.includes(rowData.id)}
        onChange={() => onToggleSelection(rowData.id)}
        aria-label={`Select video ${rowData.id}`}
      />
    );
  };

  const indexBodyTemplate = (_: any, options: any) => {
    return options.rowIndex + 1;
  };

  const platformBodyTemplate = (rowData: VideoItem) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{rowData.id.substring(0, 10)}...</span>
        <span className="mt-1">{getPlatformBadge(rowData.platform)}</span>
      </div>
    );
  };

  const captionBodyTemplate = (rowData: VideoItem) => {
    return <span className="text-sm truncate max-w-[200px]">{rowData.caption}</span>;
  };

  const numberBodyTemplate = (rowData: VideoItem, field: keyof VideoItem) => {
    return <span>{(rowData[field] as number).toLocaleString()}</span>;
  };

  const statusBodyTemplate = (rowData: VideoItem) => {
    return <div className="text-center">{getStatusBadge(rowData.status)}</div>;
  };

  const emptyMessage = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
          <span className="text-gray-500">Scanning videos...</span>
        </div>
      );
    }
    return (
      <div className="text-center py-10">
        <span className="text-gray-500">No videos found. Start by scanning videos from any platform.</span>
      </div>
    );
  };

  return (
    <div className="border rounded-md">
      <DataTable
        value={videos}
        loading={isLoading}
        emptyMessage={emptyMessage}
        className="p-datatable-sm"
        responsiveLayout="scroll"
        showGridlines
      >
        <Column header={checkboxHeader} body={checkboxBodyTemplate} style={{ width: '3rem' }} />
        <Column header="#" body={indexBodyTemplate} style={{ width: '3rem' }} />
        <Column header="ID / Platform" body={platformBodyTemplate} />
        <Column field="caption" header="Caption" body={captionBodyTemplate} />
        <Column 
          field="likes" 
          header="Likes" 
          body={(rowData) => numberBodyTemplate(rowData, 'likes')} 
          align="right"
        />
        <Column 
          field="shares" 
          header="Shares" 
          body={(rowData) => numberBodyTemplate(rowData, 'shares')} 
          align="right"
        />
        <Column 
          field="comments" 
          header="Comments" 
          body={(rowData) => numberBodyTemplate(rowData, 'comments')} 
          align="right"
        />
        <Column 
          field="views" 
          header="Views" 
          body={(rowData) => numberBodyTemplate(rowData, 'views')} 
          align="right"
        />
        <Column header="Status" body={statusBodyTemplate} align="center" />
      </DataTable>
    </div>
  );
};

export default VideoTable;
