"server component";

import Image from "next/image";
import { HtmlHTMLAttributes } from "react";

interface Props {
  src?: string;
  alt: string;
  className: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeHolder.jpg";

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};
// "w-20 h-20 object-cover rounded"
