const useAuthenticate = async (url) => {
  const res = await fetch(`${url}/api/users/authenticate`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (res.status == 200) return true;
  return false;
};

export default useAuthenticate;
