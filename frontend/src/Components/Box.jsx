import React from 'react'

const Box = () => {
  return (
    <div>
      <div className="cursor-pointer grid   p-5 pr-7" onClick={() => {
        console.log('clicked');
     }} >
          <div className='bg-gray-500 p-5 rounded-lg'>
        <div className="rounded-xl overflow-hidden">
            <div className=''>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s"/>
            </div>
        </div>
        <div className="pl-2">
            <div className={"text-white-800 text-lg font-medium pb-2"}>
                video.title
            </div>
            <div className={"text-gray-400 text-lg font-normal pb-1"}>
                video.description
            </div>
            <div className="flex">
                <div className={"text-gray-400 text-lg font-normal	pr-2	"}>
                    video.viewCount
                </div>
                <div className={"text-gray-400 text-lg font-normal		"}>
                • video.timestamp
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Box
