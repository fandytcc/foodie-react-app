import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const reviewShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    remark: PropTypes.string.isRequied,
    overallRating: PropTypes.number.isRequied,
    serviceRating: PropTypes.number.isRequied,
    foodRating: PropTypes.number.isRequied,
    valueRating: PropTypes.number.isRequied,
    dishes: PropTypes.array
})

class ReviewPage extends PureComponent {



}

export default ReviewPage
