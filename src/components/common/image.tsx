import { classNames } from '@/libs/utils';
import { ImageOffIcon, LoaderIcon } from 'lucide-react';
import { ImgHTMLAttributes, useState } from 'react';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'>;

export const Image = ({ src, className, ...props }: ImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const onLoad = () => {
    setLoading(false);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  let outputUrl = src;
  if (
    !src?.startsWith('/src/assets/') && // Local development
    !src?.startsWith('/assets/') // Production build
  ) {
    outputUrl = window.APP_CONFIG.BACKEND_URL + '/file' + src;
  }

  return (
    <div className="relative">
      {loading && (
        <LoaderIcon className="animate-spin-slow absolute inset-0 m-auto text-muted-foreground" />
      )}
      {error && <ImageOffIcon className="absolute inset-0 m-auto text-muted-foreground" />}

      <img
        src={src && outputUrl}
        onLoad={onLoad}
        onError={onError}
        className={classNames(className, (loading || error) && 'invisible')}
        {...props}
      />
    </div>
  );
};
