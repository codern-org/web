import { classNames } from '@/libs/utils';
import { ImageOffIcon } from 'lucide-react';
import { ImgHTMLAttributes, useState } from 'react';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'>;

export const Image = ({ src, className, ...props }: ImageProps) => {
  const [error, setError] = useState<boolean>(false);

  if (!src?.startsWith('/src/assets/') && src?.startsWith('/')) {
    src = import.meta.env.VITE_BACKEND_URL + '/file' + src;
  }

  if (error) {
    return (
      <div className="relative">
        <ImageOffIcon className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
        <div
          className={classNames(className, 'bg-muted')}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
};
