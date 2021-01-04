import React, { useState, useEffect } from "react";
import "./styles.css";

interface Person {
  name: string;
  age: number;
  pictureUrl: string;
}

export default function App() {
  const [female, setFemale] = useState({} as Person);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    fetch("https://randomuser.me/api/?gender=female&nat=us")
      .then((res) => res.json())
      .then((json) => json.results)
      .then((_person) => _person[0])
      .then(({ name: { first }, dob: { age }, picture: { large } }) =>
        setFemale({ name: first, age: age, pictureUrl: large })
      )
      .catch(console.error);
    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);

  return (
    <div className="App">
      <h1>Tinder App</h1>
      <img alt="female" src={female.pictureUrl} />
      <div>
        {female.name}, {female.age}
      </div>
      <button disabled={isLoading} onClick={() => setIsLoading(true)}>
        Get Person
      </button>
    </div>
  );
}
