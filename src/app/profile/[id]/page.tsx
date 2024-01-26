import React from 'react'

type Props = {}

const page = ({params} :any) => {
  return (
    <div className='text-center text-5xl font-bold'>
        <h1>This is a specific profile page</h1>
        <h1>id = {params.id}</h1>
    </div>
  )
}

export default page