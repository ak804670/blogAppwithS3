import React, { useEffect, useState } from "react";
import axios from 'axios'
import { TypeAnimation } from 'react-type-animation';
import Popup from "./Popup";
const Home = ()=>{

  

  const [blogs,setBlogs]=useState([])
  const [blog,setBlog]=useState([])
  const [popUp, setPopUp]= useState(false)


  useEffect(()=>{

axios.get('https://blogapps3.onrender.com/api/blogs')
  .then((response)=>{
    setBlogs(response.data)
  })
},[])

 const handlePopUp= ()=>{
    setPopUp(true)
  
    console.log("popup")
 }

 const showDataOnModel=(id)=>{
  axios.get(`https://blogapps3.onrender.com/api/blogs`)
  .then((res)=>{
    console.log(setBlog(res.data[id]))
  })
 
 }

    return (
        <div class="bg-white ">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Some Famous Public Figure',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Some Famous Freedom Fighter',
        1000,
        'Some Famous Politicians',
        1000,
        'Some Famous Athletes',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
    </h2>

    <div class=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">

    {!popUp ? null:<Popup post={blog} blogValue={setBlog}popUPvalue={setPopUp}/>}
    {blogs.map((post,index)=>{
      return(
       
        <a onClick={()=>{showDataOnModel(index); handlePopUp() }}>
           
      <div class="group relative  shadow-2xl">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={post.imageName} alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div class="mt-4 justify-between p-2">
          <div>
            <h3 class="text-lg  text-indigo-600">
             
                <span aria-hidden="true" class=" content-center items-center "></span>
                {post.heading}
             
            </h3>
            <p class="mt-1 text-sm text-gray-90">{post.content.substring(0, 100) + "..."}</p>
            <p class="text-sm font-medium text-end pr-4  text-gray-700 0">By- {post.author}</p>
          </div>
          
        </div>
      </div>
      </a>
      )
})}
      
    </div>
  </div>
</div>
    )
}

export default Home;