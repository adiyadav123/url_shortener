import React from "react";

const page = ({ params }) => {

  
  
  return (
    <div>
        <h1>Page</h1>
        <p>UID: {params.uid}</p>
    </div>
  );
};

export default page;
