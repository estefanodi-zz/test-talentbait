import { BrowserRouter as Router, Route } from "react-router-dom";
import Reflux from "reflux";
//* ================  PAGES  =================
import Products from "./pages/products";
import SingleProduct from "./pages/singleProduct";
import Form from "./pages/form";
//* ==============  COMPONENTS  ==============
import Navbar from "./components/navbar";
//* ==============  REFLUX  ==============
import store from "./reflux/store";
import AppActions from "./reflux/actions";

class App extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapStoreToState(store, (data) => {
      return { products: data.products, ads: data.ads };
    });
  }
  componentDidMount() {
    Reflux.initStore(store);
    AppActions.getProducts();
  }
  //*=======================================================================
  //*========================  ACTION CALLS  ===============================
  //*=======================================================================
  createAd = (data) => AppActions.createAd(data);
  updateAd = (data) => AppActions.updateAd(data);
  deleteAd = (adId) => AppActions.deleteAd(adId);

  render() {
    return (
      <Router>
        <Navbar />
        <Route
          exact
          path="/"
          render={(props) => (
            <Products products={this.state.products} {...props} />
          )}
        />
        <Route
          exact
          path="/singleProduct/:productName"
          render={(props) => (
            <SingleProduct
              products={this.state.products}
              ads={this.state.ads}
              deleteAd={this.deleteAd}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/createAd/:productName"
          render={(props) => (
            <Form {...props} formType={"create"} method={this.createAd} />
          )}
        />
        <Route
          exact
          path="/updateAd/:productName"
          render={(props) => (
            <Form
              {...props}
              formType={"update"}
              ads={this.state.ads}
              method={this.updateAd}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;
