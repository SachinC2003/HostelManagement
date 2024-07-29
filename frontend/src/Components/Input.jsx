import React from 'react'

const Input = ({label,placeholder,onChange}) => {
  return (
    <div className="mb-4">
            <label className=" text-gray-700 text-sm font-bold mb-2 flex flex-start ml-3" htmlFor="username">
              {label}
            </label>
            <input
              id={label}
              type="text"
              placeholder={placeholder}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
              required
            />
          </div>
  )
}

export default Input
