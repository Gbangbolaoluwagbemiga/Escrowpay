"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Plus, Shield } from "lucide-react"

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    timezone: "",
    profileImage: null,

    // Professional Info
    title: "",
    bio: "",
    experience: "",
    hourlyRate: "",
    availability: "",

    // Skills & Portfolio
    skills: [],
    languages: [],
    portfolio: [],

    // Verification
    idVerified: false,
    emailVerified: false,
    phoneVerified: false,
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.languages.includes(newLanguage.trim())) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("[v0] Profile setup completed:", profileData)
    // Here you would typically save to your backend/smart contract
    alert("Profile setup completed! Redirecting to dashboard...")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Set up your freelancer profile to start receiving job opportunities</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone *</Label>
                      <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, timezone: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                          <SelectItem value="UTC+8">Singapore Time (UTC+8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Profile Image Upload */}
                  <div className="mt-6">
                    <Label>Profile Image</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                        {profileData.firstName ? (
                          <span className="text-2xl font-semibold">
                            {profileData.firstName[0]}
                            {profileData.lastName[0]}
                          </span>
                        ) : (
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Professional Title *</Label>
                      <Input
                        id="title"
                        value={profileData.title}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Full Stack Developer, UI/UX Designer"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell clients about your experience, expertise, and what makes you unique..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, experience: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="2-3">2-3 years</SelectItem>
                            <SelectItem value="4-5">4-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="hourlyRate">Hourly Rate (USD) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={profileData.hourlyRate}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                          placeholder="50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="availability">Availability *</Label>
                      <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, availability: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time (40+ hrs/week)</SelectItem>
                          <SelectItem value="part-time">Part-time (20-39 hrs/week)</SelectItem>
                          <SelectItem value="project-based">Project-based</SelectItem>
                          <SelectItem value="weekends">Weekends only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Skills & Portfolio */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Skills & Portfolio</h2>

                  {/* Skills */}
                  <div className="space-y-4">
                    <div>
                      <Label>Skills *</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button onClick={addSkill} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <Label>Languages</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder="Add a language"
                          onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                        />
                        <Button onClick={addLanguage} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profileData.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {language}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => removeLanguage(language)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Portfolio */}
                    <div>
                      <Label>Portfolio Projects</Label>
                      <div className="mt-2 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Upload your best work samples</p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Account Verification</h2>
                  <p className="text-muted-foreground mb-6">
                    Verify your account to build trust with clients and access more opportunities.
                  </p>

                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-blue-500" />
                            <div>
                              <h3 className="font-medium">Email Verification</h3>
                              <p className="text-sm text-muted-foreground">Verify your email address</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Send Code
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-green-500" />
                            <div>
                              <h3 className="font-medium">Phone Verification</h3>
                              <p className="text-sm text-muted-foreground">Verify your phone number</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Send SMS
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-orange-500" />
                            <div>
                              <h3 className="font-medium">Identity Verification</h3>
                              <p className="text-sm text-muted-foreground">Upload government-issued ID</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Upload ID
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Why verify your account?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Build trust with potential clients</li>
                      <li>• Access higher-paying job opportunities</li>
                      <li>• Increase your profile visibility</li>
                      <li>• Enable secure escrow transactions</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>Next Step</Button>
              ) : (
                <Button onClick={handleSubmit}>Complete Profile</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
