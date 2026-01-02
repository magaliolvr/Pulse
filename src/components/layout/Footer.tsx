import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="gradient-text">Pulse</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <span className="text-sm text-muted-foreground">Privacy</span>
            <span className="text-sm text-muted-foreground">Terms</span>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2025 Pulse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
