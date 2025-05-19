import React from 'react';

interface GoogleMapEmbedProps {
  address: string;
  height?: string;
  width?: string;
  borderRadius?: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ 
  address,
  height = '400px',
  width = '100%',
  borderRadius = '8px'
}) => {
  // Encode the address for use in the URL
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div style={{ width, height, overflow: 'hidden', borderRadius }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;