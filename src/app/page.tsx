"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Box, Button, TextField, Paper } from "@mui/material";
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
      .matches(/^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/, "Invalid time format")
      .required("Required"),
    type: Yup.string().required("Required"),
    no_of_slices: Yup.number().test("is-pizza", "Invalid type", () => {
      if (initialValues.type === "pizza") {
        return true;
      }
      return false;
    }),
    diameter: Yup.number().test("is-pizza", "Invalid type", () => {
      if (initialValues.type === "pizza") {
        return true;
      }
      return false;
    }),
    spiciness_scale: Yup.number().test("is-soup", "Invalid type", () => {
      if (initialValues.type === "soup") {
        return true;
      }
      return false;
    }),
    slices_of_bread: Yup.number().test("is-sandwich", "Invalid type", () => {
      if (initialValues.type === "sandwich") {
        return true;
      }
      return false;
    }),
  });
  const onSubmit = (values: FormValues) => {
    const data = {
      ...values,
      preparation_time: moment(values.preparation_time, "HH:mm:ss").format(
        "HH:mm:ss"
      ),
    };
    console.log(data);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const styles = {
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: 2,
    },
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="type"
                  name="type"
                  label="Type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.type && Boolean(formik.errors.type)
                  }
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.type && formik.errors.type
                  }
                />
              </Grid>
            </Grid>
            {formik.values.type === "pizza" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="no_of_slices"
                    name="no_of_slices"
                    label="Number of slices"
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="diameter"
                    name="diameter"
                    label="Diameter"
                    value={formik.values.diameter}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.diameter &&
                      Boolean(formik.errors.diameter)
                    }
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.diameter &&
                      formik.errors.diameter
                    }
                  />
                </Grid>
              </Grid>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;
