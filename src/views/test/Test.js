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


import avatar from "assets/img/faces/test1.jpg";

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
      maxWidth: "130px",
      maxHeight: "130px",
      padding: "0",
      "&$cardAvatarPlain": {
        marginTop: "0"
      }
  }
};

const useStyles = makeStyles(styles);

export default function Test() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
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

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => { 
    event.preventDefault();

    
  };
  return (
    <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" error={error} className={classes.formControl}>
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
      <CardBody>
        <GridContainer>
          
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <GridContainer>
              
        <GridItem xs={12} sm={12} md={12}>
            <CardBody profile>
              <p className={classes.description}>
              <FormLabel component="legend">Ачаа буулгаж 15 минут зогссон бол ямар үйлдэл хийсэнд тооцох вэ?</FormLabel>
                
              </p>
            </CardBody>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <CardAvatar>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} className={classes.testimg} alt="..." />
              </a>
            </CardAvatar>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <FormHelperText>{helperText}</FormHelperText>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="a" control={<Radio />} label="Түр зогсолт" />
        <FormControlLabel value="b" control={<Radio />} label="Удаан зогсолт" />
        <FormControlLabel value="c" control={<Radio />} label="Зайлшгүй зогсолт" />
      </RadioGroup>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Button  color="primary" className={classes.button}>
                Өмнөх
              </Button>
            </GridItem>

              <GridItem xs={12} sm={12} md={6}>
              <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                Дараагийн
              </Button>
            </GridItem>

            
            </GridContainer>
          </Card>

        </GridItem>
        </GridContainer>
        <br />
        <br />
              </CardBody>
    </Card>
    </FormControl>
    </form>
  );
}
