import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Button from "components/CustomButtons/Button";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tasks from "components/Tasks/Tasks";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';


//graphql
import { GET_USERS, BAN_USERS, CREATE_USERS } from 'queries';
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

export default function Users() {
  const classes = useStyles();

  const [ banUsers ] = useMutation(BAN_USERS);
  const [ createUsers ] = useMutation(CREATE_USERS);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    username: "",
    email: "",
    avatar: "",
    type:"",
    password:""
  });

  const { loading, err, data, refetch } = useQuery(GET_USERS);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  const handleChange = event => {
    const name = event.target.name;
    setNewUser({
      ...newUser,
      [name]: event.target.value,
    });
  };

  const handleCreateUsers = () => {
    console.log(newUser);
    if(!newUser.username){
      notification.error('name talbariig zaaval buglunu uu')
      return;
    }
    createUsers({
      variables: {
        ...newUser,
        phone: Number(newUser.phone)
      }
    })
    refetch();
    setNewUser({
      username: "",
      email: "",
      avatar: "",
      type:"",
      password:""
    })
    setOpen(false);
    notification.success('amjilttai uuslee')
  }

  let listOfUsers = [];
  if(data && data.users){
    data.users.forEach((obj, index) => {
      let users = [];
      users.push(index);
      users.push(obj.username);
      users.push(obj.type);
      users.push(obj.email);
      users.push(obj.phone);
      users.push(obj.isBanned ? "in active" : "active");
      users.push(<IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}
                    > <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                    onClick={() => {
                        banUsers({
                          variables: {
                            userId: obj._id
                          }
                        });
                        refetch();
                      }
                    }
                  />
                </IconButton>);
      listOfUsers.push(users);
    })
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <GridContainer id="simple-modal-title">
          <CardHeader color="primary">
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.cardTitleWhite}>Хэрэглэгч нэмэх</h4>
            </GridItem>
          </CardHeader>
        </GridContainer>
        <CardBody>
            <GridContainer id="simple-modal-description">
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Нэр" 
                  name="username"
                  value={newUser.username}
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Төрөл" 
                  name="type"
                  value={newUser.type}
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Цахим шуудан(Email)" 
                  name="email"
                  value={newUser.email} 
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Утасны дугаар" 
                  name="phone"
                  value={newUser.phone} 
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Зургийн URL" 
                  name="avatar"
                  value={newUser.avatar} 
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Password" 
                  name="password"
                  value={newUser.password}
                  className={classes.margin15}
                  onChange={handleChange}
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
              onClick={handleCreateUsers}         
              >
              Нэмэх
            </Button>
          </GridItem>
        </GridContainer>
      </Card>
    </div>
  );
  return (
    <GridContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <h4 className={classes.cardTitleWhite}>Хэрэглэгчид</h4>
                      <p className={classes.cardCategoryWhite}>
                        Манай вебд бүртгэлтэй Хэрэглэгчид
                      </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button
                      fullWidth
                      color="white"
                      onClick={handleOpen}          
                    >
                      <a color="primary">          
                        Хэрэглэгч нэмэх
                      </a>
                    </Button>
                  </GridItem> 
                </GridContainer>     
              </CardHeader>
            </GridItem>
          </GridContainer>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID","Username", "Type", "Email", "Phone", "IsBanned", "BanUser"]}
              tableData={listOfUsers}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
