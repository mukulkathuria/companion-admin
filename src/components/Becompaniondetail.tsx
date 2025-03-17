

const Becompaniondetail = () => {
  return (
    <>
    <h1 className="text-xl font-bold">Request companion detail</h1>
    <div className="becompanion-box">
        <div className="bg-slate-50 p-3">
            <div className="flex gap-5">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZWx8ZW58MHx8MHx8fDA%3D" alt="profile" />
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZWx8ZW58MHx8MHx8fDA%3D" alt="profile" />
            </div>
            <div className="gap-10 mt-3">
                <h1 className="font-bold">Full Name: <span>Alisha ciara</span></h1>
                <h1 className="font-bold">Email: <span>Alisha@gmail.com</span></h1>
                <h1 className="font-bold">Phone : <span>0987654321</span></h1>
                <h1 className="font-bold">Age : <span>29</span></h1>
                <h1 className="font-bold">Gender: <span>Female</span></h1>
            </div>
            <div className="flex justify-end gap-4">
                <button className="bg-green-700">Accept</button>
                <button className="bg-red-600">Delete</button>
            </div>

        </div>
    </div>
    </>
  )
}

export default Becompaniondetail
