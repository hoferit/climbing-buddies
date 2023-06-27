import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { KeyboardEvent, useCallback } from 'react';

type Props = {
  onChange: (value: string) => void;
  value: string;
};
export default function ImageUpload({ onChange, value }: Props) {
  const handleCallback = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );

  return (
    <CldUploadWidget
      onUpload={handleCallback}
      uploadPreset="mg5yfgea"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter') {
            open();
          }
        };
        return (
          <div
            onClick={() => open()}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className=" relative cursor-pointer hover:opacity-70 transition p-40 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <div className="font-semibold text-lg">Click to upload</div>
            {!!value && (
              <div className=" absolute inset-0 w-full h-full">
                <Image
                  alt="uploaded"
                  unoptimized={true}
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
