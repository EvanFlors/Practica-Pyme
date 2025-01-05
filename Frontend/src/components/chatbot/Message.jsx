import React from 'react'

const Message = ({ text, isUserMessage = false }) => (
  <div className={`mb-4 ${isUserMessage ? 'self-end' : ''}`}>
    <p
      className={`${
        isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-100'
      } text-sm lg:text-base p-3 rounded-md w-fit max-w-[70%] ${isUserMessage ? 'ml-auto' : ''}`}
    >
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  </div>
)

export default Message