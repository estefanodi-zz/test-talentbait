import Reflux from "reflux";

import AppActions from "./actions";

import { products } from "../utils/mockData/productsList.json";
import { ads } from "../utils/mockData/adsList.json";

class Store extends Reflux.Store {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      ads: [],
    };
    this.listenables = AppActions;
  }

  onGetProducts() {
    return this.setState({ products, ads: [...ads] });
  }

  onCreateAd({ title, url, description, productName, images }) {
    const { ads } = { ...this.state };
    ads.push({
      title,
      url,
      description,
      productName,
      images,
      id: new Date().getTime(),
    });
    return this.setState({ ...this.state, ads });
  }

  onDeleteAd(adId) {
    const { ads } = { ...this.state };
    const index = ads.findIndex((ad) => ad.id === adId);
    ads.splice(index, 1);
    return this.setState({ ...this.state, ads });
  }

  onUpdateAd(data) {
    const { ads } = { ...this.state };
    const index = ads.findIndex((ad) => ad.id === data.id);
    ads[index] = data;
    return this.setState({ ...this.state, ads });
  }
}

export default Store;
