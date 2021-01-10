import React, { useState, useEffect } from "react";
// import "./styles.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

interface Person {
  name: string;
  age: number;
  pictureUrl: string;
  gender: string;
}

export default function App() {
  const [female, setFemale] = useState({} as Person);
  const [male, setMale] = useState({} as Person);
  const [isFemaleLoading, setIsFemaleLoading] = useState(false);
  const [isMaleLoading, setIsMaleLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (isFemaleLoading) return;
    fetch("https://randomuser.me/api/?gender=female&nat=us")
      .then((res) => res.json())
      .then((json) => json.results)
      .then((_person) => _person[0])
      .then(({ name: { first }, dob: { age }, picture: { large }, gender }) =>
        setFemale({ name: first, age: age, pictureUrl: large, gender: gender })
      )
      .catch(console.error);
    return () => {
      setIsFemaleLoading(false);
    };
  }, [isFemaleLoading]);

  useEffect(() => {
    if (isMaleLoading) return;
    fetch("https://randomuser.me/api/?gender=male&nat=us")
      .then((res) => res.json())
      .then((json) => json.results)
      .then((_person) => _person[0])
      .then(({ name: { first }, dob: { age }, picture: { large }, gender }) =>
        setMale({ name: first, age: age, pictureUrl: large, gender: gender })
      )
      .catch(console.error);
    return () => {
      setIsMaleLoading(false);
    };
  }, [isMaleLoading]);

  const result =
    Math.abs(female.age - male.age) <= 10
      ? "It's a Match!"
      : "Find Matches with no more than 10 years age difference              ";

  return (
    <>
      <div className={classes.root}>
        <h1 style={{ textAlign: "center" }}>Tinder App</h1>
        <Grid container spacing={3}>
          {[female, male].map((person) => (
            <Grid item xs>
              <Paper className={classes.paper}>
                <>
                  {person.name ? (
                    <>
                      <img alt={person.name} src={person.pictureUrl} />
                      <div>
                        {person.name}, {person.age}
                      </div>

                      <Button
                        variant="contained"
                        color={
                          person.gender === "female" ? "secondary" : "primary"
                        }
                        disabled={
                          person.gender === "female"
                            ? isFemaleLoading
                            : isMaleLoading
                        }
                        onClick={() =>
                          person.gender === "female"
                            ? setIsFemaleLoading(true)
                            : setIsMaleLoading(true)
                        }
                      >
                        Next {person.gender}
                      </Button>
                    </>
                  ) : (
                    <div>"Loading a new person"</div>
                  )}
                </>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <h2 style={{ textAlign: "center" }}>{result}</h2>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
