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

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent">
            Terms of Service
          </DialogTitle>
          <DialogDescription>
            Please read these terms carefully before using Financial Empire
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                1. Acceptance of Terms
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Financial Empire ("the Platform"), you
                agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these
                terms, you are prohibited from using or accessing this platform.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                2. Educational Purpose
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Financial Empire is an educational platform designed to provide
                information about trading and investment strategies. All content
                is for educational purposes only and should not be considered as
                financial advice. Always consult with qualified financial
                advisors before making investment decisions.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                3. Trading and Investment Risks
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Trading and investing involve substantial risk of loss and may
                not be suitable for all investors. Past performance does not
                guarantee future results. You should carefully consider your
                financial situation and risk tolerance before engaging in any
                trading activities.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. User Accounts</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. You are
                responsible for safeguarding the password and for all activities
                that occur under your account.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Prohibited Uses</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                You may not use our platform:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>
                  For any unlawful purpose or to solicit others to unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations or laws
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material
                </li>
                <li>
                  To impersonate or attempt to impersonate the company or other
                  users
                </li>
                <li>
                  To engage in any other conduct that restricts others' use of
                  the platform
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                6. Content Ownership
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All content on Financial Empire, including but not limited to
                text, graphics, logos, images, and software, is the property of
                Financial Empire or its content suppliers and is protected by
                copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                7. Limitation of Liability
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Financial Empire or its suppliers be liable
                for any damages (including, without limitation, damages for loss
                of data or profit, or due to business interruption) arising out
                of the use or inability to use the materials on Financial
                Empire's platform.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Privacy Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, and protect your information when you use our
                platform. By using our service, you agree to the collection and
                use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Modifications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Financial Empire may revise these terms of service at any time
                without notice. By using this platform, you are agreeing to be
                bound by the then-current version of these terms of service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                10. Contact Information
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at legal@financialempire.com
              </p>
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
              Accept Terms
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
