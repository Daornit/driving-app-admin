/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Button from "components/CustomButtons/Button.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/test1.jpg";

import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Radio from '@material-ui/core/Radio';
import CustomInput from "components/CustomInput/CustomInput.js";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { green } from "@material-ui/core/colors";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(
  (theme) => ({
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
    paper: {
      position: 'absolute',
      width: 400,
      border: '2px solid #000',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      'p':{
        color: "primary",
      },
    },
    head: {
      backgroundColor: "primary",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
        width: 100,
      margin: theme.spacing(1, 1, 0, 0),
      "&.after": {
        backgroundColor: green,
      }
      
    }
    
  })
);
export default function Beldeh() {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
      setOpen(false);
    };
  
    const handleTooltipOpen = () => {
        console.log("tests test est s ", open)
      setOpen(true);
    };
  
  const classes = useStyles();
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

    if (value === 'a') {
      setHelperText('Хариулт зөв байна');
      setError(false);
    } else if (value === 'b') {
      setHelperText('Буруу хариулт!');
      setError(true);
    } else if(value === 'c'){
      setHelperText('Буруу хариулт.');
      setError(true);
    }else{
      setHelperText('Хариултаа сонгоно уу!.');
      setError(true);
    }
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
            <h4 className={classes.cardTitleWhite}>Шалгалтад бэлдэх</h4>
            <p className={classes.cardCategoryWhite}>
              Шалгалтын тестэд бэлдэх
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

            <GridItem xs={12} sm={12} md={10}>

            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="a" control={<Radio />} label="Түр зогсолт" />
        <FormControlLabel value="b" control={<Radio />} label="Удаан зогсолт" />
        <FormControlLabel value="c" control={<Radio />} label="Зайлшгүй зогсолт" />
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Hint"
              > 

                    <IconButton onClick={handleTooltipOpen} className={classes.button} color="danger">
                        <HelpIcon />
                    </IconButton>
            </Tooltip>
            </div>
            
            </ClickAwayListener>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Button  color="primary" className={classes.button}>
                Өмнөх
              </Button>
            </GridItem>
              <GridItem xs={12} sm={12} md={4}>
            <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                Хариу        
              </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
              <Button  color="primary" className={classes.button}>
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
