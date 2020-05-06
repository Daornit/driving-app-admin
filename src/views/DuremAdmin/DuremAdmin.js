import React from "react";

// @material-ui/core

import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";
import { bugs, website} from "variables/general.js";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.js";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//graphql
import { GET_DUREM, DELETE_DUREM, CREATE_DUREM, CREATE_DUREMCATEGORY, GET_DUREMCATEGORY} from 'queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';

import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Add from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';



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
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
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
    tableActionButton: {
    }
  })
);

export default function DuremAdmin() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  
  const [ deleteDurem ] = useMutation(DELETE_DUREM);
  const [ createDurem ] = useMutation(CREATE_DUREM);
  const [ createDuremCategory ] = useMutation(CREATE_DUREMCATEGORY);
  
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [categoryIdToAddDurem, setCategoryIdToAddDurem] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [newDurem, setNewDurem] = React.useState({
    title: "",
    image: "",
    description:""
  });

  const [newDuremCategory, setNewDuremCategory] = React.useState({
    name:""
  });

  const { loading, err, data, refetch } = useQuery(GET_DUREM);
  
  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };
  
  const handleChangeCategory = event => {
    const name = event.target.name;
    setNewDuremCategory({
      ...newDuremCategory,
      [name]: event.target.value,
    });
  };

  const handleCreateDuremCategory = () => {
    console.log(newDuremCategory);
    if(!newDuremCategory.name){
      notification.error('name talbariig zaaval buglunu uu')
      return;
    }
    createDuremCategory({
      variables: {
        categoryName: newDuremCategory.name
      }
    }).then(data => {
      refetch();
      setNewDuremCategory({
        name: ""
      })
      setOpen(false);
      notification.success('amjilttai uuslee')
    })
   
  }
  


  const handleChange = event => {
    const name = event.target.name;
    setNewDurem({
      ...newDurem,
      [name]: event.target.value,
    });
  };

  const handleCreateDurem = () => {
    console.log(newDurem);
    if(!newDurem.description){
      notification.error('description talbariig zaaval buglunu uu')
      return;
    }
    createDurem({
      variables: {
        duremInput: newDurem,
        categoryId: categoryIdToAddDurem
      }
    })
    refetch();
    setNewDurem({
      title: "",
      image: "",
      description:""
    })
    setOpen(false);
    notification.success('amjilttai uuslee')
  }
  

  let listOfDurem = [];
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = (categoryId) => {
    console.log("categoryId:: ", categoryId);
    setCategoryIdToAddDurem(categoryId)
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <GridContainer id="simple-modal-title-durem">
          <CardHeader color="primary">
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.cardTitleWhite}>Жолооны дүрэм нэмэх</h4>
            </GridItem>
          </CardHeader>
        </GridContainer>
        <CardBody>
            <GridContainer id="simple-modal-description-durem">
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Гарчиг" 
                  name="title"
                  value={newDurem.title}
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Зургийн URL" 
                  name="image"
                  value={newDurem.image} 
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
                  value={newDurem.description} 
                  className={classes.margin15}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Дүрмийн дэлгэрэнгүй тайлбар."  
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary" 
              onClick={handleCreateDurem}         
              >
              Нэмэх
            </Button>
          </GridItem>
        </GridContainer>
      </Card>
    </div>
  );
  const body1 = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <GridContainer id="simple-modal-title">
          <CardHeader color="primary">
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.cardTitleWhite}>Жолооны дүрмийн ангилал нэмэх</h4>
            </GridItem>
          </CardHeader>
        </GridContainer>
        <CardBody>
            <GridContainer id="simple-modal-description">
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Нэр" 
                  name="name"
                  value={newDuremCategory.name}
                  className={classes.margin15}
                  onChange={handleChangeCategory}
                  fullWidth
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary" 
              onClick={handleCreateDuremCategory}         
              >
              Нэмэх
            </Button>
          </GridItem>
        </GridContainer>
      </Card>
    </div>
  );
  return (
    <div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>{body1}</Modal>
<Modal
  open={open1}
  onClose={handleClose1}
  aria-labelledby="simple-modal-title-durem"
  aria-describedby="simple-modal-description-durem"
>{body}</Modal>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <h4 className={classes.cardTitleWhite}>Жолооны Дүрмүүд</h4>
                      <p className={classes.cardCategoryWhite}>
                        Манай вебд бүртгэлтэй жолооны дүрмүүд
                      </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button
                      fullWidth
                      color="white"
                      onClick={handleOpen}          
                    >
                      <a color="primary">          
                        Жолооны дүрмийн ангилал нэмэх
                      </a>
                    </Button>
                  </GridItem> 
                </GridContainer>     
              </CardHeader>
            </GridItem>
          </GridContainer>
          <CardBody>
            <GridContainer>
            {data.duremcategorys.map(duremcategorys => {
            return(
              <div className={classes.root}>
              
            <ExpansionPanel expanded={expanded === duremcategorys._id} onChange={handlePanelChange(duremcategorys._id)}>
                

                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                >

                <Typography className={classes.heading}>
                  <p>
                    {duremcategorys.name}
                    
                    <IconButton
                                  aria-label="Add"
                                  className={classes.tableActionButton}
                                > <Add
                                className={
                                  classes.tableActionButtonIcon + " " + classes.add
                                }
                                onClick={() => handleOpen1(duremcategorys._id)} 
                              />
                            </IconButton>
                  </p>
                </Typography>
            
                </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                    <p>
                      {duremcategorys.durmuud.map(durem => {
                        return(
                          <p>
                            {durem.description}
                          
                              <IconButton
                                  aria-label="Close"
                                  className={classes.tableActionButton}
                                > <Close
                                className={
                                  classes.tableActionButtonIcon + " " + classes.close
                                }
                                onClick={() => {
                                    deleteDurem({
                                      variables: {
                                        duremId: durem._id
                                      }
                                    });
                                    refetch();
                                  }
                                }
                              />
                            </IconButton>
                            
                          </p>
                        )
                      }
                      )}
                    </p>

                </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
            )})}
            </GridContainer>
        </CardBody>
    </Card>
  </GridItem>

  </GridContainer>
</div>
  );
}
