import React, { useContext } from "react";
import { Context } from "../../main";
import profile_pic from "../../assets/ragul.jpg"

const MyProfile = () => {
  const { user } = useContext(Context);
  
  return (
    <section className="profile">
      <div className="avatar">
      <img src={profile_pic} alt="avatar" />
      </div>
      <div className="user-detail">
        <p>
          Name: <span>Ragul</span>
        </p>
        <p>
          Email: <span>ragulpathmesh@gmail.com</span>
        </p>
        <p>
          Phone: <span>9994298370</span>
        </p>
        <p>
          Role: <span>Author</span>
        </p>
      </div>
    </section>
  );
};

export default MyProfile;