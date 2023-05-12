"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Box, Button, TextField, Paper, MenuItem } from "@mui/material";
import moment from "moment";

interface FormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: number;
  diameter: number;
  spiciness_scale: number;
  slices_of_bread: number;
}

const HomePage = () => {
  const initialValues = {
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: 1,
    diameter: 1,
    spiciness_scale: 1,
    slices_of_bread: 1,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    preparation_time: Yup.string()
      .matches(/^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/, "Format: HH:MM:SS")
      .required("Required"),
    type: Yup.string().required("Required"),
    no_of_slices: Yup.number().test("is-pizza", "Invalid type", () => {
      if (initialValues.type !== "pizza") {
        return true;
      }
      if (initialValues.no_of_slices <= 12 && initialValues.no_of_slices >= 1) {
        return true;
      }
      return false;
    }),
    diameter: Yup.number().test("is-pizza", "Invalid type", () => {
      if (initialValues.type !== "pizza") {
        return true;
      }
      if (initialValues.diameter <= 50 && initialValues.diameter >= 10) {
        return true;
      }
      return false;
    }),
    spiciness_scale: Yup.number().test("is-soup", "Invalid type", () => {
      if (initialValues.type !== "soup") {
        return true;
      }
      if (
        initialValues.spiciness_scale <= 10 &&
        initialValues.spiciness_scale >= 1
      ) {
        return true;
      }
      return false;
    }),
    slices_of_bread: Yup.number().test("is-sandwich", "Invalid type", () => {
      if (initialValues.type !== "sandwich") {
        return true;
      }
      if (
        initialValues.slices_of_bread <= 10 &&
        initialValues.slices_of_bread >= 1
      ) {
        return true;
      }
      return false;
    }),
  });
  const onSubmit = (values: FormValues) => {
    if (values.type === "pizza") {
      const data = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        no_of_slices: values.no_of_slices,
        diameter: values.diameter,
      };
      console.log(data);
    } else if (values.type === "soup") {
      const data = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        spiciness_scale: values.spiciness_scale,
      };
      console.log(data);
    } else if (values.type === "sandwich") {
      const data = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        slices_of_bread: values.slices_of_bread,
      };
      console.log(data);
    }
  };

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
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={styles.formControl}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
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
                  <MenuItem value="">Please Select</MenuItem>
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
                    value={formik.values.no_of_slices}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.no_of_slices &&
                      Boolean(formik.errors.no_of_slices)
                    }
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.no_of_slices && formik.errors.no_of_slices
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
                    onChange={formik.handleChange}
                    error={
                      formik.touched.diameter && Boolean(formik.errors.diameter)
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
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.slices_of_bread &&
                      formik.errors.slices_of_bread
                    }
                  />
                </Grid>
              </Grid>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;
