import CodernDarkIcon from '@/assets/svg/codern-dark.svg?react';
import CodernLightIcon from '@/assets/svg/codern-light.svg?react';
import { useTheme } from '@/hooks/theme-hook';
import { getBaseRoutePath } from '@/libs/constants';
import { Link, useLocation } from 'react-router-dom';

export const CodernLogo = () => {
  const { displayTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <Link
      to={getBaseRoutePath(pathname)}
      className="flex items-center"
    >
      {displayTheme === 'dark' ? (
        <CodernDarkIcon className="h-10 w-10" />
      ) : (
        <CodernLightIcon className="h-10 w-10" />
      )}
      <span className="text-lg font-bold">Codern</span>
    </Link>
  );
};
