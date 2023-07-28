import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MCard from "../components/MCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";

import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

//APIKEY TRONG ENV
function DiscoveryPage() {
  const [loading, setLoading] = useState();
  const [movieList, setMovieList] = useState([]);
  const { query } = useParams();
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await apiService.get(
          // `discover/movie?api_key=${API_KEY}&page=${pageId}&language=en-US`
          `search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
        );
        setMovieList(res.data.results);
        setTotalPage(res.data.total_pages);
        setLoading(false);
        console.log(movieList);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [query, page]);
  const placeholder = [0, 1, 2, 3, 4];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <>
      <Typography variant="h5" mb={2}>
        SEARCH
      </Typography>
      <Divider />
      <Pagination
        count={totalPage}
        page={page}
        size="large"
        sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        onChange={(e, page) => setPage(page)}
      />
      <Grid container direction="row" spacing={5} mt={2}>
        {loading
          ? placeholder.map((item) => (
              <Grid item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : movieList.map((item) => (
              <Grid item xs={6} sm={4} md={3}>
                <MCard item={item} />
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default DiscoveryPage;
