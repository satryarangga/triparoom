import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './layout/header';
import SearchFlight from './tabs/searchFlight';
import SearchHotel from './tabs/searchHotel';

const bannerUrl = '../../assets/img/beach.jpg';
const mainBanner = {
  backgroundImage: 'url(' + bannerUrl + ')',
};

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
        hotelActive: 'active',
        flightActive: '',
      }

      this.changeToHotel = this.changeToHotel.bind(this);
      this.changeToFlight = this.changeToFlight.bind(this);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="inner-body">
          <div className="wrapper-index" style={mainBanner}>
            <div className="wrapper-inner">
              <div className="row scroll-text hidden-xs">
                <div className="col-sm-12">
                  <div className="text-box">
                    <h3>
                      <span>Triparoom</span> <br />
                      <span className="bannerDesc">We provide hotels and flights</span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="main-fill">
                  <div className="panel">
                    <div className="panel-heading">
                      <ul className="nav nav-tabs">
                        <li className={this.state.hotelActive}>
                          <a onClick={this.changeToHotel} data-toggle="tab"> <i className="fa fa-hotel"></i> Hotel</a>
                        </li>
                        <li className={this.state.flightActive}>
                          <a onClick={this.changeToFlight} data-toggle="tab"> <i className="fa fa-plane"></i> Flight</a>
                        </li>
                      </ul>
                    </div>
                    <div className="panel-body">
                      <div className="tab-content">
                        <div className={`tab-pane fade in ${this.state.hotelActive}`} id="tabhotel">
                          <SearchHotel />
                        </div>
                        <div className={`tab-pane fade in ${this.state.flightActive}`} id="tabflight">
                          <SearchFlight />
                        </div>
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

  changeToHotel () {
    this.setState({
      hotelActive: 'active',
      flightActive: ''
    });
  }

  changeToFlight () {
    this.setState({
      flightActive: 'active',
      hotelActive: '',
    });
  }
}

export default Home;
