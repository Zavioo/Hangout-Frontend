import React, { useContext, useState } from 'react'
import PostCards from '../components/PostCards'
import { allPostAPI, allUsersAPI } from '../Services/allApi'
import { useEffect } from 'react'
import { PostResponseContext } from '../ContextApi/StateContext'
import SERVER_URL from '../Services/serverURL'
import { Link } from 'react-router-dom'

export const Search = () => {

    const [options, setOptions] = useState("user")
    const [allPosts, setAllPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const { postResponse } = useContext(PostResponseContext)
    console.log(searchKey);


    useEffect(() => {
        fetchPosts()
        fetchAllUsers()
    }, [postResponse, searchKey])

    const handleShowUserProfile = (user) => sessionStorage.setItem("ProfileDetails", JSON.stringify(user))


    const fetchPosts = async () => {
        try {
            const result = await allPostAPI(searchKey);
            if (result.status === 200) {
                setAllPosts(result.data);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    const fetchAllUsers = async () => {
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
        <>
            <header className=' tw-flex tw-justify-between tw-items-center tw-m-9 tw-shadow-lg tw-p-6 '>
              <div>

              </div>
                <div className=' tw-pl-6 tw-flex tw-items-center' >
                    <input onChange={e => setSearchKey(e.target.value)} className='tw-p-2 tw-pl-4 tw-w-56  border tw-border-green-500 tw-rounded-3xl focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-teal-500 focus:tw-shadow-2xl' type="text" placeholder={options=='user'?'Search by name...':'Search by title'} />

                    <button onClick={() => setOptions("user")} className={options == "user" ? 'btn btn-primary tw-mx-4' : 'btn btn-outline-primary tw-mx-4'}>Users</button>

                    <button onClick={() => setOptions("post")} className={options == "post" ? 'btn btn-primary ' : 'btn btn-outline-primary'}>Posts</button>
                </div>

                <Link to='/userhome' className='btn btn-outline-dark'>Back</Link>

            </header>
            {options == "post" ?
                <div className=' tw-mx-9 tw-my-4 tw-shadow-2xl tw-max-h-screen  tw-p-6 tw-overflow-x-auto tw-grid tw-grid-cols-3' >
                    {allPosts.length > 0 && (
                        allPosts.map((post, index) => {
                            return (<PostCards key={index} values={post} />)
                        })
                    )
                    }
                </div>
                :
                <div className='tw-mx-9 tw-my-4 tw-shadow-2xl tw-max-h-screen  tw-p-14 tw-overflow-x-auto tw-flex tw-justify-center tw-gap-10 tw-gap-y-14 tw-flex-wrap' >
                    {
                        allUsers.length > 0 &&
                        allUsers.map((user, index) => {
                            return (
                                <div className='' style={{ width: "100px", height: "100px" }} key={index}>

                                    <Link className='' to='/profilepage' onClick={() => { handleShowUserProfile(user) }} ><img className="rounded" src={`${SERVER_URL}/uploads/${user.profilePic}`} alt="Profilepic" /></Link>
                                    <h6 className='tw-text-center tw-m-3' >{user.name}</h6>

                                </div>
                            )

                        })
                    }

                </div>
            }
        </>
    )
}
