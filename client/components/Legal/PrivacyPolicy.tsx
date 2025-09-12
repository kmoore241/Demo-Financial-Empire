import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent">
            Privacy Policy
          </DialogTitle>
          <DialogDescription>
            Your privacy is important to us. This policy explains how we handle
            your data.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                1. Information We Collect
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We collect information you provide directly to us, such as when
                you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Create an account or update your profile</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Participate in educational courses or quizzes</li>
                <li>Contact us for support or feedback</li>
                <li>Use our trading simulation tools</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                2. How We Use Your Information
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Provide, maintain, and improve our educational services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Personalize your learning experience</li>
                <li>
                  Monitor and analyze usage patterns to improve our platform
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                3. Information Sharing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy. We may share your information in the
                following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>
                  With service providers who assist us in operating our platform
                </li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes
                encryption of sensitive data, secure transmission protocols, and
                regular security assessments.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                5. Cookies and Tracking
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience on our platform. These help us remember your
                preferences, analyze usage patterns, and provide personalized
                content. You can control cookie settings through your browser
                preferences.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                6. Third-Party Services
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our platform may integrate with third-party services for market
                data, analytics, and educational content. These services have
                their own privacy policies, and we encourage you to review them.
                We are not responsible for the privacy practices of these third
                parties.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Data Retention</h3>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                policy. When we no longer need your information, we will
                securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Your Rights</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Access and review your personal information</li>
                <li>Correct or update inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Port your data to another service</li>
                <li>Object to certain processing of your information</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                9. Children's Privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under 18 years of
                age. We do not knowingly collect personal information from
                children under 18. If we learn that we have collected such
                information, we will delete it promptly.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                10. Changes to This Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last Updated" date. Your continued use of our
                services after such changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">11. Contact Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <div className="mt-2 text-muted-foreground">
                <p>Email: privacy@financialempire.com</p>
                <p>Address: Financial Empire Privacy Team</p>
              </div>
            </section>

            <div className="border-t pt-4 mt-6">
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onAccept && (
            <Button
              onClick={onAccept}
              className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600"
            >
              Accept Policy
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;
