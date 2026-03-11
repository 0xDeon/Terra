import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
