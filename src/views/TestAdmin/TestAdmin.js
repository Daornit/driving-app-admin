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
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
    },
    margin: {
      margin: '2rem 2rem 2rem 2rem',
    },
    paddingLeft: {
      paddingLeft: '1rem',
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
    image: "",
    description:"",
    inputAnswer:[],
    hint:""
  });
  const [switchOp, setSwitchOp] = React.useState(false);
  const [singleAnswer, setSingleAnswer] = React.useState("");

  const { loading, err, data, refetch } = useQuery(GET_TESTS);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  const handleChange = event => {
    const name = event.target.name;
    setNewTest({
      ...newTest,
      [name]: event.target.value,
    });
  };

  const handleChangeSA = (event) => {
    setSingleAnswer(event.target.value);
  }

  const handleChangeSwitch = () => {
    setSwitchOp(!switchOp);
  };

  const handleCreateTest = () => {
    console.log(newTest);
    if(!newTest.description){
      notification.error('Description талбарыг заавал бөглөнө үү!')
      return;
    }
    createTest({
      variables: {
        testInput: newTest
      }
    })
    refetch();
    notification.success('Амжилттай үүслээ')
    setNewTest({
      image: "",
      description:"",
      inputAnswer:[],
      hint:""
    })
    setOpen(false);
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

  const handleAnswerAdd = () => {
    let answers = [...newTest.inputAnswer];
    answers.push({
      content: singleAnswer,
      isCorrect: switchOp
    })
    setSwitchOp(false);
    setSingleAnswer("");
    setNewTest({...newTest,  inputAnswer: answers})
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <GridContainer id="simple-modal-title">
          <CardHeader color="primary">
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.cardTitleWhite}>Жолооны тест нэмэх</h4>
            </GridItem>
          </CardHeader>
        </GridContainer>
        <CardBody>
            <GridContainer id="simple-modal-description">
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Hint" 
                  name="hint"
                  value={newTest.hint} 
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
            </GridContainer>
            <br></br>
            <GridContainer id="simple-modal-description">
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Зургийн URL" 
                  name="image"
                  value={newTest.image} 
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
                  value={newTest.description} 
                  className={classes.margin15}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Тайлбар буюу асуулт."  
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                Хариултууд: {newTest.inputAnswer.map(obj => {
                  return (
                    <span>{obj.content + (obj.isCorrect ? ' зөв': ' буруу')}, </span>
                  );
                })}
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                    label="хариулт" 
                    name="singleAnswer"
                    value={singleAnswer} 
                    className={classes.margin15}
                    onChange={handleChangeSA}
                    fullWidth
                  />
                <FormGroup row>
                  <FormControlLabel
                    control={<Switch checked={switchOp} onChange={handleChangeSwitch}/>}
                    label="Зөв хариулт эсэх"
                  />
                </FormGroup>
                <Button
                  fullWidth
                  color="primary" 
                  onClick={handleAnswerAdd}         
                  >
                  Хариулт нэмэх
                </Button>
              </GridItem>
            </GridContainer>
          </CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary" 
              onClick={handleCreateTest}         
              >
              Нэмэх
            </Button>
          </GridItem>
        </GridContainer>
      </Card>
    </div>
  );
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
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
            <GridItem key={test._id} xs={12} sm={12} md={4}>
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
                        <img style={{width: '100%'}} src={test.image} className={classes.testimg} alt="..." />
                      </a>
                    </CardAvatar>
                  </GridItem>
  
                  <GridItem xs={12} sm={12} md={12}>
                    <RadioGroup aria-label="gender" name="gender1" value={'a'} onChange={handleChange} className={classes.paddingLeft}>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => {
                      console.log(test._id);
                      deleteTest({variables: {testId: test._id}}).then(({data}) => {
                        refetch(); 
                      })
                    }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </GridItem>
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
