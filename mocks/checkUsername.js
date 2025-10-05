export const checkUsername = (username) => {
  const takenUsernames = ['john', 'mary', 'krishna'];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (takenUsernames.includes(username.toLowerCase())) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000);
  });
};
