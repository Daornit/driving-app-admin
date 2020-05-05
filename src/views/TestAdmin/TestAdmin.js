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
import TextField from '@material-ui/core/TextField';



import avatar from "assets/img/faces/test1.jpg";


//graphql
import { GET_TESTS, DELETE_TEST, CREATE_TEST } from 'queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';


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
    }
  })
);


export default function TestAdmin() {
  const classes = useStyles();

  const [ deleteTest ] = useMutation(DELETE_TEST);
  const [ createTest ] = useMutation(CREATE_TEST);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newTest, setNewTest] = React.useState({
    name: "",
    email: "",
    image: "",
    description:""
  });

  const { loading, err, data, refetch } = useQuery(GET_TESTS);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  const handleChange = event => {
    const name = event.target.name;
    setNewCourse({
      ...newTest,
      [name]: event.target.value,
    });
  };

  const handleCreateTest = () => {
    console.log(newTest);
    if(!newTest.name){
      notification.error('name talbariig zaaval buglunu uu')
      return;
    }
    createTest({
      variables: {
        tests: newTest
      }
    })
    refetch();
    setNewTest({
      image: "",
      description:"",
      inputAnswer:[]
    })
    setOpen(false);
    notification.success('amjilttai uuslee')
  }

  let listOfTest = [];
  if(data && data.tests){
    
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <Card>
        <GridContainer id="simple-modal-title">
          <CardHeader color="primary">
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.cardTitleWhite}>Жолооны курс нэмэх</h4>
            </GridItem>
          </CardHeader>
        </GridContainer>
        <CardBody>
            <GridContainer id="simple-modal-description">
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Нэр" 
                  name="name"
                  value={newCourse.name}
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Цахим шуудан(Email)" 
                  name="email"
                  value={newCourse.email} 
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Зургийн URL" 
                  name="image"
                  value={newCourse.image} 
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
            </GridContainer>
            <br></br>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextareaAutosize style={{width: "100%"}}
                  name="description"
                  value={newCourse.description} 
                  className={classes.margin15}
                  onChange={handleChange}
                  rows={10}
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
              onClick={handleCreateCourse}         
              >
              Нэмэх
            </Button>
          </GridItem>
        </GridContainer>
      </Card> */}
    </div>
  );
  return (
    <>
    <Card>
    <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <h4 className={classes.cardTitleWhite}>Жолооны Тестүүд</h4>
                      <p className={classes.cardCategoryWhite}>
                        Манай вебд бүртгэлтэй тестүүд
                      </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button
                      fullWidth
                      color="white"
                      onClick={handleOpen}          
                    >
                      <a color="primary">          
                        Жолооны тест нэмэх
                      </a>
                    </Button>
                  </GridItem> 
                </GridContainer>     
              </CardHeader>
            </GridItem>
          </GridContainer>
      <CardBody>
        <GridContainer>
          {data.tests.map(test => {
            return (
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CardBody profile>
                      <p className={classes.description}>
                        {test.description}
                      </p>
                    </CardBody>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <CardAvatar>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={test.image} className={classes.testimg} alt="..." />
                      </a>
                    </CardAvatar>
                  </GridItem>
  
                  <GridItem xs={12} sm={12} md={12}>
                    <RadioGroup aria-label="gender" name="gender1" value={'a'} onChange={handleChange}>
                      {
                        test.inputAnswer.map((answer, index) => {
                          return (
                            <FormControlLabel key={index} value={answer.content} control={
                              <Radio checked={answer.isCorrect} disabled={true} />
                            } label={answer.content} />
                          );
                        })
                      }
                    </RadioGroup>
                  </GridItem>
                  <GridContainer>
  
                  </GridContainer>
                </GridContainer>
              </Card>
            </GridItem>
            )
          })}
        </GridContainer>
        <br />
        <br />
      </CardBody> 
    </Card>
    </>
  );
}
