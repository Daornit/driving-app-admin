import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tasks from "components/Tasks/Tasks";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Box from '@material-ui/core/Box';
import avatar from "assets/img/faces/test1.jpg";
import ReactPlayer from "react-player";
import DeleteIcon from '@material-ui/icons/Delete';

import CardAvatar from "components/Card/CardAvatar.js";


import TextField from '@material-ui/core/TextField';

import { GET_TUTORIALS, DELETE_TUTORIALS, CREATE_TUTORIALS } from 'queries';
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
export default function Tutorial() {
  const classes = useStyles();

  const [ deleteTutorial ] = useMutation(DELETE_TUTORIALS);
  const [ createTutorial ] = useMutation(CREATE_TUTORIALS);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newTutorial, setNewTutorial] = React.useState({
    comment:""
  });

  const { loading, err, data, refetch } = useQuery(GET_TUTORIALS);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  const handleChange = event => {
    const name = event.target.name;
    setNewTutorial({
      ...newTutorial,
      [name]: event.target.value,
    });
  };

  const handleCreateTutorial = () => {
    console.log(newTutorial);
    if(!newTutorial.comment){
      notification.error('comment talbariig zaaval buglunu uu')
      return;
    }
    createTutorial({
      variables: {
        tutorialInput: newTutorial
      }
    })
    refetch();
    setNewTutorial({
      comment:""
      
    })
    setOpen(false);
    notification.success('amjilttai ilgeelee')
  }

  let listOfTutorial = [];
  
  console.log(listOfTutorial);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GridContainer>
      
      <GridItem xs={12} sm={12} md={12}>
        
        <Card>
          
<GridContainer>

<GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h4 className={classes.cardTitleWhite}>Онлайн хичээл</h4>
            <p className={classes.cardCategoryWhite}>
              Дүрмийн хичээлийн онлайн материал
            </p>
            </GridItem>
        </GridContainer>     
          </CardHeader>
          </GridItem>
          </GridContainer>
          <CardBody>
            <GridContainer>
            {data.tutorials.map(tutorial => {
              return(
                
                <GridItem xs={12} sm={12} md={12}>
                    
                    <Card>
                    <GridContainer>
                        <CardHeader>
                          <h4>{tutorial.title}</h4>
                    
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
    
            <GridItem xs={12} sm={12} md={12}>
              <ReactPlayer
                url={tutorial.video}
              />
            </GridItem>
            </GridContainer>
            <Box><p>
                {tutorial.description}
                </p></Box>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                      > <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                      onClick={() => {
                          deleteTutorial({
                            variables: {
                              tutorialId: tutorial._id
                            }
                          });
                          refetch();
                        }
                      }
                    />
                  </IconButton>
                  </GridItem>
                  </GridContainer>
                  <Card>
                    
                  <GridContainer>
                  <CardBody>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>
                      {tutorial.comment}
                      </p>
                    </GridItem>
                    </GridContainer>
                    </CardBody>
                    <GridContainer>
                    
                      <GridItem xs={12} sm={12} md={12}>
                        <TextareaAutosize style={{width: "100%"}}
                          name="comment"
                          value={newTutorial.comment} 
                          className={classes.margin15}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Сэтгэгдэл үлдээх."  
                        />      
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          fullWidth
                          color="primary" 
                          onClick={handleCreateTutorial}         
                          >
                        Илгээх
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </GridContainer>
                  </Card>
                    </CardBody>
                    </GridContainer>
        
                    </Card>
                </GridItem>
            )})}
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>      
    </GridContainer>
  );
}
