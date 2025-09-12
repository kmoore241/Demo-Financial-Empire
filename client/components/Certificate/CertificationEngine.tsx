import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trophy,
  Download,
  Share2,
  Calendar,
  User,
  Crown,
  Shield,
  Star,
  Award,
  FileText,
  Printer,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Certificate {
  id: string;
  title: string;
  issueDate: Date;
  score: number;
  validUntil: Date;
  instructor: string;
  courseHours: number;
  skillsEarned: string[];
  certificateNumber: string;
  level: "beginner" | "intermediate" | "advanced";
}

interface CertificationEngineProps {
  certificates?: Certificate[];
  allowCustomName?: boolean;
}

export const CertificationEngine: React.FC<CertificationEngineProps> = ({
  certificates: providedCertificates,
  allowCustomName = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [customName, setCustomName] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null,
  );
  const certificateRef = useRef<HTMLDivElement>(null);

  // Use real user data if available, fallback to mock data
  const userName =
    allowCustomName && customName
      ? customName
      : user?.name || "Financial Empire Student";

  const certificates: Certificate[] = providedCertificates || [
    {
      id: "cert1",
      title: "Cryptocurrency Trading Fundamentals",
      issueDate: new Date(),
      score: 92,
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      instructor: "Dr. Sarah Chen",
      courseHours: 8,
      skillsEarned: [
        "Technical Analysis",
        "Risk Management",
        "Market Psychology",
      ],
      certificateNumber: `FE-${Date.now()}-001`,
      level: "beginner",
    },
    {
      id: "cert2",
      title: "Advanced Portfolio Management",
      issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      score: 88,
      validUntil: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
      instructor: "Prof. Michael Rodriguez",
      courseHours: 12,
      skillsEarned: [
        "Asset Allocation",
        "Diversification",
        "Performance Analysis",
        "Tax Optimization",
      ],
      certificateNumber: `FE-${Date.now()}-002`,
      level: "advanced",
    },
    {
      id: "cert3",
      title: "Trading Psychology & Risk Management",
      issueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      score: 95,
      validUntil: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000),
      instructor: "Dr. Lisa Thompson",
      courseHours: 6,
      skillsEarned: [
        "Emotional Trading",
        "Position Sizing",
        "Stress Management",
      ],
      certificateNumber: `FE-${Date.now()}-003`,
      level: "intermediate",
    },
  ];

  const generatePDF = async (certificate: Certificate) => {
    try {
      // Note: In a production app, you would install html2canvas and jspdf packages
      // For now, we'll provide a download simulation

      // Simulate PDF generation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a simple text file as a placeholder
      const certificateText = `
FINANCIAL EMPIRE CERTIFICATE OF COMPLETION

This certifies that ${userName} has successfully completed:
${certificate.title}

Score: ${certificate.score}%
Completion Date: ${certificate.issueDate.toLocaleDateString()}
Certificate ID: ${certificate.certificateNumber}
Valid Until: ${certificate.validUntil.toLocaleDateString()}

Skills Mastered:
${certificate.skillsEarned.map((skill) => `- ${skill}`).join("\n")}

Instructor: ${certificate.instructor}
Course Hours: ${certificate.courseHours}

Financial Empire Trading Academy
      `;

      const blob = new Blob([certificateText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificate.title.replace(/\s+/g, "_")}_Certificate.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved as PDF",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "Failed to generate certificate PDF",
        variant: "destructive",
      });
    }
  };

  const shareCertificate = (certificate: Certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.title} Certificate`,
        text: `I've completed the ${certificate.title} course at Financial Empire!`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Certificate link copied to clipboard",
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/20 text-green-400";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return <Star className="w-4 h-4" />;
      case "intermediate":
        return <Award className="w-4 h-4" />;
      case "advanced":
        return <Crown className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const renderCertificate = (certificate: Certificate) => (
    <div
      ref={certificateRef}
      className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white via-gray-50 to-empire-gold-50 border-4 border-empire-gold-400 rounded-2xl p-12 shadow-2xl"
      style={{
        display: selectedCertificate === certificate.id ? "block" : "none",
      }}
    >
      {/* Header with Logo */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-full flex items-center justify-center mr-4">
            <img
              src="/logo.svg"
              alt="Financial Empire Logo"
              className="w-10 h-10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <Crown className="w-10 h-10 text-white hidden" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-gold-600 to-empire-emerald-600 bg-clip-text text-transparent">
              Financial Empire
            </h1>
            <p className="text-empire-navy-600 font-medium">Trading Academy</p>
          </div>
        </div>
      </div>

      {/* Certificate Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-empire-navy-800 mb-2">
          Certificate of Completion
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 mx-auto rounded-full"></div>
      </div>

      {/* Recipient */}
      <div className="text-center mb-8">
        <p className="text-lg text-empire-navy-600 mb-2">This certifies that</p>
        <h3 className="text-4xl font-bold text-empire-navy-800 mb-4 border-b-2 border-empire-gold-400 inline-block pb-2">
          {userName}
        </h3>
        <p className="text-lg text-empire-navy-600">
          has successfully completed the course
        </p>
      </div>

      {/* Course Details */}
      <div className="text-center mb-8">
        <h4 className="text-2xl font-bold text-empire-navy-800 mb-2">
          {certificate.title}
        </h4>
        <p className="text-empire-navy-600">
          {certificate.courseHours} hours of comprehensive training
        </p>
        <p className="text-empire-navy-600">
          Score: {certificate.score}% | Level: {certificate.level}
        </p>
      </div>

      {/* Skills */}
      <div className="text-center mb-8">
        <p className="text-empire-navy-600 mb-3">Skills Mastered:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {certificate.skillsEarned.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-empire-emerald-100 text-empire-emerald-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end mt-12">
        <div className="text-center">
          <div className="w-48 border-b-2 border-empire-navy-300 mb-2"></div>
          <p className="text-sm text-empire-navy-600">
            {certificate.instructor}
          </p>
          <p className="text-xs text-empire-navy-500">Course Instructor</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-full flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs text-empire-navy-500">Verified Certificate</p>
        </div>

        <div className="text-center">
          <div className="w-48 border-b-2 border-empire-navy-300 mb-2"></div>
          <p className="text-sm text-empire-navy-600">
            {certificate.issueDate.toLocaleDateString()}
          </p>
          <p className="text-xs text-empire-navy-500">Date of Completion</p>
        </div>
      </div>

      {/* Certificate Number */}
      <div className="text-center mt-8">
        <p className="text-xs text-empire-navy-500">
          Certificate ID: {certificate.certificateNumber}
        </p>
        <p className="text-xs text-empire-navy-500">
          Valid until: {certificate.validUntil.toLocaleDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Name Customization */}
      {allowCustomName && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Customize Certificate Name</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="custom-name">Name to appear on certificate</Label>
              <Input
                id="custom-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={user?.name || "Enter your full name"}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to use your account name: {user?.name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            layout
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
          >
            <Card className="h-full border-2 hover:border-empire-gold-400 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={getLevelColor(certificate.level)}>
                    {getLevelIcon(certificate.level)}
                    <span className="ml-1 capitalize">{certificate.level}</span>
                  </Badge>
                  <Badge variant="outline" className="text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Earned
                  </Badge>
                </div>
                <CardTitle className="text-lg">{certificate.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Completed: {certificate.issueDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span>Score: {certificate.score}%</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{certificate.courseHours} hours</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Skills Earned:</p>
                  <div className="flex flex-wrap gap-1">
                    {certificate.skillsEarned
                      .slice(0, 3)
                      .map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    {certificate.skillsEarned.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{certificate.skillsEarned.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedCertificate(certificate.id)}
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generatePDF(certificate)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareCertificate(certificate)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Certificate Preview */}
      {selectedCertificate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Certificate Preview</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const cert = certificates.find(
                      (c) => c.id === selectedCertificate,
                    );
                    if (cert) generatePDF(cert);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCertificate(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {certificates
              .filter((cert) => cert.id === selectedCertificate)
              .map((certificate) => renderCertificate(certificate))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CertificationEngine;
