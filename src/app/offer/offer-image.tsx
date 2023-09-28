import { Skeleton } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';

interface OfferImageProperties {
  image: string;
  className: string;
  width: number;
  height: number;
}

export function OfferImage({
  image,
  className,
  width,
  height,
}: OfferImageProperties) {
  const supabase = useSupabaseClient();
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const { data } = supabase.storage.from('images/admin').getPublicUrl(image);
  const dataURL = data.publicUrl;
  const onLoad = () => {
    setLoaded(true);
  };
  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });
  return (
    <>
      <div className={className} style={{ display: loaded ? 'block' : 'none' }}>
        <img
          ref={ref}
          onLoad={onLoad}
          src={dataURL}
          alt=""
          className="image-cover"
        />
      </div>
      <Skeleton
        style={{ display: !loaded ? 'block' : 'none' }}
        className={className}
        variant="rectangular"
        width={width}
        height={height}
      />
    </>
  );
}
