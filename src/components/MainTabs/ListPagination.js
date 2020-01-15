import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feed from "../../store/feed/actions";
import classes from "./ListPagination.module.css";

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
              <a className={classes.pageLink}>{v + 1}</a>
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

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
