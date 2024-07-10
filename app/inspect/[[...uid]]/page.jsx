import React from 'react'

const page = ({ params }) => {
  return (
    <div>
    <h1>You are inspecting a url</h1>
      <div>
      {params.uid}
      </div>
    </div>
  )
}

export default page