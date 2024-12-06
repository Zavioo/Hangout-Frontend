import React, { useState } from 'react'
import login from '../assets/authimg/login.png'
import register from '../assets/authimg/register.png'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../Services/allApi'



const Authh = ({ insideRegister }) => {

    const navigate = useNavigate()

    const [inputData, setInputData] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    })

    // console.log(inputData);

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log("Inside Handle Register");
        if (inputData.username && inputData.name && inputData.email && inputData.password) {
            // alert('Make Api Call')
            try {
                const result = await registerAPI(inputData)
                if (result.status == 200) {
                    alert(`Welcome ${result.data.name}, Please Login to explore our website`)
                    navigate('/userhome')
                    setInputData({ username: "", name: "", email: "", password: "" })
                } else {
                    if (result.response.status == 406) {
                        alert(result.response.data)
                        setInputData({ username: "", name: "", email: "", password: "" })
                    }
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            alert('Please Fill All Fields')
        }
    }

    const handleLogin = () => {

        if (inputData.email && inputData.password) {
            alert('Make Api Call')

        } else {
            alert('Please Fill All Fields')
        }
    }

    return (
        <>
            <div className="tw-w-full tw-h-lvh tw-flex tw-justify-center tw-items-center " style={{ backgroundColor: "rgb(243, 243, 243)" }} >

                <div style={{ width: "900px", height: "506px" }} className="border tw-flex tw-justify-center tw-items-center rounded tw-shadow-lg tw-bg-white  "  >
                    <div className=' tw-w-1/2 ' >
                        <img className='tw-rounded-l' src={insideRegister ? register : login} alt="" />
                    </div>
                    <div className=' tw-w-1/2 tw-flex tw-flex-col tw-justify-center tw-items-center  ' >
                        <h2 className='wt-text-2xl '>Welcome to Hangout </h2>

                        <h3 className='tw-mb-3 tw-text-sm'> Sign {insideRegister ? "Up to create" : "In to your"} Account </h3>

                        {insideRegister && <input value={inputData.username} onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                            type="text" placeholder="Username" className="tw-text-main border tw-p-1 rounded tw-h-9 tw-w-3/4 tw-mb-3 focus:tw-outline-none focus:tw-border-main " />}

                        {insideRegister && <input value={inputData.name} onChange={(e) => setInputData({ ...inputData, name: e.target.value })} type="text" placeholder="Name" className=" tw-text-main border tw-p-1 rounded tw-h-9 tw-w-3/4 tw-mb-3
                        focus:tw-outline-none focus:tw-border-main" />}

                        <input value={inputData.email} onChange={(e) => setInputData({ ...inputData, email: e.target.value })} type="email" placeholder="Email" className=" tw-text-main border tw-p-1 rounded tw-h-9 tw-w-3/4 tw-mb-3 focus:tw-outline-none focus:tw-border-main " />

                        <input value={inputData.password} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} type="password" placeholder="Password" className=" wt-text-main border tw-p-1 rounded tw-h-9 tw-w-3/4 tw-mb-3 focus:tw-outline-none focus:tw-border-main " />

                        {insideRegister ?

                            <p> Already a user ?<Link to="/login"> Click to login</Link> </p>
                            :
                            <p> Want to Sign Up ?<Link to="/register"> Click Here </Link> </p>

                        }

                        {insideRegister ?

                            <button onClick={handleRegister} type="button" className='btn btn-primary ' > Sign Up </button>
                            :
                            <button onClick={handleLogin} type="button" className='btn btn-primary ' > Sign In </button>


                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Authh