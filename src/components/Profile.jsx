import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { getFriendsAPI, updateUserAPI } from '../Services/allApi';
import userPic from '../assets/user.jpg'
import SERVER_URL from '../Services/serverURL';
import { Link } from 'react-router-dom';




const Profile = () => {

  const [preview, setPreview] = useState("")
  const [existingProfileImg, setExistingProfileImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", name: "", email: "", password: "", profilePic: "", about: ""
  })
  const [friends,setFriends] = useState([])
  const [show, setShow] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"))
  const NumOfFriends = user.friends.length;
  console.log(user._id);
  const id = user._id



  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: user.username, name: user.name, email: user.email, password: user.password, about: user.about
      })
      setExistingProfileImg(user.profilePic)
    }
  }, [])

  useEffect(() => {
    if (userDetails.profilePic) {

      setPreview(URL.createObjectURL(userDetails.profilePic))

    } else {
      setPreview("")
    }
  }, [userDetails.profilePic])
 
  useEffect(()=>{
    handleGetFriends(id)
  },[])


  
  const handleShow = () => setShow(true)
  const handleClose = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({
      ...userDetails, username: user.username, name: user.name, email: user.email, password: user.password, about: user.about
    })
    setExistingProfileImg(user.profilePic)
    setPreview("")
    setShow(false)
  }

  const handleShowUserProfile = (friends) => sessionStorage.setItem("ProfileDetails", JSON.stringify(friends))

  // console.log(existingProfileImg);


  const handleUpdateProfile = async () => {

    const { username, name, email, password, profilePic, about } = userDetails
    if (name && about) {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("name", name)
      reqBody.append("email", email)
      reqBody.append("password", password)
      preview ? reqBody.append("profilePic", profilePic) : reqBody.append("profilePic", existingProfileImg)
      reqBody.append("about", about)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try {
          const result = await updateUserAPI(reqBody, reqHeader)
          if (result.status == 200) {
            alert("User Profile update successfully!!!")
            sessionStorage.setItem("user", JSON.stringify(result.data))
            setShow(false)
          } else {
            console.log(result);

          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please fill the form completely!!!")
    }
  }

  const handleGetFriends = async (id) => {
    try {
      const result = await getFriendsAPI(id)
      if (result.status==200) {
        setFriends(result.data)
        
        
      }
    } catch (err) {
      console.error('Error fetching friends list', err);
  }

  }

  return (

    <div className='tw-flex tw-flex-col tw-items-center '>
      {/* Profile Component */}

      {existingProfileImg == "" ?
        <img style={{ width: "150px", height: "150px" }} className=" rounded tw-mb-2" src={preview ? preview : userPic} alt="Profilepic" />
        :
        <img style={{ width: "150px", height: "150px" }} className=" rounded tw-mb-2" src={preview ? preview : `${SERVER_URL}/uploads/${existingProfileImg}`} alt="Profilepic" />
      }

      <h2 className='tw-mb-1 '>{userDetails.name}</h2>
      <p className=' tw-mb-1 '>{userDetails.username}</p>
      <p className=' tw-mb-1 '>
        <span className=' tw-font-semibold tw-text-black '> {NumOfFriends} </span> Friends </p>
      <div className=' tw-w-full tw-mb-4 tw-mt-3 tw-flex tw-justify-center tw-items-center'>
        {/* Edit Button */}
        <button onClick={handleShow} className='mx-3 btn '> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6 tw-text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        </button>
        {/* Logout Button */}
        <button className=' mx-3 btn '> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-size-6 tw-text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
        </button>
      </div>

      <h6 className='  tw-text-black '> About </h6>
      <div className='tw-mb-4 tw-text-justify tw-max-w-72 tw-max-h-24 tw-overflow-y-auto'>{userDetails.about}</div>
      <h6 className='  tw-text-black tw-mb-4 ' >  Friends  </h6>
      <div className='tw-grid tw-gap-3 tw-grid-flow-row tw-grid-cols-4 tw-w-full tw-max-h-52 tw-overflow-y-auto ' >
        {/*  to show frinds list */}
            { friends.length > 0 ?    
         friends.map((friends,index) => {
         return( <div style={{ width: "50px", height: "50px" }} key={index}>
          <Link to='/profilepage' onClick={()=>{handleShowUserProfile(friends)}} ><img className="rounded" src={`${SERVER_URL}/uploads/${friends.profilePic}`} alt="Profilepic" /></Link>
     </div>)
      })
      :
      
       <p className='tw-w-64'> No Friends yet</p>
      
            }
      </div>

      <Modal show={show} onHide={handleClose} size="" >
        <Modal.Header closeButton>
          <Modal.Title>  </Modal.Title>
        </Modal.Header>
        <Modal.Body className='tw-flex tw-flex-col tw-items-center'>
          <label>

            <input onChange={(e) => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })} type="file" style={{ display: "none" }} />
            {existingProfileImg == "" ?
              <img style={{ width: "150px", height: "150px" }} className=" rounded tw-mb-2" src={preview ? preview : userPic} alt="Profilepic" />
              :
              <img style={{ width: "150px", height: "150px" }} className=" rounded tw-mb-2" src={preview ? preview : `${SERVER_URL}/uploads/${existingProfileImg}`} alt="Profilepic" />
            }
          </label>

          <input value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} className="form-control mt-3" type="text" name="" id="" placeholder='Name' />
          <textarea value={userDetails.about} onChange={(e) => setUserDetails({ ...userDetails, about: e.target.value })} className="form-control my-3" id="exampleTextarea" placeholder=" About " rows="3" style={{ height: "83px" }} ></textarea>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Profile