import { BrowserRouter as Router, Route } from "react-router-dom";
//* ================  PAGES  =================
import Products from "./pages/products";
import SingleProduct from "./pages/singleProduct";
import Form from "./pages/form";
//* ==============  COMPONENTS  ==============
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Products} />
      <Route exact path="/singleProduct/:product" component={SingleProduct} />
      <Route
        exact
        path="/createAd"
        render={(props) => <Form {...props} formType={"create"} />}
      />
      <Route
        exact
        path="/updateAd/:product"
        render={(props) => <Form {...props} formType={"update"} />}
      />
    </Router>
  );
}

export default App;
