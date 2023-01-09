import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileUrl,
  setUserProfilePhoto,
  updateUser,
} from "../../credentials";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import style from "./editProfile.module.css";

const EditProfileView = () => {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUser, setProfileUser] = useState("");

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    const url = await getProfileUrl(user.profilePicture);
    setProfileUser(url);
    setCurrentState(2);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;

          await updateUser(tmpUser);

          setCurrentUser({ ...tmpUser });

          const url = await getProfileUrl(currentUser.profilePicture);

          setProfileUser(url);
        }
      };
    }
  };

  if (currentState !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        ...Loading
      </AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h2>Edit profile</h2>
        <div className={style.profilePictureContainer}>
          <div>
            <img src={profileUser} alt="" width={100} />
          </div>
          <div>
            <button className="btn" onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
            <input
              className={style.fileInput}
              ref={fileRef}
              type="file"
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default EditProfileView;
