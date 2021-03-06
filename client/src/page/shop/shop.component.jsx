import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions'
import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from '../../component/collection-overview/collection-overview.container';


class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    console.log(match.path)
    return (
      <div className='shop-page'>
        <Route 
          exact 
          path={`${match.path}`} 
          component={CollectionsOverviewContainer} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}/>
      </div>
    );
  }
}

  const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
  });

export default connect(null, mapDispatchToProps)(ShopPage);