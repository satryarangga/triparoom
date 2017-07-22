import React from 'react';
import Slider from 'react-slick';

const DetailSlider = ({ photos, primary }) => {
  const settings = {
    autoplay: true,
  };

  let x = 0;
  const renderPhoto =  _.map(photos, slide => {
      x++;
      return (
        <div key={x} className="related-images">
          <img src={slide.file_name} alt="plane" className="img-responsive" />
        </div>
      );
    });

  return (
    <div className="scroll-image">
      <Slider {...settings}>
        <div className="related-images">
          <img src={primary} alt="plane" className="img-responsive" />
        </div>
        {renderPhoto}
      </Slider>
    </div>
  )
}

export default DetailSlider;
