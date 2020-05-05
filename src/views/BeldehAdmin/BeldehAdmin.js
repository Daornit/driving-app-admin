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
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Radio from '@material-ui/core/Radio';
import CustomInput from "components/CustomInput/CustomInput.js";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { green } from "@material-ui/core/colors";
import Modal from '@material-ui/core/Modal';


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
      margin: theme.spacing(1, 1, 0, 0),
      "&.after": {
        backgroundColor: green,
      }
    }
  })
);
export default function BeldehAdmin() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
      <GridContainer id="simple-modal-title">
        
          <CardHeader color="primary">
        <GridItem xs={12} sm={12} md={12}>
        <h4 className={classes.cardTitleWhite}>Шалгалтад бэлдэх тест нэмэх</h4>
        
      </GridItem>
      </CardHeader>
      </GridContainer>
      <CardBody>
      <GridContainer id="simple-modal-description">
        
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Курсийн нэр"
                    id="course_name"
                    formControlProps={{
                      fullWidth: true
                    }}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Цахим шуудан(Email)"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Зургийн URL"
                    id="img"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>

                  <GridItem xs={12} sm={12} md={12}>
                    
                      
                  <TextareaAutosize style={{width: "100%"}}
                    rows={10}
                    aria-label="Курсын дэлгэрэнгүй тайлбар."
                    placeholder="Курсын дэлгэрэнгүй тайлбар."
                    
                  />
                  
                  
                </GridItem>

              </GridContainer>
              </CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
        <Button
          fullWidth
          color="primary"          
        >          
        Нэмэх
        </Button>
                
      </GridItem>
      
              </GridContainer>
              </Card>
    </div>
  );
    return (
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" error={error} className={classes.formControl}>
    <Card>
<GridContainer>
  
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>{body}</Modal>
<GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <h4 className={classes.cardTitleWhite}>Шалгалтад бэлдэх</h4>
            <p className={classes.cardCategoryWhite}>
              Шалгалтын тестэд бэлдэх
            </p>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
        <Button
          fullWidth
          color="white"
          onClick={handleOpen}          
        ><a color="primary">          
        Бэлдэц нэмэх
        </a>
        </Button>
        </GridItem> 
        </GridContainer>     
          </CardHeader>
          </GridItem>
          </GridContainer>
      <CardBody>
        <GridContainer>
          
        <GridItem xs={12} sm={12} md={4}>
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

            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="a" control={<Radio />} label="Түр зогсолт" />
        <FormControlLabel value="b" control={<Radio />} label="Удаан зогсолт" />
        <FormControlLabel value="c" control={<Radio />} label="Зайлшгүй зогсолт" />
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
            </GridItem>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
            <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                Хариу        
              </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <Button  color="primary" className={classes.button}>
                Дараагийн
              </Button>
            </GridItem>
            </GridContainer>
            
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
