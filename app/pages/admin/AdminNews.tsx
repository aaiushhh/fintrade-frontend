import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, Video, Calendar, Eye, Link as LinkIcon, Search, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "../../components/ui/badge";

interface NewsItem {
  id: number;
  title: string;
  type: "YouTube" | "Uploaded";
  url: string;
  thumbnail: string;
  description: string;
  date: string;
  views: string;
  status: "Published" | "Draft";
}

export default function AdminNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: 1,
      title: "NIFTY Market Analysis Today",
      type: "YouTube",
      url: "https://youtube.com/watch?v=sample123",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
      description: "Comprehensive market analysis covering NIFTY 50 movements and key trading opportunities",
      date: "2026-04-15",
      views: "12K",
      status: "Published"
    },
    {
      id: 2,
      title: "Risk Management Strategies Explained",
      type: "Uploaded",
      url: "/videos/risk-management.mp4",
      thumbnail: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833",
      description: "Learn essential risk management techniques for successful trading",
      date: "2026-04-14",
      views: "8.5K",
      status: "Published"
    },
    {
      id: 3,
      title: "Candlestick Patterns for Day Trading",
      type: "YouTube",
      url: "https://youtube.com/watch?v=sample456",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
      description: "Master candlestick patterns to improve your day trading performance",
      date: "2026-04-13",
      views: "15K",
      status: "Published"
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "YouTube" as "YouTube" | "Uploaded",
    url: "",
    thumbnail: "",
    description: "",
    status: "Published" as "Published" | "Draft"
  });

  const handleAddNews = () => {
    const newNews: NewsItem = {
      id: newsItems.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      views: "0"
    };
    setNewsItems([newNews, ...newsItems]);
    setIsAddDialogOpen(false);
    setFormData({ title: "", type: "YouTube", url: "", thumbnail: "", description: "", status: "Published" });
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#121212' }}>Market Updates Manager</h1>
          <p className="text-gray-600 mt-1">Publish video analysis and news for the homepage</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-lg h-12 px-6 rounded-xl text-white font-bold" style={{ background: '#E53935' }}>
              <Plus className="h-5 w-5 mr-2" />
              New Analysis
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add Market Update</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label className="font-bold">Title *</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. NIFTY 50 Weekly Outlook" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="font-bold">Video Type</Label>
                  <Select value={formData.type} onValueChange={(v: any) => setFormData({...formData, type: v})}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YouTube">YouTube Link</SelectItem>
                      <SelectItem value="Uploaded">Direct Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="font-bold">Video URL *</Label>
                  <Input value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="font-bold">Description *</Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Summarize the analysis..." rows={3} />
              </div>
              <Button onClick={handleAddNews} className="h-12 text-white font-bold" style={{ background: '#E53935' }}>Publish Now</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Updates", value: newsItems.length, icon: Calendar, color: "#121212" },
          { label: "YouTube Source", value: newsItems.filter(n => n.type === "YouTube").length, icon: LinkIcon, color: "#E53935" },
          { label: "Accumulated Views", value: "44.7K", icon: Eye, color: "#4CAF50" },
          { label: "Drafts", value: newsItems.filter(n => n.status === "Draft").length, icon: Filter, color: "#9CA3AF" },
        ].map((s, i) => (
          <Card key={i} className="p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}10` }}>
              <s.icon className="h-6 w-6" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: '#121212' }}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input className="pl-9 bg-white border-gray-200" placeholder="Search updates..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white border-gray-200"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="bg-white border-gray-200">Export</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold py-4">Preview</TableHead>
              <TableHead className="font-bold">Content Details</TableHead>
              <TableHead className="font-bold">Source</TableHead>
              <TableHead className="font-bold">Performance</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsItems.map((news) => (
              <TableRow key={news.id} className="group hover:bg-gray-50/80">
                <TableCell className="py-4">
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-gray-200 relative group-hover:border-[#E53935]/50 transition-all">
                    <img src={news.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                       <Video className="text-white h-6 w-6" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-sm" style={{ color: '#121212' }}>{news.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{news.description}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`h-6 text-[10px] uppercase font-bold ${news.type === 'YouTube' ? 'text-[#E53935] border-[#E53935]/30 bg-red-50' : 'text-blue-600 border-blue-200 bg-blue-50'}`}>
                    {news.type}
                  </Badge>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-1.5 font-bold text-sm" style={{ color: '#121212' }}>
                      <Eye className="h-3.5 w-3.5 text-gray-400" /> {news.views}
                   </div>
                   <p className="text-[10px] text-gray-500 mt-0.5">{news.date}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${news.status === 'Published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs font-bold" style={{ color: news.status === 'Published' ? '#4CAF50' : '#9ca3af' }}>{news.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 hover:text-red-500 hover:border-red-200"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-gray-100 text-center">
            <Button variant="ghost" className="text-xs font-bold text-gray-400">Showing {newsItems.length} of 42 articles</Button>
        </div>
      </Card>
    </DashboardLayout>
  );
}
