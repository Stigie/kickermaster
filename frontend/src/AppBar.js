import React from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
  Button
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import StarIcon from "@material-ui/icons/Star";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  flexContainer: {
    justifyContent: "center"
  },
  button: {
    height: "40px",
    left: "35%",
    top: "15px"
  }
});

@withRouter
class ScrollableTabsButtonForce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.location.pathname
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            classes={{
              flexContainer: classes.flexContainer
            }}
          >
            <Tab label="GAMES" icon={<ListIcon />} value="/games" />
            <Tab label="LEADERS" icon={<StarIcon />} value="/leaders" />
            <Button className={classes.button}>Login</Button>
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonForce);
