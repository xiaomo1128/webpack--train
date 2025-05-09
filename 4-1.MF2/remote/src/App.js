import React from "react";
import Button from "./components/Button";
import Card from "./components/Card";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Card
        title="Remote Application"
        description="This is a card from remote app"
      >
        <Button>Remote Button</Button>
      </Card>
    </div>
  );
}

export default App;
