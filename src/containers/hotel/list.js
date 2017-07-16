import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotelList, fetchPaginationHotel, clearHotelPagination } from '../../actions/actionHotel';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import numeral from 'numeral';

class ListDataHotel extends Component {
  componentDidMount() {
    this.props.fetchHotelList(this.props.keyword, this.props.start, this.props.end);
  }

  showLoader() {
    this.props.clearHotelPagination();
    return <div className="cp-pinwheel"></div>;
  }

  paginationReload(page) {
    this.props.fetchHotelList(this.props.hotel.queries.q, this.props.hotel.queries.startdate, this.props.hotel.queries.enddate, this.props.hotel.queries.minstar, this.props.hotel.queries.minprice, this.props.hotel.queries.maxprice, page);

    return this.showLoader();
  }

  renderPagination(pages) {
    const currentPage = this.props.hotel.pagination.current_page;
    return _.map(_.times(pages), (a) => {
      let active = '';
      if(a+1 == currentPage){
        active = 'active';
      }
      return (
        <li
          onClick={this.paginationReload.bind(this, a+1)}
          key={a}
          className={active}>
          <a>{a+1}</a>
        </li>
      );
    });
  }

  showStarRating(star) {
    return _.map(_.times(star), (a) => {
      return (
        <i key={a} className="fa fa-star gold"></i>
      );
    });
  }

  renderList() {
      if(_.parseInt(this.props.hotel.pagination.total_found) == 0) {
        return <div>No Hotel Found</div>
      }

      if(_.size(this.props.hotel.result) == 0) {
        return <div className="cp-pinwheel"></div>
      }

      return _.map(this.props.hotel.result, hotel => {
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
                  <span>{_.isUndefined(hotel.tripadvisor_avg_rating) ? '0' : hotel.tripadvisor_avg_rating.review_count} REVIEWS</span>
                  <label className="reviewRating">{hotel.rating} / 10</label>
                </div>
                <div className="select-sec">
                  <span>AVG/NIGHT</span>
                  <span className="pri"><label>IDR {numeral(hotel.total_price).format('IDR 0,0')}</label></span>
                  <Link to={`/${hotel.province_name.replace(/\s/g, "-")}/${hotel.name.replace(/\s/g, "-")}/${hotel.hotel_id}`} className="btn btn_select">VIEW</Link>
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
          <div className="text-center">
            <ul className="pagination text-center">
              {this.renderPagination(this.props.hotel.pagination.lastPage)}
            </ul>
          </div>
        </div>
      );
    }

  }

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

export default connect(mapStateToProps, { fetchHotelList, fetchPaginationHotel, clearHotelPagination })(ListDataHotel);
