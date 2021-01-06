import React, { useState, useEffect } from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";

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

  return (
    <div className="App">
      <h1>Tinder App</h1>

      {[female, male].map((person) => {
        return (
          <>
            <img alt={person.name} src={person.pictureUrl} />
            <div>
              {person.name}, {person.age},
            </div>
            <Button
              variant="contained"
              color={person.gender === "female" ? "secondary" : "primary"}
              disabled={
                person.gender === "female" ? isFemaleLoading : isMaleLoading
              }
              onClick={() =>
                person.gender === "female"
                  ? setIsFemaleLoading(true)
                  : setIsMaleLoading(true)
              }
            >
              Next {person.gender}
            </Button>
            <hr />
          </>
        );
      })}
    </div>
  );
}
