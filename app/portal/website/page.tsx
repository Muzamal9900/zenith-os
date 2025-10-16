"use client"

import PortalLayout from "@/components/portal-layout"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/contexts/auth-context"
import { AlertCircle, CheckCircle, Clock, Edit, Globe, Plus, RefreshCw, Trash2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface Website {
  id: string
  url: string
  title?: string
  description?: string
  status: "PENDING" | "CONNECTED" | "ERROR" | "DISCONNECTED"
  lastChecked?: string
  sslEnabled: boolean
  responseTime?: number
  errorMessage?: string
  createdAt: string
  updatedAt: string
}

export default function PortalWebsitePage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null)
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()
  const { token, user, isLoading: authLoading } = useAuth()

  const getHeaders = () => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  })

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  const fetchWebsites = async () => {
    try {
      const response = await fetch("/api/websites", {
        headers: getHeaders()
      })
      
      if (response.ok) {
        const data = await response.json()
        setWebsites(data)
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        addToast({ type: "error", title: errorData.error || "Failed to fetch websites" })
      }
    } catch (error) {
      addToast({ type: "error", title: "Error fetching websites" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      fetchWebsites()
    }
  }, [token, user, authLoading])


  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/websites", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        addToast({ type: "success", title: "Website added successfully" })
        closeAddDialog()
        await fetchWebsites()
      } else {
        const error = await response.json()
        console.error("Failed to add website:", error)
        addToast({ type: "error", title: error.error || "Failed to add website" })
      }
    } catch (error) {
      console.error("Error adding website:", error)
      addToast({ type: "error", title: "Error adding website" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateWebsite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingWebsite) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/websites/${editingWebsite.id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        addToast({ type: "success", title: "Website updated successfully" })
        closeEditDialog()
        await fetchWebsites()
      } else {
        const error = await response.json()
        console.error("Failed to update website:", error)
        addToast({ type: "error", title: error.error || "Failed to update website" })
      }
    } catch (error) {
      console.error("Error updating website:", error)
      addToast({ type: "error", title: "Error updating website" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteWebsite = async (id: string) => {
    if (!confirm("Are you sure you want to delete this website?")) return

    try {
      const response = await fetch(`/api/websites/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      })

      if (response.ok) {
        addToast({ type: "success", title: "Website deleted successfully" })
        fetchWebsites()
      } else {
        addToast({ type: "error", title: "Failed to delete website" })
      }
    } catch (error) {
      addToast({ type: "error", title: "Error deleting website" })
    }
  }


  const resetForm = () => {
    setFormData({ url: "", title: "", description: "" })
    setEditingWebsite(null)
    setIsSubmitting(false)
  }

  const openEditDialog = (website: Website) => {
    setEditingWebsite(website)
    setFormData({
      url: website.url,
      title: website.title || "",
      description: website.description || ""
    })
    setIsEditDialogOpen(true)
  }

  const closeAddDialog = () => {
    setIsAddDialogOpen(false)
    resetForm()
  }

  const closeEditDialog = () => {
    setIsEditDialogOpen(false)
    resetForm()
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONNECTED":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>
      case "ERROR":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Error</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Verifying</Badge>
      case "DISCONNECTED":
        return <Badge className="bg-gray-100 text-gray-800"><AlertCircle className="w-3 h-3 mr-1" />Disconnected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Website Management</h1>
              <p className="text-gray-400">Manage your websites and monitor their status</p>
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Website
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => !open && closeAddDialog()}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Website</DialogTitle>
                  <DialogDescription>
                    Add a website to monitor its status and performance.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddWebsite} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                      Website URL *
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.url}
                      onChange={handleInputChange("url")}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500">Enter the full URL including http:// or https://</p>
          </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Website Title (optional)
                    </Label>
                    <Input
                      id="title"
                      placeholder="My Business Website"
                      value={formData.title}
                      onChange={handleInputChange("title")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500">A friendly name for your website</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description (optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your website and its purpose"
                      value={formData.description}
                      onChange={handleInputChange("description")}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500">Help identify this website in your list</p>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button" 
                      variant="outline" 
                      onClick={closeAddDialog}
                      disabled={isSubmitting}
                      className="px-6 py-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit" 
                      disabled={isSubmitting || !formData.url.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Website
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
                </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : websites.length === 0 ? (
              <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Globe className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No websites added yet</h3>
                <p className="text-gray-600 text-center mb-6">
                  Add your first website to start monitoring its status and performance.
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Website
                </Button>
                </CardContent>
              </Card>
          ) : (
            <div className="space-y-6">
              {websites.map((website) => (
                <Card key={website.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold text-white mb-1 group-hover:text-indigo-700 transition-colors duration-300">
                            {website.title || "Untitled Website"}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded-md inline-block">
                            {website.url}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(website)}
                          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteWebsite(website.id)}
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {website.description && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-200">
                        <p className="text-sm text-gray-700 leading-relaxed">{website.description}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(website.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Dialog open={isEditDialogOpen} onOpenChange={(open) => !open && closeEditDialog()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Website</DialogTitle>
                <DialogDescription>
                  Update your website information.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateWebsite} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-url" className="text-sm font-medium text-gray-700">
                    Website URL *
                  </Label>
                  <Input
                    id="edit-url"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={handleInputChange("url")}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500">Enter the full URL including http:// or https://</p>
                  </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-sm font-medium text-gray-700">
                    Website Title (optional)
                  </Label>
                  <Input
                    id="edit-title"
                    placeholder="My Business Website"
                    value={formData.title}
                    onChange={handleInputChange("title")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500">A friendly name for your website</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Brief description of your website and its purpose"
                    value={formData.description}
                    onChange={handleInputChange("description")}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500">Help identify this website in your list</p>
              </div>
                
                <div className="flex justify-end gap-3 pt-4">
                <Button 
                    type="button" 
                  variant="outline" 
                    onClick={closeEditDialog}
                    disabled={isSubmitting}
                    className="px-6 py-2"
                  >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.url.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Update Website
                      </>
                    )}
                </Button>
              </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </PortalLayout>
    </ProtectedRoute>
  )
}
