import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieDetails } from "../apiCalls";

class Movie extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    getMovieDetails(id);
  };

  render() {
    const { details } = this.props;

    return (
      <>
        <h1>{details.original_title}</h1>
      </>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return {
    details: api.details
  };
};

export default connect(mapStateToProps)(Movie);
