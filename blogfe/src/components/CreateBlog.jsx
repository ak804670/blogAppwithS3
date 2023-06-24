import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog =()=>{

  const [file,setFile]= useState()
  const [author,setAuthor]=useState("")
  const [content, setContent]=useState("")
  const [heading,setHeading] = useState("")
  const [formImage,setFormImage]=useState()


  




  const onAuthorChange=e=>{
    setAuthor(e.target.value)
  }


  const onHeadingChange=e=>{
    setHeading(e.target.value)
  }
  const onContentChange=e=>{
    setContent(e.target.value)
  }

  const onFileChange=e=>{
    const file = e.target.files[0]
    setFile(file)
    setFormImage(URL.createObjectURL(file))
  }

  const onSubmit= async(event)=>{
    event.preventDefault()

    const formData= new FormData();
   
    formData.append("imageName",file)
    formData.append("author", author)
    formData.append("heading",heading)
    formData.append("content",content)

    
    await axios.post("https://blogapps3.onrender.com/api/blogs", formData,{headers:{"content-type": "multipart/form-data"}})
  
    setAuthor("")
    setHeading("")
    setContent("")
    setFile()
  }


  const toastContainer = () => {
    
    toast.success('Blog Created, Come to Home and Check your Blog', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      }
 





    return(
      <>
      <ToastContainer/>
        <form onSubmit={onSubmit}>
        <div className="space-y-12  shadow-2xl m-10 p-10 backdrop-blur-sm bg-white/30">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Create New Blog</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Author
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    
                    <input
                      type="text"
                      name="Author"
                      id="Author"
                      value={author}
                      onChange={onAuthorChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Anish Kumar"
                    />
                  </div>
                </div>
              </div>
  

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Topic 
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    
                    <input
                      type="text"
                      name="Heading"
                      id="heading"
                      value={heading}
                      onChange={onHeadingChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Anish Kumar"
                    />
                  </div>
                </div>
              </div>




              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    id="Content"
                    name="Content"
                    rows={3}
                    value={content}
                    onChange={onContentChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                
              </div>
  
  
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                  <img src={formImage} alt="Upload a Image" className="mx-auto h-20 w-20 text-gray-300" ></img>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file" onChange={onFileChange} type="file" className="sr-only" accept="image/*"/>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
             
       
        <div className="mt-6 flex items-center justify-end gap-x-6">
         <NavLink to="/"> <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button></NavLink>
          <button
            type="submit" onClick={toastContainer}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        </div>
      </form>
      </>
    )
}

export default CreateBlog;






