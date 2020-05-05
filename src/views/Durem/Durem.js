import React from "react";

// @material-ui/core

import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import { Grid } from "@material-ui/core";
import { cardHeader } from "assets/jss/material-dashboard-react";





const useStyles = makeStyles(
  (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
    }
  })
);

export default function Durem() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <GridItem xs={12} sm={12} md={12}>
        
        <Card>
          
<GridContainer>
<GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <h4 className={classes.cardTitleWhite}>Дүрэм харах</h4>
            <p className={classes.cardCategoryWhite}>
              Замын хөдөлгөөний дүрмүүд
            </p>
            </GridItem>
             
        </GridContainer>     
          </CardHeader>
          </GridItem>
          </GridContainer>
          <CardBody>
<GridContainer>
  <GridItem xs={12} sm={12} md={12}>
  <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Дүрмийн ангилал</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          onChange={handleChange}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Нийтлэг үндэслэл</MenuItem>
          <MenuItem value={20}>Жолоочийн үүрэг</MenuItem>
          <MenuItem value={30}>Тээврийн хэрэгслээр зорчигчийн үүрэг</MenuItem>
        </Select>
        <GridItem xs={12} sm={12} md={12}>
        <FormHelperText>Ангилалаа сонгоно уу!</FormHelperText>
        </GridItem>
      </FormControl>
           </GridItem>
      </GridContainer>
      <GridContainer>
  <GridItem xs={12} sm={12} md={12}>
  <h4 > Нийтлэг үндэслэл</h4>
            <p >
            1.1. Энэ дүрмийн зорилго нь Монгол Улсын нутаг дэвсгэрт замын хөдөлгөөний нэгдсэн журам тогтооход оршино. Замын хөдөлгөөнтэй холбоотой бусад хэм хэмжээний актууд нь энэ дүрмийн заалт шаардлагууд дээр үндэслэгдсэн, түүнтэй зөрчилдөхгүй байвал зохино.
            </p>
            <p>
            1.2. Энэ дүрэмд хэрэглэсэн дараахь нэр томьёог дор дурдсан утгаар ойлгоно:
            </p>
            
  </GridItem>
</GridContainer>

          </CardBody>
        </Card>
      </GridItem>
      
    </div>
  );
}