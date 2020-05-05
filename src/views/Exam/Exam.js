/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

import avatar from "assets/img/faces/test1.jpg";

//graphql
import { GET_TESTS } from 'queries';
import { useQuery } from '@apollo/react-hooks';
import notification from 'helpers/notification';

const styles = {
  
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  testimg:{
      maxWidth: "100%",
      padding: "0",
      "&$cardAvatarPlain": {
        marginTop: "0"
      }
  },
  center: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const useStyles = makeStyles(styles);

export default function Exam() {
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const handleTooltipOpen = () => {
    setOpenTooltip(!openTooltip);
  };

  const classes = useStyles();
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [correctCount, setCorrectCount] = React.useState(0);

  const { loading, err, data, refetch } = useQuery(GET_TESTS);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };
  console.log("data:: ", data);
  const tests = data.tests;

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleNext = () => {
    if (value) {
      if (value.includes('true')) {
        setCorrectCount(correctCount+1);
      }
      setCurrentIndex(currentIndex + 1);
    } else {
      setHelperText('Хариултаа сонгоно уу');
      setError(false);
    }
    
  };

  if(currentIndex === tests.length) return (
    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <h4 className={classes.cardTitleWhite}>Шалгалт өгөх</h4>
                <p className={classes.cardCategoryWhite}>
                  Шалгалтын тестийн асуултууд
                </p>
              </GridItem>
            </GridContainer>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <div className={classes.center}>
        Үрдүн нийт {tests.length}-ээс {correctCount} нь зөв хариуллаа
      </div>
    </Card>
  );

  return (
    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <h4 className={classes.cardTitleWhite}>Шалгалт өгөх</h4>
                <p className={classes.cardCategoryWhite}>
                  Шалгалтын тестийн асуултууд
                </p>
              </GridItem>
            </GridContainer>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.center}>
            <p className={classes.description}>
              <FormLabel component="legend">{tests[currentIndex].description}</FormLabel>
            </p>
            {tests[currentIndex].image ? <img src={tests[currentIndex].image} className={classes.testimg} alt="..." />: ""}
            <GridItem xs={12} sm={12} md={12}>
              <FormHelperText>{helperText}</FormHelperText>
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                {tests[currentIndex].inputAnswer.map(ans => <FormControlLabel key={ans.content} value={ans.content + '-' + ans.isCorrect} control={<Radio />} label={ans.content} />)}
              </RadioGroup>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                placement="right"
                open={openTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={tests[currentIndex].hint}
              > 
                <IconButton onClick={handleTooltipOpen} className={classes.button} color="danger">
                    <HelpIcon />
                </IconButton>
              </Tooltip>
            </GridItem>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Button type="submit" variant="outlined" color="primary" className={classes.button} onClick={()=> {
                  handleNext();
                }}>
                  Дараагийн
                </Button>
              </GridItem>
            </GridContainer>
          </div>
          
        </GridItem>
      </GridContainer>
    </Card>
  );
}
