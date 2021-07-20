import Reflux from "reflux";

const AppActions = Reflux.createActions([
  "getProducts",
  "createAd",
  "updateAd",
  "deleteAd",
]);

export default AppActions;
