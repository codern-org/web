import { classNames } from '@/libs/utils';
import { ImageOffIcon } from 'lucide-react';
import { ImgHTMLAttributes, useState } from 'react';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'>;

export const Image = ({ src, className, ...props }: ImageProps) => {
  const [error, setError] = useState<boolean>(false);

  if (!src?.startsWith('/src/assets/') && src?.startsWith('/')) {
    src = window.APP_CONFIG.BACKEND_URL + '/file' + src;
  }

  return (
    <div className="relative">
      {error && (
        <ImageOffIcon className="absolute left-1/2 top-1/2 z-10 w-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
      )}
      <img
        src={src}
        onError={() => setError(true)}
        className={classNames(className, error && 'invisible')}
        {...props}
      />
    </div>
  );
};
