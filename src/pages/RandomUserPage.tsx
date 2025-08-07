import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState } from "react";
export default function RandomUserPage() {
  const [users, setUsers] = useState<any>([]);
const [isLoading, setIsLoading] = useState(false);

  const generateBtnOnClick = async () => {
    const resp = await axios.get(`https://randomuser.me/api`);
    setIsLoading(false);
    const users = resp.data.results[0];
    const cleanUsers = cleanUser(users);
    // console.log(users);
    // console.log(cleanUser)
    setUsers(cleanUser);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && (
        <UserCard
          name={users.name}
          imgUrl={users.imgUrl}
          address={users.address}
          email={users.email}
        />
      )}
    </div>
  );
}
