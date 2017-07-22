import React, { Component } from 'react';
import Header from '../../layout/header';
import Footer from '../../layout/footer';
import Help from '../../../utils/help';

class OrderHotel extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="inner-body">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="bread-crumb animate-reveal">
                    <h2>Hotel Booking</h2>
                    <ol className="breadcrumb pull-right">
                      <li><a href="../../../index.html">Home</a></li>
                      <li className="active">Left Sidebar</li>
                    </ol>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="header_box animate-reveal">
                    <div className="pull-left">
                      <h3>Five Star Hotel, Resort</h3>
                      <p><i className="fa fa-map-marker"></i> Paris-Charles De Gaulle, Roissy-En-France, France</p>
                      <p><a href="#" className="btn btn-select">Tour Email</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="flight_detail_sidebar white-box animate-reveal">
                    <div className="flight-logo">
                      <img alt="logo" src="../../../assets/img/five-star-hotel.png" />
                    </div>
                    <div className="details-text">
                      <h4>Five Star Hotel
                        <small><br />
                          <i className="fa fa-map-marker yellow-text"></i>
                          Paris-Charles,Paris
                        </small>
                        <br />
                        <a href="../../../html/hotel/hotels_details_one/right_sidebar.html" className="btn btn-select">Edit</a>
                      </h4>
                    </div>
                    <hr />
                    <div className="price">
                      <span className="pull-left">AVG/NIGHT </span><span className="pull-right">$620</span>
                    </div>
                    <div className="LTT">
                      <span className="skin-clr"> <i className="fa fa-clock-o"></i>Minimum Stay  <span className="pull-right">2 Nights</span> </span><br />
                    </div>
                    <p>Description Here</p>
                  </div>
                  <Help />
                </div>
                <div className="col-md-9">
                  <div className="booking_detail white-box animate-reveal">
                    <h4>Personal information</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <select className="select_booking">
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Enter First Name.." required="required" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Enter Last Name.." required="required" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="email" className="form-control" placeholder="Enter Email Address.." required="required" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="email" className="form-control" placeholder="Enter Phone Number.." required="required" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default OrderHotel;
