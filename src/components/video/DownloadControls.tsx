
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

interface DownloadControlsProps {
  downloadFolder: string;
  onFolderChange: (folder: string) => void;
  onDownload: () => void;
  selectedCount: number;
  isDownloading: boolean;
}

const DownloadControls = ({
  downloadFolder,
  onFolderChange,
  onDownload,
  selectedCount,
  isDownloading,
}: DownloadControlsProps) => {
  // Simulate file system folder selection
  const handleSelectFolder = () => {
    // In a real app, this would use a file system API
    const mockFolder = `/Users/username/Videos/download_${Date.now()}`;
    onFolderChange(mockFolder);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <div className="flex-1">
        <Label htmlFor="download-folder" className="mb-2 block">
          Download Folder
        </Label>
        <div className="flex gap-2">
          <Input
            id="download-folder"
            value={downloadFolder}
            onChange={(e) => onFolderChange(e.target.value)}
            placeholder="Select folder to save videos"
            className="flex-1"
            readOnly
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleSelectFolder}
          >
            Browse
          </Button>
        </div>
      </div>
      <div className="self-end sm:self-end">
        <Button
          onClick={onDownload}
          disabled={selectedCount === 0 || !downloadFolder || isDownloading}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download {selectedCount} {selectedCount === 1 ? 'Video' : 'Videos'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DownloadControls;
