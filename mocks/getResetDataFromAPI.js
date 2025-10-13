export const getResetDataFromAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ field1: "new default for field1", newField: "newField's default" });
    }, 2000);
  });
};
