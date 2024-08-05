import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      {/* <IIITRChatbot /> */}
      {children}
    </section>
  );
}
