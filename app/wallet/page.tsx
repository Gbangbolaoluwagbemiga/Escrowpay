import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, Plus, Minus } from "lucide-react"

// Mock wallet data
const walletData = {
  balance: "12.5847",
  usdValue: "$24,580.32",
  address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
}

const transactions = [
  {
    id: "1",
    type: "received",
    amount: "5.2000",
    usdAmount: "$5,200.00",
    from: "TechCorp Inc.",
    hash: "0x1234...5678",
    date: "Dec 8, 2024",
    status: "Confirmed",
    description: "E-commerce Website Development - Final Payment",
  },
  {
    id: "2",
    type: "sent",
    amount: "0.0025",
    usdAmount: "$2.50",
    to: "Network Fee",
    hash: "0x2345...6789",
    date: "Dec 7, 2024",
    status: "Confirmed",
    description: "Transaction Fee",
  },
  {
    id: "3",
    type: "received",
    amount: "3.8000",
    usdAmount: "$3,800.00",
    from: "StartupXYZ",
    hash: "0x3456...7890",
    date: "Dec 5, 2024",
    status: "Confirmed",
    description: "Mobile App UI/UX Design - Milestone 2",
  },
  {
    id: "4",
    type: "received",
    amount: "2.5000",
    usdAmount: "$2,500.00",
    from: "Creative Agency",
    hash: "0x4567...8901",
    date: "Dec 3, 2024",
    status: "Confirmed",
    description: "Brand Identity Package - Complete",
  },
]

const escrowBalances = [
  {
    id: "1",
    project: "WordPress Plugin Development",
    client: "RetailCorp",
    amount: "1.8000",
    usdAmount: "$1,800.00",
    status: "Locked",
    releaseDate: "Dec 20, 2024",
  },
  {
    id: "2",
    project: "React Dashboard Development",
    client: "DataTech Solutions",
    amount: "4.5000",
    usdAmount: "$4,500.00",
    status: "Pending",
    releaseDate: "Jan 15, 2025",
  },
]

export default function WalletPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your crypto wallet and track your earnings</p>
          </div>

          {/* Wallet Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground">Main Wallet</CardTitle>
                      <CardDescription>Your primary earning wallet</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">Connected</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-foreground">{walletData.balance} ETH</p>
                    <p className="text-lg text-muted-foreground">{walletData.usdValue}</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <code className="text-sm font-mono text-muted-foreground flex-1">{walletData.address}</code>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
                <CardDescription>Manage your wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Deposit Funds
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Minus className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="escrow">Escrow Balances</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Transactions</CardTitle>
                  <CardDescription>Your latest wallet activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "received" ? "bg-accent/20" : "bg-destructive/20"
                          }`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownLeft className="w-5 h-5 text-accent" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">{tx.description}</p>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">
                                {tx.type === "received" ? "+" : "-"}
                                {tx.amount} ETH
                              </p>
                              <p className="text-sm text-muted-foreground">{tx.usdAmount}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-muted-foreground">
                              {tx.type === "received" ? `From: ${tx.from}` : `To: ${tx.to}`}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {tx.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{tx.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <code className="text-xs font-mono text-muted-foreground">{tx.hash}</code>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="escrow" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Escrow Balances</CardTitle>
                  <CardDescription>Funds locked in active contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {escrowBalances.map((escrow) => (
                      <div key={escrow.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{escrow.project}</p>
                              <p className="text-sm text-muted-foreground">Client: {escrow.client}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{escrow.amount} ETH</p>
                              <p className="text-sm text-muted-foreground">{escrow.usdAmount}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge
                              className={
                                escrow.status === "Locked"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-primary/20 text-primary"
                              }
                            >
                              {escrow.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Release: {escrow.releaseDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
