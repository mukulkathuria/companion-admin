import { Link } from "react-router-dom"

const Becompanion = () => {
  return (
    <div>
    <h1 className="font-bold text-xl">Be a companion</h1>
    <div className=" becompanion-box">
      <div className="flex justify-between items-center bg-slate-200 p-2 rounded-xl mt-2">
        <h1>Alisha ciara</h1>
        <h1>Female</h1>
        <h1>25</h1>
    <Link to={'/Becompaniondetail'}>   <h1 className="bg-black text-white p-2 cursor-pointer rounded-xl">View</h1> </Link> 
      </div>
      <div className="flex justify-between items-center bg-slate-200 p-2 rounded-xl mt-2">
        <h1>Alisha ciara</h1>
        <h1>Female</h1>
        <h1>25</h1>
       <Link to={'/Becompaniondetail'}> <h1 className="bg-black text-white p-2 cursor-pointer rounded-xl">View</h1> </Link>
      </div>
    </div>
    
    </div>
  )
}

export default Becompanion
