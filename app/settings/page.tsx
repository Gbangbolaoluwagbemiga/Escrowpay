"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Wallet, Save, CheckCircle, AlertCircle } from "lucide-react"
import { escrowService, web3Utils } from "@/lib/smart-contracts"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [networkInfo, setNetworkInfo] = useState<any>(null)
  const { toast } = useToast()

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    title: "Full Stack Developer",
    bio: "Experienced full-stack developer with 5+ years in React, Node.js, and blockchain development. Specialized in building secure, scalable web applications.",
    location: "San Francisco, CA",
    timezone: "pst",
  })

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    jobOpportunities: true,
    payments: true,
    contracts: true,
    messages: true,
    marketing: false,
    email: true,
    push: true,
  })

  // Wallet settings state
  const [walletSettings, setWalletSettings] = useState({
    autoRelease: true,
    autoReleaseDelay: "7",
    gasPrice: "standard",
  })

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletConnected(true)
          setWalletAddress(accounts[0])

          const network = await escrowService.getCurrentNetwork()
          setNetworkInfo(network)

          console.log("[v0] Wallet connected:", accounts[0])
        }
      }
    } catch (error) {
      console.error("[v0] Error checking wallet connection:", error)
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("[v0] Saving profile data:", profileData)

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
    } catch (error) {
      console.error("[v0] Error saving profile:", error)
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log("[v0] Saving notification preferences:", notifications)

      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      console.error("[v0] Error saving notifications:", error)
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveWalletSettings = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      console.log("[v0] Saving wallet settings:", walletSettings)

      toast({
        title: "Wallet Settings Updated",
        description: "Your wallet preferences have been saved.",
      })
    } catch (error) {
      console.error("[v0] Error saving wallet settings:", error)
      toast({
        title: "Error",
        description: "Failed to save wallet settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectWallet = async () => {
    try {
      await escrowService.initializeProvider()
      await checkWalletConnection()

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      })
    } catch (error) {
      console.error("[v0] Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSwitchToArbitrum = async () => {
    try {
      await escrowService.switchToArbitrum()
      await checkWalletConnection()

      toast({
        title: "Network Switched",
        description: "Successfully switched to Arbitrum network.",
      })
    } catch (error) {
      console.error("[v0] Error switching network:", error)
      toast({
        title: "Network Switch Failed",
        description: "Failed to switch to Arbitrum. Please try manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and security settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and professional details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell clients about your experience and expertise..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={profileData.timezone}
                        onValueChange={(value) => setProfileData((prev) => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Standard Time</SelectItem>
                          <SelectItem value="est">Eastern Standard Time</SelectItem>
                          <SelectItem value="cst">Central Standard Time</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveProfile} disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified about important events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Job Opportunities</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new jobs match your skills</p>
                      </div>
                      <Switch
                        checked={notifications.jobOpportunities}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, jobOpportunities: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Notifications</Label>
                        <p className="text-sm text-muted-foreground">Alerts for payments and escrow releases</p>
                      </div>
                      <Switch
                        checked={notifications.payments}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, payments: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Contract Updates</Label>
                        <p className="text-sm text-muted-foreground">Changes to your active contracts</p>
                      </div>
                      <Switch
                        checked={notifications.contracts}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, contracts: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Client Messages</Label>
                        <p className="text-sm text-muted-foreground">New messages from clients</p>
                      </div>
                      <Switch
                        checked={notifications.messages}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, messages: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Updates</Label>
                        <p className="text-sm text-muted-foreground">Platform updates and promotional content</p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-4">Notification Methods</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Browser Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSaveNotifications}
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Change Password</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button variant="outline">Update Password</Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-4">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable 2FA</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-4">Active Sessions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">Current Session</p>
                            <p className="text-sm text-muted-foreground">Chrome on macOS • San Francisco, CA</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Current
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">Mobile App</p>
                            <p className="text-sm text-muted-foreground">iOS App • Last active 2 hours ago</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Wallet className="w-5 h-5" />
                    Wallet Settings
                  </CardTitle>
                  <CardDescription>Configure your wallet preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-4">Connected Wallet</h4>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        {walletConnected ? (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <p className="font-medium text-foreground">MetaMask Connected</p>
                              </div>
                              <p className="text-sm text-muted-foreground font-mono">
                                {web3Utils.formatAddress(walletAddress)}
                              </p>
                              {networkInfo && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Network: {networkInfo.name} (Chain ID: {networkInfo.chainId})
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {networkInfo?.chainId !== 42161 && (
                                <Button variant="outline" size="sm" onClick={handleSwitchToArbitrum}>
                                  Switch to Arbitrum
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                Disconnect
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-500" />
                                <p className="font-medium text-foreground">No Wallet Connected</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Connect your wallet to use escrow features
                              </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleConnectWallet}>
                              Connect Wallet
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-4">Auto-Release Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-release after deadline</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically release funds if client doesn't respond
                            </p>
                          </div>
                          <Switch
                            checked={walletSettings.autoRelease}
                            onCheckedChange={(checked) =>
                              setWalletSettings((prev) => ({ ...prev, autoRelease: checked }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="autoReleaseDelay">Auto-release delay (days)</Label>
                          <Select
                            value={walletSettings.autoReleaseDelay}
                            onValueChange={(value) =>
                              setWalletSettings((prev) => ({ ...prev, autoReleaseDelay: value }))
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 days</SelectItem>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="14">14 days</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-4">Transaction Preferences</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gasPrice">Preferred Gas Price</Label>
                          <Select
                            value={walletSettings.gasPrice}
                            onValueChange={(value) => setWalletSettings((prev) => ({ ...prev, gasPrice: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="slow">Slow (Lower fees)</SelectItem>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="fast">Fast (Higher fees)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSaveWalletSettings}
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
