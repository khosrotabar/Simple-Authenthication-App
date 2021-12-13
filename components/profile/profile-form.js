import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  async function changePasswordHanler(event) {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;
    const enteredOldPassword = oldPasswordRef.current.value;

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        newPassword: enteredNewPassword,
        oldPassword: enteredOldPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }
  return (
    <form className={classes.form} onSubmit={changePasswordHanler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordRef}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          ref={oldPasswordRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
