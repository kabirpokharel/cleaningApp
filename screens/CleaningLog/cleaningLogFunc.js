const roomButtonStyle = ({ cleaningType }) => {
  switch (cleaningType) {
    case "daily":
      return {
        color: "black",
        fontWeight: "bold",
        borderWidth: 5,
        borderColor: "#05c46b",
      };
      break;
    case "thorough":
      return {
        color: "black",
        fontWeight: "bold",
        borderWidth: 5,
        backgroundColor: "#05c46b60",
      };
      break;
    default:
      return { backgroundColor: "white", color: "grey" };
  }
};

export { roomButtonStyle };
