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
import { GET_DUREM} from 'queries';
import { useQuery} from '@apollo/react-hooks';
import notification from 'helpers/notification';




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

export default function Durem() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  

  const [expanded, setExpanded] = React.useState(false);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const { loading, err, data, refetch } = useQuery(GET_DUREM);
  
  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };
  

  return (
    <div>
      
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
