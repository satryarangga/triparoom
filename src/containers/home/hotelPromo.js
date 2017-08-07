import React, { Component } from  'react';
import _ from 'lodash';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHomeHotel } from '../../actions/actionHotel';
import moment from 'moment';


class HotelPromo extends Component {
  componentDidMount() {
    this.props.fetchHomeHotel();
  }

  renderHomeHotel () {
    if(_.size(this.props.hotel.result) == 0){
      return <div className="cp-pinwheel"></div>
    }
    return _.map(_.sample(this.props.hotel.result, 6), hotel => {
      let splitUri = hotel.business_uri.split('?');
      let noRootUri = splitUri[0].split('tiket.com/');
      let validUri = noRootUri[1].replace(/\//g, "_");
      return (
        <div className="col-md-4 col-sm-6 col-xs-12" key={hotel.id}>
          <div className="popular_hotel_box ">
            <div className="img">
              <Link
                to={`/${validUri}/${moment().format('YYYY-MM-DD')}/1/1/2`}>
                <img src={`${hotel.photo_primary}`} alt="place" className="img-responsive" />
              </Link>
            </div>
            <div className="hotel_detail">
              <div className="hotel-name">
                <h4>{_.take(_.words(hotel.name), 4).join(" ")}</h4>
                <p><i className="fa fa-map-marker"></i> {hotel.regional}</p>
                <div className="pull-left">Price per night from:</div>
                <div className="pull-right">IDR {numeral(hotel.price).format('IDR 0,0')}</div>
                <div className="book-now">
                  <Link
                    to={`/${validUri}/${moment().format('YYYY-MM-DD')}/1/1/2`}
                    className="btn btn_book_now"
                  >
                    View Room
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="name_pakg text-center ">Popular Hotel in Bali</div>
            {this.renderHomeHotel()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { hotel: state.hotel }
}

export default connect(mapStateToProps, { fetchHomeHotel })(HotelPromo);
