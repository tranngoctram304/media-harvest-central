
import { useVideoDownloader } from "../hooks/useVideoDownloader";
import ScanControls from "../components/video/ScanControls";
import VideoTable from "../components/video/VideoTable";
import DownloadControls from "../components/video/DownloadControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DownloadVideo = () => {
  const {
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
  } = useVideoDownloader();

  return (
    <div className="container mx-auto">
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Download Video</CardTitle>
        </CardHeader>
        <CardContent>
          <ScanControls
            onScan={scanVideos}
            onStop={stopScanning}
            isScanning={isScanning}
          />

          <VideoTable
            videos={videos}
            selectedVideos={selectedVideos}
            onToggleSelection={toggleVideoSelection}
            onToggleSelectAll={toggleSelectAll}
            isLoading={isScanning}
          />

          <DownloadControls
            downloadFolder={downloadFolder}
            onFolderChange={setDownloadFolder}
            onDownload={downloadVideos}
            selectedCount={selectedVideos.length}
            isDownloading={isDownloading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadVideo;
