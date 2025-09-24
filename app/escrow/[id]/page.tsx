import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Shield,
  DollarSign,
  Clock,
  ExternalLink,
  Copy,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  FileText,
  MessageSquare,
  Timer,
  User,
} from "lucide-react"
import Link from "next/link"

// Mock contract data
const contractData = {
  id: "0x1234567890abcdef1234567890abcdef12345678",
  project: "E-commerce Website Development",
  description:
    "Build a modern e-commerce platform with React and Node.js including user authentication, product catalog, shopping cart, and payment integration.",
  client: {
    name: "TechCorp Inc.",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    avatar: "TC",
    rating: 4.8,
  },
  freelancer: {
    name: "John Doe",
    address: "0x8D4C0532925a3b8D4C0532925a3b8D4C05329258",
    avatar: "JD",
    rating: 4.9,
  },
  amount: "5.2000",
  usdAmount: "$5,200.00",
  status: "Active",
  statusColor: "bg-primary",
  createdDate: "Nov 20, 2024",
  autoReleaseDate: "Dec 22, 2024",
  progress: 65,
  milestones: [
    {
      id: 1,
      title: "Project Setup & Authentication",
      amount: "1.7333",
      status: "completed",
      dueDate: "Nov 25, 2024",
      completedDate: "Nov 24, 2024",
      releasedDate: "Nov 25, 2024",
    },
    {
      id: 2,
      title: "Product Catalog & Shopping Cart",
      amount: "1.7333",
      status: "in-progress",
      dueDate: "Dec 5, 2024",
      submittedDate: "Dec 3, 2024",
    },
    {
      id: 3,
      title: "Payment Integration & Admin Dashboard",
      amount: "1.7334",
      status: "pending",
      dueDate: "Dec 15, 2024",
    },
  ],
  transactions: [
    {
      id: "1",
      type: "deposit",
      amount: "5.2000",
      hash: "0xabcd...1234",
      date: "Nov 20, 2024",
      status: "Confirmed",
      description: "Initial contract funding",
    },
    {
      id: "2",
      type: "release",
      amount: "1.7333",
      hash: "0xbcde...2345",
      date: "Nov 25, 2024",
      status: "Confirmed",
      description: "Milestone 1 payment release",
    },
  ],
  terms: {
    autoReleasePeriod: "7 days",
    disputeWindow: "3 days",
    platformFee: "2.5%",
  },
}

export default function ContractDetailsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/escrow">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{contractData.project}</h1>
                    <p className="text-muted-foreground">Smart Contract Details</p>
                  </div>
                  <Badge className={`${contractData.statusColor} text-white`}>{contractData.status}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contract Overview */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5" />
                    Contract Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground leading-relaxed">{contractData.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{contractData.amount} ETH</p>
                      <p className="text-sm text-muted-foreground">{contractData.usdAmount}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{contractData.createdDate}</p>
                      <p className="text-sm text-muted-foreground">Created</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Timer className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{contractData.autoReleaseDate}</p>
                      <p className="text-sm text-muted-foreground">Auto-release</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{contractData.progress}%</p>
                      <p className="text-sm text-muted-foreground">Complete</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <code className="text-sm font-mono text-muted-foreground flex-1">{contractData.id}</code>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Milestones & Payments</CardTitle>
                  <CardDescription>Track project progress and payment releases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="text-foreground font-medium">{contractData.progress}%</span>
                    </div>
                    <Progress value={contractData.progress} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    {contractData.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                milestone.status === "completed"
                                  ? "bg-accent text-accent-foreground"
                                  : milestone.status === "in-progress"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {milestone.status === "completed" ? <CheckCircle className="w-4 h-4" /> : index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{milestone.title}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Due: {milestone.dueDate}</span>
                                {milestone.completedDate && <span>• Completed: {milestone.completedDate}</span>}
                                {milestone.submittedDate && <span>• Submitted: {milestone.submittedDate}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{milestone.amount} ETH</p>
                            <Badge
                              className={
                                milestone.status === "completed"
                                  ? "bg-accent/20 text-accent"
                                  : milestone.status === "in-progress"
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground"
                              }
                            >
                              {milestone.status === "completed"
                                ? "Released"
                                : milestone.status === "in-progress"
                                  ? "In Review"
                                  : "Pending"}
                            </Badge>
                          </div>
                        </div>

                        {milestone.status === "in-progress" && (
                          <div className="ml-11 flex gap-2">
                            <Button size="sm" className="bg-accent hover:bg-accent/90">
                              <Unlock className="w-4 h-4 mr-2" />
                              Release Payment
                            </Button>
                            <Button size="sm" variant="outline">
                              Request Changes
                            </Button>
                          </div>
                        )}

                        {index < contractData.milestones.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Transaction History</CardTitle>
                  <CardDescription>All blockchain transactions for this contract</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contractData.transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "deposit" ? "bg-primary/20" : "bg-accent/20"
                          }`}
                        >
                          {tx.type === "deposit" ? (
                            <Lock className="w-5 h-5 text-primary" />
                          ) : (
                            <Unlock className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">{tx.description}</p>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{tx.amount} ETH</p>
                              <Badge variant="secondary" className="text-xs">
                                {tx.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <code className="text-xs font-mono text-muted-foreground">{tx.hash}</code>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-xs text-muted-foreground">{tx.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Parties */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5" />
                    Contract Parties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Client</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-muted">{contractData.client.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{contractData.client.name}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">★ {contractData.client.rating}</span>
                        </div>
                      </div>
                    </div>
                    <code className="text-xs font-mono text-muted-foreground mt-2 block">
                      {contractData.client.address}
                    </code>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Freelancer</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-muted">{contractData.freelancer.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{contractData.freelancer.name}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">★ {contractData.freelancer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <code className="text-xs font-mono text-muted-foreground mt-2 block">
                      {contractData.freelancer.address}
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Contract Terms */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Contract Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auto-release Period:</span>
                    <span className="text-foreground">{contractData.terms.autoReleasePeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dispute Window:</span>
                    <span className="text-foreground">{contractData.terms.disputeWindow}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee:</span>
                    <span className="text-foreground">{contractData.terms.platformFee}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Other Party
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Contract
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent border-destructive text-destructive">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Raise Dispute
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
