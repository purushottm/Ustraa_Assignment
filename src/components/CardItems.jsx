import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getSelectedId } from "../store/reducers/CategoryReducer";

export default function Cards() {
  const { id } = useSelector(getSelectedId);
  const [data, setData] = React.useState(null);

  useEffect(() => {
    console.log(id);
    const fetchList = async () => {
      const results = await fetch(
        `https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id= ${id}`
      );
      console.log(results);
      const json = await results.json();
      return json;
    };
    fetchList()
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => console.log(err));

      return () => setData(null);
  }, [id]);

  return (
    <div>
      <Grid container spacing={2}>
        {data
          ? data?.products?.map((val, i) => (
              <Grid item xs={12} md={4} lg={4} sm={6}>
                <ItemCard value={val} />
              </Grid>
            ))
          : "Loading..."}
      </Grid>
    </div>
  );
}
