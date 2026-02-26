import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const Privacy = () => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <Link to={`/${lang}/`} className="text-primary font-body text-sm hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral font-body space-y-6 text-foreground/80 text-[15px] leading-relaxed">
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

          <h2 className="text-xl font-display font-semibold text-foreground">1. Introduction</h2>
          <p>Spirit Real Estate ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or submit inquiries.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">2. Information We Collect</h2>
          <p>We collect information you voluntarily provide, including your name, phone number, and email address when you submit a contact form on our website. We also collect basic usage data through cookies and analytics tools, such as pages visited, browser type, and referring source.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">3. How We Use Your Information</h2>
          <p>We use your information to respond to your inquiries, share relevant property listings, improve our website and services, and comply with legal obligations. We do not sell or rent your personal information to third parties.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">4. Data Sharing</h2>
          <p>Your information may be shared with trusted service providers who assist us in operating our website and delivering our services. All third parties are bound by confidentiality agreements and data protection obligations.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">5. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of electronic transmission is 100% secure.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">6. Your Rights</h2>
          <p>You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us using the details below.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">7. Contact</h2>
          <p>For privacy-related inquiries, please contact Spirit Real Estate at info@spiritrealestate.co.il.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
