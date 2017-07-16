import React, { Component } from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import striptags from 'striptags';

class Description extends Component {
  constructor(props) {
    super(props);
  }

  renderRoomList () {
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
                  <a href="right_sidebar.html" target="_blank" className="btn btn_select">
                    BOOK
                  </a>
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

export default Description;
