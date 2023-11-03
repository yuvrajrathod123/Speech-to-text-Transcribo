import React from 'react'
import "../About.css"
import Profile from './Profile'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
        <div className="container mt-5">
        <h1 className="mb-4">About Us</h1>

        
        <div className="row" id="team-cards">
            
            <div className="col-md-4 mb-4">
                <div className="team-card">
                    <img src="https://media.licdn.com/dms/image/D4D03AQFpAy7ykwTibw/profile-displayphoto-shrink_400_400/0/1688099662235?e=1701907200&v=beta&t=UE5XDor5sUep6BLWgTHmWherukuyuvXLtlqvw2_b7KY" alt="John Doe"/>
                    <h5 className="team-card-title text-center">Yuvraj Rathod</h5>
                    <p className="team-card-position " style={{marginBottom:'5px'}}>Web developer</p>
                    <p className="team-card-description">Myself Yuvraj i am from TE-IT</p>
                    {/* <button type="" className='btn btn-primary d-flex justify-content-center'>View profile</button> */}
                    <Link to="/yuvraj" className='btn btn-primary d-flex justify-content-center mx-5'>View profile</Link>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="team-card">
                    <img src={process.env.PUBLIC_URL + '/prasad.png'} alt="Jane Smith"/>
                    <h5 className="team-card-title text-center" >Prasad Alai</h5>
                    <p className="team-card-position" style={{marginBottom:'5px'}}>Web developer</p>
                    <p className="team-card-description mb-4">Myself Prasad i am from TE-IT </p>
                    <Link to="/prasad" className='btn btn-primary d-flex justify-content-center mx-5'>View profile</Link>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="team-card">
                    <img src={process.env.PUBLIC_URL + '/siddesh.png'} alt="Bob Johnson"/>
                    <h5 className="team-card-title text-center">Siddesh Alai</h5>
                    <p className="team-card-position" style={{marginBottom:'5px'}}>Web developer</p>
                    <p className="team-card-description">Myself Siddesh i am from TE-IT</p>
                    {/* <button type="" className='btn btn-primary d-flex justify-content-center' >View profile</button> */}
                    <Link to="/siddesh" className='btn btn-primary d-flex justify-content-center mx-5'>View profile</Link>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
