import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feed from "../../store/feed/actions";
import classes from "./ListPagination.module.css";
import PropTypes from "prop-types";

const ListPagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    props.feed.setPage(page);
  };

  return (
    <nav>
      <ul className={classes.pagination}>
        {range.map(v => {
          const isCurrent = v === props.currentPage;
          const onClick = ev => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              className={
                isCurrent
                  ? [classes.pageItem, classes.active].join(" ")
                  : classes.pageItem
              }
              onClick={onClick}
              key={v.toString()}
            >
              <a href="/#" className={classes.pageLink}>
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    feed: bindActionCreators({ ...feed }, dispatch)
  };
};

ListPagination.propTypes = {
  feed: PropTypes.shape({ setPage: PropTypes.func }),
  currentPage: PropTypes.number
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
