import { ReactComponent as GitHubIcon } from '@/assets/svg/github-mark.svg';
import { ReactComponent as VectierIcon } from '@/assets/svg/vectier-mark.svg';
import { ThemeSwitchBar } from '@/components/common/theme-switch-bar';

export const Footer = () => {
  return (
    <footer className="border-t py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <VectierIcon className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vectier
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/orgs/codern-org"
            target="_blank"
          >
            <GitHubIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </a>

          <ThemeSwitchBar />
        </div>
      </div>
    </footer>
  );
};
