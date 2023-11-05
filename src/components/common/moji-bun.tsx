import { useTheme } from '@/hooks/theme-hook';
import { classNames } from '@/libs/utils';
import { SVGProps, useEffect, useState } from 'react';

export const MojiBun = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const { displayTheme } = useTheme();
  const [isAnimating, setAnimating] = useState<boolean>(false);

  useEffect(() => setAnimating(true), []);

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(isAnimating && 'animate-gelatine', className)}
      onMouseEnter={() => setAnimating(true)}
      onClick={() => setAnimating(true)}
      onAnimationEnd={() => setAnimating(false)}
      {...props}
    >
      <title>Moji Bun</title>
      <mask
        id="mask__beam"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect
          width="36"
          height="36"
          fill="#ffffff"
        />
      </mask>
      <g mask="url(#mask__beam)">
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(0 8) scale(1)"
          fill={displayTheme === 'dark' ? '#e5e4e2' : '#444444'}
          rx="36"
        />
        <g transform="translate(-4 6) rotate(4 18 18)">
          <path
            d="M13,19 a1,0.75 0 0,0 10,0"
            fill={displayTheme === 'dark' ? '#000000' : '#ffffff'}
          />
          <circle
            cx="11"
            cy="14"
            r="2"
            fill="#ffffff"
          />
          <circle
            cx="11"
            cy="14"
            r="1.25"
            fill="#000000"
          />
          <circle
            cx="25.25"
            cy="14.25"
            r="2"
            fill="#ffffff"
          />
          <circle
            cx="25.25"
            cy="14.25"
            r="1.25"
            fill="#000000"
          />
        </g>
      </g>
    </svg>
  );
};
