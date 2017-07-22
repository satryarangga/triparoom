export const formatDetailState = (data) => {
  return {
    'name': data.breadcrumb.business_name,
    'id': data.breadcrumb.business_id,
    'city': data.breadcrumb.city_name,
    'province': data.breadcrumb.province_name,
    'country': data.breadcrumb.country_name,
    'area': data.breadcrumb.area_name,
    'address': data.general.address,
    'star': data.breadcrumb.star_rating,
    'avg_review': data.summary_internal_review.average,
    'max_review': data.summary_internal_review.max_rating,
    'large_photo': data.primaryPhotos_large,
    'rooms': (data.results) ? _.mapKeys(data.results.result, 'room_id') : null,
    'desc': data.general.description,
    'facilities': _.mapKeys(data.avail_facilities.avail_facilitiy, 'facility_name'),
    'photos': _.mapValues(data.all_photo.photo)
  }
}

export const formatOrderState = (data) => {
  if(data.myorder && data.myorder.data[0]){
    return {
      'order_id': data.myorder.order_id,
      'order_detail_id': (data.myorder.data[0].order_detail_id),
      'hotel_name': data.myorder.data[0].order_name,
      'room_name': data.myorder.data[0].order_name_detail,
      'checkin_date': data.myorder.data[0].detail.startdate,
      'checkout_date': data.myorder.data[0].detail.enddate,
      'nights': data.myorder.data[0].detail.nights,
      'total_price': data.myorder.total,
      'payment_method_options': _.mapValues(data.payment_method)
    }
  }

  return {
    'order_id': null,
    'order_detail_id': null,
    'total_price': 0
  }
}
