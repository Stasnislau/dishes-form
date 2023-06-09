"use client";
import { useFormik } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { keyframes, styled } from "@mui/system";
import * as Yup from "yup";
import {
  Grid,
  Box,
  TextField,
  Paper,
  MenuItem,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { submitData } from "@/Services";
import { useEffect, useState } from "react";

interface FormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: number;
  diameter: number;
  spiciness_scale: number;
  slices_of_bread: number;
}
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const scalingAnimation = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1.0);
  }
`;

const AnimatedPaper = styled(Paper)`
  animation: ${scalingAnimation} 0.5s ease-out;
`;
const AnimatedAlert = styled(Alert)`
  animation: ${fadeInAnimation} 0.5s ease-out;
`;
const HomePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean | undefined>(false);
  const initialValues = {
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: 1,
    diameter: 1,
    spiciness_scale: 1,
    slices_of_bread: 1,
  };
  useEffect(() => {
    const input = document.getElementById("name");
    if (input) {
      input.focus();
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required"),
    preparation_time: Yup.string()
      .matches(
        /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
        "Format: HH:MM:SS"
      )
      .required("Required"),
    type: Yup.string().required("Required"),
    no_of_slices: Yup.number()
      .test("is-pizza", "Invalid type or value", (value) => {
        if (formik.values.type && formik.values.type !== "pizza") {
          return true;
        }
        if (!value) {
          return false;
        }
        if (value >= 1) {
          return true;
        }
        return false;
      })
      .integer("Must be integer"),
    diameter: Yup.number()
      .test("is-pizza", "Invalid type or value", (value) => {
        if (formik.values.type && formik.values.type !== "pizza") {
          return true;
        }
        if (!value) {
          return false;
        }
        if (value >= 1) {
          return true;
        }
        return false;
      })
      .test(
        "decimal-places",
        "Ensure that there are no more than 2 decimal places",
        (value) => {
          if (formik.values.type && formik.values.type !== "pizza") {
            return true;
          }
          if (value && value.toString().split(".")[1]?.length > 2) {
            return false;
          }
          return true;
        }
      ),
    spiciness_scale: Yup.number()
      .test("is-soup", "Invalid type or value", (value) => {
        if (formik.values.type && formik.values.type !== "soup") {
          return true;
        }
        if (!value) {
          return false;
        }
        if (value >= 1) {
          return true;
        }
        return false;
      })
      .integer("Must be integer"),
    slices_of_bread: Yup.number()
      .test("is-sandwich", "Invalid type or value", (value) => {
        if (formik.values.type && formik.values.type !== "sandwich") {
          return true;
        }
        if (!value) {
          return false;
        }
        if (value >= 1) {
          return true;
        }
        return false;
      })
      .integer("Must be integer"),
  });
  const onSubmit = async (values: FormValues) => {
    let response = null;
    setError(null);
    if (values.type === "pizza") {
      const data = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        no_of_slices: values.no_of_slices,
        diameter: values.diameter,
      };
      response = await submitData(data);
    } else if (values.type === "soup") {
      const data = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        spiciness_scale: values.spiciness_scale,
      };
      response = await submitData(data);
    } else if (values.type === "sandwich") {
      const data = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        slices_of_bread: values.slices_of_bread,
      };
      response = await submitData(data);
    }
    if (response.error)
      setError(response.error.message || "Something went wrong");
    else if (response.id) {
      setSuccess(true);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
        setSuccess(false);
        formik.resetForm();
      }, 5000);
    } else if (!response.id) {
      const key = Object.keys(response)[0];
      setError(`${key}: ${response[key][0]}`);
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: orange[300],
      },
    },
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const styles = {
    formControl: {
      display: "flex",
      marginBottom: "1rem",
    },
    page: {
      marginTop: "4rem",
      padding: "2rem",
      borderRadius: "1rem",
      boxShadow: "0 0 10px rgba(0,0,0,0.7)",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <AnimatedPaper elevation={3} sx={styles.page}>
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  fontFamily: "orangejuice",
                }}
              >
                Order your dish
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={styles.formControl}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Dish name"
                    autoFocus
                    inputProps={{
                      pattern: "^[a-zA-Z0-9 ]*$",
                      maxLength: 40,
                    }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={styles.formControl}>
                  <TextField
                    fullWidth
                    id="preparation_time"
                    name="preparation_time"
                    label="Preparation time"
                    value={formik.values.preparation_time}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.preparation_time &&
                      Boolean(formik.errors.preparation_time)
                    }
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.preparation_time &&
                      formik.errors.preparation_time
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={styles.formControl}>
                  <TextField
                    fullWidth
                    id="type"
                    name="type"
                    label="Type"
                    select
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.type && formik.errors.type}
                  >
                    <MenuItem value="pizza">Pizza</MenuItem>
                    <MenuItem value="soup">Soup</MenuItem>
                    <MenuItem value="sandwich">Sandwich</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              {formik.values.type === "pizza" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={styles.formControl}>
                    <TextField
                      fullWidth
                      id="no_of_slices"
                      name="no_of_slices"
                      label="Number of slices"
                      type="number"
                      inputProps={{
                        min: 1,
                        pattern: "^[0-9]*$",
                        max: 99999,
                      }}
                      value={formik.values.no_of_slices}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.no_of_slices &&
                        Boolean(formik.errors.no_of_slices)
                      }
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.no_of_slices &&
                        formik.errors.no_of_slices
                      }
                    />
                  </Grid>
                </Grid>
              )}
              {formik.values.type === "pizza" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={styles.formControl}>
                    <TextField
                      fullWidth
                      id="diameter"
                      name="diameter"
                      label="Diameter"
                      type="number"
                      value={formik.values.diameter}
                      inputProps={{
                        min: 1,
                        step: "any",
                        pattern: "^[0-9]*$",
                        max: 99999,
                      }}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.diameter &&
                        Boolean(formik.errors.diameter)
                      }
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.diameter && formik.errors.diameter
                      }
                    />
                  </Grid>
                </Grid>
              )}
              {formik.values.type === "soup" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={styles.formControl}>
                    <TextField
                      fullWidth
                      id="spiciness_scale"
                      name="spiciness_scale"
                      label="Spiciness scale"
                      type="number"
                      value={formik.values.spiciness_scale}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                        pattern: "^[0-9]*$",
                        max: 10,
                      }}
                      error={
                        formik.touched.spiciness_scale &&
                        Boolean(formik.errors.spiciness_scale)
                      }
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.spiciness_scale &&
                        formik.errors.spiciness_scale
                      }
                    />
                  </Grid>
                </Grid>
              )}
              {formik.values.type === "sandwich" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={styles.formControl}>
                    <TextField
                      fullWidth
                      id="slices_of_bread"
                      name="slices_of_bread"
                      label="Slices of bread"
                      type="number"
                      value={formik.values.slices_of_bread}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.slices_of_bread &&
                        Boolean(formik.errors.slices_of_bread)
                      }
                      inputProps={{
                        min: 1,
                        pattern: "^[0-9]*$",
                        max: 99999,
                      }}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.slices_of_bread &&
                        formik.errors.slices_of_bread
                      }
                    />
                  </Grid>
                </Grid>
              )}
              {error && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={styles.formControl}>
                    <AnimatedAlert
                      sx={{ width: "100%", mt: 2 }}
                      severity="error"
                    >
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </AnimatedAlert>
                  </Grid>
                </Grid>
              )}
              <Box sx={{ textAlign: "center" }}>
                <LoadingButton
                  loading={formik.isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={disabled}
                  sx={{
                    marginTop: "1rem",
                    padding: "0.5rem 3rem",
                    borderRadius: "8px",
                    background: (theme) => theme.palette.primary.main,
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": {
                      background: (theme) => theme.palette.secondary.main,
                    },
                  }}
                >
                  Submit
                </LoadingButton>
              </Box>

              {success && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={styles.formControl}>
                    <AnimatedAlert
                      sx={{ width: "100%", mt: 2 }}
                      severity="success"
                    >
                      <AlertTitle>Success</AlertTitle>
                      Your form has successfully been submitted{" "}
                    </AnimatedAlert>
                  </Grid>
                </Grid>
              )}
            </form>
          </AnimatedPaper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default HomePage;
