import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import MCard from "../components/MCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

//APIKEY TRONG ENV

function FavoritePage() {
  // let { favMovies, setfavMovies } = useFavMovies();
  const [list, setList] = useState(JSON.parse(localStorage.getItem("fav")));
  const handleRemove = (id) => {
    console.log("sdfsdf");
    let listNew = list.filter((item) => item.id !== id);
    setList(listNew);
    console.log("list", listNew);
    if (listNew.length === 0) {
      console.log("000");
      localStorage.removeItem("fav");
    } else localStorage.setItem("fav", JSON.stringify(listNew));
  };
  return (
    <>
      <Typography variant="h5" mb={2}>
        YOUR FAVORITES
      </Typography>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {list?.map((item) => (
          <Grid
            key={item.id}
            item
            xs={6}
            sm={4}
            md={3}
           
          >
            <MCard item={item} />
            <Button
              sx={{ fontSize: "0.6rem" }}
              // size="small"
              onClick={() => handleRemove(item.id)}
            >
              remove
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FavoritePage;
