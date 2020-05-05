// import React from "react";

// // @material-ui/core

// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons

// // core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Button from "components/CustomButtons/Button.js";

// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import Table from "components/Table/Table";
// import { bugs, website} from "variables/general.js";
// import Modal from '@material-ui/core/Modal';
// import CustomInput from "components/CustomInput/CustomInput.js";
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import Typography from '@material-ui/core/Typography';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// //graphql
// import { GET_COURSES, DELETE_COURSE, CREATE_COURSE } from 'queries';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import notification from 'helpers/notification';

// import IconButton from "@material-ui/core/IconButton";
// import Close from "@material-ui/icons/Close";
// import TextField from '@material-ui/core/TextField';



// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles(
//   (theme) => ({
//     root: {
//       width: '100%',
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       flexBasis: '33.33%',
//       flexShrink: 0,
//     },
//     secondaryHeading: {
//       fontSize: theme.typography.pxToRem(15),
//       color: theme.palette.text.secondary,
//     },
//     cardCategoryWhite: {
//       "&,& a,& a:hover,& a:focus": {
//         color: "rgba(255,255,255,.62)",
//         margin: "0",
//         fontSize: "14px",
//         marginTop: "0",
//         marginBottom: "0"
//       },
//       "& a,& a:hover,& a:focus": {
//         color: "#FFFFFF"
//       }
//     },
//     cardTitleWhite: {
//       color: "#FFFFFF",
//       marginTop: "0px",
//       minHeight: "auto",
//       fontWeight: "300",
//       fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//       marginBottom: "3px",
//       textDecoration: "none",
//       "& small": {
//         color: "#777",
//         fontSize: "65%",
//         fontWeight: "400",
//         lineHeight: "1"
//       }
//     },
//     paper: {
//       position: 'absolute',
//       width: 400,
//       border: '2px solid #000',
//       backgroundColor: theme.palette.background.paper,
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//       'p':{
//         color: "primary",
//       },
//     },
//     head: {
//       backgroundColor: "primary",
//     }
//   })
// );

// export default function DuremAdmin() {
//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
  
//   const [ deleteCourse ] = useMutation(DELETE_COURSE);
//   const [ createCourse ] = useMutation(CREATE_COURSE);
  
//   const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);

//   const [expanded, setExpanded] = React.useState(false);

//   const handlePanelChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };
//   const [newCourse, setNewCourse] = React.useState({
//     name: "",
//     email: "",
//     image: "",
//     description:""
//   });

//   const { loading, err, data, refetch } = useQuery(GET_COURSES);

//   if (loading) return 'Loading...';
//   if (err) {
//     notification.error(err.message);
//     return err.message;
//   };

//   const handleChange = event => {
//     const name = event.target.name;
//     setNewCourse({
//       ...newCourse,
//       [name]: event.target.value,
//     });
//   };

//   const handleCreateCourse = () => {
//     console.log(newCourse);
//     if(!newCourse.name){
//       notification.error('name talbariig zaaval buglunu uu')
//       return;
//     }
//     createCourse({
//       variables: {
//         course: newCourse
//       }
//     })
//     refetch();
//     setNewCourse({
//       name: "",
//       email: "",
//       image: "",
//       description:""
//     })
//     setOpen(false);
//     notification.success('amjilttai uuslee')
//   }

//   let listOfCourse = [];
//   if(data && data.courses){
//     data.courses.forEach((obj, index) => {
//       let course = [];
//       course.push(index);
//       course.push(obj.name);
//       course.push(obj.director.username);
//       course.push(obj.email);
//       course.push(obj.director.phone);
//       course.push(<IconButton
//                       aria-label="Close"
//                       className={classes.tableActionButton}
//                     > <Close
//                     className={
//                       classes.tableActionButtonIcon + " " + classes.close
//                     }
//                     onClick={() => {
//                         deleteCourse({
//                           variables: {
//                             courseId: obj._id
//                           }
//                         });
//                         refetch();
//                       }
//                     }
//                   />
//                 </IconButton>);
//       listOfCourse.push(course);
//     })
//   }
  
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const body1 = (
//     <div style={modalStyle} className={classes.paper}>
//       <Card>
//         <GridContainer id="simple-modal-title">
//           <CardHeader color="primary">
//             <GridItem xs={12} sm={12} md={12}>
//               <h4 className={classes.cardTitleWhite}>Жолооны курс нэмэх</h4>
//             </GridItem>
//           </CardHeader>
//         </GridContainer>
//         <CardBody>
//             <GridContainer id="simple-modal-description">
//               <GridItem xs={12} sm={12} md={6}>
//                 <TextField
//                   label="Нэр" 
//                   name="name"
//                   value={newCourse.name}
//                   className={classes.margin15}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </GridItem>
//               <GridItem xs={12} sm={12} md={6}>
//                 <TextField
//                   label="Цахим шуудан(Email)" 
//                   name="email"
//                   value={newCourse.email} 
//                   className={classes.margin15}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </GridItem>
//               <GridItem xs={12} sm={12} md={12}>
//                 <TextField
//                   label="Зургийн URL" 
//                   name="image"
//                   value={newCourse.image} 
//                   className={classes.margin15}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </GridItem>
//             </GridContainer>
//             <br></br>
//             <GridContainer>
//               <GridItem xs={12} sm={12} md={12}>
//                 <TextareaAutosize style={{width: "100%"}}
//                   name="description"
//                   value={newCourse.description} 
//                   className={classes.margin15}
//                   onChange={handleChange}
//                   rows={10}
//                   placeholder="Курсын дэлгэрэнгүй тайлбар."  
//                 />
//               </GridItem>
//             </GridContainer>
//           </CardBody>
//         <GridContainer>
//           <GridItem xs={12} sm={12} md={4}>
//             <Button
//               fullWidth
//               color="primary" 
//               onClick={handleCreateCourse}         
//               >
//               Нэмэх
//             </Button>
//           </GridItem>
//         </GridContainer>
//       </Card>
//     </div>
//   );
//   return (
//     <div>
//       <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="simple-modal-title"
//   aria-describedby="simple-modal-description"
// >{body1}</Modal>
//       <GridContainer>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <GridContainer>
//             <GridItem xs={12} sm={12} md={12}>
//               <CardHeader color="primary">
//                 <GridContainer>
//                   <GridItem xs={12} sm={12} md={8}>
//                     <h4 className={classes.cardTitleWhite}>Жолооны Дүрмүүд</h4>
//                       <p className={classes.cardCategoryWhite}>
//                         Манай вебд бүртгэлтэй жолооны дүрмүүд
//                       </p>
//                   </GridItem>
//                   <GridItem xs={12} sm={12} md={4}>
//                     <Button
//                       fullWidth
//                       color="white"
//                       onClick={handleOpen}          
//                     >
//                       <a color="primary">          
//                         Жолооны дүрэм нэмэх
//                       </a>
//                     </Button>
//                   </GridItem> 
//                 </GridContainer>     
//               </CardHeader>
//             </GridItem>
//           </GridContainer>
//           <CardBody>

//             <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel4bh-content"
//           id="panel4bh-header"
//         >
//           <Typography className={classes.heading}>Personal data</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
//             vitae egestas augue. Duis vel est augue.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//           </CardBody>
//         </Card>
//       </GridItem>

//       </GridContainer>
//     </div>
//   );
// }
