import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, DollarSign, Calendar, User, Clock, FileText, Send } from "lucide-react"
import Link from "next/link"

// Mock job data for proposal
const jobData = {
  id: "5",
  title: "React Dashboard Development",
  description:
    "Build an analytics dashboard with charts and real-time data visualization. Looking for an experienced React developer.",
  client: {
    name: "DataTech Solutions",
    avatar: "DT",
    rating: 4.7,
    jobsPosted: 8,
  },
  budget: "$4,000 - $6,000",
  deadline: "Jan 15, 2025",
  skills: ["React", "D3.js", "TypeScript", "Node.js"],
  postedDate: "2 hours ago",
  proposals: 12,
}

export default function ProposalPage() {
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
              <div>
                <h1 className="text-3xl font-bold text-foreground">Submit Proposal</h1>
                <p className="text-muted-foreground">Create a compelling proposal for this project</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Proposal Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                {/* Cover Letter */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Cover Letter</CardTitle>
                    <CardDescription>Introduce yourself and explain why you're the best fit</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Your Proposal *</Label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Dear DataTech Solutions,

I'm excited to submit my proposal for your React Dashboard Development project. With over 5 years of experience in React development and data visualization, I'm confident I can deliver exactly what you're looking for.

Here's what I bring to your project:
• Extensive experience with React, TypeScript, and D3.js
• Previous work on similar analytics dashboards
• Strong understanding of real-time data visualization
• Clean, maintainable code practices

I would love to discuss your specific requirements and show you some examples of my previous dashboard work. I'm available to start immediately and can deliver within your timeline.

Best regards,
John Doe"
                        rows={12}
                        className="bg-muted/50"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Pricing & Timeline</CardTitle>
                    <CardDescription>Set your price and delivery timeline</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="bidAmount">Your Bid (ETH) *</Label>
                        <Input id="bidAmount" type="number" step="0.01" placeholder="4.50" className="bg-muted/50" />
                        <p className="text-xs text-muted-foreground">Client budget: {jobData.budget}</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryTime">Delivery Time *</Label>
                        <Select>
                          <SelectTrigger className="bg-muted/50">
                            <SelectValue placeholder="Select delivery time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-week">1 week</SelectItem>
                            <SelectItem value="2-weeks">2 weeks</SelectItem>
                            <SelectItem value="3-weeks">3 weeks</SelectItem>
                            <SelectItem value="1-month">1 month</SelectItem>
                            <SelectItem value="2-months">2 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="milestones">Milestone Structure</Label>
                      <Select>
                        <SelectTrigger className="bg-muted/50">
                          <SelectValue placeholder="Select milestone structure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Payment (100% on completion)</SelectItem>
                          <SelectItem value="two">Two Milestones (50% / 50%)</SelectItem>
                          <SelectItem value="three">Three Milestones (33% / 33% / 34%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Details */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Additional Details</CardTitle>
                    <CardDescription>Provide more context about your approach</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="approach">Project Approach</Label>
                      <Textarea
                        id="approach"
                        placeholder="Describe your approach to this project, technologies you'll use, and any questions you have..."
                        rows={4}
                        className="bg-muted/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Relevant Portfolio Links</Label>
                      <Input
                        id="portfolio"
                        placeholder="https://github.com/johndoe/dashboard-project"
                        className="bg-muted/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="questions">Questions for Client</Label>
                      <Textarea
                        id="questions"
                        placeholder="Any questions about the project requirements, data sources, or specific features?"
                        rows={3}
                        className="bg-muted/50"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" asChild>
                    <Link href="/jobs">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Proposal
                  </Button>
                </div>
              </form>
            </div>

            {/* Job Summary Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{jobData.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{jobData.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{jobData.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Due {jobData.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Posted {jobData.postedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{jobData.proposals} proposals submitted</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5" />
                    Client
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-muted">{jobData.client.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{jobData.client.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">★ {jobData.client.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jobs Posted:</span>
                      <span className="text-foreground">{jobData.client.jobsPosted}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Proposal Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Personalize your proposal to the client's needs</li>
                    <li>• Highlight relevant experience and skills</li>
                    <li>• Ask thoughtful questions about the project</li>
                    <li>• Be competitive but fair with your pricing</li>
                    <li>• Include links to relevant portfolio work</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
