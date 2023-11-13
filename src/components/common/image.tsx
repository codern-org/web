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
    <div className={classNames('relative overflow-hidden', error && 'bg-muted', className)}>
      {loading && (
        <LoaderIcon className="absolute inset-0 m-auto animate-spin-slow text-muted-foreground" />
      )}
      {error && <ImageOffIcon className="absolute inset-0 m-auto h-5 w-5 text-muted-foreground" />}

      <img
        src={src && outputUrl}
        onLoad={onLoad}
        onError={onError}
        className={classNames('h-full w-full', (loading || error) && 'invisible')}
        {...props}
      />
    </div>
  );
};
