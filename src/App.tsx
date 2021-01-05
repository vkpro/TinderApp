import React, { useState, useEffect } from "react";
import "./styles.css";

interface Person {
  name: string;
  age: number;
  pictureUrl: string;
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
      .then(({ name: { first }, dob: { age }, picture: { large } }) =>
        setFemale({ name: first, age: age, pictureUrl: large })
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
      .then(({ name: { first }, dob: { age }, picture: { large } }) =>
        setMale({ name: first, age: age, pictureUrl: large })
      )
      .catch(console.error);
    return () => {
      setIsMaleLoading(false);
    };
  }, [isMaleLoading]);

  return (
    <div className="App">
      <h1>Tinder App</h1>
      <img alt="female" src={female.pictureUrl} />
      <div>
        {female.name}, {female.age}
      </div>
      <button
        disabled={isFemaleLoading}
        onClick={() => setIsFemaleLoading(true)}
      >
        Next Female
      </button>
      <hr />
      <img alt="male" src={male.pictureUrl} />
      <div>
        {male.name}, {male.age}
      </div>

      <button disabled={isMaleLoading} onClick={() => setIsMaleLoading(true)}>
        Next Male
      </button>
    </div>
  );
}
