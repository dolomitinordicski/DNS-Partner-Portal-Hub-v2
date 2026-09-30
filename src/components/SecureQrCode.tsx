import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface SecureQrCodeProps {
  value: string;
  size?: number;
  alt?: string;
  className?: string;
}

export const SecureQrCode: React.FC<SecureQrCodeProps> = ({
  value,
  size = 200,
  alt = 'QR Code',
  className = 'w-full h-full object-contain'
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (!value) return;
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: {
        dark: '#083845',
        light: '#FFFFFF'
      }
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('Failed to generate QR Code:', err));
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 rounded text-slate-400 text-xs ${className}`}
        style={{ minWidth: size, minHeight: size }}
      >
        Generating QR...
      </div>
    );
  }

  return <img src={dataUrl} alt={alt} className={className} />;
};
