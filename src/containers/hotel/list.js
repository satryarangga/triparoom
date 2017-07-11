import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotelList } from '../../actions/actionHotel';
import _ from 'lodash';
import numeral from 'numeral';

class ListDataHotel extends Component {
  componentDidMount() {
    this.props.fetchHotelList();
  }

  showReviewRating (avg) {
    return <label className="reviewRating">{avg} / 5</label>
  }

  showStarRating (star) {
    return _.map(_.times(star), (a) => {
      return (
        <i key={a} className="fa fa-star gold"></i>
      );
    });
  }

  renderList() {
      if(_.size(this.props.hotel) == 0) {
        return <div className="cp-pinwheel"></div>;
      }

      return _.map(this.props.hotel, hotel => {
        return (
          <div className="hotels_box_detail white-box animate-reveal" key={hotel.id}>
            <div className="row">
              <div className="col-md-4">
                <div className="flight-logo"><img  alt="logo" src={`${hotel.photo_primary}`} /></div>
              </div>
              <div className="col-md-6">
                <div className="details-text">
                  <h4> {hotel.name} {this.showStarRating(hotel.star_rating)} <br /> <small> <i className="fa fa-map-marker"></i> {hotel.regional}</small></h4>
                </div>
                <div className="p">
                  <p>{hotel.room_facility_name}</p>
                </div>
              </div>
              <div className="col-md-2">
                <div className="reviews">
                  <span>{hotel.tripadvisor_avg_rating.review_count} REVIEWS</span>
                  {this.showReviewRating(hotel.tripadvisor_avg_rating.avg_rating)}
                </div>
                <div className="select-sec">
                  <span>AVG/NIGHT</span>
                  <span className="pri"><label>IDR {numeral(hotel.total_price).format('IDR 0,0')}</label></span>
                  <a target="_blank" className="btn btn_select">SELECT</a>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    render() {
      return(
        <div>
          {this.renderList()}
        </div>
      );
    }

  }

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

export default connect(mapStateToProps, { fetchHotelList })(ListDataHotel);
