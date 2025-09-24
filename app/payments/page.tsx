"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownLeft,
  CalendarIcon,
  ExternalLink,
} from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

// Mock payment data
const paymentStats = [
  {
    title: "Total Earned",
    value: "45.8500",
    usdValue: "$45,850",
    change: "+12.5%",
    changeType: "increase",
    icon: DollarSign,
    color: "text-accent",
  },
  {
    title: "This Month",
    value: "8.2000",
    usdValue: "$8,200",
    change: "+18.2%",
    changeType: "increase",
    icon: TrendingUp,
    color: "text-accent",
  },
  {
    title: "Pending Payments",
    value: "3.4500",
    usdValue: "$3,450",
    change: "2 contracts",
    changeType: "neutral",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    title: "Average per Project",
    value: "3.8200",
    usdValue: "$3,820",
    change: "+5.1%",
    changeType: "increase",
    icon: CreditCard,
    color: "text-primary",
  },
]

const recentPayments = [
  {
    id: "1",
    type: "received",
    project: "E-commerce Website Development",
    client: "TechCorp Inc.",
    amount: "1.7333",
    usdAmount: "$1,733.30",
    date: "Dec 8, 2024",
    status: "Completed",
    hash: "0x1234...5678",
    milestone: "Milestone 1",
    method: "Escrow Release",
  },
  {
    id: "2",
    type: "received",
    project: "Mobile App UI/UX Design",
    client: "StartupXYZ",
    amount: "3.8000",
    usdAmount: "$3,800.00",
    date: "Dec 5, 2024",
    status: "Completed",
    hash: "0x2345...6789",
    milestone: "Final Payment",
    method: "Escrow Release",
  },
  {
    id: "3",
    type: "pending",
    project: "WordPress Plugin Development",
    client: "RetailCorp",
    amount: "1.8000",
    usdAmount: "$1,800.00",
    date: "Dec 20, 2024",
    status: "Pending",
    hash: "-",
    milestone: "Final Payment",
    method: "Auto-release",
  },
  {
    id: "4",
    type: "received",
    project: "Brand Identity Package",
    client: "Creative Agency",
    amount: "2.5000",
    usdAmount: "$2,500.00",
    date: "Dec 3, 2024",
    status: "Completed",
    hash: "0x3456...7890",
    milestone: "Final Payment",
    method: "Manual Release",
  },
  {
    id: "5",
    type: "fee",
    project: "Platform Fee",
    client: "EscrowPay",
    amount: "-0.0625",
    usdAmount: "-$62.50",
    date: "Dec 3, 2024",
    status: "Completed",
    hash: "0x4567...8901",
    milestone: "Service Fee",
    method: "Auto-deduct",
  },
]

const monthlyData = [
  { month: "Jul", earned: 2.1, projects: 2 },
  { month: "Aug", earned: 4.5, projects: 3 },
  { month: "Sep", earned: 3.8, projects: 2 },
  { month: "Oct", earned: 6.2, projects: 4 },
  { month: "Nov", earned: 7.1, projects: 3 },
  { month: "Dec", earned: 8.2, projects: 4 },
]

export default function PaymentsPage() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
              <p className="text-muted-foreground">Track your earnings and payment history</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paymentStats.map((stat, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value} ETH</div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{stat.usdValue}</p>
                    {stat.changeType !== "neutral" && (
                      <div className="flex items-center gap-1">
                        {stat.changeType === "increase" ? (
                          <TrendingUp className="w-3 h-3 text-accent" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-destructive" />
                        )}
                        <span
                          className={`text-xs ${stat.changeType === "increase" ? "text-accent" : "text-destructive"}`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    )}
                    {stat.changeType === "neutral" && (
                      <span className="text-xs text-muted-foreground">{stat.change}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search payments..." className="pl-10 bg-muted/50" />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="fee">Fees</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-[200px] justify-start text-left font-normal bg-muted/50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Pick a date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              {/* Payment History */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Payments</CardTitle>
                  <CardDescription>Your latest payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            payment.type === "received"
                              ? "bg-accent/20"
                              : payment.type === "pending"
                                ? "bg-yellow-500/20"
                                : "bg-destructive/20"
                          }`}
                        >
                          {payment.type === "received" ? (
                            <ArrowDownLeft className="w-5 h-5 text-accent" />
                          ) : payment.type === "pending" ? (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{payment.project}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{payment.client}</span>
                                <span>•</span>
                                <span>{payment.milestone}</span>
                                <span>•</span>
                                <span>{payment.method}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">
                                {payment.type === "fee" ? "" : "+"}
                                {payment.amount} ETH
                              </p>
                              <p className="text-sm text-muted-foreground">{payment.usdAmount}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              {payment.hash !== "-" && (
                                <>
                                  <code className="text-xs font-mono text-muted-foreground">{payment.hash}</code>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  payment.status === "Completed"
                                    ? "bg-accent/20 text-accent"
                                    : payment.status === "Pending"
                                      ? "bg-yellow-500/20 text-yellow-500"
                                      : "bg-destructive/20 text-destructive"
                                }
                              >
                                {payment.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{payment.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Earnings Chart */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Monthly Earnings</CardTitle>
                    <CardDescription>Your earnings over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((month) => (
                        <div key={month.month} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground w-8">{month.month}</span>
                            <div className="flex-1">
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${(month.earned / 8.2) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-foreground">{month.earned} ETH</p>
                            <p className="text-xs text-muted-foreground">{month.projects} projects</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Payment Methods</CardTitle>
                    <CardDescription>How you receive payments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Escrow Release</p>
                          <p className="text-sm text-muted-foreground">Smart contract automated</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">85%</p>
                        <p className="text-xs text-muted-foreground">of payments</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Manual Release</p>
                          <p className="text-sm text-muted-foreground">Client approved</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">15%</p>
                        <p className="text-xs text-muted-foreground">of payments</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Average payment time:</span>
                        <span className="text-foreground font-medium">2.3 days</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-muted-foreground">Success rate:</span>
                        <span className="text-foreground font-medium">98.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Clients */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Clients</CardTitle>
                  <CardDescription>Clients who have paid you the most</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "TechCorp Inc.", amount: "12.5", projects: 4, avatar: "TC" },
                      { name: "StartupXYZ", amount: "8.3", projects: 3, avatar: "SX" },
                      { name: "Creative Agency", amount: "6.8", projects: 2, avatar: "CA" },
                      { name: "DataTech Solutions", amount: "4.2", projects: 1, avatar: "DT" },
                    ].map((client, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{client.avatar}</span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.projects} projects</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{client.amount} ETH</p>
                          <p className="text-sm text-muted-foreground">total paid</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Invoice Management</CardTitle>
                  <CardDescription>Generate and manage invoices for your projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Invoice Feature Coming Soon</h3>
                    <p className="text-muted-foreground mb-6">
                      Generate professional invoices for your completed projects and track payment status.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">Request Early Access</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
