import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';
import PrismicToolbar from 'prismic-toolbar';
// import { BrowserRouter as Router } from 'react-router-dom';

import PrismicConfig from './prismic-configuration';
import App from './App';

class PrismicApp extends React.Component {

  state = {
    prismicCtx: null,
  }

  refreshToolbar() {
    const maybeCurrentExperiment = this.api.currentExperiment();

    if (maybeCurrentExperiment) {
      PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId());
    }

    PrismicToolbar.setup(PrismicConfig.apiEndpoint);
  }

  buildContext() {
    const accessToken = PrismicConfig.accessToken;

    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(api => ({
      api,
      accessToken,
      endpoint: PrismicConfig.apiEndpoint,
      linkResolver: PrismicConfig.linkResolver,
      toolbar: this.refreshToolbar,
    }));
  }

  componentWillMount() {
    this.buildContext().then((prismicCtx) => {
      this.setState({ prismicCtx });
    }).catch((e) => {
      console.error(`Cannot contact the Prismic API, check your Prismic configuration:\n${e}`);
    });
  }

  render() {

    return (
      <App
        prismicCtx={this.state.prismicCtx}
      />
    );
  }
}

export default PrismicApp;
