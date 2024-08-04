import React from "react";
import Header from "./header/Header";
import { ChatCaptionName } from "./header/ChatCaptionName";

function ChatLayout({ Children }: { Children: React.ReactNode }) {
  return (
    <section>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_65%,black)]"></div>
      <div className="min-h-screen w-[60%] mx-auto">
        <Header />
        <ChatCaptionName/>
        {Children}
      </div>
    </section>
  );
}

export default ChatLayout;
