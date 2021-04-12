import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeInputContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  timeCard: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    margin: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  // Temp code to test scroll card S
  container: {
    flex: 1,
    // paddingTop: 50,
    // height: 400,
  },
  scrollView: {
    // backgroundColor: "pink",
    // marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  // Temp code to test scroll card E
});
