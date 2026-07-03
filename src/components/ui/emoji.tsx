"use client";

import React from "react";

function emojiToCodepoint(emoji: string): string {
  const codepoints: string[] = [];
  let i = 0;
  while (i < emoji.length) {
    const code = emoji.codePointAt(i)!;
    if (code !== 0xfe0f) {
      codepoints.push(code.toString(16));
    }
    i += code > 0xffff ? 2 : 1;
  }
  return codepoints.join("-");
}

interface EmojiProps {
  children: string;
  className?: string;
  size?: number;
}

export default function Emoji({ children, className = "", size = 24 }: EmojiProps) {
  const codepoint = emojiToCodepoint(children);
  const src = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoint}.svg`;

  return (
    <img
      src={src}
      alt={children}
      width={size}
      height={size}
      className={`inline-block align-middle ${className}`}
      draggable={false}
    />
  );
}
