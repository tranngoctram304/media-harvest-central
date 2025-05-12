
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

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
    <div className="p-fluid grid formgrid mt-4">
      <div className="field col-12 md:col-8 mb-3">
        <label htmlFor="download-folder" className="block mb-2">Download Folder</label>
        <div className="p-inputgroup">
          <InputText
            id="download-folder"
            value={downloadFolder}
            onChange={(e) => onFolderChange(e.target.value)}
            placeholder="Select folder to save videos"
            readOnly
          />
          <Button 
            label="Browse"
            onClick={handleSelectFolder}
          />
        </div>
      </div>
      
      <div className="field col-12 md:col-4 mb-3 flex align-items-end">
        <Button
          onClick={onDownload}
          disabled={selectedCount === 0 || !downloadFolder || isDownloading}
          icon="pi pi-download"
          label={isDownloading ? "Downloading..." : `Download ${selectedCount} ${selectedCount === 1 ? 'Video' : 'Videos'}`}
          loading={isDownloading}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DownloadControls;
