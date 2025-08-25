import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const safeUser = user
    ? {
        user: user.user,
        name: user.name,
        email: user.email,
        password: user.password,
      }
    : null;

  console.log(safeUser);
  return <div>Profile</div>;
}

export default Profile;
