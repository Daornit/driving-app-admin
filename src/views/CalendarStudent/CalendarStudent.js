import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

import {
  Scheduler,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//graphql
import { GET_SCHEDULES, CREATE_SCHEDULE, DELETE_SCHEDULE } from 'queries';
import { useQuery, useMutation} from '@apollo/react-hooks';
import notification from 'helpers/notification';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  head: {
    backgroundColor: "primary", 
  },
  margin: {
    margin: '2rem 2rem 2rem 2rem',
  },
  paddingLeft: {
    paddingLeft: '1rem',
  }
}));

export default function CalendarStudent(){

  const classes = useStyles();

  const [createSchedule] = useMutation(CREATE_SCHEDULE);
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    name: '',
    date: ''
  });

  let list = [];

  const { loading, err, data, refetch } = useQuery(GET_SCHEDULES);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  data.schedules.forEach((schedule, index )=> {
    let teacher = schedule.teacher.username;

    list.push({
      id: schedule._id,
      title: schedule.name + '-' + teacher,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
    })
  })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCreateEvent = () => {
    createSchedule({variables: state}).then(data => {
      refetch();
      notification.success('Хувиарь амжилттай үүсгэлээ');
      handleClose();
    }).catch(e => {
      notification.error('Хуваарь үүсгэж чадсангүй');
    })
  }

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const body = (
    <div style={{
      top:"50%",
      left:"50%",
      transform: 'translate(-50%, -50%)'
    }} className={classes.paper}>
    <Card>
      <GridContainer id="simple-modal-title">
        <CardHeader color="primary">
          <GridItem xs={12} sm={12} md={12}>
            <h4 className={classes.cardTitleWhite}>Хувиарь нэмэх</h4>
          </GridItem>
        </CardHeader>
      </GridContainer>
      <CardBody>
          <GridContainer id="simple-modal-description">
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                label="Нэр" 
                name="name"
                value={state.name} 
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
                label="Огноо" 
                name="date"
                type="date"
                value={state.date} 
                className={classes.margin15}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </GridItem>
          </GridContainer>
        </CardBody>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Button
            fullWidth
            color="primary" 
            onClick={handleCreateEvent}         
            >
            Нэмэх
          </Button>
        </GridItem>
      </GridContainer>
    </Card>
  </div>
  );

  let currentUserType = localStorage.getItem('type');

  const TooltipContent = ({appointmentData}) => {
    return (
      <div style={{
        padding: '0 10px 10px 1px',
        textAlign: 'center'
      }}>
        {appointmentData.title}

        {
          currentUserType === 'TEACHER' ?
          <span>
            <IconButton aria-label="delete" onClick={() => {
                deleteSchedule({
                  variables: {
                    id: appointmentData.id
                  }
                }).then(data => {
                  refetch()
                  notification.success("Амжилттай устгалла");
                }).catch(err => {
                  notification.error(err.message);
                });
              }
            }>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </span>:""
        }
      </div>
    )
  }

  return (
    <Paper>
      {currentUserType === 'TEACHER' ?
         <>
          <Button
            fullWidth
            color="primary" 
            onClick={handleOpen}         
          >
            Хувиарь нэмэх
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </> : ''
      }
      
      <Scheduler
        data={list}
      >
        <ViewState
          defaultCurrentDate={new Date()}
        />
        <MonthView />
        <Appointments />
        <AppointmentTooltip
          contentComponent={TooltipContent}
        ></AppointmentTooltip>
      </Scheduler>
    </Paper>
  );
}