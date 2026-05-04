import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, Tag, IndianRupee, TrendingUp, Users, Lock, ShieldAlert } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

// Mock: in production this comes from auth context
// Change this to "Content Admin" or "Support Admin" to see the revenue block in action
const CURRENT_ADMIN_ROLE = "Finance Admin"; // "Super Admin" | "Finance Admin" | "Content Admin" | "Support Admin"
const canViewRevenue = CURRENT_ADMIN_ROLE === "Super Admin" || CURRENT_ADMIN_ROLE === "Finance Admin";

interface Coupon {
  id: number;
  code: string;
  discountType: "Percentage" | "Fixed";
  value: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  status: "Active" | "Expired" | "Disabled";
  createdDate: string;
}

export default function AdminPayments() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 1,
      code: "FIRST10",
      discountType: "Percentage",
      value: 10,
      expiryDate: "2026-04-30",
      usageLimit: 500,
      usageCount: 245,
      status: "Active",
      createdDate: "2026-03-01"
    },
    {
      id: 2,
      code: "SAVE20",
      discountType: "Percentage",
      value: 20,
      expiryDate: "2026-05-15",
      usageLimit: 300,
      usageCount: 128,
      status: "Active",
      createdDate: "2026-03-10"
    },
    {
      id: 3,
      code: "EARLY25",
      discountType: "Percentage",
      value: 25,
      expiryDate: "2026-04-20",
      usageLimit: 200,
      usageCount: 56,
      status: "Active",
      createdDate: "2026-03-15"
    },
    {
      id: 4,
      code: "FLAT5000",
      discountType: "Fixed",
      value: 5000,
      expiryDate: "2026-06-30",
      usageLimit: 100,
      usageCount: 23,
      status: "Active",
      createdDate: "2026-04-01"
    },
    {
      id: 5,
      code: "EXPIRED50",
      discountType: "Percentage",
      value: 50,
      expiryDate: "2026-03-31",
      usageLimit: 50,
      usageCount: 45,
      status: "Expired",
      createdDate: "2026-02-01"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "Percentage" as "Percentage" | "Fixed",
    value: 0,
    expiryDate: "",
    usageLimit: 0,
    status: "Active" as "Active" | "Expired" | "Disabled"
  });

  const handleAddCoupon = () => {
    const newCoupon: Coupon = {
      id: coupons.length + 1,
      ...formData,
      usageCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCoupons([newCoupon, ...coupons]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditCoupon = () => {
    if (selectedCoupon) {
      setCoupons(coupons.map(coupon => 
        coupon.id === selectedCoupon.id 
          ? { ...coupon, ...formData }
          : coupon
      ));
      setIsEditDialogOpen(false);
      setSelectedCoupon(null);
      resetForm();
    }
  };

  const handleDeleteCoupon = (id: number) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter(coupon => coupon.id !== id));
    }
  };

  const openEditDialog = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      value: coupon.value,
      expiryDate: coupon.expiryDate,
      usageLimit: coupon.usageLimit,
      status: coupon.status
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "Percentage",
      value: 0,
      expiryDate: "",
      usageLimit: 0,
      status: "Active"
    });
  };

  const CouponForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Coupon Code *</Label>
          <Input
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="SAVE30"
            className="mt-2 uppercase"
          />
        </div>

        <div>
          <Label>Discount Type *</Label>
          <Select 
            value={formData.discountType} 
            onValueChange={(value: "Percentage" | "Fixed") => setFormData({ ...formData, discountType: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Percentage">Percentage (%)</SelectItem>
              <SelectItem value="Fixed">Fixed Amount (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>
            {formData.discountType === "Percentage" ? "Discount Percentage" : "Discount Amount"} *
          </Label>
          <Input
            type="number"
            value={formData.value || ""}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            placeholder={formData.discountType === "Percentage" ? "30" : "5000"}
            className="mt-2"
            min="0"
            max={formData.discountType === "Percentage" ? "100" : undefined}
          />
        </div>

        <div>
          <Label>Expiry Date *</Label>
          <Input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Usage Limit *</Label>
          <Input
            type="number"
            value={formData.usageLimit || ""}
            onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
            placeholder="500"
            className="mt-2"
            min="0"
          />
        </div>

        <div>
          <Label>Status *</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value: "Active" | "Expired" | "Disabled") => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          onClick={onSubmit} 
          className="flex-1"
          style={{ background: '#E53935', color: 'white' }}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );

  const totalRevenue = "₹2.45Cr";
  const monthlyRevenue = "₹24.5L";
  const activeCoupons = coupons.filter(c => c.status === "Active").length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usageCount, 0);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#121212' }}>Payments & Coupons</h1>
            <p className="text-gray-600 mt-1">Manage payment settings and promotional coupons</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="shadow-lg"
                style={{ background: '#E53935', color: 'white' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Coupon</DialogTitle>
              </DialogHeader>
              <CouponForm onSubmit={handleAddCoupon} submitLabel="Create Coupon" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Revenue Stats — restricted to Finance Admin / Super Admin */}
        {!canViewRevenue ? (
          <Card className="p-8 border-2 border-orange-200 bg-orange-50 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(229,57,53,0.1)" }}>
              <ShieldAlert className="h-7 w-7" style={{ color: "#E53935" }} />
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: "#121212" }}>Revenue Access Restricted</div>
              <div className="text-gray-600 text-sm mt-1">You do not have permission to view revenue data. Contact a Super Admin to grant access.</div>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-orange-600 font-medium">
                <Lock className="h-3 w-3" /> Requires Super Admin approval
              </div>
            </div>
          </Card>
        ) : (
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 border-2 border-gray-100 hover:border-[#E53935] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                <IndianRupee className="h-6 w-6" style={{ color: '#4CAF50' }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#121212' }}>{totalRevenue}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-100 hover:border-[#E53935] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229, 57, 53, 0.1)' }}>
                <TrendingUp className="h-6 w-6" style={{ color: '#E53935' }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#121212' }}>{monthlyRevenue}</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-100 hover:border-[#E53935] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229, 57, 53, 0.1)' }}>
                <Tag className="h-6 w-6" style={{ color: '#E53935' }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#121212' }}>{activeCoupons}</div>
                <div className="text-sm text-gray-600">Active Coupons</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-gray-100 hover:border-[#E53935] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229, 57, 53, 0.1)' }}>
                <Users className="h-6 w-6" style={{ color: '#E53935' }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#121212' }}>{totalUsage}</div>
                <div className="text-sm text-gray-600">Total Usage</div>
              </div>
            </div>
          </Card>
        </div>
        )}

        {/* Coupons Management */}
        <Card className="border-2 border-gray-100">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-gray-200 px-6 pt-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">All Coupons</TabsTrigger>
                <TabsTrigger value="active">Active ({activeCoupons})</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-bold">Code</TableHead>
                      <TableHead className="font-bold">Discount</TableHead>
                      <TableHead className="font-bold">Type</TableHead>
                      <TableHead className="font-bold">Usage</TableHead>
                      <TableHead className="font-bold">Expiry Date</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'rgba(229, 57, 53, 0.1)' }}>
                              <Tag className="h-4 w-4" style={{ color: '#E53935' }} />
                            </div>
                            <span className="font-bold" style={{ color: '#121212' }}>{coupon.code}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium" style={{ color: '#E53935' }}>
                            {coupon.discountType === "Percentage" 
                              ? `${coupon.value}%` 
                              : `₹${coupon.value}`}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-300">
                            {coupon.discountType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium" style={{ color: '#121212' }}>
                              {coupon.usageCount} / {coupon.usageLimit}
                            </div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                              <div 
                                className="h-full rounded-full transition-all"
                                style={{ 
                                  background: '#E53935',
                                  width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(coupon.expiryDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            style={{ 
                              background: coupon.status === "Active" ? '#4CAF50' : 
                                         coupon.status === "Expired" ? '#gray' : '#FF9800', 
                              color: 'white' 
                            }}
                          >
                            {coupon.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(coupon)}
                              className="border-gray-300 hover:border-[#E53935] hover:text-[#E53935]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCoupon(coupon.id)}
                              className="border-gray-300 hover:border-red-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="active" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-bold">Code</TableHead>
                      <TableHead className="font-bold">Discount</TableHead>
                      <TableHead className="font-bold">Type</TableHead>
                      <TableHead className="font-bold">Usage</TableHead>
                      <TableHead className="font-bold">Expiry Date</TableHead>
                      <TableHead className="font-bold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.filter(c => c.status === "Active").map((coupon) => (
                      <TableRow key={coupon.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'rgba(229, 57, 53, 0.1)' }}>
                              <Tag className="h-4 w-4" style={{ color: '#E53935' }} />
                            </div>
                            <span className="font-bold" style={{ color: '#121212' }}>{coupon.code}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium" style={{ color: '#E53935' }}>
                            {coupon.discountType === "Percentage" 
                              ? `${coupon.value}%` 
                              : `₹${coupon.value}`}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-300">
                            {coupon.discountType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium" style={{ color: '#121212' }}>
                              {coupon.usageCount} / {coupon.usageLimit}
                            </div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                              <div 
                                className="h-full rounded-full transition-all"
                                style={{ 
                                  background: '#E53935',
                                  width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(coupon.expiryDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(coupon)}
                              className="border-gray-300 hover:border-[#E53935] hover:text-[#E53935]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCoupon(coupon.id)}
                              className="border-gray-300 hover:border-red-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expired" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-bold">Code</TableHead>
                      <TableHead className="font-bold">Discount</TableHead>
                      <TableHead className="font-bold">Usage</TableHead>
                      <TableHead className="font-bold">Expiry Date</TableHead>
                      <TableHead className="font-bold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.filter(c => c.status === "Expired").map((coupon) => (
                      <TableRow key={coupon.id} className="hover:bg-gray-50 opacity-60">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded flex items-center justify-center bg-gray-200">
                              <Tag className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="font-bold text-gray-500">{coupon.code}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {coupon.discountType === "Percentage" 
                            ? `${coupon.value}%` 
                            : `₹${coupon.value}`}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {coupon.usageCount} / {coupon.usageLimit}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {new Date(coupon.expiryDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            className="border-gray-300 hover:border-red-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Coupon</DialogTitle>
            </DialogHeader>
            <CouponForm onSubmit={handleEditCoupon} submitLabel="Update Coupon" />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
