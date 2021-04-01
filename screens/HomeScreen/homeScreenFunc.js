const blockStyle = (blockName) => {
  switch (blockName) {
    case "green":
      return { backgroundColor: "#05c46b" };
      break;
    case "yellow":
      return { backgroundColor: "#ffd32a" };
      break;
    case "gold":
      return { backgroundColor: "#ccae62" };
      break;
    case "blue":
      return { backgroundColor: "#3B3B98" };
      break;
    case "pinkBlue":
      return { backgroundColor: "#FC427B" };
      break;
    default:
      return { backgroundColor: "grey" };
  }
};

export { blockStyle };
