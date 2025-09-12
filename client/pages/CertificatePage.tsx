import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import CertificationEngine from "@/components/Certificate/CertificationEngine";

const CertificatePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent mb-4">
            Your Certificates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download and share your Financial Empire trading certifications
          </p>
        </motion.div>

        {/* Certification Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CertificationEngine allowCustomName={true} />
        </motion.div>
      </div>
    </div>
  );
};

export default CertificatePage;
