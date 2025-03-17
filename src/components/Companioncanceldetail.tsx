

const companioncanceldetail = () => {
  return (
    <div className="becompanion-box">
      <div className="gap-3">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZWx8ZW58MHx8MHx8fDA%3D"
          alt="profile"
        />

        <h1 className="my-3">Companion name: Oreo</h1>
      </div>

      <h1 className="font-bold my-3">User detail</h1>
      <div className="flex justify-between">
        <h1>User name: <span>Arpit yadav</span></h1>
        <h1>Age: <span>25</span></h1>
        <h1>Gender: <span>Male</span></h1>
        <h1>bookingid: <span>12345xyz</span></h1>
        <h1>userid: <span>12345bdgdg</span></h1>
      </div>
      <h1 className="font-bold my-3">Booking detail</h1>
      <div className="flex justify-between">
        <h1>Booking date: <span>12 may 2025</span></h1>
        <h1>Booking time: <span>11.00AM-1.00PM</span></h1>
      </div>
      <div>
        <h1 className="font-bold mt-4">Reason of cancelation by companion : <span className="font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, voluptate. Eius voluptatum totam ullam minima iste dolores. Adipisci, aut maxime. </span></h1>
      </div>
      <div className="flex justify-end gap-4">
        <button className="bg-green-600" >Approve</button>
        <button className="bg-red-500">reject</button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default companioncanceldetail;
