import React from "react";

function page({params}: {params: {chatid: string}}) {

  return <div className="text-white">
    This is Page {params.chatid}
  </div>;
}

export default page;
