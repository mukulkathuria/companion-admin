/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Becompanion = () => {
  const [companiondata, setcompaniondata] = useState<any>(null);

  useEffect(() => {
    import("@/services/companion/companionrequest.service")
      .then(({ getCompanionRequestsService }) => getCompanionRequestsService())
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setcompaniondata(data);
        }
      });
  }, []);
  return (
    <div>
      <h1 className="font-bold text-xl">Be a companion</h1>
      <div className=" becompanion-box">
        {!companiondata ? (
          <div>Loading...</div>
        ) : companiondata?.length ? (
          companiondata.map((l: any) => (
            <div
              className="flex justify-between items-center bg-slate-200 p-2 rounded-xl mt-2"
              key={l.id}
            >
              <h1>{l.firstname}</h1>
              <h1>{l.gender}</h1>
              <h1>{l.age}</h1>
              <Link to={`./details?companionId=${l.id}`}>
                {" "}
                <h1 className="bg-black text-white p-2 cursor-pointer rounded-xl">
                  View
                </h1>{" "}
              </Link>
            </div>
          ))
        ) : (
          <div>No Companions Request Found</div>
        )}
      </div>
    </div>
  );
};

export default memo(Becompanion, () => false);
