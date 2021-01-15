import { usersAuth, users } from "../../../dummyValues/cleaningData";

export const checkUser = ({ email, password }) => {
  let matchedUser = usersAuth.find((userData) => {
    return email === userData.email;
  });
  if (
    !!matchedUser &&
    !!Object.keys(matchedUser).length &&
    matchedUser.password == password
  ) {
    return { ...users[matchedUser.id], email, password };
  } else return {};
};
