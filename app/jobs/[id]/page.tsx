import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Clock,
  Shield,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock job data
const jobData = {
  id: "1",
  title: "E-commerce Website Development",
  description:
    "Build a modern e-commerce platform with React and Node.js. The project includes user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Looking for an experienced full-stack developer who can deliver high-quality, scalable code.",
  client: {
    name: "TechCorp Inc.",
    avatar: "TC",
    rating: 4.8,
    jobsPosted: 12,
    totalSpent: "$45,000",
    memberSince: "2022",
  },
  freelancer: {
    name: "John Doe",
    avatar: "JD",
    rating: 4.9,
    completedJobs: 28,
  },
  amount: "5.2000",
  usdAmount: "$5,200.00",
  status: "In Progress",
  statusColor: "bg-primary",
  deadline: "Dec 15, 2024",
  startDate: "Nov 20, 2024",
  progress: 65,
  skills: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
  milestones: [
    {
      id: 1,
      title: "Project Setup & Authentication",
      amount: "1.7333",
      status: "completed",
      dueDate: "Nov 25, 2024",
      completedDate: "Nov 24, 2024",
    },
    {
      id: 2,
      title: "Product Catalog & Shopping Cart",
      amount: "1.7333",
      status: "in-progress",
      dueDate: "Dec 5, 2024",
    },
    {
      id: 3,
      title: "Payment Integration & Admin Dashboard",
      amount: "1.7334",
      status: "pending",
      dueDate: "Dec 15, 2024",
    },
  ],
  escrowContract: {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    autoReleaseDate: "Dec 22, 2024",
    totalLocked: "5.2000",
    released: "1.7333",
    pending: "3.4667",
  },
}

export default function JobDetailsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/jobs">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{jobData.title}</h1>
                    <p className="text-muted-foreground">Job ID: #{jobData.id}</p>
                  </div>
                  <Badge className={`${jobData.statusColor} text-white`}>{jobData.status}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Overview */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">{jobData.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{jobData.amount} ETH</p>
                      <p className="text-sm text-muted-foreground">{jobData.usdAmount}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{jobData.deadline}</p>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{jobData.startDate}</p>
                      <p className="text-sm text-muted-foreground">Started</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <p className="font-semibold text-foreground">{jobData.progress}%</p>
                      <p className="text-sm text-muted-foreground">Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress & Milestones */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Project Progress</CardTitle>
                  <CardDescription>Track milestone completion and payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="text-foreground font-medium">{jobData.progress}%</span>
                    </div>
                    <Progress value={jobData.progress} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    {jobData.milestones.map((milestone, index) => (
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
                              <p className="text-sm text-muted-foreground">
                                Due: {milestone.dueDate}
                                {milestone.completedDate && ` • Completed: ${milestone.completedDate}`}
                              </p>
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
                                ? "Completed"
                                : milestone.status === "in-progress"
                                  ? "In Progress"
                                  : "Pending"}
                            </Badge>
                          </div>
                        </div>
                        {index < jobData.milestones.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Communication */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <MessageSquare className="w-5 h-5" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Client
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      View Contract
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Client Information */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5" />
                    Client
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-muted">{jobData.client.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{jobData.client.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">★ {jobData.client.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jobs Posted:</span>
                      <span className="text-foreground">{jobData.client.jobsPosted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Spent:</span>
                      <span className="text-foreground">{jobData.client.totalSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since:</span>
                      <span className="text-foreground">{jobData.client.memberSince}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Escrow Information */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5" />
                    Escrow Contract
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Locked:</span>
                      <span className="text-foreground font-medium">{jobData.escrowContract.totalLocked} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Released:</span>
                      <span className="text-accent font-medium">{jobData.escrowContract.released} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending:</span>
                      <span className="text-foreground font-medium">{jobData.escrowContract.pending} ETH</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-muted-foreground">Auto-release:</span>
                    </div>
                    <p className="text-sm text-foreground">{jobData.escrowContract.autoReleaseDate}</p>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full text-xs bg-transparent">
                      View on Blockchain
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90">Submit Deliverable</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Request Milestone Payment
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Report Issue
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
