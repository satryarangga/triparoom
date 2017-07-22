import React, { Component } from 'react';
import _ from 'lodash';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import DetailHead from '../../components/hotel/detail/head';
import DetailRooms from '../../components/hotel/detail/room';
import DetailFacilities from '../../components/hotel/detail/facility';
import DetailSlider from '../../components/hotel/detail/slider';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDetailHotel } from '../../actions/actionHotel';
import NoData from '../../utils/nodata';

class HotelDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
        descActive: 'active',
        reviewActive: '',
        ratingActive: '',
    }

    this.changeToDesc = this.changeToDesc.bind(this);
    this.changeToReview = this.changeToReview.bind(this);
    this.changeToRating = this.changeToRating.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let detail = _.find(_.pick(this.props.hotel.result, id), 'id');
    this.props.fetchDetailHotel(detail.business_uri);
  }

  renderRooms() {
    if(this.props.hotel.detail.rooms == null) {
      return (
        <NoData label="No room available for this hotel" type="hotel" />
      );
    }

    return (
      <div>
        <DetailSlider
          photos={this.props.hotel.detail.photos}
          primary={this.props.hotel.detail.large_photo}
        />
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="detail-panel  animate-reveal">
                <div className="panel">
                  <div className="panel-heading">
                    <ul className="nav nav-tabs">
                      <li className={this.state.descActive}><a onClick={this.changeToDesc}>Rooms</a></li>
                      <li className={this.state.reviewActive}><a onClick={this.changeToReview}>Facilities</a></li>
                    </ul>
                  </div>
                  <div className="panel-body">
                    <div className="tab-content">
                      <div className={`tab-pane fade in ${this.state.descActive}`}>
                        <DetailRooms detail={this.props.hotel.detail} />
                      </div>
                      <div className={`tab-pane fade in ${this.state.reviewActive}`}>
                        <DetailFacilities detail={this.props.hotel.detail} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if(_.size(this.props.hotel.detail) == 0) {
      return (
        <div>
          <Header />
          <div className="cp-pinwheel"></div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <div className="inner-body">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <DetailHead detail={this.props.hotel.detail} />
              </div>
              <div className="col-md-12">
                {this.renderRooms()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  changeToDesc () {
    this.setState({
      descActive: 'active',
      reviewActive: '',
      ratingActive: '',
    });
  }

  changeToReview () {
    this.setState({
      descActive: '',
      reviewActive: 'active',
      ratingActive: '',
    });
  }

  changeToRating () {
    this.setState({
      descActive: '',
      reviewActive: '',
      ratingActive: 'active',
    });
  }
}

function mapStateToProps (state) {
  return { hotel : state.hotel }
}

export default connect(mapStateToProps, { fetchDetailHotel }) (HotelDetail);
