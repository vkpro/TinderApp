import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [female, setFemale] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    fetch("https://randomuser.me/api/?gender=female&nat=us")
      .then((res) => res.json())
      .then((json) => json.results)
      .then((_person) => _person[0])
      .then(({ name, dob }) => setFemale(`${name.first}, ${dob.age}`))
      .catch(console.error);
    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);

  return (
    <div className="App">
      <h1>Tinder App</h1>
      <p>{female}</p>
      <button disabled={isLoading} onClick={() => setIsLoading(true)}>
        Get Person
      </button>
    </div>
  );
}
