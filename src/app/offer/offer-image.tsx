import { Skeleton } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

interface OfferImageProperties {
  image: string;
  className: string;
  width: number;
  height: number;
}

export function OfferImage({ image, className, width, height }: OfferImageProperties) {
  const [imageSrc, setImageSrc] = useState<string | false>(false);
  const supabase = useSupabaseClient();
  useEffect(() => {
    async function prepareAndLoadImage(): Promise<string> {
      const { data } = await supabase.storage
        .from('images/admin')
        .getPublicUrl(image);
      await loadImage(data.publicUrl);
      return data.publicUrl;
    }
    function loadImage(url: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
          resolve();
        };
        image.onerror = () => {
          reject();
        };
      });
    }
    prepareAndLoadImage().then((url) => {
      setImageSrc(url);
    });
  }, [image]);
  return imageSrc ? (
    <div className={className}>
      <img src={imageSrc} className="image-cover" alt=""></img>
    </div>
  ) : (
    <Skeleton
      className={className}
      variant="rectangular"
      width={width}
      height={height}
    />
  );
}
