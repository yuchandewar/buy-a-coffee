import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2   ">
        {props.title}
        </button>
    </div>
  )
}

export default Button
