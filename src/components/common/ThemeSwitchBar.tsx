import { Button } from '@/components/common/Button';
import { Theme, useTheme } from '@/hooks/ThemeHook';
import { classNames } from '@/libs/Utils';
import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

const ThemeIconMap: { [theme in Theme]: LucideIcon } = {
  dark: MoonIcon,
  light: SunIcon,
  system: MonitorIcon,
};

export const ThemeSwitchBar = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="flex">
      {Object.entries(ThemeIconMap).map(([theme, Icon]) => (
        <Button
          key={theme}
          variant="ghost"
          size="icon-sm"
          className={classNames(
            'rounded-full text-muted-foreground hover:bg-transparent hover:text-primary',
            theme === currentTheme && 'bg-accent hover:bg-accent',
          )}
          onClick={() => setTheme(theme as Theme)}
        >
          <Icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
};
