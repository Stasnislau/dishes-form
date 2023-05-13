interface submitInterface {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

export const submitData = async (data: submitInterface) => {
  const response = await fetch(
    "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
