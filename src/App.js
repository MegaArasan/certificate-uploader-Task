import React, { useState } from "react";
import "./App.css";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { API_URL } from "./globalconstant.js";
import { InputLabel } from "@mui/material";

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        certificateName: "",
        issuer: "",
        profimg: selectedImage,
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        const updatedvalues = { ...values, profimg: selectedImage };
        console.log(updatedvalues);
        Register(updatedvalues);
      },
    });
  const Register = async (values) => {
    console.log(values, "values");

    const formData = new FormData();
    formData.append("fullname", values.certificateName);
    formData.append("fullname", values.issuer);
    formData.append("profimg", selectedImage);

    console.log(formData, "fd");

    axios
      .post(`${API_URL}/storage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
  };
  return (
    <div className="App">
      {/* <div className="header"> */}
      <Typography variant="h4" color="inherit">
        Skills-Based Certifications
      </Typography>
      <Typography variant="p" color="inherit">
        (you can add upto 5 certifications)
      </Typography>
      {/* </div> */}
      <div className="fab">
        <Fab onClick={handleClickOpen} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ margin: "20px", padding: "10px" }}>
              <InputLabel>Certificate Name</InputLabel>
              <br />
              <TextField
                id="certificateName"
                name="certificateName"
                label="Enter the Certificate Name"
                value={values.certificateName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  values.certificateName &&
                  errors.certificateName &&
                  touched.certificateName
                }
                error={errors.certificateName && touched.certificateName}
              />
            </div>
            <div style={{ margin: "20px", padding: "10px" }}>
              <InputLabel>Issuer</InputLabel>
              <br />
              <TextField
                id="issuer"
                name="issuer"
                label="Enter issuer"
                value={values.issuer}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.issuer && touched.issuer}
                helperText={values.issuer && errors.issuer && touched.issuer}
              />
            </div>
          </div>
          <input
            id="my-file"
            type="file"
            name="my-file"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
          <p style={{ textAlign: "center" }}>
            (File format should be jpg and pdf)
          </p>
          <br />
          {/* <input type="text" value="" /> */}
          <Button
            sx={{ marginLeft: "65%" }}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Save Certificate
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export default App;

const formValidationSchema = Yup.object({
  certificateName: Yup.string().required("Please fill the Certificate Name"),
  issuer: Yup.string().required("please provide issuer"),
});
