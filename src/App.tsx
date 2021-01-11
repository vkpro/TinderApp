import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Slider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center"
    },
    paper: {
      padding: theme.spacing(2),
      // textAlign: "center",
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
  const [sliderValue, setSliderValue] = useState(10);
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

  const match = Math.abs(female.age - male.age) <= sliderValue ? true : false;

  return (
    <>
      <div className={classes.root}>
        <h1>Tinder App</h1>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          spacing={3}
          wrap='wrap'
        >
          {[female, male].map((person, index) => (
            <Grid item xs={2} key={index}>
              <Paper className={classes.paper}>
                <>
                  {person.name ? (
                    <>
                      <img alt={person.name} src={person.pictureUrl} />
                      <div>
                        {person.name}, {person.age}
                      </div>
                    </>
                  ) : (
                      <div>"Loading a new person"</div>
                    )}
                </>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          spacing={3}
        >
          {['female', 'male'].map((gender: string, index: number) => (
            <Grid item xs={2} key={index}>
              <Button
                variant="contained"
                color={
                  gender === "female" ? "secondary" : "primary"
                }
                disabled={
                  gender === "female"
                    ? isFemaleLoading
                    : isMaleLoading
                }
                onClick={() =>
                  gender === "female"
                    ? setIsFemaleLoading(true)
                    : setIsMaleLoading(true)
                }
              >
                Next {gender}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12}></Grid>
          <Grid item xs={3}>
            <Slider
              defaultValue={10}
              aria-labelledby="discrete-slider-always"
              // getAriaValueText={(value: number, index: number) => string}
              // onChange={(event: object, value: number) => setSliderValue(value)}
              onChange={(event: object, value: number | number[]) =>
                typeof value === 'number' ? setSliderValue(value) : null}
              value={sliderValue}
              step={1}
              max={50}
              valueLabelDisplay="on"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {match ? (
            <>
              <FavoriteIcon color="secondary" style={{ fontSize: 100 }} />
              <h2>It's a Match!</h2>
            </>
          ) : (
              <h2>Find Matches with no more than {sliderValue} years age difference</h2>
            )}
        </Grid>
      </div>
    </>
  );
}
