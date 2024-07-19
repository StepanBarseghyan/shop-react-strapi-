import React, { useState } from "react";
import { Image, Spin } from "antd";

interface ProductImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  fallback: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  height,
  width,
  fallback,
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: "relative", height, width }}>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height,
            width,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <Image
        alt={alt}
        src={src}
        preview={false}
        height={height}
        width={width}
        style={{ objectFit: "contain", display: loading ? "none" : "block" }}
        onLoad={handleImageLoad}
        fallback={fallback}
      />
    </div>
  );
};

export default ProductImage;
