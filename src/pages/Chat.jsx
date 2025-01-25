import React, { useEffect, useState } from 'react'
import { allUsersAPI } from '../Services/allApi'
import SERVER_URL from '../Services/serverURL'

const Chat = () => {
  const [allUsers, setAllUsers] = useState([])
  const [open, setOpen] = useState("")
  const user = JSON.parse(sessionStorage.getItem("user"))
  const friends = user.friends
  console.log(friends);


  useEffect(() => {
    fetchAllUsers()
  }, [])

  const fetchAllUsers = async () => {
    const searchKey = ""
    try {
      const result = await allUsersAPI(searchKey);
      if (result.status === 200) {
        setAllUsers(result.data);
        console.log(allUsers);
      }
    } catch (err) {
      console.error('Error fetching users: ', err);
    }
  }


  return (
    <div style={{ backgroundColor: "rgb(243, 243, 243)" }} className='tw-grid tw-grid-cols-6 '>
      <div style={{ backgroundColor: "rgb(243, 243, 243)" }} className='tw-col-span-2 tw-p-3 '>
        <div style={{ height: "95vh" }} className='tw-bg-white tw-rounded-2xl tw-h-screen tw-p-5 tw-overflow-y-auto'>
          {allUsers.length > 0 &&
            allUsers.map((user, index) => (
              friends.includes(user._id) &&
              <div key={index} onClick={() => setOpen(user._id)} className={open == user._id ? 'tw-shadow-inner tw-bg-teal-50 tw-p-2 tw-mb-2 tw-flex tw-items-center' : 'tw-shadow-md tw-p-2 tw-mb-2 tw-flex tw-items-center hover:tw-bg-teal-50 hover:tw-shadow-inner'}>
                <img className=' tw-size-12 tw-rounded-md tw-mr-3' src={`${SERVER_URL}/uploads/${user.profilePic}`} alt="profilePic" />
                <p className='tw-font-normal'>{user.name}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div style={{ backgroundColor: "rgb(243, 243, 243)" }} className='tw-col-span-4 tw-py-3 tw-pr-3 tw-flex tw-justify-center tw-items-center '>

        {
          allUsers.length > 0 &&
          allUsers.map((user, index) => (
            open == user._id &&
            <div key={index} style={{ height: "95vh" }} className='tw-relative tw-w-full tw-bg-white tw-rounded-2xl'>
              <div className='tw-overflow-y-auto tw-h-3/4 tw-flex tw-flex-col  tw-justify-end tw-p-4 tw-space-y-4'>
                {/* Chat Messages */}
                <div className="tw-flex tw-items-start">
                  <div style={{ maxWidth: "60%" }} className='tw-bg-teal-500 tw-rounded-3xl tw-text-white tw-p-4 tw-shadow-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </div>
                </div>

                <div className="tw-flex tw-items-start tw-justify-end">
                  <div style={{ maxWidth: "60%" }} className='tw-bg-teal-50 tw-rounded-3xl tw-text-gray-800 tw-p-4 tw-shadow-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </div>
                </div>

                <div className="tw-flex tw-items-start">
                  <div style={{ maxWidth: "60%" }} className='tw-bg-teal-500 tw-rounded-3xl tw-text-white tw-p-4 tw-shadow-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </div>
                </div>
                
                <div className="tw-flex tw-items-start tw-justify-end">
                  <div style={{ maxWidth: "60%" }} className='tw-bg-teal-50 tw-rounded-3xl tw-text-gray-800 tw-p-4 tw-shadow-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className='tw-absolute tw-bottom-0 left-0 tw-border tw-border-t-amber-100 tw-w-full tw-flex tw-justify-center tw-items-center tw-p-4 bg-white'>
                <input
                  className='tw-h-10 tw-w-2/3 tw-border tw-p-3 tw-rounded-md tw-mr-2 tw-border-slate-950'
                  type="text"
                  placeholder='Write a message'
                />
                <button className='tw-bg-teal-500 tw-text-white tw-rounded-md tw-p-2 hover:tw-bg-teal-600 transition duration-200'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-6 tw-h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        }
        {
          open == "" &&
          <div className=' tw-flex tw-flex-col tw-justify-center tw-items-center '>
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-32">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <p className='tw-text-center'> Start a Chat with Your Friends</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Chat