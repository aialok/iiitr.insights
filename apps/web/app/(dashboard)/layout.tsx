import React from "react";
import IIITRChatbot from "./chat/Chatbox";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_65%,black)]"></div>
      <div className="min-h-screen w-[60%] mx-auto">
        <Header text="Ask me Anything about IIIT Ranchi" />
     
        {Children}
      </div> */}
      <IIITRChatbot />
      {children}
    </section>
  );
}
