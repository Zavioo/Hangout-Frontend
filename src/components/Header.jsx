import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ActiveTabContext, StateContext } from "../ContextApi/StateContext"
import SERVER_URL from "../Services/serverURL"
import img from "../assets/user.jpg"


const Header = () => {

  const { sharedState, setSharedState } = useContext(StateContext);
  const { activeTab, setActiveTab } = useContext(ActiveTabContext)

  const handleTabChange = (tab) => setActiveTab(tab)
  const user = JSON.parse(sessionStorage.getItem("user"))

  const profilePic = user.profilePic ? `${SERVER_URL}/uploads/${user.profilePic}` : img

  return (
    <>
      <div className={sharedState === 'Initial State' ? "tw-grid tw-grid-cols-3 tw-rounded-2xl tw-h-20 tw-bg-white tw-fixed tw-w-full tw-z-10" : ' grid-item2 tw-flex tw-justify-around tw-items-center '}>

        {sharedState === 'Initial State' &&
          <div className="">
          </div>
        }

        <div className={sharedState === 'Initial State' ? "tw-flex tw-justify-evenly tw-mt-2" : "  tw-w-3/4 tw-flex tw-justify-evenly "}  >

          <button className=" tw-font-bold " onClick={() => handleTabChange('all')}><Link className={activeTab === 'all' ? 'tw-text-black text-decoration-none  ' : 'hover:tw-text-black tw-text-slate-500 text-decoration-none '}> All </Link>
          </button>
          <button className=" tw-font-bold " onClick={() => handleTabChange('photos')} ><Link className={activeTab === 'photos' ? 'tw-text-black text-decoration-none   ' : 'hover:tw-text-black tw-text-slate-500 text-decoration-none'} > Photos </Link>
          </button>
          <button className=" tw-font-bold " onClick={() => handleTabChange('videos')} ><Link className={activeTab === 'videos' ? 'tw-text-black  text-decoration-none ' : 'hover:tw-text-black tw-text-slate-500 text-decoration-none'}>Videos</Link>
          </button>

        </div>

        {sharedState === 'Initial State' ?
          <div className="tw-flex tw-justify-end tw-items-center ">
            {/* Chat button */}
            <Link to='/chats' className="tw-mr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </Link>
            {/* Search Button */}
            <Link to='/search' className="tw-mr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </Link>
            {/* Saved Post view Button */}
            <Link to='/savedposts' className="tw-mr-6" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </Link>
            <button onClick={() => setSharedState('Updated State')} className="tw-mr-10"> <img style={{ width: "50px", height: "50px" }} className=" rounded" src={profilePic} alt="Profilepic" /> </button>
          </div>
          :
          <button onClick={() => setSharedState('Initial State')} type="button" className="btn btn-outline-dark">Back</button>
        }
      </div>
    </>
  )
}

export default Header

