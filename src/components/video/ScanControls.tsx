
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScanOptions, Platform } from "@/types/video";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Stop } from "lucide-react";

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
    <Card className="mb-6 p-0">
      <CardContent className="pt-6">
        <Tabs defaultValue="youtube" onValueChange={(value) => setActivePlatform(value as Platform)}>
          <TabsList className="grid grid-cols-5 mb-4">
            {platforms.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id}>
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {platforms.map((platform) => (
            <TabsContent key={platform.id} value={platform.id} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${platform.id}-url`}>URL</Label>
                <Input
                  id={`${platform.id}-url`}
                  placeholder={`Enter ${platform.name} URL`}
                  value={platform.id === activePlatform ? url : ''}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              
              {platform.requiresCookies && (
                <div className="space-y-2">
                  <Label htmlFor={`${platform.id}-cookies`}>Cookies</Label>
                  <Textarea
                    id={`${platform.id}-cookies`}
                    placeholder={`Paste ${platform.name} cookies here`}
                    value={platform.id === activePlatform ? cookies : ''}
                    onChange={(e) => setCookies(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </TabsContent>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="max-videos">Maximum Videos</Label>
              <Input
                id="max-videos"
                type="number"
                min="1"
                max="100"
                value={maxVideos}
                onChange={(e) => setMaxVideos(parseInt(e.target.value) || 10)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By</Label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="likes">Likes</SelectItem>
                  <SelectItem value="shares">Shares</SelectItem>
                  <SelectItem value="comments">Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            {isScanning ? (
              <Button 
                onClick={onStop}
                variant="destructive" 
                className="flex items-center gap-2"
              >
                <Stop className="h-4 w-4" />
                Stop Scanning
              </Button>
            ) : (
              <Button 
                onClick={handleScan}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Scan Videos
              </Button>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScanControls;
