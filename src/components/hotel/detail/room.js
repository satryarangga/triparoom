import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder, fetchOrder } from '../../../actions/actionOrderHotel';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import numeral from 'numeral';
import striptags from 'striptags';
import { Redirect } from 'react-router-dom';

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHotel: false,
      onLoading: false,
    }

    this.bookRoom = this.bookRoom.bind(this);

    this.props.fetchOrder();
  }

  bookRoom(bookUri) {
    this.setState({ onLoading: true });
    this.props.addOrder(bookUri, this.props.orderHotel.order_detail_id, () => {
      this.setState({ redirectToHotel: true });
    });
  }

  renderRoomList () {
    if(this.state.onLoading) {
      return <div className="cp-pinwheel"></div>
    }

    return _.map(this.props.detail.rooms, room => {
      return (
        <div key={room.id}>
          <div className="clr-selection">
            <div className="row">
              <div className="col-md-3  col-sm-6  col-xs-6">
                <img src={room.photo_url} alt="image" className="img-responsive" />
              </div>
              <div className="col-md-6  col-sm-3 col-xs-6">
                <div className="dw">
                  <h4>
                    {room.room_name} <br /> <small>{room.room_available} Rooms Available</small>
                  </h4>
                </div>
                <p>{striptags(room.room_description)}</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="seat-price">
                  <span className="no-margin">
                    PRICE / NIGHT <br /> <span className="pri no-margin">{room.currency} {numeral(room.price).format('IDR 0,0')}</span>
                  </span>
                  <button onClick={this.bookRoom.bind(this, room.bookUri)} className="btn btn_select">
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    });
  }

  render() {
    if(this.state.redirectToHotel) {
      return (
        <Redirect to="/order" />
     );
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="feature-inflight">
              {this.renderRoomList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addOrder, fetchOrder }, dispatch);
}

function mapStateToProps(state) {
  return {
    orderHotel: state.orderHotel
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Description);
