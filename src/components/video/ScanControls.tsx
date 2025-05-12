
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { ScanOptions, Platform } from "@/types/video";

interface ScanControlsProps {
  onScan: (options: ScanOptions) => void;
  onStop: () => void;
  isScanning: boolean;
}

const platforms: Array<{ id: Platform; name: string; requiresCookies: boolean }> = [
  { id: 'tiktok', name: 'TikTok', requiresCookies: true },
  { id: 'douyin', name: 'Douyin', requiresCookies: false },
  { id: 'youtube', name: 'YouTube', requiresCookies: false },
  { id: 'facebook', name: 'Facebook', requiresCookies: true },
  { id: 'instagram', name: 'Instagram', requiresCookies: true },
];

const sortOptions = [
  { label: 'Views', value: 'views' },
  { label: 'Likes', value: 'likes' },
  { label: 'Shares', value: 'shares' },
  { label: 'Comments', value: 'comments' },
];

const ScanControls = ({ onScan, onStop, isScanning }: ScanControlsProps) => {
  const [activePlatform, setActivePlatform] = useState<Platform>('youtube');
  const [url, setUrl] = useState<string>('');
  const [cookies, setCookies] = useState<string>('');
  const [maxVideos, setMaxVideos] = useState<number>(10);
  const [sortBy, setSortBy] = useState<'views' | 'likes' | 'comments' | 'shares'>('views');

  const handleScan = () => {
    if (!url) return;

    const options: ScanOptions = {
      platform: activePlatform,
      url,
      maxVideos,
      sortBy,
    };

    const currentPlatform = platforms.find(p => p.id === activePlatform);
    if (currentPlatform?.requiresCookies) {
      options.cookies = cookies;
    }

    onScan(options);
  };

  return (
    <Card className="mb-6">
      <TabView 
        activeIndex={platforms.findIndex(p => p.id === activePlatform)}
        onTabChange={(e) => setActivePlatform(platforms[e.index].id)}
      >
        {platforms.map((platform) => (
          <TabPanel key={platform.id} header={platform.name}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 mb-3">
                <label htmlFor={`${platform.id}-url`} className="block mb-2">URL</label>
                <InputText
                  id={`${platform.id}-url`}
                  placeholder={`Enter ${platform.name} URL`}
                  value={platform.id === activePlatform ? url : ''}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              
              {platform.requiresCookies && (
                <div className="field col-12 mb-3">
                  <label htmlFor={`${platform.id}-cookies`} className="block mb-2">Cookies</label>
                  <InputTextarea
                    id={`${platform.id}-cookies`}
                    placeholder={`Paste ${platform.name} cookies here`}
                    value={platform.id === activePlatform ? cookies : ''}
                    onChange={(e) => setCookies(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </TabPanel>
        ))}

        <div className="p-fluid grid formgrid mt-4">
          <div className="field col-12 md:col-6 mb-3">
            <label htmlFor="max-videos" className="block mb-2">Maximum Videos</label>
            <InputNumber
              id="max-videos"
              value={maxVideos}
              onValueChange={(e) => setMaxVideos(e.value || 10)}
              min={1}
              max={100}
            />
          </div>
          
          <div className="field col-12 md:col-6 mb-3">
            <label htmlFor="sort-by" className="block mb-2">Sort By</label>
            <Dropdown
              id="sort-by"
              value={sortBy}
              options={sortOptions}
              onChange={(e) => setSortBy(e.value)}
              placeholder="Select a sorting option"
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          {isScanning ? (
            <Button 
              onClick={onStop}
              severity="danger"
              label="Stop Scanning"
              icon="pi pi-stop"
            />
          ) : (
            <Button 
              onClick={handleScan}
              label="Scan Videos"
              icon="pi pi-search"
            />
          )}
        </div>
      </TabView>
    </Card>
  );
};

export default ScanControls;
