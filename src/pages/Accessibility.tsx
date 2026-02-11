import { Link } from "react-router-dom";

const Accessibility = () => (
  <div className="min-h-screen bg-background">
    <div className="container px-6 py-16 md:py-24 max-w-3xl mx-auto">
      <Link to="/" className="text-primary font-body text-sm hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-foreground mb-8">Accessibility Statement</h1>

      <div className="prose prose-neutral font-body space-y-6 text-foreground/80 text-[15px] leading-relaxed">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

        <h2 className="text-xl font-display font-semibold text-foreground">Our Commitment</h2>
        <p>Spirit Real Estate is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.</p>

        <h2 className="text-xl font-display font-semibold text-foreground">Standards</h2>
        <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities.</p>

        <h2 className="text-xl font-display font-semibold text-foreground">Measures Taken</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Semantic HTML structure for screen reader compatibility</li>
          <li>Sufficient color contrast ratios for text and interactive elements</li>
          <li>Alt text for all meaningful images</li>
          <li>Keyboard navigable interface</li>
          <li>Responsive design for various devices and screen sizes</li>
          <li>Clear and consistent navigation</li>
        </ul>

        <h2 className="text-xl font-display font-semibold text-foreground">Feedback</h2>
        <p>We welcome your feedback on the accessibility of this website. If you encounter any barriers or have suggestions for improvement, please contact us at info@spiritrealestate.co.il.</p>
      </div>
    </div>
  </div>
);

export default Accessibility;
