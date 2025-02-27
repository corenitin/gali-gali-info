import React from "react";
import { IndividualRegister, BusinessRegister } from "../container";
import { DarkModeBtn } from "../components";

function Register() {
  const [roleToggle, setRoleToggle] = React.useState(false);

  return (
    <div className="auth-body bg-base-light dark:bg-base-dark text-dark dark:text-light">
      <div className="absolute top-1 lg:top-4 right-4">
        <DarkModeBtn />
      </div>
      {roleToggle ? (
        <BusinessRegister setRoleToggle={setRoleToggle} />
      ) : (
        <IndividualRegister setRoleToggle={setRoleToggle} />
      )}
    </div>
  );
}

export default Register;
