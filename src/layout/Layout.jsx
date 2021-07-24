import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  colors,
} from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import TabPanel from "./TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "./Card";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setCategoryId } from "../store/actions/action";
import { getSelectedTheme } from "../store/reducers/ThemeReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    width: theme.spacing(4),

    height: theme.spacing(4),
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const themeSataus = useSelector(getSelectedTheme);

  const [dark, setDark] = useState(false);
  const [data, setData] = useState(null);

  const themeType = dark ? "dark" : "light";
  const primaryColor = dark ? "#424242" : colors.blue[600];
  const secondaryColor = dark ? colors.orange[900] : '#4fcf64';
  const backgroundDefault = dark ? "#303030" : "#fafafa";
  const backgroundPaper = dark ? "#424242" : "#fff";
  const contrastText = dark ? "white" : "rgba(0, 0, 0, 0.87)";

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: primaryColor,
        contrastText: "white",
        background: {
          default: backgroundDefault,
          paper: backgroundPaper,
        },
        text: {
          textColor: contrastText,
        },
      },
      secondary: {
        main: secondaryColor,
        contrastText: "white",
      },
      type: themeType,
    },
  });

  const handleChangeTheme = (event) => {
    setDark((prev) => {
      dispatch(selectTheme(!prev));
      return !prev;
    });
  };

  React.useEffect(() => {
    const fetchTabList = async () => {
      const results = await fetch(
        "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob"
      );
      const json = await results.json();
      return json;
    };
    fetchTabList()
      .then((res) => {
        console.log(res);
        setData(res.category_list);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              USTRAA
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleChangeTheme}
              color="inherit"
              aria-label="menu"
            >
              {themeSataus.dark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {data?.map((a, i) => (
              <Tab
                onClick={() =>  dispatch(setCategoryId(a.category_id))}
                icon={<Card image={a.category_image} name={a.category_name} />}
                {...a11yProps({ i })}
              />
            ))}
          </Tabs>
        </AppBar>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((a) => (
          <TabPanel value={value} index={a}>
            {children}
          </TabPanel>
        ))}
      </ThemeProvider>
    </div>
  );
};

export default withRouter(Layout);
