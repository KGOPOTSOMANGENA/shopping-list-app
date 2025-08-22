export default function ProfileForm() {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleUpdate = () => {
    // call Redux action to update user info
  };

  return (
    <form onSubmit={handleUpdate}>
      <input defaultValue={user.name} placeholder="Name" />
      <input defaultValue={user.surname} placeholder="Surname" />
      <input defaultValue={user.cell} placeholder="Cell number" />
      <button type="submit">Update Profile</button>
    </form>
  );
}
