import { usersAuth, users } from "../../../dummyValues/cleaningData";

export const checkUser = ({ enteredEmail, enteredPassword }) => {
  let matchedUser = usersAuth.find(
    (userData) => enteredEmail === userData.email
  );
  if (!!matchedUser.length && matchedUser.password == enteredPassword) {
    return { ...users[matchedUser.id], email, password };
  } else return null;
};
