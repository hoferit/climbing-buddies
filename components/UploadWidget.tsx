'use client';
import { CldUploadWidget } from 'next-cloudinary';

<CldUploadWidget uploadPreset="<Upload Preset>">
  {({ open }) => {
    function handleOnClick(event: { preventDefault: () => void }) {
      event.preventDefault();
      open();
    }
    return (
      <button className="button" onClick={handleOnClick}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>;
