import { classNames, resolveFileUrl } from '@/libs/utils';
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

  return (
    <div
      className={classNames('relative flex-none overflow-hidden', error && 'bg-muted', className)}
    >
      {loading && (
        <LoaderIcon className="absolute inset-0 m-auto animate-spin-slow text-muted-foreground" />
      )}
      {error && <ImageOffIcon className="absolute inset-0 m-auto h-5 w-5 text-muted-foreground" />}

      <img
        src={src && resolveFileUrl(src)}
        onLoad={onLoad}
        onError={onError}
        className={classNames('h-full w-full object-cover', (loading || error) && 'invisible')}
        {...props}
      />
    </div>
  );
};
