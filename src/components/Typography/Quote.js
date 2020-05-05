import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Quote(props) {
  const classes = useStyles();
  const { text, createdDate } = props;
  return (
    <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{createdDate}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  text: PropTypes.node,
  createdDate: PropTypes.node
};
