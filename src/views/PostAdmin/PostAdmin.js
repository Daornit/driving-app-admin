import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.js";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import TextField from '@material-ui/core/TextField';

import { GET_POSTS, DELETE_POST, CREATE_POST } from 'queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';

import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Table from "components/Table/Table";


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
    typo: {
      paddingLeft: "15%",
      marginBottom: "40px",
      position: "relative"
    },
    note: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      bottom: "10px",
      color: "#c0c1c2",
      display: "block",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "13px",
      left: "0",
      marginLeft: "20px",
      position: "absolute",
      width: "260px"
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


export default function PostAdmin() {
  const classes = useStyles();

  const [ deletePost ] = useMutation(DELETE_POST);
  const [ createPost ] = useMutation(CREATE_POST);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newPost, setNewPost] = React.useState({
    title: "",
    image: "",
    description:""
  });

  const { loading, err, data, refetch } = useQuery(GET_POSTS);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  const handleChange = event => {
    const name = event.target.name;
    setNewPost({
      ...newPost,
      [name]: event.target.value,
    });
  };

  const handleCreatePost = () => {
    console.log(newPost);
    if(!newPost.description){
      notification.error('name talbariig zaaval buglunu uu')
      return;
    }
    createPost({
      variables: {
        postInput: newPost
      }
    })
    refetch();
    setNewPost({
      title: "",
      description:""
    })
    setOpen(false);
    notification.success('amjilttai uuslee')
  }

  let listOfPost = [];
  if(data && data.posts){
    data.posts.forEach((obj, index) => {
      let post = [];
      post.push(index);
      post.push(obj.title);
      post.push(obj.description);
      post.push(obj.createdDate);
      post.push(obj.author.username);
      post.push(<IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}
                    > <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                    onClick={() => {
                        deletePost({
                          variables: {
                            postId: obj._id
                          }
                        });
                        refetch();
                      }
                    }
                  />
                </IconButton>);
      listOfPost.push(post);
    })
  }
  console.log(listOfPost);
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
              <h4 className={classes.cardTitleWhite}>Зарлал нэмэх</h4>
            </GridItem>
          </CardHeader>
        </GridContainer>
        <CardBody>
            <GridContainer id="simple-modal-description">
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Гарчиг" 
                  name="title"
                  value={newPost.title}
                  className={classes.margin15}
                  onChange={handleChange}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  label="Зургийн URL" 
                  name="image"
                  value={newPost.image}
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
                  value={newPost.description} 
                  className={classes.margin15}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Дэлгэрэнгүй тайлбар."  
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary" 
              onClick={handleCreatePost}         
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
    <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <h4 className={classes.cardTitleWhite}>Зарлал</h4>
                      <p className={classes.cardCategoryWhite}>
                        Манай вебд бүртгэлтэй Зарууд
                      </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button
                      fullWidth
                      color="white"
                      onClick={handleOpen}          
                    >
                      <a color="primary">          
                        Зарлал нэмэх
                      </a>
                    </Button>
                  </GridItem> 
                </GridContainer>     
              </CardHeader>
      <CardBody>
      <Table
              tableHeaderColor="primary"
              tableHead={["ID","Title", "Description", "Author", "CreatedDate", "Action"]}
              tableData={listOfPost}
            />
      </CardBody>
    </Card>
    </>
  );
}
