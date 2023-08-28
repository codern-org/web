import { ReactComponent as GitHubIcon } from '@/assets/svg/github-mark.svg';
import { ReactComponent as VectierIcon } from '@/assets/svg/vectier-mark.svg';

export const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <VectierIcon className="h-5 w-5 text-black" />
          <span className="text-sm text-secondary-foreground">
            © {new Date().getFullYear()} Vectier
          </span>
        </div>
        <div>
          <a
            href="https://github.com/orgs/codern-org"
            target="_blank"
          >
            <GitHubIcon className="h-5 w-5 text-accent-foreground transition-colors hover:text-[#24292f]" />
          </a>
        </div>
      </div>
    </footer>
  );
};
