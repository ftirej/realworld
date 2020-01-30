import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Post from "../Post/Post";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as feed from "../../store/feed/actions";
import ListPagination from "./ListPagination";
import Spinner from "../../components/UI/Spinner/Spinner";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fafafa"
  }
}));

const MainTabs = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleGetFeed = useCallback(() => {
    props.feed.getGlobalFeed();
  }, [props.feed]);

  const handleGetYourFeed = useCallback(() => {
    props.feed.getYourFeed();
  }, [props.feed]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0) {
      handleGetYourFeed();
    }
    if (value === 1) {
      handleGetFeed();
    }
  }, [value, handleGetFeed, handleGetYourFeed]);

  const getArticles = index => {
    if (props.articles.length === 0) {
      return `No articles are here... yet.`;
    }
    return props.articles.map((article, index) => (
      <Post article={article} key={index} />
    ));
  };

  let feedElement;

  if (props.isFetching) {
    feedElement = <Spinner />;
  } else if (!props.isFetching && props.articles && props.articles.length > 0) {
    feedElement = (
      <React.Fragment>
        <TabPanel value={value} index={0}>
          {getArticles(0)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {getArticles(1)}
        </TabPanel>
        <ListPagination
          articlesCount={props.articlesCount}
          currentPage={props.currentPage}
        />
      </React.Fragment>
    );
  } else {
    feedElement = <Spinner />;
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Tabs value={value} onChange={handleChange} aria-label="ant example">
          {props.loggedIn ? <Tab label="Your Feed" index={0} /> : null}
          <Tab label="Global Feed" index={1} />
        </Tabs>
        {feedElement}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    articles: state.feed.articles,
    articlesCount: state.feed.articlesCount,
    currentPage: state.feed.currentPage,
    isFetching: state.feed.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    feed: bindActionCreators({ ...feed }, dispatch)
  };
};

MainTabs.propTypes = {
  loggedIn: PropTypes.bool,
  articles: PropTypes.array,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  isFetching: PropTypes.bool
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  other: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTabs);
