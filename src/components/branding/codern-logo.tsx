import { ReactComponent as CodernDarkIcon } from '@/assets/svg/codern-dark.svg';
import { ReactComponent as CodernLightIcon } from '@/assets/svg/codern-light.svg';
import { useTheme } from '@/hooks/theme-hook';

export const CodernLogo = () => {
  const { displayTheme } = useTheme();

  return (
    <a
      href="/"
      className="flex items-center"
    >
      {displayTheme === 'dark' ? (
        <CodernDarkIcon className="h-10 w-10" />
      ) : (
        <CodernLightIcon className="h-10 w-10" />
      )}
      <span className="text-lg font-bold">Codern</span>
    </a>
  );
};
