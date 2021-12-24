import { Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "auto",
  },
  bookItem: {
    padding: "10px",
    margin: "8px",
  },
});

export function BookRepo() {
  const classes = useStyles();
  const [state, setState] = useState({
    book_name: "",
    book_no: "",
  });

  const [bookRepo, setBookRepo] = useState([
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
    {
      book_name: "Book1",
      book_no: "123",
    },
  ]);

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSubmit = () => {
    if (state.book_name != "" && Boolean(Number(state.book_no))) {
      setBookRepo([
        ...bookRepo,
        { book_name: state.book_name, book_no: state.book_no },
      ]);
      setState({
        book_name: "",
        book_no: "",
      });
    }
  };

  return (
    <div>
      <div>
        <input
          onChange={handleChange}
          name="book_name"
          value={state.book_name}
        />
        <input onChange={handleChange} name="book_no" value={state.book_no} />
        <button
          onClick={onSubmit}
          disabled={state.book_name == "" || !Boolean(Number(state.book_no))}
        >
          Submit
        </button>
      </div>
      <Grid className={classes.container} container>
        {bookRepo.map((book) => (
          <Grid className={classes.bookItem} item xs={12} sm={6} md={4} lg={3}>
            <p>{book?.book_name}</p>
            <p>{book?.book_no}</p>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
